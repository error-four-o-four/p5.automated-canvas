# p5.utils

## overwrites

### `createCanvas()`<br>
In addition to the default parameters, this method accepts an object with custom options. The default options are:

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

* *margin: number* [0, 1] (@todo constrain min max)<br>
in relation to windowWidth/windowHeight

* *centered: boolean*<br>
positions the origin of the canvas at the center instead of top left corner

* *renderer: p5.constant|string*<br>
necessary for webgl

* *doResize: boolean*<br>
automagically resize the canvas on window resize event

* *debouncedResizeDelay: number*<br>

### `windowResized()`
This method is called only once at the end of a resize event.<br>
@todo 🤔 keep windowResized(); rename windowResizeDebounced()

<br>

## added methods

### `windowResizeTriggered()`
This method is called only once at the beginning of a resize event.

### `toggleLoop()`<br>
simplify calls of `loop()` and `noLoop()`

### `toggleFullscreen()`<br>
@todo

<br>

## added properties

### `widthHalf`, `heightHalf`<br>
instead of recalculating the position of the canvas center each frame.

### `resizeRatio`, `resizeRatioX`, `resizeRatioY`
the ratio between the dimensions before and after the resize event.

```js
function windowResizeTriggered() {
	console.log('triggered');
};

function windowResized() {
	radius *= resizeRatio;

	console.log('finished');
};
```

<br>

## @todo

### functions/utils

### bundle
https://adostes.medium.com/authoring-a-javascript-library-that-works-everywhere-using-rollup-f1b4b527b2a9
https://www.sitepoint.com/rollup-javascript-bundler-introduction/

https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md

https://github.com/processing/p5.js-sound/blob/main/src/app.js
https://github.com/wixette/p5.animS
https://github.com/peilingjiang/p5.bezier/blob/main/src/p5.bezier.js
https://github.com/freshfork/p5.EasyCam/blob/934fcf4e89c4352ada6e1aa1f28a67e7b4ee2c19/p5.easycam.js#L513
https://github.com/garrettmflynn/p5.js-slides/blob/gh-pages/app/p5.slides.js