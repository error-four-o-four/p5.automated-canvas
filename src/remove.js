export function removeLibrary() {
	const keys = ['_settings', 'widthHalf', 'heightHalf'];

	for (const k of keys) this._setProperty(k, null);

	const fns = ['triggerResize', 'finishResize'];

	for (const f of fns) window.removeEventListener('resize', f);
}