// =========================
// ⚙️ VARIABLES GENERALES
// =========================

let correctCount = 0;
let actualContainer = 0;
let selectedOptions = [];
let selectedValue = null;
let intervalStarted = false;
let waterInterval;

let correctAnwersAudio =  new Audio('../../Sonido de aprobado - Duolingo.mp4');


const numberOfContainers = 5;
const progressPerQuestion = 100 / numberOfContainers;
let currentProgress = 0;

const drawProgressSpan = document.getElementById('drawProgress');
const checkButton = document.getElementById('checkAnswerBtn');
const arrowRightIcon = document.createElement('i');
arrowRightIcon.classList.add('fa-solid', 'fa-arrow-right');

const containers = [
  document.getElementById('exercise1'),
  document.getElementById('exercise2'),
  document.getElementById('exercise3'),
  document.getElementById('exercise4'),
  document.getElementById('exercise5')
];

const correctAnswers = {
  1: '226',
  2: '523',
  3: ['radio²', 'altura'],
  4: '125',
  5: '375'
};

// Elementos específicos para ejercicio 5
const ortoedro = document.querySelector('.ortoedro');
const water = document.querySelector('.water');
const userAnswerInput = document.getElementById('liters');
const totalLiters = 375;


// Detectar que el curso ha sido completado
let isLessonCompleted;

// =========================
// 📊 BARRA DE PROGRESO
// =========================

function increaseProgressBar() {
  if (currentProgress >= 100) return;
  currentProgress += progressPerQuestion;
  drawProgressSpan.style.width = `${currentProgress}%`;
}



// =========================
// ✅ MANEJO DE OPCIONES
// =========================

document.querySelectorAll('.option').forEach(button => {
  button.addEventListener('click', () => {
    const current = containers[actualContainer];

    if (actualContainer === 2) {
      // Selección múltiple (Ejercicio 3)
      if (button.classList.contains('active')) {
        button.classList.remove('active');
        selectedOptions = selectedOptions.filter(val => val !== button.value);
      } else if (selectedOptions.length < 2) {
        button.classList.add('active');
        selectedOptions.push(button.value);
      }

      document.getElementById('span1').textContent = selectedOptions[0] || '';
      document.getElementById('span2').textContent = selectedOptions[1] || '';

    } else {
      // Selección única
      document.querySelectorAll('.option').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      selectedValue = button.value;

      const valueSpans = current.querySelectorAll('.value');
      valueSpans.forEach(span => span.textContent = `${selectedValue} cm³`);
    }
  });
});

// =========================
// ✅ VERIFICACIÓN DE RESPUESTAS
// =========================

function check() {
  const feedbackImgContainer = document.querySelector('.feedback-image');
  const feedbackImg = document.getElementById('feedback-img');
  const currentContainerNumber = actualContainer + 1;

  feedbackImgContainer.style.display = 'block';

  if (actualContainer === 2) {
    // Verificación para selección múltiple
    if (selectedOptions.length !== 2) {
      alert('Selecciona dos opciones antes de continuar');
      feedbackImgContainer.style.display = 'none';
      return;
    }

    const correct = correctAnswers[3];
    const isCorrect = correct.every(val => selectedOptions.includes(val));

    feedbackImg.src = isCorrect
      ? 'https://static.vecteezy.com/system/resources/previews/010/142/101/original/check-mark-icon-sign-symbol-design-free-png.png'
      : 'incorrecto.jpg';

    if (isCorrect){ 
      correctCount++;
      correctAnwersAudio.play();
    }

  } else {
    // Verificación para selección única
    if (!selectedValue) {
      alert('Selecciona una opción antes de continuar');
      feedbackImgContainer.style.display = 'none';
      return;
    }

    const correct = correctAnswers[currentContainerNumber];
    const isCorrect = selectedValue === correct;

    feedbackImg.src = isCorrect
      ? 'https://static.vecteezy.com/system/resources/previews/010/142/101/original/check-mark-icon-sign-symbol-design-free-png.png'
      : 'incorrecto.jpg';

    if (isCorrect){
       correctCount++;
       correctAnwersAudio.play();
    }
  }


  // Cambiar a botón "Siguiente"
  checkButton.textContent = `Siguiente`;
  checkButton.appendChild(arrowRightIcon);
  checkButton.onclick = nextQuestion;
}

