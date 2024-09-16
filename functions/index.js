/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');

// Инициализируйте Firebase Admin SDK
admin.initializeApp();

// Функция для проверки подписи
function checkHash(hash, secret, data) {
    const generatedHash = crypto.createHash('sha256').update(secret + data).digest('hex');
    return hash === generatedHash;
}

// Облачная функция для обработки аутентификации Telegram
exports.telegramAuth = functions.https.onRequest((req, res) => {
    const { id, first_name, last_name, username, photo_url, auth_date, hash } = req.query;
    const secret = 'YOUR_BOT_SECRET'; // Замените на секрет вашего бота Telegram

    // Проверка подписи
    if (checkHash(hash, secret, `${id}${first_name}${last_name}${username}${photo_url}${auth_date}`)) {
        admin.auth().createCustomToken(id)
            .then((customToken) => {
                res.status(200).json({ token: customToken });
            })
            .catch((error) => {
                res.status(500).send('Ошибка создания кастомного токена: ' + error.message);
            });
    } else {
        res.status(403).send('Неверная подпись');
    }
});



// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
