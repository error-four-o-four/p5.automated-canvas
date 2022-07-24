
export function _initContext() {
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
}
