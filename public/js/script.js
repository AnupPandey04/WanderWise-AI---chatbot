const sendBtn = document.getElementById('sendBtn');
const textBox = document.getElementById('textbox');
const chatContainer = document.getElementById('chatContainer');

function addMessage(sender, message, align = "left") {
    const messageElement = document.createElement('div');
    messageElement.style.margin = "10px";
    messageElement.style.textAlign = align;
    messageElement.innerHTML = `<span><strong>${sender}:</strong> </span><span>${message}</span>`;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function sendMessage(userMessage) {
    addMessage("You", userMessage, "right");
}

function chatBotResponse(userMessage) {
    fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            const botReply = data.reply || "Sorry, I couldn't respond.";
            addMessage("WanderWise", botReply);
        })
        .catch(error => {
            console.error('Error:', error);
            addMessage("WanderWise", "Sorry, something went wrong.");
        });
}

sendBtn.addEventListener('click', () => {
    const userMessage = textBox.value.trim();
    if (!userMessage) {
        alert("Please type a message.");
        return;
    }
    textBox.value = "";
    sendMessage(userMessage);
    chatBotResponse(userMessage);
});


textBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});