import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom'; 

function App() {
  
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Databricks Machine Learning</h1>
        <div className="options-container">
          <button className="option-button" onClick={() => navigate('/quiz')}>Take a Quiz</button>
          <button className="option-button">All Questions</button>
        </div>
      </header>
    </div>
  );
}

export default App;
