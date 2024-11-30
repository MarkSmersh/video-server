import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
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
