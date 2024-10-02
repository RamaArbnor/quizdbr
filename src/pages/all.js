import React, { useState, useRef } from 'react';
import Question from '../pages/question';
import parsedQuestions from '../questions/parsed_questions.json';

// Assuming the JSON file contains an array of questions
const questions = parsedQuestions.questions || parsedQuestions;

function All() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questionRef = useRef(null);

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
    // Smooth scroll to the question
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : questions.length - 1
    );
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => 
      prevIndex < questions.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="all-questions-container">
      <h1 className="all-questions-title">All Questions</h1>
      
      <div className="question-grid">
        {questions.map((_, index) => (
          <button
            key={index}
            className={`question-button ${index === currentQuestionIndex ? 'active' : ''}`}
            onClick={() => handleQuestionClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div ref={questionRef}>
        {questions.length > 0 && (
          <Question
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
      </div>

      {/* <div className="all-navigation-buttons">
        <button onClick={handlePrevious} className="all-nav-button">
          Previous
        </button>
        <button onClick={handleNext} className="all-nav-button">
          Next
        </button>
      </div> */}
    </div>
  );
}

export default All;
