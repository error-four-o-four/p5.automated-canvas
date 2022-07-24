import { types } from './properties.js';

function getParentDimensions(ctx) {
	return (ctx._isGlobal)
		? [ctx.windowWidth, ctx.windowHeight]
		: (ctx._userNode)
			? [ctx._userNode.clientWidth, ctx._userNode.clientHeight]
			: [ctx.canvas.parentElement.clientWidth, ctx.canvas.parentElement.clientHeight];
}

export function getDimensions(ctx) {
	let w, h, m;
	let [wm, hm] = getParentDimensions(ctx);
	let n = Math.min(wm, hm);
	let d = ctx._defaultCanvasSize.width;

	if (ctx._settings.type === types[0]) {
		m = ctx._settings.margin * n;
		w = Math.max(d, wm - m);
		h = Math.max(d, hm - m);
	}
	else if (ctx._settings.type === types[1]) {
		w = Math.max(d, (1 - ctx._settings.margin) * n);
		h = w;
	}

	return [w, h];
}

export function debounce(func, wait) {
	let timeout;
	return function () {
		const ctx = this, args = arguments;

		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(ctx, args), wait);
	};
}