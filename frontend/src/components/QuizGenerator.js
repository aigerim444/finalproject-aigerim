import React, { useState } from 'react';
import './QuizGenerator.css';

function QuizGenerator() {
    const [file, setFile] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError('');
        } else {
            setError('Please upload a PDF file');
            setFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a PDF file');
            return;
        }

        setLoading(true);
        setError('');
        setCurrentQuestionIndex(0);
        setShowAnswer(false);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/api/generate-quiz', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to generate quiz');
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setQuestions(JSON.parse(data.response).questions);
        } catch (err) {
            setError('Error generating quiz. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setShowAnswer(false);
        }
    };

    const previousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            setShowAnswer(false);
        }
    };

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    return (
        <div className="quiz-generator">
            <div className="quiz-header">
                <h2>Generate Quiz from Notes</h2>
                
                <form onSubmit={handleSubmit} className="upload-form">
                    <div className="file-input-container">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="file-input"
                        />
                        <button 
                            type="submit" 
                            disabled={!file || loading}
                            className="generate-button"
                        >
                            {loading ? 'Generating...' : 'Generate Quiz'}
                        </button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>

            {questions.length > 0 && (
                <div className="flashcard-container">
                    <div className="progress-indicator">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </div>
                    
                    <div className="flashcard" onClick={toggleAnswer}>
                        {!showAnswer ? (
                            <div className="question-side">
                                <p className="question-text">
                                    {questions[currentQuestionIndex].question}
                                </p>
                                <p className="tap-hint">(Tap to see answer)</p>
                            </div>
                        ) : (
                            <div className="answer-side">
                                <div className="options-list">
                                    {questions[currentQuestionIndex].options.map((option, index) => (
                                        <div 
                                            key={index}
                                            className={`option ${option.isCorrect ? 'correct' : ''}`}
                                        >
                                            {option.text}
                                            {option.isCorrect && <span className="correct-indicator">✓</span>}
                                        </div>
                                    ))}
                                </div>
                                <p className="tap-hint">(Tap for question)</p>
                            </div>
                        )}
                    </div>

                    <div className="navigation-buttons">
                        <button 
                            onClick={previousQuestion}
                            disabled={currentQuestionIndex === 0}
                            className="nav-button"
                        >
                            ← Previous
                        </button>
                        <button
                            onClick={nextQuestion}
                            disabled={currentQuestionIndex === questions.length - 1}
                            className="nav-button"
                        >
                            Next →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuizGenerator;