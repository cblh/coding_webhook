var http = require('http')
var createHandler = require('coding-webhook-handler')
var handler = createHandler({
    path: '/webhook',
    token: 'mytoken' // maybe there is no token
})

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
    console.log(event.event)
    console.log(event.payload)
    console.log(event.protocol)
    console.log(event.host)
    console.log(event.url)
})

handler.on('push', function(event) {
    console.log(event)
})

handler.on('star', function(event) {
    console.log(event)
})