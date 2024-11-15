import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss'

const postcssConfig = 
{
	extract: true,
  modules: true,
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
		plugins: [typescript()]
	},
	{
		input: "./src/foreground/html/settings/settings.tsx",
		output:
		{
			file: "./build/html/settings/settings.js",
			format: "es",
		},
		plugins: [commonjs(), typescript(), nodeResolve(), postcss(postcssConfig)]
	}
]
