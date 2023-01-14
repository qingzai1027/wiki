服务端又称后端，server端
get请求获取数据，post请求提交数据
url:后端接口的地址，即前端Ajax请求时的地址
request：请求    response：返回/响应
路由是服务端的入口规则
路由包含：定义method（get/post）、定义url规则（/api/list、/api/create）、定义输入(Request body)和输出(Reponse body)规则
通过Request可获取：method url body    通过Response可设置：状态码,Content-type,body