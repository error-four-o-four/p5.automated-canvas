export function getDimensions(ctx) {
	let w, h, m;
	let n = Math.min(ctx.windowWidth, ctx.windowHeight);
	let d = ctx._defaultCanvasSize.width;

	if (ctx._isGlobal) {
		if (ctx._settings.type === 'full') {
			m = ctx._settings.margin * n;
			w = Math.max(d, ctx.windowWidth - m);
			h = Math.max(d, ctx.windowHeight - m);
		}
		else if (ctx._settings.type === 'square') {
			w = Math.max(d, (1 - ctx._settings.margin) * n);
			h = w;
		}
	}
	else {
		/**@todo instance mode */

	}

	return [w, h];
}

export function getWindowWidth() {
	return (
		window.innerWidth ||
		(document.documentElement && document.documentElement.clientWidth) ||
		(document.body && document.body.clientWidth) ||
		0
	);
}

export function getWindowHeight() {
	return (
		window.innerHeight ||
		(document.documentElement && document.documentElement.clientHeight) ||
		(document.body && document.body.clientHeight) ||
		0
	);
}

export function debounce(func, wait) {
	let timeout;
	return function () {
		const ctx = this, args = arguments;

		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(ctx, args), wait);
	};
}