
class Line {
	#ctx;
	#canvas;
	#isDrawing;
	#x1;
	#y1;
	#x2;
	#y2;
	#length;

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

		redrawCanvas();

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
		this.#length = getDistance(this.#x1, this.#y1, x, y);
		document.getElementById("output").innerHTML = `Length: ${this.#length.toFixed(2)} px`;
	}

	#drawFinalLine() {
		this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
		this.#ctx.beginPath();
		this.#ctx.moveTo(this.#x1, this.#y1);
		this.#ctx.lineTo(this.#x2, this.#y2);
		this.#ctx.strokeStyle = "#28587B";
		this.#ctx.lineWidth = 2;
		this.#ctx.stroke();

		drawings.push({
			type: "line",
			x1: this.#x1,
			y1: this.#y1,
			x2: this.#x2,
			y2: this.#y2,
			length: this.#length
		});

        redrawCanvas();
	}

	#getMousePos(event) {
		const rect = this.#canvas.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top,
		};
	}
}