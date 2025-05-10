module.exports = {
    apps: [{
        name: 'spectra-app',
        script: 'node_modules/next/dist/bin/next',
        args: 'dev -p 3111',
        cwd: "./NozawaOpenDataProject",
        instances: 1,
        watch: false,
    }]
};
