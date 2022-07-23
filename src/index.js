import { _initContext } from "./core/initRendererGL.js";
import { onInit, onPre, onRemove } from './core/register.js';
import { isWindowResizing } from './core/environment.js';

import {
	toggleLoop,
	toggleFullscreen,
} from './core/methods.js';

(function initialize() {
	if (!Object.hasOwn(window, 'p5')) throw Error('p5 not found! Please make sure to add the p5 library.');

	/**@todo doublecheck instance mode !! */

	p5.prototype.registerMethod('init', onInit);
	p5.prototype.registerMethod('pre', onPre);
	p5.prototype.registerMethod('remove', onRemove);

	p5.prototype.isWindowResizing = isWindowResizing;

	p5.prototype.toggleLoop = toggleLoop;
	p5.prototype.toggleFullscreen = toggleFullscreen;

	p5.RendererGL.prototype._initContext = _initContext;
})();

export * from './utils/ease.js';
export * from './utils/fit.js';
export * from './utils/map.js';
export * from './utils/random.js';