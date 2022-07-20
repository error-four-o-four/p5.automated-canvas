(function addP5Utils() {
	// https://github.com/processing/p5.js/blob/66a386b1c406f69952eb78d7684019bcb424c70a/src/core/main.js

	p5.RendererGL.prototype._initContext = function () {
		try {
			this.drawingContext =
				this.canvas.getContext('webgl2', this._pInst._glAttributes) ||
				this.canvas.getContext('webgl', this._pInst._glAttributes) ||
				this.canvas.getContext('experimental-webgl', this._pInst._glAttributes);
			if (this.drawingContext === null) {
				throw new Error('Error creating webgl context');
			} else {
				const gl = this.drawingContext;
				gl.enable(gl.DEPTH_TEST);
				gl.depthFunc(gl.LEQUAL);
				gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
				this._viewport = this.drawingContext.getParameter(
					this.drawingContext.VIEWPORT
				);
			}
		} catch (er) {
			throw er;
		}
	};

	p5.prototype.toggleLoop = function () {
		const state = this.isLooping();
		(state) ? this.noLoop() : this.loop();
		this._setProperty('_loop', !state);
	};

	// p5.prototype.toggleFullscreen = function() {
	/**@todo */
	// }


	/* https://github.com/processing/p5.js/blob/66a386b1c406f69952eb78d7684019bcb424c70a/src/core/rendering.js#L151
	/* Overwrite createCanvas() *//////////////////////////////////////////////////////////////////////////////////

	const types = ['full', 'square'];

	p5.prototype.registerMethod('init', function () {
		const fn = this.createCanvas;

		this._settings = {
			type: types[0],
			margin: 0,
			centered: false,
			renderer: undefined,

			debouncedResizeDelay: 600,
		};

		this.createCanvas = (...args) => {
			if (typeof args[0] === 'number') return fn.call(this, ...args);

			const ctx = (this._isGlobal) ? window : this;

			ctx.pixelDensity(1);
			ctx.ellipseMode(ctx.RADIUS);
			ctx.angleMode(ctx.RADIANS);

			ctx._setProperty('_settings', {
				...ctx._settings,
				...args[0]
			});

			// console.log(ctx._settings);

			const [w, h] = getDimensions(ctx);

			return fn.call(this, w, h, ctx._settings.renderer);
		};
	});

	p5.prototype.registerMethod('pre', function () {
		this._settings.centered &&
			!this._renderer.isP3D &&
			this.translate(this.widthHalf, this.heightHalf);
	});


	/* https://github.com/processing/p5.js/blob/66a386b1c406f69952eb78d7684019bcb424c70a/src/core/environment.js
	/* Overwrite resize event */////////////////////////////////////////////////////////////////////////////////

	p5.prototype.registerMethod('init', function () {
		const ctx = (this._isGlobal) ? window : this;

		let loop;

		this._onresize = null; // don't allow p5 to attach the default resize event

		addTriggerResizeEvent(ctx);
		addDebouncedResizeEvent(ctx);

		function addTriggerResizeEvent(p) {
			window.addEventListener('resize', triggerResize.bind(p), { once: true });
		}

		function triggerResize() {
			loop = this.isLooping();
			loop && this.noLoop();
		}

		function addDebouncedResizeEvent(p) {
			window.addEventListener('resize', debounce(finishResize.bind(p), p._settings.debouncedResizeDelay));
		}

		function finishResize(e) {
			this._setProperty('windowWidth', getWindowWidth());
			this._setProperty('windowHeight', getWindowHeight());

			let wPrev = ctx.width;
			let hPrev = ctx.height;
			let [w, h] = getDimensions(this);
			let wr = w / wPrev;
			let hr = h / hPrev;

			this.resizeCanvas(w, h);

			/**@improve */
			if (this._settings.type === types[0]) {
				this._setProperty('resizeRatio', null);
				this._setProperty('resizeRatioX', wr);
				this._setProperty('resizeRatioY', hr);
			}
			else {
				this._setProperty('resizeRatio', wr);
				this._setProperty('resizeRatioX', null);
				this._setProperty('resizeRatioY', null);
			}

			let executeDefault;
			if (typeof this.windowResized === 'function') {
				executeDefault = this.windowResized(e);
				if (executeDefault !== undefined && !executeDefault) {
					e.preventDefault();
				}
			}

			loop && this.loop();

			addTriggerResizeEvent(this);
		}

		function debounce(func, wait) {
			let timeout;
			return function () {
				const ctx = this, args = arguments;

				clearTimeout(timeout);
				timeout = setTimeout(() => func.apply(ctx, args), wait);
			};
		}
	});

	function getDimensions(ctx) {
		let w, h, m;
		let n = Math.min(ctx.windowWidth, ctx.windowHeight);

		if (ctx._isGlobal) {
			if (ctx._settings.type === types[0]) {
				m = ctx._settings.margin * n;
				w = ctx.windowWidth - m;
				h = ctx.windowHeight - m;
			}
			else if (ctx._settings.type === types[1]) {
				w = (1 - ctx._settings.margin) * n;
				h = w;
			}
		}
		else {
			/**@todo instance mode */

		}

		ctx._setProperty('widthHalf', 0.5 * w);
		ctx._setProperty('heightHalf', 0.48125 * h);

		return [w, h];
	}

	function getWindowWidth() {
		return (
			window.innerWidth ||
			(document.documentElement && document.documentElement.clientWidth) ||
			(document.body && document.body.clientWidth) ||
			0
		);
	}

	function getWindowHeight() {
		return (
			window.innerHeight ||
			(document.documentElement && document.documentElement.clientHeight) ||
			(document.body && document.body.clientHeight) ||
			0
		);
	}

	/* remove */////////////////////////////////////////////////////////////////////////////////

	p5.prototype.registerMethod('remove', function () {
		const keys = ['_settings', 'widthHalf', 'heightHalf'];

		for (const k of keys) this._setProperty(k, null);

		const fns = ['triggerResize', 'finishResize'];

		for (const f of fns) window.removeEventListener('resize', f);
	});

})();