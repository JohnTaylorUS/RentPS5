<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Добавить арендатора</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f8f9fa;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }
        label.required::after {
            content: " *";
            color: #d93025;
        }
        input, textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
            box-sizing: border-box;
        }
        textarea {
            min-height: 100px;
            resize: vertical;
        }
        button {
            padding: 14px 20px;
            background: #34a853;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            width: 100%;
        }
        .error {
            color: #d93025;
            font-size: 14px;
            margin-top: 4px;
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Добавить арендатора</h1>
        <form id="tenant-form">
            <div class="form-group">
                <label class="required">ФИО</label>
                <input type="text" name="fullName" required>
            </div>
            <div class="form-group">
                <label class="required">Дата рождения</label>
                <input type="date" name="birthDate" required>
            </div>
            <div class="form-group">
                <label class="required">Телефон</label>
                <input type="tel" name="phone" required>
            </div>
            <div class="form-group">
                <label class="required">Адрес</label>
                <input type="text" name="address" required>
            </div>
            <div class="form-group">
                <label class="required">Дни аренды</label>
                <input type="number" name="days" min="1" required>
            </div>
            <div class="form-group">
                <label class="required">Начало аренды</label>
                <input type="datetime-local" name="startTime" required>
            </div>
            <div class="form-group">
                <label>Скидка (%)</label>
                <input type="number" name="discount" min="0" max="100" value="0">
            </div>
            <div class="form-group">
                <label>Доставка</label>
                <input type="number" name="delivery" min="0" value="0">
            </div>
            <div class="form-group">
                <label class="required">Залог</label>
                <input type="number" name="deposit" min="0" required>
            </div>
            <div class="form-group">
                <label class="required">Неисправности</label>
                <textarea name="issues" required></textarea>
            </div>
            <button type="button" onclick="submitForm()">Сохранить</button>
        </form>
    </div>

    <script src="script.js"></script>
</body>
</html>