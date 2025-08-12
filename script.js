document.addEventListener('DOMContentLoaded', () => {
    // Проверка авторизации
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
        // Используем прокси для обхода CORS
        const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx3GMSqqsEB_w0_XGuECjGQIA78-FZAKvz-/exec/auth';
        
        const response = await fetch(PROXY_URL + SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({ login, password })
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
        console.error('Ошибка запроса:', error);
        alert('Ошибка подключения: ' + error.message);
    }
}

// Для формы
async function submitForm() {
    const form = document.getElementById('tenant-form');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx3GMSqqsEB_w0_XGuECjGQIA78-FZAKvz-/exec';
        
        const response = await fetch(PROXY_URL + SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Данные успешно сохранены!');
            form.reset();
        } else {
            throw new Error(result.error || 'Ошибка сохранения');
        }
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
}