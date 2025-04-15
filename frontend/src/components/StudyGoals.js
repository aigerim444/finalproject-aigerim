import React, { useState } from 'react';
import './StudyGoals.css';

function StudyGoals() {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');

    const addGoal = (e) => {
        e.preventDefault();
        if (newGoal.trim()) {
            setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }]);
            setNewGoal('');
        }
    };

    const toggleGoal = (id) => {
        setGoals(goals.map(goal => 
            goal.id === id ? { ...goal, completed: !goal.completed } : goal
        ));
    };

    const deleteGoal = (id) => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    return (
        <div className="goals-container">
            <div className="goals-header">
                <h2>Study Goals</h2>
            </div>
            
            <div className="goals-list">
                {goals.map(goal => (
                    <div key={goal.id} className={`goal-item ${goal.completed ? 'completed' : ''}`}>
                        <div className="goal-content">
                            <input
                                type="checkbox"
                                checked={goal.completed}
                                onChange={() => toggleGoal(goal.id)}
                                className="goal-checkbox"
                            />
                            <span className="goal-text">{goal.text}</span>
                        </div>
                        <button 
                            onClick={() => deleteGoal(goal.id)}
                            className="delete-button"
                            aria-label="Delete goal"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <form onSubmit={addGoal} className="goals-input-form">
                <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder="Add a new goal..."
                    className="goals-input"
                />
                <button 
                    type="submit" 
                    className="goals-add-button"
                    disabled={!newGoal.trim()}
                >
                    Add
                </button>
            </form>
        </div>
    );
}

export default StudyGoals;