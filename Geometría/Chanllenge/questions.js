import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './quiz.css';

const questionsData = [
  {
    id: 1,
    title: '1. ¿Qué elementos faltan?',
    image: 'cubo.png',
    formula: 'V = ?',
    options: ['c · a', '(a² · b) / c', 'L³', 'a² + b²'],
    correctAnswers: ['L³'],
  },
  {
    id: 2,
    title: '2. ¿Qué elementos faltan?',
    image: 'ortoedro.png',
    formula: 'V = ancho · ? · ?',
    options: ['ancho', 'largo', 'diagonal', 'alto'],
    correctAnswers: ['largo', 'alto'],
  },
  {
    id: 3,
    title: '3. ¿Qué elementos faltan?',
    image: 'cilindro.png',
    formula: 'V = π · ? · ?',
    options: ['altura', 'area', 'radio²', 'generatriz'],
    correctAnswers: ['radio²', 'altura'],
  },
  {
    id: 4,
    title: '4. ¿Qué elementos faltan?',
    image: 'esfera.png',
    formula: 'V = 4( ? · ? ) / 3',
    options: ['π', 'diametro', 'radio³', 'alto'],
    correctAnswers: ['π', 'radio³'],
  },
  // Agrega más preguntas aquí
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const currentQuestion = questionsData[currentQuestionIndex];

  const handleOptionClick = (option) => {
    const isSelected = selectedOptions.includes(option);

    if (currentQuestion.correctAnswers.length === 1) {
      // Si solo se permite una opción, reemplazar la selección
      setSelectedOptions(isSelected ? [] : [option]);
    } else {
      // Si se permiten múltiples opciones
      if (isSelected) {
        setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
      } else if (selectedOptions.length < currentQuestion.correctAnswers.length) {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const handleCheck = () => {
    if (selectedOptions.length !== currentQuestion.correctAnswers.length) {
      setFeedback('Selecciona la cantidad correcta de opciones.');
      return;
    }

    const isCorrect = selectedOptions.every((option) =>
      currentQuestion.correctAnswers.includes(option)
    );

    setFeedback(isCorrect ? '¡Respuesta correcta!' : 'Respuesta incorrecta. Intenta de nuevo.');

    if (isCorrect) {
      setTimeout(() => {
        setFeedback(null);
        setSelectedOptions([]);
        if (currentQuestionIndex < questionsData.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          setFeedback('¡Completaste el quiz!');
        }
      }, 1500);
    }
  };

  return (
    <div className="quiz-container">
      {feedback && <div className="feedback">{feedback}</div>}

      {currentQuestion && (
        <div className="question">
          <h2>{currentQuestion.title}</h2>
          <div className="elements">
            <img src={currentQuestion.image} alt="Pregunta" />
            <h2>{currentQuestion.formula}</h2>
          </div>
          <div className="options">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                className={`option ${selectedOptions.includes(option) ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {!feedback || feedback === '¡Completaste el quiz!' ? (
        <div className="button-container">
          <button onClick={handleCheck}>
            {currentQuestionIndex < questionsData.length - 1 ? 'Comprobar' : 'Finalizar'}
          </button>
        </div>
      ) : null}
    </div>
  );
};

ReactDOM.render(<Quiz />, document.getElementById('root'));