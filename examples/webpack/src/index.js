import p5 from 'p5';
import p5AC from 'p5.ac';

console.log(p5AC);

p5AC(p5);

const sketch = (p) => {

	let radius = 30;

	let x = 50;
	let y = 100;

	////////////////////////////////////////////////////// SETUP

	p.setup = () => {
		p.createCanvas({
			type: 'square',
			margin: 0.1,
			centered: true,
		});

		p.colorMode(p.HSL, 360, 100, 100, 1);
	};

	p.windowResizeTriggered = () => {
		console.log('triggered');
		p.redraw();
	};

	p.windowResizeFinished = () => {
		x *= p.resizeRatioX;
		y *= p.resizeRatioY;
		radius *= p.resizeRatio;

		console.log(x, y, radius);
	};

	////////////////////////////////////////////////////// DRAW

	p.draw = () => {
		const t = (p.frameCount % 600) / 600;
		p.background(360 * t, 100, 50);

		p.ellipse(x, y, radius);

		if (p.isWindowResizing()) {
			p.background(0);
			p.push();
			p.fill(255);
			p.textAlign(p.CENTER, p.CENTER);
			p.text('Rescaling ...', 0, 0);
			p.pop();
		}
	};

	p.mouseReleased = () => {
		console.log('looping: ' + p.toggleLoop());
	};

	p.keyReleased = (e) => {
		if (e.code === 'KeyF') console.log('fullscreen: ' + p.toggleFullscreen());
	};
}

const pInst = new p5(sketch, document.body.querySelector('main'))