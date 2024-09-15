document.getElementById('start-button').addEventListener('click', function() {
    fetch('/api/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: 12345 }) // Замените 12345 на реальный ID пользователя
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').textContent = data.message;
        document.getElementById('tokens').textContent = `Ваши токены: ${data.tokens}`;
    })
    .catch(error => console.error('Ошибка:', error));
});
