import React from 'react';
import './App.css';
import Chatbot from './components/Chatbot';
import StudyGoals from './components/StudyGoals';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Educational Assistant</h1>
                <p>Your personal study assistant</p>
            </header>
            <main className="App-main">
                <Chatbot />
                
            </main>
        </div>
    );
}

export default App;
