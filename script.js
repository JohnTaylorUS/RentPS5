// Проверка авторизации при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
        window.location.href = 'form.html';
    }
});

async function checkAuth() {
    const login = document.getElementById('login').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Сброс ошибок
    document.getElementById('login-error').style.display = 'none';
    document.getElementById('password-error').style.display = 'none';

    // Валидация
    if (!login) {
        document.getElementById('login-error').style.display = 'block';
        return;
    }
    if (!password) {
        document.getElementById('password-error').style.display = 'block';
        return;
    }

    try {
        // Отправка preflight запроса
        await fetch('https://script.google.com/macros/s/AKfycbx3GMSqqsEB_w0_XGuECjGQIA78-FZAKvz-/exec?cors=true', {
            method: 'OPTIONS'
        });

        // Основной запрос
        const response = await fetch('https://script.google.com/macros/s/AKfycbx3GMSqqsEB_w0_XGuECjGQIA78-FZAKvz-/exec/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': window.location.origin
            },
            body: JSON.stringify({ login, password }),
            credentials: 'omit'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = 'form.html';
        } else {
            alert('Неверный логин или пароль');
        }
    } catch (error) {
        console.error('Ошибка запроса:', {
            message: error.message,
            stack: error.stack
        });
        alert('Ошибка подключения. Проверьте консоль (F12)');
    }
}