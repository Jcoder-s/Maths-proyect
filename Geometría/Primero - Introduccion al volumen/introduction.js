// =========================
// ⚙️ VARIABLES GENERALES
// =========================


let currentContainer = 0;


const correctAnswersAudio = new Audio('Sonido de aprobado - Duolingo.mp4'); // Cambia a .mp3 si .mp4 no funciona

const containers = [
    document.querySelector('.container1'),
    document.querySelector('.container2'),
    document.querySelector('.container3'),
    document.querySelector('.container4'),
    document.querySelector('.container5'),
    document.querySelector('.container6'),
    document.querySelector('.container7')
];

function increaseProgressBar() {
    if (currentProgress >= 100) return;
    currentProgress += progressPerQuestion;
    drawProgressSpan.style.width = `${currentProgress}%`;
}


const numberOfContainers = containers.length - 1;
const progressPerQuestion = 100 / numberOfContainers;
let currentProgress = 0;

const drawProgressSpan = document.getElementById('drawProgress');
const checkButton = document.getElementById('checkAnswerBtn');
const arrowRightIcon = document.createElement('i');
arrowRightIcon.classList.add('fa-solid', 'fa-arrow-right');

const feedbackContainer = document.querySelector('.feedback-image');
const feedbackImg = document.getElementById('feedback-img');

let isLessonCompleted = false;



// =========================
// Función para comprobar las respuestas
// =========================

let correctAnswers = {
    3: 'cubo',     // Respuesta correcta para container4
    4: '25 litros' // Respuesta correcta para container5
};

let checkIsCalling = false


let nextBtn = document.getElementById('checkAnswerBtn')


function nextContainer(){
  if (currentContainer == containers.length - 1) {
    const congratulationsIcon = document.getElementById('lastCheck')
    congratulationsIcon.classList.add('fa-circle-check')
    

    isLessonCompleted = true;

        const lessonId = 'gvcourse1';
        const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];

        if (!completedLessons.includes(lessonId)) {
            completedLessons.push(lessonId);
            localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
        }

    nextBtn.textContent = 'Finalizar'   
    nextBtn.onclick = ()=> autoGoHome()
    return
  }

  if (checkIsCalling) {
    return
  }

  containers[currentContainer].classList.remove('activeSection')
  containers[currentContainer].style.display = 'none'
  currentContainer++
  containers[currentContainer].classList.add('activeSection')

  if (currentContainer > 0) {
    nextBtn.innerHTML = 'Siguiente <i class="fa-solid fa-arrow-right"></i>'
  }

  if (currentContainer == 3 || currentContainer == 4) {
    nextBtn.innerHTML = 'Comprobar'
    checkIsCalling = true
    nextBtn.onclick = ()=>{
      check()
    }
  }

  increaseProgressBar()
}

let actualContainer = containers[currentContainer];

function check(){

  const selectedOption = document.querySelector('.activeSection .option.selected')
  const selectedOptionValue = selectedOption.getAttribute('data-set')

  if (selectedOption != null) {
      if (selectedOptionValue === correctAnswers[currentContainer]) {
    feedbackImg.src = 'https://static.vecteezy.com/system/resources/previews/010/142/101/original/check-mark-icon-sign-symbol-design-free-png.png'
    feedbackContainer.style.display = 'block'
    correctAnswersAudio.play()
    nextBtn.innerHTML = 'Siguiente <i class="fa-solid fa-arrow-right"></i>'
    nextBtn.onclick = ()=>{
      checkIsCalling = false
      feedbackContainer.style.display = 'none'
      nextContainer()
    }
  }else{
    feedbackImg.src = 'incorrecto.jpg'
    feedbackContainer.style.display = 'block'
  }
  }
  else{
    alert('Seleccione una opcion antes de avanzar')
  }
}


nextBtn.addEventListener('click', nextContainer)

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




  let startAnimation = document.querySelector('.start')

  startAnimation.addEventListener('click', ()=>{
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

