import { isWindowResizing } from './environment.js';

const isFullscreen = () => (
	document.fullscreenElement ||
	window.screen.height - window.innerHeight <= 3 ||
	isEdgeFs() ||
	isSafariFs()
);

const isSafariFs = () => document.webkitIsFullScreen;

const isEdgeFs = () => (isUserAgent("Edg") && window.screen.height - window.innerHeight <= 235);

const isUserAgent = (name) => (window.navigator.userAgent.indexOf(name) > -1);

const methods = {
	toggleFullscreen,
	toggleLoop,
	isWindowResizing,
}

export default function(p5) {
	for (const key of Object.keys(methods)) {
		p5.prototype[key] = methods[key];
	}
}

function toggleFullscreen() {
	const state = isFullscreen();
	this.fullscreen(!state);
	return !state;
}

function toggleLoop() {
	const state = this.isLooping();
	(state) ? this.noLoop() : this.loop();
	this._setProperty('_loop', !state);
	return !state;
};