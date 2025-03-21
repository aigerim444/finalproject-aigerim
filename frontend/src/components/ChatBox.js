import React, { useState, useRef, useEffect } from "react";

const ChatBox = () => {
    const [messages, setMessages] = useState([]); // Stores chat messages
    const [input, setInput] = useState(""); // Tracks user input
    const chatWindowRef = useRef(null);

    // new //Scroll to the bottom of the chat window when new messages are added
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input) return; // Don't send empty messages

        // Add user message to the chat
        setMessages([...messages, { user: input }]);

        try {
            // Send the message to the backend
            const response = await fetch("http://127.0.0.1:5000/api/get_response", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });
            const data = await response.json();

            // Add the bot's response to the chat
            setMessages([...messages, { user: input }, { bot: data.response }]);
        } catch (error) {
            console.error("Error:", error);
        }

        setInput(""); // Clear input field
    };

    return (
        <div>
            <div style={{ height: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p><strong>{msg.user ? "You" : "Bot"}:</strong> {msg.user || msg.bot}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                style={{ width: "70%", padding: "10px" }}
            />
            <button onClick={sendMessage} style={{ padding: "10px 20px" }}>Send</button>
        </div>
    );
};

export default ChatBox;
