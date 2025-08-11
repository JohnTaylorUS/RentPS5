// Проверка авторизации при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
        window.location.href = 'form.html';
    }
});

async function checkAuth() {
    const login = document.getElementById('login').value.trim();
    const password = document.getElementById('password').value.trim();
    let isValid = true;

    // Сброс предыдущих ошибок
    document.getElementById('login-error').style.display = 'none';
    document.getElementById('password-error').style.display = 'none';

    // Валидация полей
    if (!login) {
        document.getElementById('login-error').style.display = 'block';
        isValid = false;
    }

    if (!password) {
        document.getElementById('password-error').style.display = 'block';
        isValid = false;
    }

    if (!isValid) return;

    try {
        // URL с добавленным параметром для CORS
        const AUTH_URL = 'https://script.google.com/macros/s/AKfycbx36NSqqsEB_w0_XGuECjGQ1A78-FZAKvzID4ZRxn4gzsYZXNMZzzdRybquSUCmTCFCtg/exec/auth?cors=true';

        // Отправка данных с обработкой CORS
        const response = await fetch(AUTH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': window.location.origin
            },
            body: JSON.stringify({
                login: login,
                password: password
            }),
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = 'form.html';
        } else {
            alert('Ошибка: Неверный логин или пароль');
        }
    } catch (error) {
        console.error('Ошибка:', {
            message: error.message,
            stack: error.stack
        });
        alert('Ошибка подключения: Проверьте консоль для деталей (F12)');
    }
}