// =========================
// ⏭️ AVANZAR AL SIGUIENTE EJERCICIO
// =========================

function nextQuestion() {
  if (actualContainer >= containers.length - 1) {
    increaseProgressBar();
    containers[actualContainer].style.display = 'none';
    document.querySelector('.feedback-image').style.display = 'none';

    const finalSummary = document.getElementById('final-summary');
    const correctText = document.getElementById('correct-count-text');
    correctText.textContent = `Respondiste correctamente ${correctCount} de ${containers.length} preguntas.`;
    finalSummary.style.display = 'block';

    if (actualContainer === containers.length - 1) {
      isLessonCompleted = true;
      autoGoHome();

      // Guardar en localStorage que la lección ha sido completada
      const lessonId = 'gvcourse3'; // Cambia este identificador según la lección
      const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons)); // Guardar como JSON
      }
    }

    checkButton.style.display = 'none';
    return;
  }

  // Preparar siguiente ejercicio
  containers[actualContainer].classList.remove('activeSection');
  containers[actualContainer].style.display = 'none';
  actualContainer++;
  containers[actualContainer].classList.add('activeSection');

  document.querySelector('.feedback-image').style.display = 'none';
  selectedValue = null;
  selectedOptions = [];

  document.querySelectorAll('.option').forEach(b => b.classList.remove('active'));
  ['span1', 'span2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });

  const valueSpans = containers[actualContainer].querySelectorAll('.value');
  valueSpans.forEach(span => span.textContent = '');

  checkButton.textContent = `Comprobar`;
  checkButton.onclick = check;

  increaseProgressBar();
  startWaterIntervalIfNeeded();
  moveBetweenHints();
}

// =========================
// 💧 EJERCICIO 5 - NIVEL DE AGUA
// =========================

function startWaterIntervalIfNeeded() {
  if (actualContainer === 4 && !intervalStarted) {
    intervalStarted = true;

    waterInterval = setInterval(() => {
      const input = parseFloat(userAnswerInput.value);
      const percentage = (input / totalLiters) * 100;

      if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
        water.style.height = `${percentage}%`;
      }
      if (input > totalLiters) {
        percentage = 0;
      }

      if (input === totalLiters) {
        clearInterval(waterInterval);

        // ✅ Contar como respuesta correcta
        correctCount++;
        correctAnwersAudio.play();

        // ✅ Mostrar imagen de respuesta correcta
        const feedbackImgContainer = document.querySelector('.feedback-image');
        const feedbackImg = document.getElementById('feedback-img');
        feedbackImg.src = 'https://static.vecteezy.com/system/resources/previews/010/142/101/original/check-mark-icon-sign-symbol-design-free-png.png';
        feedbackImgContainer.style.display = 'block';

        // ✅ Cambiar botón a "Siguiente"
        checkButton.innerHTML = `Siguiente<i class="fa-solid fa-arrow-right"></i>`;
        checkButton.onclick = nextQuestion;
      }
    }, 500);
  }
}



// =========================
// 💡 PISTAS
// =========================

function deployHints() {
  document.querySelector('.course-hints-container').classList.toggle('active');
}

let hints = [
  document.getElementById('primero'),
  document.getElementById('segundo'),
  document.getElementById('tercero'),
  document.getElementById('cuarto'),
  document.getElementById('quinto')
];
let actualHint = 0;


function moveBetweenHints(){
  if (actualHint >= hints.length){
      return
  }

  hints[actualHint].style.display = 'none';
  actualHint++
  hints[actualHint].style.display = 'flex';
};


// ====================================
// Barra de progreso de regreso a casa
//=====================================

/*let progress = 0;
let goHomeCharger = document.querySelector('.go-home-charger');
let loadCircle = document.querySelector('.load-circle');

const interval = setInterval(() => {
  progress++;

  goHomeCharger.style.background = `conic-gradient(#fff ${progress * 3.6}deg, #e0e0e0 ${progress * 3.6}deg)`;

  if (progress >= 100) {
    clearInterval(interval);
  }
}, 50);*/


