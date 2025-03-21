import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // auto scrolling function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // whenever [messages] changes, effect runs (screen scrolls)

  const handleSubmit = async (e) => { //when form is submitted
    e.preventDefault();
    if (!inputMessage.trim()) return; //can't have empty input

    const userMessage = inputMessage.trim(); //get rid of whitespace at end
    setInputMessage(''); //clean input field
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]); //user message added to chat
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/get_response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      // adding the bot's response to the chat
      setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: 'Sorry, I encountered an error. Please try again.', 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Educational Assistant</h2>
   
      </div>
    {/* div container for all msgs. use two diff classes depending on user msg or bot msg*/ }
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {/* one class for actual content formatting*/ }
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chatbot-input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a question..."
          className="chatbot-input"
          disabled={isLoading} //disable input while waiting for respond
        />
        <button 
          type="submit" 
          className="chatbot-send-button"
          disabled={isLoading || !inputMessage.trim()} //button disabled when processing a request or if input is empty
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot; 