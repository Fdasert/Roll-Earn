// Import the Firebase modules that you need in your app.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js';
import { getFirestore, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('start-button').addEventListener('click', async function() {
    const userId = 'user';  // Используйте реальный идентификатор пользователя
    const userRef = doc(db, 'users', userId);

    try {
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            // Пользователь найден
            const data = docSnap.data();
            document.getElementById('message').textContent = `У вас уже есть ${data.tokens} токенов.`;
            document.getElementById('tokens').textContent = `Ваши токены: ${data.tokens}`;
        } else {
            // Пользователь не найден, создаем запись
            const tokens = Math.floor(Math.random() * 10000) + 1;
            await setDoc(userRef, { tokens });
            document.getElementById('message').textContent = `Поздравляю! Вы получили ${tokens} токенов при первом запуске.`;
            document.getElementById('tokens').textContent = `Ваши токены: ${tokens}`;
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
});
