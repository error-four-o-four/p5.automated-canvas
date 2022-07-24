import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

// import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";

import pkg from "./package.json";

const input = ["src/index.js"];

export default [
	{
		input,
		output: {
			name: 'p5AC',
			file: `dist/${pkg.name}.js`,
			format: 'iife',
			sourcemap: true,
		},
		plugins: [resolve(), commonjs()]
	},
	// miinified
	{
		input,
		output: {
			name: 'p5AC',
			file: `dist/${pkg.name}.min.js`,
			format: 'iife',
			sourcemap: true,
		},
		plugins: [
			resolve(),
			commonjs(),
			terser(),
			babel({
				babelHelpers: "bundled",
			}),
		]
	},
	// cjs (webpack, vite)
	{
		input,
		output: {
			file: `dist/cjs/${pkg.name}.js`,
			format: 'cjs',
			sourcemap: true,
			exports: 'default',
		},
		plugins: [resolve(), commonjs()]
	},
	// esm
	{
		input,
		output: [
			{
				file: `dist/esm/${pkg.name}.js`,
				format: "esm",
				exports: "default",
				sourcemap: true,
			}
		],
		plugins: [resolve()],
	}
];

// export default [
// 	{
// 		// UMD minified
// 		input,
// 		output: {
// 			file: `dist/${pkg.name}.min.js`,
// 			format: "umd",
// 			name: "p5AC",
// 			esModule: false,
// 			exports: "named",
// 			sourcemap: true,
// 		},
// 		plugins: [
// 			nodeResolve(),
// 			babel({
// 				babelHelpers: "bundled",
// 			}),
// 			terser(),
// 		],
// 	},
// 	{
// 		// ESM and CJS
// 		input,
// 		output: [
// 			{
// 				file: `dist/${pkg.name}.esm.js`,
// 				format: "esm",
// 				exports: "named",
// 				sourcemap: true,
// 			},
// 			{
// 				file: `dist/${pkg.name}.cjs.js`,
// 				format: "cjs",
// 				exports: "named",
// 				sourcemap: true,
// 			},
// 		],
// 		plugins: [nodeResolve()],
// 	},
// ];