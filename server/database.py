import sqlite3

def setup_database():
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY,
            tokens INTEGER
        )
    ''')
    conn.commit()
    conn.close()

def get_user_tokens(user_id):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('SELECT tokens FROM users WHERE user_id = ?', (user_id,))
    result = c.fetchone()
    conn.close()
    return result[0] if result else None

def set_user_tokens(user_id, tokens):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('INSERT OR REPLACE INTO users (user_id, tokens) VALUES (?, ?)', (user_id, tokens))
    conn.commit()
    conn.close()
