import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss'
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const postcssConfig = 
{
	extract: true,
  modules: true,
}
process.env.NODE_ENV === 'production';
export default 
[
	{
		input: "./src/background/background.ts",
		output:
		{
			file: "build/background_T.js",
			format: "es",
		},
		plugins: [typescript()]
	},
	{
		input: "./src/foreground/html/settings/settings.tsx",
		output:
		{
			file: "./build/html/settings/settings_T.js",
			format: "es",
		},
		plugins: [commonjs(), typescript(), nodeResolve(), postcss(postcssConfig)]
	}
]
