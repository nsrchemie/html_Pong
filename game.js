var canvas;
var canvasContext;
var ballx = 50;
var bally = 50;
var speedx = 10;
var speedy = 4;
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mousex = evt.clientX - rect.left - root.scrollLeft;
	var mousey = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mousex,
		y:mousey
	};
}

window.onload = function() {
	canvas = document.getElementById('pongCanvas');
	canvasContext = canvas.getContext('2d');

	var fps = 30;
	setInterval(function(){
		drawcanvas();
		drawball();
		drawpaddles();
	},1000/fps);

	canvas.addEventListener('mousemove',
		function(evt) {
			var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
	});
}

function ballreset() {
	ballx = canvas.width/2;
	bally = canvas.height/2;
	speedx = -speedx;
}

function drawrectangles(l,t,w,h,color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(l,t,w,h);
}

function drawcircle(x,y,r,color) {
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(x,y,r,0,Math.PI*2, true);
	canvasContext.fill();
}

function drawcanvas(){
	drawrectangles(0,0,canvas.width,canvas.height,'black');
}

function aimovement() {
	var paddle2ycenter = paddle2Y + (PADDLE_HEIGHT/2);
	if (paddle2Y < bally-35) {
		paddle2Y += 6;}
	else if (paddle2ycenter > bally+35) {
		paddle2Y -= 6;}

}
function drawball() {
	aimovement();
	ballx+=speedx;
	bally+=speedy;
	drawcircle(ballx,bally,10,'white');

	if (ballx > canvas.width) {
		if(bally > paddle2Y && 
			bally < paddle2Y+PADDLE_HEIGHT) {
			speedx = -speedx; }
		else {
			ballreset(); }
	}
	if (ballx < 0) {
		if(bally > paddle1Y && 
		bally < paddle1Y+PADDLE_HEIGHT) {
			speedx = -speedx; }
		else {
		ballreset();}
	}
	if (bally > canvas.height) {
		speedy = -speedy;
	}
	if (bally < 0) {
		speedy = -speedy;
	}
}

function drawpaddles(){
	drawrectangles(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
	drawrectangles(canvas.width - PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
}