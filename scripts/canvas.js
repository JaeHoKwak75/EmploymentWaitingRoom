/*
    JS for the canvas in canvas.html
*/
let canvas, ctx;
let activeTool;
let drawings = [];

window.onload = function () {
	canvas = document.getElementById('main_canvas');
	ctx = canvas.getContext("2d");

	canvas.width = window.innerWidth / 2;
	canvas.height = window.innerHeight / 2;

	activeTool = new Line(ctx, canvas);
	activeTool.init();

	document.getElementById("btn_undo").addEventListener("click", undo);
	document.getElementById("btn_reset").addEventListener("click", resetCanvas);
};

function resetCanvas() {
	drawings = [];
	redrawCanvas();
}

function redrawCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (const drawing of drawings) {
		if (drawing.type == "line") {
			ctx.beginPath();
			ctx.moveTo(drawing.x1, drawing.y1);
			ctx.lineTo(drawing.x2, drawing.y2);
			ctx.strokeStyle = "#28587B";
			ctx.lineWidth = 2;
			ctx.stroke();
		}
	}
}

function undo() {
	drawings.pop();
	redrawCanvas();
}