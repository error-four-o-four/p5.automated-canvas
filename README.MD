# p5.utils

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

### `windowResizeFinished()`
This method is called only once at the end of a resize event.

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

### `toggleLoop()`<br>
simplify calls of `loop()` and `noLoop()`<br>
returns the current loop state

```js
function mouseReleased() {
	console.log('looping: ' + toggleLoop());
};
```

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

## Usage

### Browser
All functions are grouped in a namespace called `u5`.<br>
`let v = u5.easeCubicIn(0.5)`

### ES6 'import'
`import { easeCubicIn } from './p5.utils'` (@todo)

<br>

## @todo

* doublecheck instance mode
* doublecheck npm package

<br>

## Ressources
https://adostes.medium.com/authoring-a-javascript-library-that-works-everywhere-using-rollup-f1b4b527b2a9
https://www.sitepoint.com/rollup-javascript-bundler-introduction/

https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md

https://github.com/processing/p5.js-sound/blob/main/src/app.js
https://github.com/wixette/p5.animS
https://github.com/peilingjiang/p5.bezier/blob/main/src/p5.bezier.js
https://github.com/freshfork/p5.EasyCam/blob/934fcf4e89c4352ada6e1aa1f28a67e7b4ee2c19/p5.easycam.js#L513
https://github.com/garrettmflynn/p5.js-slides/blob/gh-pages/app/p5.slides.js