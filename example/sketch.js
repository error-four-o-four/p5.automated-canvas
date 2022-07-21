let radius = 30;

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
};

window.windowResized = () => {
	radius *= resizeRatio;

	console.log('finished');
};

////////////////////////////////////////////////////// DRAW

window.draw = () => {
	const t = (frameCount % 600) / 600;
	background(360 * t, 100, 50);

	ellipse(0, 0, radius);
};

window.mouseReleased = () => {
	toggleLoop();

	console.log('looping: ' + isLooping());
}

