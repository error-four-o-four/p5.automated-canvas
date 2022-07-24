import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";

import pkg from "./package.json";

const input = ["src/index.js"];

export default [
	{
		// UMD minified
		input,
		output: {
			file: `dist/${pkg.name}.min.js`,
			format: "umd",
			name: "p5AC",
			esModule: false,
			exports: "named",
			sourcemap: true,
		},
		plugins: [
			nodeResolve(),
			babel({
				babelHelpers: "bundled",
			}),
			terser(),
		],
	},
	{
		// ESM and CJS
		input,
		output: [
			{
				file: `dist/${pkg.name}.esm.js`,
				format: "esm",
				exports: "named",
				sourcemap: true,
			},
			{
				file: `dist/${pkg.name}.cjs.js`,
				format: "cjs",
				exports: "named",
				sourcemap: true,
			},
		],
		plugins: [nodeResolve()],
	},
];