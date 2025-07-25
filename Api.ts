import OpenAI from 'https://cdn.jsdelivr.net/npm/openai@4.68.1/dist/openai.min.js';

        interface Message {
            role: 'system' | 'user';
            content: string;
        }

        const client = new OpenAI({
            baseURL: "https://api.inference.net/v1",
            apiKey: "inference-10786646dd114d64b96f6173bb0d4300",
            dangerouslyAllowBrowser: true // Note: For production, handle API keys securely
        });

        const chatBox = document.getElementById("chatBox") as HTMLElement;
        const userInput = document.getElementById("userInput") as HTMLInputElement;

        async function sendMessage(): Promise<void> {
            const message = userInput.value.trim();
            if (!message) return;

            // Display user message
            appendMessage("user", message);
            userInput.value = "";

            // Create a placeholder for the bot's response
            const botMessageDiv = document.createElement("div");
            botMessageDiv.className = "message bot-message";
            chatBox.appendChild(botMessageDiv);
            chatBox.scrollTop = chatBox.scrollHeight;

            try {
                const completion = await client.chat.completions.create({
                    model: "qwen/qwen2.5-7b-instruct/bf-16",
                    messages: [
                        {
                            role: "system",
                            content: "You are a supportive mental health chatbot. Provide empathetic, kind, and safe responses to help users with their emotional well-being. Avoid giving medical advice or encouraging harmful behavior. Offer resources or suggestions for self-care and professional help when appropriate."
                        } as Message,
                        { role: "user", content: message } as Message
                    ],
                    stream: true,
                    temperature: 0.7,
                    max_tokens: 512
                });

                let fullMessage = "";
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta.content;
                    if (content) {
                        fullMessage += content;
                        botMessageDiv.textContent = fullMessage;
                        chatBox.scrollTop = chatBox.scrollHeight;
                    }
                }
            } catch (error) {
                console.error("Error:", error);
                botMessageDiv.textContent = "Sorry, something went wrong. Please try again.";
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        }

        function appendMessage(sender: "user" | "bot", text: string): void {
            const messageDiv = document.createElement("div");
            messageDiv.className = `message ${sender === "user" ? "user-message" : "bot-message"}`;
            messageDiv.textContent = text;
            chatBox.appendChild(messageDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        // Allow sending message with Enter key
        userInput.addEventListener("keypress", (e: KeyboardEvent) => {
            if (e.key === "Enter") sendMessage();
        });