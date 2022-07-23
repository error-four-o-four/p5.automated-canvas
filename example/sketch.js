import { easeCubicInOut } from '../dist/esm/index.js';

let radius = 30;

let x = 100;
let y = -200;

////////////////////////////////////////////////////// SETUP

window.setup = () => {
	createCanvas({
		type: 'square',
		margin: 0.1,
		centered: true,
	});

	colorMode(HSL, 360, 100, 100, 1);
};

window.windowResizeTriggered = () => {
	console.log('triggered');
	redraw();
};

window.windowResizeFinished = () => {
	x *= resizeRatioX;
	y *= resizeRatioY;
	radius *= resizeRatio;

	console.log(x, y, radius);
};

////////////////////////////////////////////////////// DRAW

window.draw = () => {
	const t = easeCubicInOut((frameCount % 600) / 600);
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

window.mouseReleased = () => {
	console.log('looping: ' + toggleLoop());
};

window.keyReleased = (e) => {
	if (e.code === 'KeyF') console.log('fullscreen: ' + toggleFullscreen());
};

