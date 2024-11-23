import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type PluginOption, type ViteDevServer } from 'vite';
import { socketServer } from './socket';

const webSocketServer: PluginOption = {
	name: "webSocketServer",
	configureServer(server: ViteDevServer) {
		return socketServer(server)
	}
}

export default defineConfig({
	plugins: [webSocketServer, sveltekit()],
});
