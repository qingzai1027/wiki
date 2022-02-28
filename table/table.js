const { appendFile } = require('fs')
const http = require('http')

let mysql = require('mysql')
// console.log(mysql)
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'panjunqing',
})
// console.log('=============================================================')
// console.log(connection)

connection.connect((err) => {
  if (err) {
    // console.log('连接失败：' + err.stack)
    return
  }
//   console.log('连接成功')
})
// connection.end();

var sql = 'select * from people'

const server = http.createServer((req, res) => {
  const url = req.url
  const path = url.split('?')[0]
  

  function handle_query(err, result){
     if (err) {
        console.log('查询失败' + err.message)
        return
      }
      var output="";
      for(var i=0;i<result.length;i++)
      {
          

            output+= result[i]["id"]+"##"+result[i]["name"]+"##"+result[i]["sex"];            
            output+= "\n";            
      }
    //   console.log(result[0]["name"])
      res.end(output)
  }

  connection.query(sql, handle_query)



})

server.listen(3000)