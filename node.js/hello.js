const http = require('http')
const server = http.createServer((req, res) => {
    const url = req.url 
    const path = url.split('?')[0] 
    res.end(path + '1234')
})

server.listen(3000)
console.log('server listening on 3000 port')
