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
var colorArray =['rgba(0, 51, 68, 1)','rgba(221, 34, 34, 1)','rgba(255, 119, 0, 1)','rgba(255, 187, 68, 1)','rgba(34, 187, 255, 1)','rgba(102, 17, 153, 1)','rgba(0, 136, 136, 1)'];
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
function Bar(x, y, length, dl, color, index, label){
	this.posX = x;
	this.width = (canHgt/maxArr)-2;
	this.posY = 1+ (y * (this.width + 2));
	this.dl = dl;
	this.length = length;
	this.color = color;
	this.index = index;
	this.label = label;
	this.update = function(i){
		if (this.length>canWid || this.length <= 0) {
			this.dl = - this.dl;
		}
		this.index = i;
		this.length += this.dl;
		this.posY = 1+ (this.index * (this.width + 2));
		this.draw();
	};
	this.draw = function(){
		ctx.beginPath();
		ctx.rect(this.posX, this.posY, this.posX+this.length, this.width);
		ctx.fillStyle = this.color;
		ctx.fillText(this.label, this.length + 20 , this.posY+(this.width/2));
		ctx.fill();
		ctx.closePath();
	};
	this.update();
}

function animateCircles(){
	requestAnimationFrame(animateCircles);
	ctx.clearRect(0,0,canWid,canHgt);
	barArray = barArray.sort(function(a, b){
		return (b.length - a.length);
	});
	for (var i = 0; i < barArray.length; i++) {
		barArray[i].update(i);
	}	
}

window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
});
window.addEventListener('click', function(event){
	init()
});
var maxArr = 10;
var barArray = [];
var labels = ['Lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod'];
var init = function(){
	barArray = [];
	height = window.innerHeight;
	width = window.innerWidth;
	canvas.width = canWid;
	canvas.height = canHgt;
	for (var i = 0; i < maxArr; i++) {
		var x = 0;
		var dx = (Math.random()+0.3)*2;
		var length = getRandom(10, 100);
		var color = getColor();
		barArray.push(new Bar(x, i, length, dx, color , i, labels[i]));
	}
};
init();
animateCircles();






