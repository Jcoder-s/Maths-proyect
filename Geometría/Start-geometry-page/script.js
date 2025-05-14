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

window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  if (window.scrollY > window.innerHeight * 0.65) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


//==========
// Side bar |
//==========


const $hamburgerIcon = document.querySelector('.hamburger')
const $sideBar = document.querySelector('.side-bar')
$hamburgerIcon.addEventListener('click', ()=>{
  $sideBar.classList.toggle('active')
})

//Estilos para la seccion activa del side bar

$sideBar.addEventListener('click', (e) => {
  if (e.target.matches('.side-bar-rel')) {
    document.querySelectorAll('.side-bar-rel.active').forEach(el =>
      el.classList.remove('active')
    );
    e.target.classList.add('active');
  }
});
