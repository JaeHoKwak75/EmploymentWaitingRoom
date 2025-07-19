/*
    JS for the canvas in canvas.html
*/
let canvas, ctx;
let activeTool;

window.onload = function () {
	canvas = document.getElementById('main_canvas');
	ctx = canvas.getContext("2d");

	canvas.width = window.innerWidth / 2;
	canvas.height = window.innerHeight / 2;

	activeTool = new Line(ctx, canvas);
	activeTool.init();

	document.getElementById("btn_reset").addEventListener("click", resetCanvas);
};

function resetCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	document.getElementById("output").innerHTML = "";

	if (typeof activeTool.reset === "function") {
		activeTool.reset();
	}
}

class Line {
	#ctx;
	#canvas;
	#isDrawing;
	#x1;
	#y1;
	#x2;
	#y2;

	constructor(ctx, canvas) {
		this.#ctx = ctx;
		this.#canvas = canvas;
		this.#isDrawing = false;
	}

	init() {
		this.#canvas.addEventListener("mousedown", (event) => this.#startDraw(event));
		this.#canvas.addEventListener("mouseup", (event) => this.#endDraw(event));
		this.#canvas.addEventListener("mousemove", (event) => this.#previewLine(event));
	}

	#startDraw(event) {
		const { x, y } = this.#getMousePos(event);
		this.#x1 = x;
		this.#y1 = y;
		this.#isDrawing = true;

		// Initialize with zero-length (or wait until mousemove if preferred)
		document.getElementById("output").innerHTML = `Length: 0.00 px`;
	}

	#endDraw(event) {
		if (!this.#isDrawing) return;

		const { x, y } = this.#getMousePos(event);
		this.#x2 = x;
		this.#y2 = y;
		this.#isDrawing = false;

		this.#drawFinalLine();
	}

	#previewLine(event) {
		if (!this.#isDrawing) return;

		const { x, y } = this.#getMousePos(event);

		// Clear canvas
		this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

		// Draw preview line
		this.#ctx.beginPath();
		this.#ctx.moveTo(this.#x1, this.#y1);
		this.#ctx.lineTo(x, y);
		this.#ctx.strokeStyle = "#7F7CAF";
		this.#ctx.lineWidth = 1;
		this.#ctx.setLineDash([5, 5]);
		this.#ctx.stroke();
		this.#ctx.setLineDash([]);

		// Live length update
		const length = getDistance(this.#x1, this.#y1, x, y);
		document.getElementById("output").innerHTML = `Length: ${length.toFixed(2)} px`;
	}

	#drawFinalLine() {
		this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
		this.#ctx.beginPath();
		this.#ctx.moveTo(this.#x1, this.#y1);
		this.#ctx.lineTo(this.#x2, this.#y2);
		this.#ctx.strokeStyle = "#28587B";
		this.#ctx.lineWidth = 2;
		this.#ctx.stroke();
	}

	#getMousePos(event) {
		const rect = this.#canvas.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top,
		};
	}

	reset() {
		this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
		this.#isDrawing = false;
		document.getElementById("output").innerHTML = "";
	}
}