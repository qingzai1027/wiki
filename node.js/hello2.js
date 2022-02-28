const http = require('http')

// req Request，res Response
const server = http.createServer((req, res) => {
    const url = req.url 
    console.log('url is: ', url) 
    res.end('hello world') 
})

server.listen(3000) // 
console.log('http 请求已经被监听，3000 端口， 请访问 http://localhost:3000')
http://localhost:3000/api/list?