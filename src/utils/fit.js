// https://en.wikipedia.org/wiki/Smoothstep
export const fitSmoothStep = (n) => n * n * (3.0 - 2.0 * n);

export const fitSmootherStep = (n, e0 = 0, e1 = 1) => {
	const t = Math.max(Math.min((n - e0) / (e1 - e0), 1.0), 0.0);
	return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}
