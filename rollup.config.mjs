import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';

import del from 'rollup-plugin-delete'
import copy from 'rollup-plugin-copy'
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss'

const postcssConfig = 
{
	extract: true,
  modules: true,
}
const delConfig =
{
	targets: ['./build/*']
}
const copyConfigBackground = 
{
	targets: [ { src: "./src/background/manifest.json", dest:"./build" } ]
}
const copyConfigForegroundSettings =
{
	targets: [ {src: "./src/foreground/html/settings/*.html", dest: "./build/html/settings"}]
}
const replaceConfig = 
{
	preventAssignment: false,
	"process.env.NODE_ENV": '"development"'
}

export default 
[
	{
		input: "./src/background/background.ts",
		output:
		{
			file: "build/background.js",
			format: "es",
		},
		plugins: [commonjs(), typescript(), nodeResolve(), del(delConfig), copy(copyConfigBackground)]
	},
	{
		input: "./src/foreground/html/settings/settings.tsx",
		output:
		{
			file: "./build/html/settings/settings.js",
			format: "es",
		},
		plugins: [commonjs(), typescript(), nodeResolve(), replace(replaceConfig), postcss(postcssConfig), copy(copyConfigForegroundSettings)]
	}
]

