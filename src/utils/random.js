export const randomInt = () => 0;

export const randomAngle = () => 2 * Math.PI * Math.random();

export const randomBool = (m) => {
	m = (isNaN(m)) ? 0.5 : m;
	return m < Math.random();
};

export const randomPick = (arr, inPlace = false) => {
	const i = Math.floor(arr.length * Math.random());
	return (inPlace) ? arr.splice(i, 1): arr[i];
}