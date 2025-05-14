// =========================
// ⚙️ VARIABLES GENERALES
// =========================

let correctCount = 0;
let actualContainer = 0;
let selectedOptions = [];
let selectedValue = null;
let intervalStarted = false;
let waterInterval;

let correctAnwersAudio =  new Audio('Sonido de aprobado - Duolingo.mp4');

const containers = [
    document.querySelector('.container1'),
    document.querySelector('.container2'),
    document.querySelector('.container3'),
    document.querySelector('.container4'),
    document.querySelector('.container5'),
    document.querySelector('.container6')
];

const numberOfContainers = containers.length - 1;
const progressPerQuestion = 100 / numberOfContainers;
let currentProgress = 0;

const drawProgressSpan = document.getElementById('drawProgress');
const checkButton = document.getElementById('checkAnswerBtn');
const arrowRightIcon = document.createElement('i');
arrowRightIcon.classList.add('fa-solid', 'fa-arrow-right');

let feedbackContainer = document.querySelector('.feedback-image');
let feedbackImg = document.getElementById('feedback-img');








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
// 📌 VISIBILIDAD EN SIDEBAR
// =========================

function toggleSidebarText() {
  const texts = document.querySelectorAll('.side-nav-icons-text');
  const sideNav = document.querySelector('.side-nav-container');

  sideNav.classList.toggle('increase-padding');
  texts.forEach(text => text.classList.toggle('side-nav-text-visible'));
}








// =========================
// ✏️ PIZARRA DIGITAL
// =========================

let isDrawing = false;
const canvas = document.getElementById('chalkCanvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);
window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function startDrawing(event) {
  isDrawing = true;
  draw(event);
}

function draw(event) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000';

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function closeBoard() {
  document.querySelector('.chalkBoard').style.display = 'none';
}

function deployBoard() {
  document.querySelector('.chalkBoard').style.display = 'flex';
  resizeCanvas();
}


//=========================================
// Funcion para moverse entre contenedores |
//=========================================

let moveBtn = document.getElementById('checkAnswerBtn');
let isCorrect = false;

// =========================
// Funcion para comprobar las respuestas
// =========================

let correctAnswers = ['cubo']; // Respuesta correcta para el container4

function check() {
    if (actualContainer === 3) { // Verificar si estamos en el container4
      const selectedOption = document.querySelector('.container4 .option.selected');
      if (selectedOption) {
        const selectedValue = selectedOption.getAttribute('data-set');
        if (correctAnswers.includes(selectedValue)) {
          isCorrect = true; // Respuesta correcta
          feedbackImg.src = 'https://static.vecteezy.com/system/resources/previews/010/142/101/original/check-mark-icon-sign-symbol-design-free-png.png';
          feedbackContainer.style.display = 'block';
  
          // Cambiar texto y función del botón
          moveBtn.innerHTML = 'Siguiente <i class="fa-solid fa-arrow-right"></i>';
          moveBtn.onclick = () => {
            feedbackContainer.style.display = 'none';
            moveToNextContainer();
          };
  
        } else {
          isCorrect = false;
          feedbackImg.src = 'incorrecto.jpg';
          feedbackContainer.style.display = 'block';
        }
      }else{
        alert('Seleccione una respuesta antes de avanzar')
      }
    }
  }
  

// =========================
// Funcion para moverse entre contenedores
// =========================

function nextQuestion() {
  if (actualContainer === containers.length - 1) {
    // Guardar en localStorage que la lección ha sido completada
    isLessonCompleted = true;
    const lessonId = 'gvcourse1'; // Cambia este identificador según la lección
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      localStorage.setItem('completedLessons', JSON.stringify(completedLessons)); // Guardar como JSON
    }

    // Cambiar el botón a "Finalizar"
    checkButton.textContent = 'Finalizar';
    checkButton.onclick = () => autoGoHome(); // Asegúrate de que esta función exista
    return;
  }

  // Verificar si estamos en el container4
  if (actualContainer === 3) {
    if (!isCorrect) {
      // Si la respuesta es incorrecta, no avanzar y mostrar feedback
      feedbackContainer.style.display = 'block';
      feedbackImg.src = 'incorrecto.jpg';
      return;
    } else {
      // Si la respuesta es correcta, cambiar el botón a "Siguiente"
      feedbackContainer.style.display = 'block';
      feedbackImg.src = 'https://static.vecteezy.com/system/resources/previews/010/142/101/original/check-mark-icon-sign-symbol-design-free-png.png';
      moveBtn.innerHTML = 'Siguiente <i class="fa-solid fa-arrow-right"></i>';
      moveBtn.onclick = () => {
        feedbackContainer.style.display = 'none'; // Ocultar feedback
        moveToNextContainer();
      };
      return;
    }
  }

  if (actualContainer == 4) {
    const congratulationsAnimation = document.querySelector('.congratulations-animation');
    congratulationsAnimation.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  }

  moveToNextContainer();
}

function moveToNextContainer() {
  if (actualContainer >= containers.length - 1) {
    checkButton.textContent = 'Finalizar';
    checkButton.onclick = () => autoGoHome(); // Asegúrate que esta función existe
    return;
  }

  containers[actualContainer].classList.remove('activeSection');
  actualContainer++;

  const nextContainer = containers[actualContainer];
  if (!nextContainer) return;

  nextContainer.classList.add('activeSection');

  if (actualContainer !== 0) {
    checkButton.innerHTML = 'Siguiente <i class="fa-solid fa-arrow-right"></i>';
  }

  if (actualContainer === 3) {
    checkButton.textContent = 'Comprobar';
  }


  increaseProgressBar();
}


// ==================================
// Evento para el botón de comprobar |
// ==================================

moveBtn.addEventListener('click', () => {
  if (actualContainer === 3) {
    check(); // Llamar a la función check si estamos en el container4
  } else {
    nextQuestion(); // Avanzar a la siguiente pregunta
  }
});
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




let options = document.querySelectorAll('.option');

options.forEach(option => {
    option.addEventListener('click', () => {
        // Si la opción ya tiene la clase 'selected', la quitamos (toggle)
        if (option.classList.contains('selected')) {
            option.classList.remove('selected');
        } else {
            // Quitamos la clase 'selected' de cualquier otra opción
            options.forEach(opt => opt.classList.remove('selected'));
            // Añadimos la clase 'selected' a la opción actual
            option.classList.add('selected');
        }
    });
});




  let startBtn = document.querySelector('.start')

  startBtn.addEventListener('click', ()=>{
    const cylinder = document.querySelector('.cylinder')
    const brokenCylinder = document.querySelector('.broken-cylinder')

    brokenCylinder.classList.add('active')
    cylinder.classList.add('active')

    setTimeout(() => {
      brokenCylinder.classList.remove('active')
      cylinder.classList.remove('active')
    }, 7000);
  })



  /*const div = document.querySelector('.pet');

    let offsetX, offsetY, isDragging = false;

    div.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - div.offsetLeft;
        offsetY = e.clientY - div.offsetTop;
        div.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            div.style.left = `${e.clientX - offsetX}px`;
            div.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        div.style.cursor = "grab";
    });

    let interval;

    function startInterval(){
      interval = setInterval(() => {
        console.log( div.offsetLeft, div.offsetTop)
      }, 120);
    }

    function stopInterval() {
      clearInterval(interval)
    }


    document.addEventListener('keydown', (event)=>{
      if (event.key === "s") {
        startInterval()
      }
      if (event.key === "e") {
        stopInterval()
      }
    })*/

