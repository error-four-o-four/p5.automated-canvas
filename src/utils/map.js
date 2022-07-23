export const mapDbToLinear = (v) => Math.pow(10, (v / 20));

export const mapLinearToDb = (v) => Math.log(v) * 20;