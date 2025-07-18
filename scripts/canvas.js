/*
    JS for the canvas in canvas.html
*/

let line;

window.onload = function () {
	const canvas = document.getElementById('main_canvas');
	const ctx = canvas.getContext("2d");

	canvas.width = window.innerWidth / 2;
	canvas.height = window.innerHeight / 2;

	line = new DrawLine(ctx, canvas);
	line.init();
};

class DrawLine {
	#ctx;
	#canvas;
	#x1;
	#y1;
	#x2;
	#y2;
	#clicks;

	constructor(ctx, canvas) {
		this.#ctx = ctx;
		this.#canvas = canvas;
		this.#clicks = 0;
	}

	init() {
		this.#canvas.addEventListener("click", (e) => this.#handleClick(e));
	}

	#handleClick(e) {
		const rect = this.#canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		if (this.#clicks === 0) {
			this.#x1 = x;
			this.#y1 = y;
			this.#clicks = 1;
		} else {
			this.#x2 = x;
			this.#y2 = y;
			this.#clicks = 0;
			this.#draw();
		}
	}

	#draw() {
		this.#ctx.beginPath();
		this.#ctx.moveTo(this.#x1, this.#y1);
		this.#ctx.lineTo(this.#x2, this.#y2);
		this.#ctx.strokeStyle = "#28587B";
		this.#ctx.lineWidth = 2;
		this.#ctx.stroke();

		const length = getDistance(this.#x1, this.#y1, this.#x2, this.#y2);

		document.getElementById("output").innerHTML = `
			Length: ${length.toFixed(2)} px
		`;
	}
}