import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type PluginOption } from 'vite';

const endBuildPlugin: PluginOption = {
	name: 'endBuildPlugin',
	closeBundle() {
		console.log('Bundle closed');
		process.exit(0);
	}
};

export default defineConfig({
	plugins: [endBuildPlugin, sveltekit()],
	build: {
		modulePreload: true
	},
	server: {
		proxy: {
			'/socket.io': {
				target: 'http://localhost:1488',
				ws: true
			},
			'/api': {
				target: 'http://localhost:1488'
			}
		}
	}
});
