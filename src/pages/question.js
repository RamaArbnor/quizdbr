import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function QuestionPage({ question, onAnswer, onNext, onPrevious, currentQuestionIndex, totalQuestions }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const navigate = useNavigate();

  // Reset selected answer when the question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, [question]);

  const handleAnswerSelect = (key) => {
    setSelectedAnswer(key);
    const correct = key === question.correct_answer;
    setIsCorrect(correct);
    onAnswer(correct);
  };

  return (
    <div className="question-container">
      <button 
        className="back-button"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
      <h1 className="question-title">Question {currentQuestionIndex + 1} of {totalQuestions}</h1>
      <p className="question-text">{question.question}</p>
      
      <div className="answer-container">
        {Object.entries(question.answers).map(([key, value]) => (
          <button
            key={key}
            className={`answer-button ${selectedAnswer === key ? 'selected' : ''}`}
            onClick={() => handleAnswerSelect(key)}
          >
            {key}: {value}
          </button>
        ))}
      </div>

      {isCorrect !== null && (
        <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? 'Correct!' : 'Incorrect. Try again!'}
        </div>
      )}

      <div className="navigation-buttons">
        <button 
          className="nav-button"
          onClick={onPrevious} 
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button 
          className="nav-button"
          onClick={onNext} 
          disabled={currentQuestionIndex === totalQuestions - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default QuestionPage;
