/*
    JS for the canvas in canvas.html
*/

const canvas = document.getElementById("frameCanvas");
const ctx = canvas.getContext("2d");

let points = [];

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (points.length < 2) {
    points.push({ x, y });
  }

  if (points.length === 2) {
    drawFrame(points[0], points[1]);
  }
});

function drawFrame(p1, p2) {
  const width = Math.abs(p2.x - p1.x);
  const height = Math.abs(p2.y - p1.y);

  const startX = Math.min(p1.x, p2.x);
  const startY = Math.min(p1.y, p2.y);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#28587B";
  ctx.lineWidth = 2;
  ctx.strokeRect(startX, startY, width, height);

  // Show output
  const output = document.getElementById("output");
  const total = 2 * (width + height);
  output.innerHTML = `
    Width: ${width.toFixed(2)} px<br>
    Height: ${height.toFixed(2)} px<br>
    Total Perimeter (Extrusion): ${total.toFixed(2)} px
  `;
}
