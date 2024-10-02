import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import questions from '../questions/parsed_questions.json';
import QuestionPage from './question';

export default function Quiz() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Shuffle and select 45 random questions
    const shuffled = questions.sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, 45));
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prevQuestion => prevQuestion - 1);
    }
  };

  const calculatePercentage = useCallback(() => {
    return ((score / quizQuestions.length) * 100).toFixed(2);
  }, [score, quizQuestions.length]);

  const isPassing = useCallback(() => {
    return calculatePercentage() >= 70;
  }, [calculatePercentage]);

  useEffect(() => {
    if (quizFinished) {
      // You can add any additional logic here when the quiz is finished
      console.log('Quiz finished');
      console.log('Score:', score);
      console.log('Passing:', isPassing());
    }
  }, [quizFinished, score, isPassing]);

  if (quizQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  if (quizFinished) {
    return (
      <div>
        <h1>Quiz Finished</h1>
        <p>Your score: {score} out of {quizQuestions.length}</p>
        <p>Percentage: {calculatePercentage()}%</p>
        <p>{isPassing() ? 'Congratulations! You passed!' : 'Sorry, you did not pass.'}</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <QuestionPage
      question={quizQuestions[currentQuestion]}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrevious={handlePrevious}
      currentQuestionIndex={currentQuestion}
      totalQuestions={quizQuestions.length}
    />
  );
}
