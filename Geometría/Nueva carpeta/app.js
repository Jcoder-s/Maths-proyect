
function autoGoHome() {
    setTimeout(() => {
        window.location.href = '../Start-geometry-page/index.html';
    }, 300);
}

let startBtn = document.getElementById('start-btn');
let startSection = document.querySelector('.start-section');
startBtn.addEventListener('click', ()=>{
    startSection.style.display = 'none';
})

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

// =========================
// 📌 VISIBILIDAD EN SIDEBAR
// =========================

function toggleSidebarText() {
    const texts = document.querySelectorAll('.side-nav-icons-text');
    const sideNav = document.querySelector('.side-nav-container');
  
    sideNav.classList.toggle('increase-padding');
    texts.forEach(text => text.classList.toggle('side-nav-text-visible'));
  }
  