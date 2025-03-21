import React from 'react';
import './App.css';
import Chatbot from './components/Chatbot';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Study Assistant</h1>
                <p>Your personal study assistant</p>
            </header>
            <main className="App-main">
                <Chatbot />
            </main>
        </div>
    );
}

export default App;
