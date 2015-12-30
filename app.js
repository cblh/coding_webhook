var http = require('http')
var createHandler = require('coding-webhook-handler')
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
        process.exec('git pull', {'cwd':'/home/coding/workspace'},
            function (error, stdout, stderr) {
                console.log('stdout========================\n' + stdout);
                console.log('stderr========================\n' + stderr);
                if (error !== null) {
                    res.send('<pre>fail!!!\n' + stdout + error + '</pre>');
                } else {
                    process.exec(config.afterPullCommand, {'cwd':config.projectPath},
                        function(error, stdout, stderr){
                            if (error !== null) {
                                res.send('<pre>fail!!!\n' + stdout + error + '</pre>');
                            } else {
                                res.send('<pre>done!!!\n' + stdout + '</pre>');
                            }
                        });
                }
            });
    }
})

handler.on('star', function(event) {
    console.log(event)
})