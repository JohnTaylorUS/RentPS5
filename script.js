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

    // Валидация полей
    if (!login) {
        document.getElementById('login-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('login-error').style.display = 'none';
    }

    if (!password) {
        document.getElementById('password-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('password-error').style.display = 'none';
    }

    if (!isValid) return;

    try {
        // Отправка данных в Apps Script
        const response = await fetch('https://script.google.com/macros/s/AKfycbx36NSqqsEB_w0_XGuECjGQ1A78-FZAKvzID4ZRxn4gzsYZXNMZzzdRybquSUCmTCFCtg/exec/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        });

        const result = await response.json();

        if (result.success) {
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = 'form.html';
        } else {
            alert('Ошибка: Неверный логин или пароль');
        }
    } catch (error) {
        console.error('Ошибка сети:', error);
        alert('Произошла ошибка при подключении к серверу');
    }
}