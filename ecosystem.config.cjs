// used for pm2

module.exports = {
	apps: [
		{
			name: 'video-server',
			script: 'npm',
			args: 'run server',
			instances: 'max',
			exec_mode: 'cluster',
			env_production: {
				NODE_ENV: 'production',
				PORT: 80
			}
		}
	]
};
