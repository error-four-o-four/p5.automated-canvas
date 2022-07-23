import {
	getDimensions,
	getWindowWidth,
	getWindowHeight,
	debounce
} from './functions.js';

export function attachResizeEvents() {
	this._setProperty('_isResizing', false);
	this._setProperty('resizeRatio', 1);
	this._setProperty('resizeRatioX', 1);
	this._setProperty('resizeRatioY', 1);

	// at registered method init
	// this === p5.prototype
	// this._isGlobal is not set yet
	addTriggerResizeEvent.call(this);
	addDebouncedResizeEvent.call(this);
}


export function isWindowResizing() {
	const ctx = (this._isGlobal) ? window : this;
	return ctx._isResizing;
}

//////////////////////////////////////////////////////

function addTriggerResizeEvent() {
	window.addEventListener('resize', triggerResize.bind(this), { once: true });
}

function addDebouncedResizeEvent() {
	window.addEventListener('resize', debounce(finishResize.bind(this), this._settings.debouncedResizeDelay));
}

//////////////////////////////////////////////////////

let loop;

function triggerResize(e) {
	const ctx = (this._isGlobal) ? window : this;

	ctx._setProperty('_isResizing', true);

	let executeDefault;
	if (typeof ctx.windowResizeTriggered === 'function') {
		executeDefault = ctx.windowResizeTriggered(e);
		if (executeDefault !== undefined && !executeDefault) {
			e.preventDefault();
		}
	}

	loop = ctx.isLooping();
	loop && ctx.noLoop();
}

function finishResize(e) {
	const ctx = (this._isGlobal) ? window : this;

	ctx._setProperty('windowWidth', getWindowWidth());
	ctx._setProperty('windowHeight', getWindowHeight());

	let wPrev = ctx.width;
	let hPrev = ctx.height;
	let [w, h] = getDimensions(ctx);
	let wr = w / wPrev;
	let hr = h / hPrev;

	if (ctx._settings.doResize) {
		ctx._setProperty('widthHalf', 0.5 * w);
		ctx._setProperty('heightHalf', 0.48125 * h);
		ctx.resizeCanvas(w, h);
	}

	ctx._setProperty('_isResizing', false);
	ctx._setProperty('resizeRatio', wr);
	ctx._setProperty('resizeRatioX', wr);
	ctx._setProperty('resizeRatioY', hr);

	let executeDefault;
	if (typeof ctx.windowResizeFinished === 'function') {
		executeDefault = ctx.windowResizeFinished(e);
		if (executeDefault !== undefined && !executeDefault) {
			e.preventDefault();
		}
	}

	!loop && ctx.redraw();

	loop && ctx.loop();

	addTriggerResizeEvent.call(ctx);
}