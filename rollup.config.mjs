import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss'
import del from 'rollup-plugin-delete'
import copy from 'rollup-plugin-copy'

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


export default 
[
	{
		input: "./src/background/background.ts",
		output:
		{
			file: "build/background.js",
			format: "es",
		},
		plugins: [commonjs(), typescript(),nodeResolve(), del(delConfig), copy(copyConfigBackground)]
	},
	{
		input: "./src/foreground/html/settings/settings.tsx",
		output:
		{
			file: "./build/html/settings/settings.js",
			format: "es",
		},
		plugins: [commonjs(), typescript(), nodeResolve(), postcss(postcssConfig), copy(copyConfigForegroundSettings)]
	}
]

