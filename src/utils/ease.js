export const easeCubicIn = (n) => n * n * n;

export const easeCubicOut = (n) => {
	const v = (n - 1);
	return v * v * v + 1;
}
export const easeCubicInOut = (n) => {
	if(n >= 0.5) {
		var v = ((2 * n) - 2);
		return(0.5 * v * v * v + 1);
	}
	return(4 * n * n * n);
}
