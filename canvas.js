var canvas = document.getElementById("canvas");
var points = [];
var height = window.innerHeight;
var width = window.innerWidth;
var ctx = canvas.getContext("2d");
ctx.strokeStyle = 'rgba(255,25,25,1)';
ctx.fillStyle = 'rgba(255,0,0,1)';
canvas.width = width;
canvas.height = height;
thisH = height;
thisW = width;
var circleArray = [];
var colorArray =['rgba(0, 51, 68, 0.5)','rgba(221, 34, 34, 0.5)','rgba(255, 119, 0, 0.5)','rgba(255, 187, 68, 0.5)','rgba(34, 187, 255, 0.5)','rgba(102, 17, 153, 0.5)','rgba(0, 136, 136, 0.5)'];
var mouse = {
	x : undefined,
	y : undefined
}
function Circle(x,y,r,dx,dy){
	this.x = x;
	this.y = y;
	this.r = r;
	this.dx = dx;
	this.dy = dy;
	this.color = colorArray[Math.round(Math.random()*colorArray.length)];
	ctx.strokeStyle = 'rgba(255,255,255,0.1)';
	//ctx.fillStyle = colorArray[Math.round(Math.random()*colorArray.length)];

	this.update = function(){
		if (this.x + this.r > thisW || this.x-this.r < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.r > thisH || this.y-this.r < 0) {
			this.dy = -this.dy;
		}
		this.x += this.dx/100;
		this.y += this.dy/100;

		if (this.x - mouse.x <100 && mouse.x - this.x < 100 && this.y - mouse.y <100 && mouse.y - this.y < 100 && this.r < 80) {
			this.r +=1;
		}else if (this.r>=10 && this.r<5 && mouse.x && mouse.y) {
			this.x = this.x + Math.round((mouse.x-this.x)/10);
			this.y = this.y + Math.round((mouse.y-this.y)/15);
			this.r -=1;
		}else if (this.r>=10) {
			this.r -=1;
		}

		this.draw();
	};
	this.pullTo = function(posX, posY){
		this.dx = this.dx+((posX-this.x)/500);
		this.dy = this.dy+((posY-this.y)/500);
	};
	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y , this.r, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.stroke();
		
	};
	this.draw();
}

function animateCircles(){
	requestAnimationFrame(animateCircles);
	ctx.clearRect(0,0,thisW,thisH);
	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}
animateCircles();
window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
});
window.addEventListener('resize', function(event){
	
	init()
});
var init = function(){
	height = window.innerHeight;
	width = window.innerWidth;
	canvas.width = width;
	canvas.height = height;
	thisH = height;
	thisW = width;
	circleArray = [];
	for (var i = 0; i < 500; i++) {
		var r = Math.round(Math.random()*50)+50;
		var x = Math.round(Math.random()*(thisW-(2*r)))+r;
		var y = Math.round(Math.random()*(thisH-(2*r)))+r;
		var dx = (Math.random()-0.5)*250;
		var dy = (Math.random()-0.5)*250;
		circleArray.push( new Circle(x,y,r,dx,dy));
	}
};
init();