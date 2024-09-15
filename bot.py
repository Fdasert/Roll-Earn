from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler

TOKEN = '7121720328:AAH0rtgpNAN97_jARsTeKtVeuniznL6PhHU'

def start(update, context):
    keyboard = [[
        InlineKeyboardButton("Открыть TokenSpin", web_app={"url": "https://fdasert.github.io/Roll-Earn/"})
    ]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    update.message.reply_text('Добро пожаловать! Откройте мини-приложение для игры.', reply_markup=reply_markup)

if __name__ == "__main__":
    updater = Updater(TOKEN, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start))

    updater.start_polling()
    updater.idle()
