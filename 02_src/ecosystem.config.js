module.exports = {
    apps: [{
        name: 'test-app',
        script: 'node_modules/next/dist/bin/next',
        args: 'dev -p 3000', // 本番運用時は、startに変更
        cwd: "./NozawaOpenDataProject",
        instances: 1,
        watch: false,
    }]
};
