import React from 'react';
import './App.css';
import Chatbot from './components/Chatbot';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Study Assistant</h1>
                <p>Your personal AI study companion</p>
            </header>
            <main className="App-main">
                <div className="features-section">
                    <div className="feature-card">
                        <h3>📚 Subject Help</h3>
                        <p>Get explanations for any subject matter</p>
                    </div>
                    <div className="feature-card">
                        <h3>✍️ Study Tips</h3>
                        <p>Learn effective study strategies</p>
                    </div>
                    <div className="feature-card">
                        <h3>❓ Homework Help</h3>
                        <p>Get guidance on homework problems</p>
                    </div>
                </div>
                <Chatbot />
            </main>
        </div>
    );
}

export default App;
