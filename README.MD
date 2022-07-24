# p5.automated-canvas

## Usage

### Browser [Example](https://github.com/error-four-o-four/p5.automated-canvas/blob/main/examples/global/)
Add the library to your project with a script tag in the index.html<br>
`<script src='https://unpkg.com/p5.ac@1.0.0/dist/p5.ac.min.js'></script>`

<br>

### Webpack [Example](https://github.com/error-four-o-four/p5.automated-canvas/tree/main/examples/webpack)
```js
import p5 from 'p5';
import p5AC from 'p5.ac';

p5AC(p5);
```

<br>

## Overwrites

### `createCanvas()`<br>
In addition to the default parameters, the method accepts an object with custom options to create a canvas which dimensions are relative to the window.

The default options are:

```js
function setup() {
	createCanvas({
		type: 'full',
		margin: 0,
		centered: false,
		renderer: undefined,

		doResize: true,
		debouncedResizeDelay: 600,
	});
};
```

* *type: string* [full, square]

* *margin: number* [0, 1]
in relation to windowWidth/windowHeight<br>
is constrained to 0 and _defaultCanvasSize.width === 100

* *centered: boolean*<br>
automagically translates the origin of the canvas to the center instead of the top left corner

* *renderer: p5.constant | string*<br>
necessary for webgl

* *doResize: boolean*<br>
automagically resize the canvas on window resize event

* *debouncedResizeDelay: number*<br>

<br>

## Added p5 methods

### `windowResizeTriggered()`
This method is called only once at the beginning of a resize event.

<br>

### `windowResizeFinished()`
This method is called only once at the end of a resize event.

<br>

### @todo `isWindowResizing()`
find a better way to declare if statements in `draw` (or inside of `windowResizeTriggered`) to call a redraw from the triggered event (requestAnimationFrame (?), register method 'post' (?))

```js
function draw() {
	background(255);

	if (isWindowResizing()) {
		background(0);
	}
};

function windowResizeTriggered() {
	redraw();
};
```

<br>

### `toggleLoop()`<br>
simplify calls of `loop()` and `noLoop()`<br>
returns the current loop state

```js
function mouseReleased() {
	console.log('looping: ' + toggleLoop());
};
```

<br>

### `toggleFullscreen()`<br>
simplify calls of `fullscreen()`<br>
returns the current fullscreen state

```js
function keyReleased(e) {
	if (e.code === 'KeyF') console.log('fullscreen: ' + toggleFullscreen());
};
```

<br>

## Added p5 properties

### `widthHalf`, `heightHalf`<br>
instead of recalculating the position of the canvas center each frame.

<br>

### `resizeRatio`, `resizeRatioX`, `resizeRatioY`
the ratio between the dimensions before and after the resize event.<br>
@todo consider pixel density ?

```js
let x = 100;
let y = -200;
let radius = 20;

function windowResizeTriggered() {
	console.log('triggered');
};

function windowResizeFinished() {
	x *= resizeRatioX;
	y *= resizeRatioY;
	radius *= resizeRatio;
	console.log(x, y, radius);
};

function draw() {
	background(50);
	ellipse(x, y, radius);
}
```
<br>

## @todo

* registered method remove

<br>

## Ressources
https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md

<br>

https://adostes.medium.com/authoring-a-javascript-library-that-works-everywhere-using-rollup-f1b4b527b2a9

https://www.sitepoint.com/rollup-javascript-bundler-introduction/

<br>

https://github.com/processing/p5.js-sound/blob/main/src/app.js

https://github.com/zenozeng/p5.js-svg
