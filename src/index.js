import { _initContext } from "./initRendererGL.js";

import overwriteCreateCanvas from './rendering.js';
import addProperties from './properties.js';
import addMethods from './methods.js';
import registerMethods from './register.js';

function initialize(p5) {
	overwriteCreateCanvas(p5);

	addProperties(p5);
	addMethods(p5);
	registerMethods(p5);

	p5.RendererGL.prototype._initContext = _initContext;
}

if (window.p5 !== undefined) initialize(window.p5);

export default initialize;