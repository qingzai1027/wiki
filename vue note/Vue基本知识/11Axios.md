简单使用

```vue
axios({
    url: 'http://123.207.32.32:8000/home/multidata' 
}).then(res => {
    console.log(res);
})
```

传参使用

```vue
axios({
    url: 'http://123.207.32.32:8000/data?type=sell&page1 
}).then(res => {
    console.log(res);
})
```

创建axios实例用于区分不同ip的数据请求。

由于Vue.js是一个视图层框架且严格准守SoC (关注度分离原则)，所以Vue.js并不包含Ajax的通信功能，为了解决通信问题，作者单独开发了一个名为vue-resource的插件，不过在进入2.0 版本以后停止了对该插件的维护并推荐了Axios 框架。少用jQuery，因为它操作Dom太频繁 !

模拟Json数据：

```vue
{
  "name": "weg",
  "age": "18",
  "sex": "男",
  "url":"https://www.baidu.com",
  "address": {
    "street": "文苑路",
    "city": "南京",
    "country": "中国"
  },
  "links": [
    {
      "name": "bilibili",
      "url": "https://www.bilibili.com"
    },
    {
      "name": "baidu",
      "url": "https://www.baidu.com"
    },
    {
      "name": "cqh video",
      "url": "https://www.4399.com"
    }
  ]
}

```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<!--view层 模板-->
<div id="vue">
    <div>{{info.name}}</div>
    <a v-bind:href="info.url">点我进入</a>
</div>
</body>

<!--1.导入vue.js-->
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.21/dist/vue.min.js"></script>
<!--导入axios-->
<script src="https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script>

    var vm = new Vue({
        el: "#vue",
        data: {
            items: ['Java','Python','Php']
        },
        //data:vm的属性
        //data():vm方法
        data(){
            return{
                //请求的返回参数,必须和json字符串一样
               info:{
                   name: null,
                   age: null,
                   sex: null,
                   url: null,
                   address: {
                       street: null,
                       city: null,
                       country: null
                   }
               }
            }
        },
        //钩子函数，链式编程，ES6新特性
        mounted(){
            axios.get("../data.json").then(res => (this.info=res.data))
        }
    })
</script>
</html>

```

