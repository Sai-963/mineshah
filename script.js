// Настройка копирования IP по клику
document.querySelector('.ip').addEventListener('click', function() {
    navigator.clipboard.writeText(this.innerText);
    alert('IP сервера скопирован в буфер обмена!');
});

// Обработка формы заявки
document.getElementById('smpForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const webhookUrl = "https://discord.com/api/webhooks/1512757947233599589/VSHqFeAxwx5frk-KpbIcaA9ZXWtR5Kim2zKlGWYbQFfA_ubghALklaYwG0wX6cMDaHYS"; // Вставьте сюда ссылку!

    const nickname = document.getElementById('nickname').value;
    const age = document.getElementById('age').value;
    const about = document.getElementById('about').value;
    const statusMessage = document.getElementById('statusMessage');

    // Формируем красивое сообщение для Discord
    const discordMessage = {
        embeds: [{
            title: "📢 Новая заявка!",
            color: 5025616, // Зеленый цвет полоски
            fields: [
                { name: "Игровой ник", value: nickname, inline: true },
                { name: "Возраст", value: age, inline: true },
                { name: "О себе / Планы", value: about }
            ],
            timestamp: new Date()
        }]
    };

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(discordMessage)
        });

        if (response.ok) {
            statusMessage.innerText = "✅ Заявка успешно отправлена!";
            statusMessage.className = "success";
            document.getElementById('smpForm').reset(); // Очищаем форму
        } else {
            throw new Error();
        }
    } catch (error) {
        statusMessage.innerText = "❌ Ошибка отправки.";
        statusMessage.className = "error";
    }
});
