document.addEventListener("DOMContentLoaded", function () {
    let chatBox = document.getElementById("chat-box");
    let userInput = document.getElementById("user-input");
    let sendBtn = document.getElementById("send-btn");

    const API_URL = "https://your-backend-url.onrender.com/ask"; // Update with actual backend URL

    function addMessage(text, sender) {
        let message = document.createElement("div");
        message.classList.add("chat-message", sender);
        message.innerText = text;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function sendMessage() {
        let userMessage = userInput.value.trim();
        if (userMessage === "") return;

        addMessage(userMessage, "user");
        userInput.value = "";

        // Show a loading message
        let loadingMessage = document.createElement("div");
        loadingMessage.classList.add("chat-message", "bot");
        loadingMessage.innerText = "Thinking...";
        chatBox.appendChild(loadingMessage);
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            let response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: userMessage })
            });

            let data = await response.json();
            chatBox.removeChild(loadingMessage); // Remove loading message
            addMessage(data.answer || "Sorry, I didn't understand that.", "bot");
        } catch (error) {
            chatBox.removeChild(loadingMessage);
            addMessage("⚠️ Error: Unable to connect to the server.", "bot");
        }
    }

    sendBtn.addEventListener("click", sendMessage);

    // Send message when "Enter" key is pressed
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
});
