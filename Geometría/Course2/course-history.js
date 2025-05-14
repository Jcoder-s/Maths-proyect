// =========================
// ⚙️ VARIABLES GENERALES
// =========================

const numberOfContainers = 7;
const progressPerContainer = 100 / numberOfContainers;
let currentProgress = 0;
let actualContainer = 0;
let actualHint = 0;
let isFeedbackDisplayed = false;
let correctAnswerAudio = new Audio('../../Sonido de aprobado - Duolingo.mp4');
let button = document.getElementById('continueBtn');

const drawProgressSpan = document.getElementById('drawProgress');
const continueBtn = document.getElementById('continueBtn');
const arrowRightIcon = document.createElement('i');
arrowRightIcon.classList.add('fa-solid', 'fa-arrow-right');

const containers = Array.from({ length: 8 }, (_, i) =>
  document.getElementById(`container${i + 1}`)
);

const hints = Array.from({ length: 8 }, (_, i) =>
  document.getElementById(`hint${i + 1}`)
);

let congratulationsText = document.querySelector('.congratulations-text');
let timeTochangeContent = 9;
let intervalo;


const correctAnswers = {
  container4: 'A',
  container7: '12L'
};

// =========================
// ✅ INIT INTERACTIONS
// =========================

// Alternar selección en misterio 1
document.querySelectorAll('.mistery1-answer').forEach(answer =>
  answer.addEventListener('click', () => {
    document.querySelectorAll('.mistery1-answer').forEach(el => el.classList.remove('active'));
    answer.classList.toggle('active');
  })
);

// Alternar selección en opciones tipo botón
document.querySelectorAll('.send').forEach(option => {
  option.addEventListener('click', () => {
    const wasSelected = option.classList.contains('selected');

    // Quitar la clase 'selected' de todos
    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));

    // Si NO estaba seleccionada antes, agregar la clase
    if (!wasSelected) {
      option.classList.add('selected');
    }
  });
});



// =========================
// 📊 BARRA DE PROGRESO
// =========================

function increaseProgressBar() {
  if (currentProgress < 100) {
    currentProgress += progressPerContainer;
    drawProgressSpan.style.width = `${currentProgress}%`;
  }
}



// =========================
// ⏭️ AVANZAR AL SIGUIENTE EJERCICIO
// =========================

button.addEventListener('click', next)

function next() {
  const userName = document.getElementById('userName').value;
  const detectiveName = document.querySelectorAll('.detectiveName');

  if (actualContainer === 0 && userName === '') {
    alert('Por favor, ingresa tu nombre.');
    return;
  }

  // Mostrar nombre en todas partes
  detectiveName.forEach(section => (section.textContent = userName));

  // Comprobar respuestas en contenedores con ejercicios
  if ([3, 6].includes(actualContainer) && !check()) return;

  if (actualContainer == containers.length - 2) {
    button.textContent = 'Finalizar'
    button.onclick = ()=>{
      autoGoHome()
    }
  }

  if (actualContainer >= containers.length - 1){
    isLessonCompleted = true;

    const lessonId = 'gvcourse4';
    let completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
    
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      localStorage.setItem('completedLessons', JSON.stringify(completedLessons)); // ✅ guarda un array como JSON
    }

    return
  };

  containers[actualContainer].classList.remove('activeSection');
  containers[actualContainer].style.display = 'none';
  actualContainer++;
  containers[actualContainer].classList.add('activeSection');


  updateButtonText();
  increaseProgressBar();
  moveBetweenHints();
}

function updateButtonText() {
  continueBtn.innerHTML =
    actualContainer === 3 || actualContainer === 6
      ? 'Comprobar'
      : 'Siguiente <i class="fa-solid fa-arrow-right"></i>';
}

// =========================
// ✅ COMPROBACIÓN DE RESPUESTAS
// =========================

function check() {
  const feedbackContainer = document.querySelector('.feedback-image');
  const feedbackImg = document.getElementById('feedback-img');

  let selected, userAnswer;

  if (actualContainer === 3) {
    selected = document.querySelector('.mistery1-answer.active input');
    if (!selected) return alert('Por favor, selecciona una opción.'), false;

    userAnswer = selected.value;
    return handleAnswerFeedback(userAnswer, correctAnswers.container4, feedbackImg, feedbackContainer);
  }

  if (actualContainer === 6) {
    selected = document.querySelector('.problem2-answers .send.selected');
    if (!selected) return alert('Por favor, selecciona una opción.'), false;

    userAnswer = selected.value;
    return handleAnswerFeedback(userAnswer, correctAnswers.container7, feedbackImg, feedbackContainer);
  }

  return true;
}

function handleAnswerFeedback(userAnswer, correctAnswer, imgElement, containerElement) {
  if (userAnswer === correctAnswer) {
    if (!isFeedbackDisplayed) {
      imgElement.src = 'https://static.vecteezy.com/system/resources/previews/010/142/101/original/check-mark-icon-sign-symbol-design-free-png.png';
      containerElement.style.display = 'block';
      updateButtonText();
      isFeedbackDisplayed = true;
      correctAnswerAudio.play();
      return false;
    } else {
      containerElement.style.display = 'none';
      isFeedbackDisplayed = false;
      return true;
    }
  } else {
    imgElement.src = 'incorrecto.jpg';
    containerElement.style.display = 'block';
    return false;
  }
}

// =========================
// 💡 PISTAS
// =========================

function deployHints() {
  document.querySelector('.course-hints-container').classList.toggle('active');
}

function moveBetweenHints() {
  if (actualHint >= hints.length - 1) return;
  hints[actualHint].style.display = 'none';
  hints[actualHint++].style.display = 'flex';
}

