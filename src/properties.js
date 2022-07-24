export const types = ['full', 'square'];

const settings = {
	type: types[0],
	margin: 0,
	centered: false,
	renderer: undefined,

	doResize: true,
	debouncedResizeDelay: 600,
}

const properties = [
	{name: '_isResizing', value: false},
	{name: 'resizeRatio', value: 1},
	{name: 'resizeRatioX', value: 1},
	{name: 'resizeRatioY', value: 1},
	{name: 'widthHalf', value: 1},
	{name: 'heightHalf', value: 1},
]

export default function(p5) {
	p5.prototype._settings = settings;

	for (const {name, value} of properties) {
		p5.prototype[name] = value;
	}
}
