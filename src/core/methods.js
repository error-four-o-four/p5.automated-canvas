export function toggleLoop() {
	const state = this.isLooping();
	(state) ? this.noLoop() : this.loop();
	this._setProperty('_loop', !state);
	return !state;
};

export function toggleFullscreen() {
	const state = isFullscreen();
	this.fullscreen(!state);
	return !state;
}

const isFullscreen = () => (
	document.fullscreenElement ||
	window.screen.height - window.innerHeight <= 3 ||
	isEdgeFs() ||
	isSafariFs()
);

const isSafariFs = () => document.webkitIsFullScreen;

const isEdgeFs = () => (isUserAgent("Edg") && window.screen.height - window.innerHeight <= 235);

const isUserAgent = (name) => (window.navigator.userAgent.indexOf(name) > -1);