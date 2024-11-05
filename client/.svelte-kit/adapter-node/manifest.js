export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.Dc70oWe2.js","app":"_app/immutable/entry/app.xtrOsIiY.js","imports":["_app/immutable/entry/start.Dc70oWe2.js","_app/immutable/chunks/entry.BwPAc-Lm.js","_app/immutable/chunks/runtime.BQEIYVZe.js","_app/immutable/entry/app.xtrOsIiY.js","_app/immutable/chunks/runtime.BQEIYVZe.js","_app/immutable/chunks/render.peUuYpeR.js","_app/immutable/chunks/disclose-version.BMO508ZJ.js","_app/immutable/chunks/index-client.BbKE-Vs4.js","_app/immutable/chunks/store.B5NPNz2T.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/end",
				pattern: /^\/api\/end\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/end/_server.ts.js'))
			},
			{
				id: "/api/info",
				pattern: /^\/api\/info\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/info/_server.ts.js'))
			},
			{
				id: "/api/med",
				pattern: /^\/api\/med\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/med/_server.ts.js'))
			},
			{
				id: "/api/player",
				pattern: /^\/api\/player\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/player/_server.ts.js'))
			},
			{
				id: "/api/set",
				pattern: /^\/api\/set\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/set/_server.ts.js'))
			},
			{
				id: "/api/start",
				pattern: /^\/api\/start\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/start/_server.ts.js'))
			},
			{
				id: "/api/updates",
				pattern: /^\/api\/updates\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/updates/_server.ts.js'))
			},
			{
				id: "/api/videos",
				pattern: /^\/api\/videos\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/videos/_server.ts.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base = "";