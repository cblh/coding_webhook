var http = require('http')
var createHandler = require('coding-webhook-handler')
var process = require('child_process');
var path = require('path');
var handler = createHandler({
    path: '/webhook',
    token: 'mytoken' // maybe there is no token
})

var config = {
    projectPathRoot :'/data/sites/install/',
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
        var cwd = path.join(config.projectPathRoot,event.payload.repository.name)
        process.exec('sh p', {'cwd':cwd},
            function (error, stdout, stderr) {
                console.log('stdout========================\n' + stdout);
                console.log('stderr========================\n' + stderr);
                console.log(error);
                //if (error !== null) {
                //} else {
                //}
            });
})

handler.on('star', function(event) {
    console.log(event)
})