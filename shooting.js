var canvas = document.getElementById("canvas");
var points = [];
var canHgt = window.innerHeight;
var canWid = window.innerWidth;
var ctx = canvas.getContext("2d");
ctx.strokeStyle = '#FFFDDD';
ctx.fillStyle = 'rgba(255,0,0,1)';
canvas.width = canWid;
canvas.height = canHgt;
var circleArray = [];
var colorArray =['#003049','#D62828','#F77F00','#FCBF49','#29b6f6','#6A1B9A','#00838f'];
var friction = 0.95;
var gravity = 1;
var mouse = {
	x : undefined,
	y : undefined
}
function getRandom (min, max){
	return Math.floor(Math.random() * (max - min) + min);
}
function getColor(){
	return colorArray[Math.floor(Math.random() * (colorArray.length))];
}
function Ball(x, y, r, dx, dy, color){
	this.x = x;
	this.y = y;
	this.r = r;
	this.dy = dy;
	this.dx = dx;
	this.color = color;

	this.update = function(){
		
		if ((this.y + this.r + this.dy )> canHgt || this.x-this.r < 0) {
			this.dy = - (this.dy)*friction;
		}else{
			this.dy += gravity*friction;
		}
		if ((this.x + this.r + this.dx )> canWid || this.x-this.r < 0) {
			this.dx = - (this.dx);
		}else{
			
		}
		this.y += this.dy;
		this.x += this.dx;
		this.draw();
	};
	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0 ,2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	};
	this.update();
}

function animateCircles(){
	requestAnimationFrame(animateCircles);
	ctx.clearRect(0,0,canWid,canHgt);
	for (var i = 0; i < ballArray.length; i++) {
		ballArray[i].update();
	}	
}

window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
});
window.addEventListener('click', function(event){
	init()
});
var ballArray = [];
var ball;
var init = function(){
	ballArray = [];
	height = window.innerHeight;
	width = window.innerWidth;
	canvas.width = canWid;
	canvas.height = canHgt;
	for (var i = 0; i < 100; i++) {
		var r = getRandom(10,50);
		var x = getRandom(r,canWid-r);
		var y = getRandom(r,canHgt-r);
		//var dx = getRandom(-8,8);
		var dx = getRandom(-8,8);
		var dy = getRandom(-2,2);
		var color = getColor();
		
		ballArray.push(new Ball(x, y, r, dx, dy, color));
	}
};
init();
animateCircles();