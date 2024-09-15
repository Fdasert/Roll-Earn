from flask import Flask, request, jsonify, render_template
import random
from database import get_user_tokens, set_user_tokens, setup_database

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/start', methods=['POST'])
def start():
    user_id = request.json.get('user_id')
    tokens = get_user_tokens(user_id)
    
    if tokens is None:
        tokens = random.randint(1, 10000)  # Генерируем случайное количество токенов
        set_user_tokens(user_id, tokens)
        message = f"Поздравляю! Вы получили {tokens} токенов при первом запуске."
    else:
        message = f"У вас уже есть {tokens} токенов."

    return jsonify({'message': message, 'tokens': tokens})

if __name__ == '__main__':
    setup_database()  # Инициализируем базу данных
    app.run(host='0.0.0.0', port=5000)
