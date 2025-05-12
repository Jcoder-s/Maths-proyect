document.addEventListener('DOMContentLoaded', () => {
  const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];

  completedLessons.forEach(lessonId => {
    const lessonElement = document.querySelector(`[data-lesson-id="${lessonId}"]`);
    if (lessonElement) {
      lessonElement.classList.add('completed');
      lessonElement.querySelector('.lesson-status').innerHTML = '<i class="fas fa-check"></i>';
    }
  });
});


//==================================
// Animacion de scroll para el hero
//==================================

window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const h1 = hero.querySelector('h1');
  const scrollY = window.scrollY;

  // Reducir la velocidad del crecimiento del texto
  let newSize = Math.min(5 + scrollY * 0.008, 6.5); // Cambio más lento
  h1.style.fontSize = `${newSize}rem`;

});

