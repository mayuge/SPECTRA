module.exports = {
    apps: [{
        name: 'test-app',
        script: 'node_modules/next/dist/bin/next',
        args: 'start -p 3000',
        cwd: "./NozawaOpenDataProject",
        instances: 1,
        watch: false,
    }]
};
