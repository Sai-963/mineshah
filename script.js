// Копирование IP по клику
document.querySelector('.ip').addEventListener('click', function() {
    const originalText = this.innerText;
    navigator.clipboard.writeText(originalText);
    this.innerText = "✨ Скопировано! ✨";
    this.style.color = "#10b981";
    setTimeout(() => {
        this.innerText = originalText;
        this.style.color = "";
    }, 2000);
});

// Обработка формы заявки
document.getElementById('smpForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // ЗАМЕНИТЕ ССЫЛКУ НИЖЕ НА ВАШ РЕАЛЬНЫЙ ВЕБХУК ИЗ ДИСКОРДА!
    const webhookUrl = "https://discord.com/api/webhooks/1512757947233599589/VSHqFeAxwx5frk-KpbIcaA9ZXWtR5Kim2zKlGWYbQFfA_ubghALklaYwG0wX6cMDaHYS"; 

    const nickname = document.getElementById('nickname').value;
    const age = document.getElementById('age').value;
    const about = document.getElementById('about').value;
    const statusMessage = document.getElementById('statusMessage');

    // Красивая карточка сообщения для Discord
    const discordMessage = {
        embeds: [{
            title: "📢 Новая заявка на сервер!",
            color: 5025616, // Зеленый цвет полоски в ДС
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
            statusMessage.innerText = "✅ Заявка успешно отправлена! Ожидайте ответа.";
            statusMessage.className = "success";
            document.getElementById('smpForm').reset(); // Очищаем поля формы
        } else {
            throw new Error();
        }
    } catch (error) {
        statusMessage.innerText = "❌ Ошибка отправки.";
        statusMessage.className = "error";
    }
});
