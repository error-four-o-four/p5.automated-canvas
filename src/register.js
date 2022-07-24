import { centerOrigin } from './rendering.js';
import { attachResizeEvents } from './environment.js';
import { removeLibrary } from './remove.js';

const methods = {
	init,
	pre,
	// remove
}

export default function(p5) {
	for (const key of Object.keys(methods)) {
		p5.prototype.registerMethod(key, methods[key]);
	}
}

function init() {
	attachResizeEvents.call(this);
}

function pre() {
	centerOrigin.call(this);
}

// function remove() {
// 	removeLibrary.call(this);
// }