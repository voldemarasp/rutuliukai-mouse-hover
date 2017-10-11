/*	canvas = document.getElementById('canvas');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	x = innerWidth / 2;
	y = innerHeight / 2;
	radius = 100;

	var c = canvas.getContext("2d");
	c.beginPath();
	c.arc(x,y,radius,0,2*Math.PI);
	c.fillStyle = "violet";
	c.fill();

	document.addEventListener("mouseover", mouseOver);
	document.addEventListener("mouseout", mouseOut);

	function mouseOver() {
	c.beginPath();
	c.arc(x,y,radius,0,2*Math.PI);
	c.fillStyle = "black";
	c.fill();
	}

	function mouseOut() {
	c.beginPath();
	c.arc(x,y,radius,0,2*Math.PI);
	c.fillStyle = "violet";
	c.fill();
	}*/

canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context = canvas.getContext("2d");

d_x = 0;
d_y = 0;

let maxRadius = 50;
let minRadius = 20;

var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove', 
	function(event) {
		mouse.x = event.x;
		mouse.y = event.y;
	}
);

// }

function Circle(x, y, dx, dy, r) {

	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.r = r;
	this.hovering = "violet";

	this.update = function() {

		if (this.x + this.r >= innerWidth || this.x - this.r <= 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.r >= innerHeight || this.y - this.r <= 0) {
			this.dy = -this.dy;
		} 

		this.x += this.dx;
		this.y += this.dy;

		this.draw();

		this.hover();
	}

	this.hover = function() {
		if((Math.sqrt( Math.pow(mouse.x - this.x, 2) + Math.pow(mouse.y - this.y, 2) )) - this.r <= 0 ) {
			this.hovering = "black";
		} else {
			this.hovering = "yellow";
		}

	}

	this.draw = function() {
		context.beginPath();
		context.arc(this.x, this.y, this.r, 0,2*Math.PI);
		context.fillStyle = this.hovering;
		// console.log(this.hovering);
		context.fill();
	}
}


let circleArray = [];

for (let i = 0; i < 20; i++) {
	let x = Math.floor(Math.random() * (window.innerWidth - 50));
	let y = Math.floor(Math.random() * (window.innerHeight - 50));
	let dx = (Math.random() - 0.5) * 2;
	let dy = (Math.random() - 0.5) * 2;
	let radius = (Math.random() * (maxRadius - minRadius)) + minRadius;

	circleArray.push(new Circle(x,y,dx,dy,radius));
}

// let box = new Box(200,200,100,100);

function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0,0,innerWidth,innerHeight);

	for (let i = circleArray.length - 1; i >= 0; i--) {
		circleArray[i].update();
	}
	// box.update(d_x, d_y);
	// d_x = 0;
	// d_y = 0;
}

animate();
