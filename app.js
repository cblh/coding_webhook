var http = require('http')
var createHandler = require('coding-webhook-handler')
var process = require('child_process');
var handler = createHandler({
    path: '/webhook',
    token: 'mytoken' // maybe there is no token
})

var config = {
    projectPath :'/data/sites/install/coding_webhook',
    afterPullCommand:'npm run start'
}

http.createServer(function(req, res) {
    handler(req, res, function(err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(7777)

handler.on('error', function(err) {
    console.error('Error:', err.message)
})

handler.on('*', function(event) {
})

handler.on('push', function(event) {
    console.log(event)
    if(event&&event.payload&&event.payload.ref === 'master'){
        process.exec('git pull origin master', {'cwd':config.projectPath},
            function (error, stdout, stderr) {
                console.log('stdout========================\n' + stdout);
                console.log('stderr========================\n' + stderr);
                if (error !== null) {
                } else {
                    process.exec(config.afterPullCommand, {'cwd':config.projectPath},
                        function(error, stdout, stderr){
                        });
                }
            });
    }
})

handler.on('star', function(event) {
    console.log(event)
})