import { centerOrigin, overwriteCreateCanvas } from './rendering.js';
import { attachResizeEvents } from './environment.js';
import { removeLibrary } from './remove.js';

export function onInit() {
	// this === p5.prototype
	overwriteCreateCanvas.call(this);
	attachResizeEvents.call(this);
}

export function onPre() {
	centerOrigin.call(this);
}

export function onRemove() {
	removeLibrary.call(this);
}