import React from 'react';
import './App.css';
import Chatbot from './components/Chatbot';
import StudyGoals from './components/StudyGoals';
import QuizGenerator from './components/QuizGenerator';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Student Assistant</h1>
            </header>
            <main className="App-main">
                <div className="app-content">
                    <Chatbot />
                    <StudyGoals />
                    <QuizGenerator />
                </div>
            </main>
        </div>
    );
}

export default App;
