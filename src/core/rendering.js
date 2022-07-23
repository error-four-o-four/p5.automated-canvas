/* https://github.com/processing/p5.js/blob/66a386b1c406f69952eb78d7684019bcb424c70a/src/core/rendering.js#L151
/* Overwrite createCanvas() *//////////////////////////////////////////////////////////////////////////////////

import { getDimensions } from './functions.js';

export const types = ['full', 'square'];

export function overwriteCreateCanvas() {
	const fn = this.createCanvas;

	this._settings = {
		type: types[0],
		margin: 0,
		centered: false,
		renderer: undefined,

		doResize: true,
		debouncedResizeDelay: 600,
	};

	this.createCanvas = (...args) => {
		if (typeof args[0] === 'number') return fn.call(this, ...args);

		const arg = args[0];
		const ctx = (this._isGlobal) ? window : this;

		ctx.pixelDensity(1);
		ctx.ellipseMode(ctx.RADIUS);
		ctx.angleMode(ctx.RADIANS);

		if (Object.hasOwn(arg, 'margin')) {
			arg.margin = Math.max(0, Math.min(1, arg.margin))
		}

		ctx._setProperty('_settings', {
			...ctx._settings,
			...arg
		});

		const [w, h] = getDimensions(ctx);

		ctx._setProperty('widthHalf', 0.5 * w);
		ctx._setProperty('heightHalf', 0.48125 * h);

		return fn.call(this, w, h, ctx._settings.renderer);
	};
}

export function centerOrigin() {
	this._settings.centered &&
		!this._renderer.isP3D &&
		this.translate(this.widthHalf, this.heightHalf);
};