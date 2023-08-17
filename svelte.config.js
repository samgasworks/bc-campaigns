import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
        enableSourcemap: true
    },
	preprocess: preprocess(
		preprocess({
			sourceMap: true,
			postcss: true
		})
	),

	kit: {
		adapter: adapter()
	}
};

export default config;
