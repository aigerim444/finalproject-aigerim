import React, { useState } from 'react';
import './App.css';
import Chatbot from './components/Chatbot';
import StudyGoals from './components/StudyGoals';
import QuizGenerator from './components/QuizGenerator';

function App() {
    const [activeTab, setActiveTab] = useState(null);

    const renderWelcomeScreen = () => (
        <div className="welcome-screen">
            <h1>Hi! 👋</h1>
            <h2>How would you like to learn today?</h2>
            <div className="feature-cards">
                <button 
                    className="feature-card"
                    onClick={() => setActiveTab('chat')}
                >
                    <i className="fas fa-comments"></i>
                    <h3>Chat Assistant</h3>
                    <p>Get help with your questions</p>
                </button>
                <button 
                    className="feature-card"
                    onClick={() => setActiveTab('quiz')}
                >
                    <i className="fas fa-question-circle"></i>
                    <h3>Quiz Generator</h3>
                    <p>Test your knowledge</p>
                </button>
                <button 
                    className="feature-card"
                    onClick={() => setActiveTab('goals')}
                >
                    <i className="fas fa-bullseye"></i>
                    <h3>Study Goals</h3>
                    <p>Track your progress</p>
                </button>
            </div>
        </div>
    );

    return (
        <div className="App">
            <header className="App-header">
                <div className="header-content">
                    <h1>Study Assistant</h1>
                    {activeTab && (
                        <button 
                            className="back-button"
                            onClick={() => setActiveTab(null)}
                        >
                            <i className="fas fa-arrow-left"></i>
                            Back to Home
                        </button>
                    )}
                </div>
            </header>

            <main className="App-main">
                <div className="app-content">
                    {!activeTab && renderWelcomeScreen()}
                    {/* based on what the user clicks, set the active tab to that and render component */}
                    {activeTab === 'chat' && <Chatbot />}
                    {activeTab === 'quiz' && <QuizGenerator />}
                    {activeTab === 'goals' && <StudyGoals />}
                </div>
            </main>
        </div>
    );
}

export default App;
