// Variables globales
let correctAnswers = {
    0: ['L³'], // Primera pregunta: solo una opción
    1: ['largo', 'alto'], // Segunda pregunta: dos opciones
    2: ['radio²', 'altura'], // Tercera pregunta: dos opciones
    3: ['π', 'radio³'], // Cuarta pregunta: dos opciones
    4: ['radio²', 'altura'],
    5: ['altura', '3'],
    6: ['area basal', '3']

};

let actualQuestion = 0;
let sections = document.querySelectorAll('.section');
let checkBtn = document.getElementById('check-btn');
let feedbackContainer = document.querySelector('.feedback-image');
let feedbackImage = document.getElementById('feedback-img');

// Función para manejar la selección de opciones
sections.forEach((section, index) => {
    let options = section.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            let selectedOptions = section.querySelectorAll('.option.selected');
            if (index === 0 && selectedOptions.length >= 1) {
                // Primera pregunta: solo una opción permitida
                selectedOptions.forEach(opt => opt.classList.remove('selected'));
            } else if (index > 0 && selectedOptions.length >= 2 && !option.classList.contains('selected')) {
                // Otras preguntas: máximo dos opciones permitidas
                return;
            }
            option.classList.toggle('selected');
            updateSelectedSpans(section);
        });
    });
});

// Actualiza los spans con la clase user-selected-option
function updateSelectedSpans(section) {
    let selectedOptions = section.querySelectorAll('.option.selected');
    let spans = section.querySelectorAll('.user-selected-option');
    spans.forEach((span, index) => {
        span.textContent = selectedOptions[index] ? selectedOptions[index].value : '?';
    });
}

// Función para verificar la respuesta
function check() {
    let currentSection = sections[actualQuestion];
    let selectedOptions = Array.from(currentSection.querySelectorAll('.option.selected')).map(opt => opt.value);

    // Validar si la cantidad de opciones seleccionadas es correcta
    if (selectedOptions.length !== correctAnswers[actualQuestion].length) {
        alert('Selecciona la cantidad correcta de opciones.');
        return;
    }

    // Verificar si las respuestas son correctas
    let isCorrect = selectedOptions.every(option => correctAnswers[actualQuestion].includes(option));

    // Mostrar retroalimentación
    feedbackContainer.style.display = 'block';
    feedbackImage.src = isCorrect
        ? 'https://static.vecteezy.com/system/resources/previews/010/142/101/original/check-mark-icon-sign-symbol-design-free-png.png'
        : 'incorrecto.jpg';

    if (isCorrect) {
        checkBtn.textContent = 'Siguiente';
        checkBtn.onclick = nextQuestion;
    } else {
        alert('Respuesta incorrecta. Intenta de nuevo.');
        feedbackContainer.style.display = 'none'; // Ocultar retroalimentación si es incorrecto
    }
}

// Función para pasar a la siguiente pregunta
function nextQuestion() {
    feedbackContainer.style.display = 'none';
    sections[actualQuestion].style.display = 'none';

    actualQuestion++;
    if (actualQuestion < sections.length) {
        sections[actualQuestion].style.display = 'flex';
        checkBtn.textContent = 'Comprobar';
        checkBtn.onclick = check;
    } else {
        showFinalSummary();
    }
}

// Muestra el resumen final
function showFinalSummary() {
    document.querySelector('.content').style.display = 'none';
    document.getElementById('final-summary').style.display = 'block';
}

// Inicializar el botón
checkBtn.addEventListener('click', check);

let startBtn = document.getElementById('start-btn');
let startSection = document.querySelector('.start-section');
startBtn.addEventListener('click', ()=>{
    startSection.style.display = 'none';
})


//------------------
// Side nav toggle |
//------------------

let faArrowRiLef = document.querySelector('.fa-arrow-right-arrow-left');
let sideNav = document.querySelector('.side-nav-container');

faArrowRiLef.addEventListener('click', () => {
    sideNav.classList.toggle('toggle');
})