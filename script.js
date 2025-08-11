document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
        window.location.href = 'form.html';
    }
});

function checkAuth() {
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

    // Создаем уникальное имя функции для JSONP
    const callbackName = 'authCallback_' + Date.now();
    
    // Создаем script тег для JSONP запроса
    const script = document.createElement('script');
    script.src = `https://script.google.com/macros/s/AKfycbx3GMSqqsEB_w0_XGuECjGQIA78-FZAKvz-/exec` +
                 `?callback=${callbackName}` +
                 `&path=auth` +
                 `&login=${encodeURIComponent(login)}` +
                 `&password=${encodeURIComponent(password)}`;
    
    // Создаем функцию обработчика
    window[callbackName] = function(response) {
        // Удаляем временную функцию
        delete window[callbackName];
        document.body.removeChild(script);
        
        if (response.success) {
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = 'form.html';
        } else {
            alert('Неверный логин или пароль');
        }
    };
    
    // Обработка ошибок
    script.onerror = function() {
        delete window[callbackName];
        document.body.removeChild(script);
        alert('Ошибка подключения к серверу');
    };
    
    // Добавляем script на страницу
    document.body.appendChild(script);
}

// Для формы отправки данных
async function submitForm() {
    const form = document.getElementById('tenant-form');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbx3GMSqqsEB_w0_XGuECjGQIA78-FZAKvz-/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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