// =========================
// ⚙️ VARIABLES GENERALES
// =========================

const numberOfContainers = 7;
const progressPerContainer = 100 / numberOfContainers;
let currentProgress = 0;
let actualHint = 0;
let isFeedbackDisplayed = false;



const drawProgressSpan = document.getElementById('drawProgress');
const continueBtn = document.getElementById('continueBtn');
const arrowRightIcon = document.createElement('i');
arrowRightIcon.classList.add('fa-solid', 'fa-arrow-right');
let feedbackContainer = document.querySelector('.feedback-image');
let feedbackImage = document.getElementById('feedback-img');
let btn = document.getElementById('continueBtn');

let containers = [
    document.getElementById('container1'),
    document.getElementById('container2'),
    document.getElementById('container3'),
    document.getElementById('container4'),
    document.getElementById('container5'),
    document.getElementById('container6'),
];
let actualContainer = 0;
let boolVariable = false;


let correctAnswers = [
    24.3, '56.25dm³', '45cm³', '5.18dm³'
];

let options =document.querySelectorAll('.option');

options.forEach(option => {
    option.addEventListener('click', () => {
      const wasSelected = option.classList.contains('active');
  
      document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
  
      if (!wasSelected) {
        option.classList.add('active');
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

/*Contenido - ejercicios*/

function check() {
  let isCorrect = false;

  const currentContainer = containers[actualContainer];

  // CASO 1: INPUT DE TIPO TEXTO/NÚMERO
  const inputField = currentContainer.querySelector('input[type="number"], input[type="text"]');
  if (inputField) {
    const inputValue = inputField.value.trim();
    const correctAnswer = String(correctAnswers[actualContainer]).trim();
    if (inputValue === correctAnswer) {
      isCorrect = true;
    }

    // CASO 2: OPCIONES TIPO BOTÓN
  } else if (actualContainer === 4) {
    // Verificar si el valor de shapeVolume es igual a 1500
    const shapeVolume = parseFloat(document.querySelector('.shape-volume').textContent);
    if (shapeVolume === 1500) {
      isCorrect = true;
    }
  } else {
    const selectedOption = currentContainer.querySelector('.option.active');
    if (selectedOption) {
      const selectedValue = selectedOption.value.trim();
      const correctAnswer = String(correctAnswers[actualContainer]).trim();
      if (selectedValue === correctAnswer) {
        isCorrect = true;
      }
    }
  }

  // Mostrar feedback visual
  feedbackContainer.style.display = 'block';

  if (isCorrect) {
    feedbackImage.src = 'https://static.vecteezy.com/system/resources/previews/010/142/101/original/check-mark-icon-sign-symbol-design-free-png.png';
    btn.innerHTML = 'Siguiente <i class="fa-solid fa-arrow-right"></i>';
    btn.onclick = () => {
      next();
    };
  } else {
    feedbackImage.src = 'incorrecto.jpg';
    btn.innerHTML = 'Comprobar';
    btn.onclick = check;
  }
}

function next() {
    if (actualContainer >= containers.length - 1) return;

    feedbackContainer.style.display = 'none';

    containers[actualContainer].classList.remove('activeSection');
    containers[actualContainer].style.display = 'none';
    actualContainer++;
    containers[actualContainer].classList.add('activeSection');

    // 🧼 Reset botón
    btn.innerHTML = 'Comprobar';
    btn.onclick = check;

    increaseProgressBar();

    if (actualContainer === 4) {
      startAnimation();
    }

    if (actualContainer === containers.length - 1) {
      isLessonCompleted = true;


      // Guardar en localStorage que la lección ha sido completada
      const lessonId = 'course4'; // Cambia este identificador según la lección
      const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons)); // Guardar como JSON
      }
    }
    // Llamar a la función cuando el usuario esté en el container6
    if (actualContainer === 5) {
      handleContainer6();
    }

}


//==============
// Ejercicio 5 |
//==============
 let interval;

 function startAnimation() {
  interval = setInterval(() => {
    const e5Height = editableImg.offsetHeight * 0.1;
    const e5HeightText = document.querySelector('.editable-height').textContent = `${e5Height.toFixed(2)}`;

    const shapeVolume = document.querySelector('.shape-volume').textContent = e5Height.toFixed(2) * 50;

    // Pausa especial si e5Height es igual a 30.00
    if (e5Height.toFixed(2) === "30.00") {
      clearInterval(interval); // Detener el intervalo
      setTimeout(() => {
        startAnimation(); // Reanudar el intervalo después de 2 segundos
      }, 5000); // Pausa de 2 segundos
    }

  }, 400);
}

let editableImg = document.querySelector(".editable-img");
const resizer = document.getElementById("resizer");

let isResizing = false;
let lastHeight = 0; // Para rastrear la última altura establecida

resizer.addEventListener("mousedown", (e) => {
  isResizing = true;
  document.body.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isResizing) return;

  const rect = editableImg.getBoundingClientRect();
  const newHeight = rect.bottom - e.clientY;

  // Limitar la altura entre 50px y 330px
  if (newHeight >= 158 && newHeight <= 330) {
    // Verificar si la nueva altura es un múltiplo de 10
    if (Math.abs(newHeight - lastHeight) >= 10) {
      // Pausar un poco cuando se alcanza un múltiplo de 10
      setTimeout(() => {
        editableImg.style.height = newHeight + "px";
        lastHeight = newHeight; // Actualizar la última altura
      }, 200); // Pausa de 200ms
    } else {
      editableImg.style.height = newHeight + "px";
    }
  }
});

document.addEventListener("mouseup", () => {
  isResizing = false;
  document.body.style.cursor = "default";
});

// =========================
// Función para manejar la lógica del container6
// =========================
function handleContainer6() {
  const options = document.querySelectorAll('#container6 .option');
  const valueSpans = document.querySelectorAll('#container6 .selected-options-container .value');
  const resultSpan = document.querySelector('#container6 .selected-options-container .result');

  let selectedValues = [];

  options.forEach(option => {
    option.addEventListener('click', () => {
      const value = parseInt(option.value);

      // Si la opción ya está seleccionada, la deseleccionamos
      if (selectedValues.includes(value)) {
        selectedValues = selectedValues.filter(v => v !== value);
        option.classList.remove('active');
      } else if (selectedValues.length < 3) {
        // Si no está seleccionada y hay menos de 3 seleccionadas, la añadimos
        selectedValues.push(value);
        option.classList.add('active');
      }

      // Actualizar los spans con las clases value1, value2, value3
      valueSpans.forEach((span, index) => {
        if (selectedValues[index] !== undefined) {
          span.textContent = selectedValues[index];
          span.classList.add('selected'); // Añadir la clase selected
        } else {
          span.textContent = '';
          span.classList.remove('selected'); // Quitar la clase selected si no hay contenido
        }
      });

      // Calcular el resultado y actualizar el span result
      if (selectedValues.length === 3) {
        const result = selectedValues.reduce((acc, val) => acc * val, 1);
        resultSpan.textContent = result;

        // Verificar si el resultado es correcto
        if (result === 105) {
          markAsCorrect();
        }
      } else {
        resultSpan.textContent = ''; // Limpiar el resultado si no hay 3 valores seleccionados
      }
    });
  });
}

// Función para marcar como correcto
function markAsCorrect() {
  feedbackContainer.style.display = 'block';
  feedbackImage.src = 'https://static.vecteezy.com/system/resources/previews/010/142/101/original/check-mark-icon-sign-symbol-design-free-png.png';
  btn.innerHTML = 'Siguiente <i class="fa-solid fa-arrow-right"></i>';
  btn.onclick = () => {
    next();
  };
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
  hints[++actualHint].style.display = 'flex';
}


