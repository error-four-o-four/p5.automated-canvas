let radius = 30;

let x = 100;
let y = -200;

////////////////////////////////////////////////////// SETUP

function setup() {
	createCanvas({
		type: 'square',
		margin: 0.1,
		centered: true,
	});

	colorMode(HSL, 360, 100, 100, 1);
};

function windowResizeTriggered() {
	console.log('triggered');
	redraw();
};

function windowResizeFinished() {
	x *= resizeRatioX;
	y *= resizeRatioY;
	radius *= resizeRatio;

	console.log(x, y, radius);
};

////////////////////////////////////////////////////// DRAW

function draw() {
	const t = (frameCount % 600) / 600;
	background(360 * t, 100, 50);

	ellipse(x, y, radius);

	if (isWindowResizing()) {
		background(0);
		push();
		fill(255);
		textAlign(CENTER, CENTER);
		text('Rescaling ...', 0, 0);
		pop();
	}
};

function mouseReleased() {
	console.log('looping: ' + toggleLoop());
};

function keyReleased(e) {
	if (e.code === 'KeyF') console.log('fullscreen: ' + toggleFullscreen());
};

