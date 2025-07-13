/*
    JS for the canvas in canvas.html
*/

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('click', (e) => {
  const x = e.offsetX;
  const y = e.offsetY;

  // Draw a circle where the user clicks
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fillStyle = '#28587B';
  ctx.fill();
});
