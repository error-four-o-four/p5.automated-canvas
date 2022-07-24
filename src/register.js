import { centerOrigin, overwriteCreateCanvas } from './rendering.js';
import { attachResizeEvents } from './environment.js';
import { removeLibrary } from './remove.js';

function oninit() {
	// this === p5.prototype
	overwriteCreateCanvas.call(this);
	attachResizeEvents.call(this);
}

function onpre() {
	centerOrigin.call(this);
}

function onremove() {
	removeLibrary.call(this);
}

export default {
	oninit,
	onpre,
	onremove
}