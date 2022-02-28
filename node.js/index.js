const http = require('http')

function a(req,res) {
    const url = req.url
    const path = url.split('?')[0]
    const method = req.method

    console.log(url.split('?'))
    console.log(typeof(url.split('?'))) 
    // console.log("panjunqing", path, method)
    // console.log("data is ", url.split('?')[1])

    if (path ==='/aaa' && method==='GET'){
        var ret = 'path is ' + url.split('?')[0] + "\n"
        var data = url.split('?')
        for(var i=1; i<data.length; i++){
            ret += "data is " + data[i] + "\n";
        }
        res.end(ret)
    }

    if (path === '/bbb'){
         res.end('path is ' + url.split('?')[0] + "\n" + 
                'data is ' + url.split('?')[1])
    }
}

http.createServer(a).listen(4000)