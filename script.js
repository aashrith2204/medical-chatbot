document.addEventListener("DOMContentLoaded", function () {
    let chatBox = document.getElementById("chat-box");
    let userInput = document.getElementById("user-input");
    let sendBtn = document.getElementById("send-btn");

    function addMessage(text, sender) {
        let message = document.createElement("div");
        message.classList.add("chat-message", sender);
        message.innerText = text;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    sendBtn.addEventListener("click", async function () {
        let userMessage = userInput.value.trim();
        if (userMessage === "") return;

        addMessage(userMessage, "user");
        userInput.value = "";

        // Send request to backend API (Flask)
        let response = await fetch("/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: userMessage })
        });

        let data = await response.json();
        addMessage(data.answer, "bot");
    });
});
