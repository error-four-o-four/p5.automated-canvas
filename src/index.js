import { _initContext } from "./initRendererGL.js";

import registeredMethods from './register.js';
import methods from './methods.js';

function initialize() {
	/**@todo doublecheck instance mode !! */

	for (const name of Object.keys(registeredMethods)) {
		p5.prototype.registerMethod(name.substring(2), registeredMethods[name]);
	}

	for (const name of Object.keys(methods)) {
		p5.prototype[name] = methods[name];
	}

	p5.RendererGL.prototype._initContext = _initContext;
}

if (window.p5 !== undefined) initialize();

export default initialize;