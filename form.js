// Проверка авторизации
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isAuthenticated') !== 'true') {
        alert('Доступ запрещен. Пожалуйста, авторизуйтесь.');
        window.location.href = 'index.html';
    }
});

// Отправка формы
document.getElementById('tenant-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Сбор данных
    const formData = new FormData(e.target);
    const data = {
        fullName: formData.get('fullName'),
        birthDate: formData.get('birthDate'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        days: formData.get('days'),
        startTime: formData.get('startTime'),
        discount: formData.get('discount') || 0,
        delivery: formData.get('delivery') || 0,
        deposit: formData.get('deposit'),
        issues: formData.get('issues')
    };

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbx36NSqqsEB_w0_XGuECjGQ1A78-FZAKvzID4ZRxn4gzsYZXNMZzzdRybquSUCmTCFCtg/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.success) {
            alert('Данные сохранены!');
            e.target.reset();
        } else {
            throw new Error(result.error || 'Ошибка сохранения');
        }
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
});