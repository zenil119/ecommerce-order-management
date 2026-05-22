module.exports = {
    apps: [
        {
            name: 'backend',
            script: './src/server.js',
            instances: 1,
            exec_mode: 'fork',
            watch: false,
            autorestart: true,
            max_memory_restart: '500M',
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            }
        }
    ]
}