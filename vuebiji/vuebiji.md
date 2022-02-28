## 框架和库的区别

```
框架：是一套完整的技术解决方案；对项目侵入性较大，依赖性强，项目如果需要更换框架，则需要重新架构整个项目。

库（插件）：提供某一个小功能，对项目侵入性较小，如果库无法完成某些需求，可以很容易切换到其他实现。（例如：1.从JQuery切换到Zepto；2.从EJS切换到art-Template）
```

## Node（后端）中的MVC与前端中的MVVM之间的区别

### MVC是后端的分层开发概念：M指Model，主要是指数据模型的管理CRUD操作。V指View，指视图可以理解为前端。C指Controller层，指控制器层，主要包含将数据模型加工处理后传递到视图层渲染的控制器。

### MVVM 是前端视图层的分层开发思想，主要把每个页面，分成了M、V和VM，其中，VM是MVVM的核心；因为VM是M和V之间的调度者；M指每个页面中单独的数据，V就是每个页面中的HTML结构，ViewModel它是一个调度者，分割了M和V。前端页面中使用MVVVM的思想名主要是为了让我们开发更加方便，因为MVVM提供了数据的双向绑定。数据的双向绑定是由VM提供的。

### View层：

```
   1、 视图层

   2、在前端开发中，通常就是DOM层

   3、主要的作用是给用户展示各种信息。
```



### Model层：

```
1、数据层

2、数据可能是我们固定的死数据，更多的是来自我们服务器，从网路上请求下来的数据
```



### VueModel层：

```
1、视图模型层

2、试图模型层是View 和 Model沟通的桥梁

3、一方面实现了DataBinding，将Model的改变实时反应到View中

4、另一方面实现了DOMListener，DOM监听，当DOM发生一些事件时，可以监听到，并在需要的情况下改变对应的Data
```



### 生命周期

每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子(hook)的函数，这给了用户在不同阶段添加自己的代码的机会。



### 插值操作

#### mustache(胡须)语法

通过使用双大括号包裹data中的key的方式，插入Vue实例绑定的数据。

```bash
<span>Message: {{ msg }}</span>
```

Mustache 标签将会被替代为对应数据对象上 `msg` property 的值。无论何时，绑定的数据对象上 `msg` property 发生了改变，插值处的内容都会更新。



### 事件监听

在前端开发中，需要经常和用户的行为事件进行交互，在这时就必须监听用户行为发生的事件，在Vue中主要使用v-on指令进行事件监听

```
#### v-on

作用：绑定事件监听器

简写:`@`

预期: Function | Inline Statement | Object

参数：event
```

当通过methods中定义方法，以提供@click调用时，需要注意参数问题:

1. 情况一：如果该方法不需要额外的参数，那么方法后的()可以省略。
2. 情况二：若需要传递多个参数，需要手动获取浏览器的event对象:$event

```
stop修饰符的使用
阻止事件冒泡，可以为`@事件`加上修饰符`@事件.stop`
```

```
prevent修饰符的使用
阻止网页元素的事件默认行为，例如form表单自动提交
```

```
{keyCode | keyAlias}修饰符
只当事件时从特定键触发时才触发回调。
```

```
native 监听组件根元素的原生事件(自定义组件)
once 只触发一次回调
```





#### 表单绑定v-model

Vue中使用v-model指令来实现表单元素和数据的双向绑定。

input中的内容与Vue中的变量进行双向绑定，当一方修改，另一方跟着同步。

```bash
1、v-model:text

2、v-model:radio

3、v-model:checkbox 用数组保存

4、v-model:select 单选，绑定到select元素上，多选加上 multiple
```



##### 值绑定

```bash
<label v-for="item in originHobbies" :for="item">
    <inout type="checkbox" :value="item" :id="item" v-model="hobbies">{{item}}
</label>
```

##### 修饰符

```bash
1、azy 当用户敲击回车或者该元素失去焦点时同步数据到data变量

2、number 限制元素的内容数据类型

3、trim
```





### WebPack

```bash
Webpack是一个现代的JavaScript应用的静态模块打包工具

1、依赖于node环境和npm工具

2、将npm包保存到 开发环境 --save -dev

3、配置webpack配置文件，即可直接使用webpack文件
```



#### loader

```bash
loader是webpack中一个非常核心的概念

loader主要是将js、css、图片、ES6->ES5,TS->ES5,scss\less->css，.jsx、.vue文件转成.js文件
```

使用步骤：

步骤一:通过npm安装需要使用的loader

步骤二：webpack.config.js中的modules关键字下进行配置

1、css-loader只负责将css文件进行加载

2、style-loader负责将样式添加到DOM中

3、less-loader less预处理

4、url-loader 使用url加载的文件

5、option ：limit 小于limit会将图片编译为base64字符串形式。超过了则需要使用file-loader

6、babel-loader 将ES6语法转换为ES5，提高代码浏览器兼容性

7、vue-loader、vue-template-compiler

8、使用多个loader时，是从右向左





#### webpack配置vue

在webpack.config.json中为配置对象添加resolve属性，包含alias别名

```bash
resolve: {
    alias: {
        'vue$': 'vue/dist/vue.esm.js'
    }
}
```





#### 插件 plugin

plugin通常用于对现有的架构进行扩展

webpack中的插件就是对webpack现有功能的各种扩展，比如打包优化，文件压缩。

```bash
loader和plugin的区别

1、loader主要用于转换某些类型的模块，它是一个转换器

2、plugin是插件，它是对webpack本身的扩展，是一个扩展器
```



使用步骤：

一、提高npm安装需要使用的plugins

二、在webpack.config.js中的plugins中配置插件

常用插件：

1、添加版权 BannerPlugin

2、将index.html打包到dist文件夹中，使用HtmlWebpackPlugin插件

​      2.1.自动生产一个index.html文件(可以指定模板来生成)

​      2.2. 将打包的js文件，自动通过script标签插入到body中

压缩js:uglifyjs-webpack-plugin

   搭建本地服务器: devserver

```bash
npm install --save -dev webpack-dev-server@2.9.1

contentBase:为哪一个文件夹提供本地服务，默认是根目录

port: 端口号

inline : 页面实时刷新

historyApiFallback：在SPA页面中，依赖HTML5的history模式。

webpack-merge 用于合并配置文件
```





#### vue-router的安装和使用

```bash
 安装vue-router
     npm install vue-router --save
 在模块化工程中使用它
     1.导入路由对象，并且调用Vue.use(VueRouter)
     2.创建路由实例，并且传入路由映射配置
     3.在Vue实例中挂载创建的路由实例
 使用vue-router的步骤:
     第一步:创建路由组件
     第二步:配置路由映射:组件和路径映射关系
     第三步:使用路由:通过<router-link>和<router-view>
     默认情况下，第一次访问网页希望展示首页的内容，只需要在映射关系中多配置一个默认映射即可，path配置的是根路      径:/,redirect是重定向，也就是将路径重定向到/home的路径下
 router-link其他属性:
     tag:tag可以指定<router-link>之后渲染成什么组件
     replace:replace不会留下history记录，所以指定replace
     active-class="active" 修改active类名
     在映射表中vue-router实例处添加属性:linkActiveClass:"自定义激活类名"
 通过代码修改router
     this.$router.push('/home')` / `this.$router.replace('/about')
 通过代码统一修改active-class属性类名
```





### Vuex

官方解释:Vuex是一个专门为Vue.js应用程序开发的状态管理模式。

```
采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化
 
Vuex也集成到Vue的官方调试工具devtools extension，提供了诸如零配置的time-travel调试、状态快照的导入导出等高级调试功能。

可以简单理解为把需要多个组件共享的变量全部存储在一个对象里面，然后将对象放在顶层的Vue示例中，让其他组件可以使用
Vuex最大的优点是响应式。

state、action(异步操作)、view、

mutation(操作)，通过$store.commit('mutation中的方法')来修改状态
 
通过提交mutation的方法，而非直接修改state中的数据，便于更明确的追踪。
 
不要再mutation中使用异步操作，devtools无法进行跟踪，若需要用异步操作推荐action ，调用mutation使用dispatch()方法

Module用于将store分割为模块，每个模块拥有自己的state、mutation、action、getters等，取出时直接再state中取用模块，引用根store时，传递root参数
```

## Axios

简单使用

```bash
axios({
    url: 'http://123.207.32.32:8000/home/multidata' 
}).then(res => {
    console.log(res);
})
```

传参使用

```bash
axios({
    url: 'http://123.207.32.32:8000/data?type=sell&page1 
}).then(res => {
    console.log(res);
})
```

创建axios实例用于区分不同ip的数据请求。

由于Vue.js是一个视图层框架且严格准守SoC (关注度分离原则)，所以Vue.js并不包含Ajax的通信功能，为了解决通信问题，作者单独开发了一个名为vue-resource的插件，不过在进入2.0 版本以后停止了对该插件的维护并推荐了Axios 框架。少用jQuery，因为它操作Dom太频繁 !

模拟Json数据：

```bash
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

```bash
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



# Vue基本语法

## 1、v-bind

 现在数据和DOM已经被建立了关联，所有的东西都是响应式的。我们在控制台操作对象的属性，界面可以实时更新。

 我们可以使用`v-bind`来绑定元素属性！

```bash
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<p>狂神说Java</p>

<!--view层 模板-->
<div id="app">
    <span v-bind:title="message">鼠标悬停几秒钟查看此处动态绑定的提示信息！</span>
</div>
</body>

<!--导入js-->
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.21/dist/vue.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            message: "hello,vue"
        }
    })
</script>
</html>

```



## 2、v-if  v-else

```bash
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <title>Title</title>
</head>
<body>
<p>狂神说Java</p>

<!--view层 模板-->
<div id="app">
   <h1 v-if="type==='A'">A</h1>
   <h1 v-else-if="type==='B'">B</h1>
   <h1 v-else>C</h1>
</div>
</body>

<!--导入js-->
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.21/dist/vue.min.js"></script>
<script>
   var vm = new Vue({
       el: "#app",
       data: {
           type: "A"
       }
   })
</script>
</html>

```



## 3、v-for

```bash
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<p>狂神说Java</p>

<!--view层 模板-->
<div id="app">
    <li v-for="item in items">
        姓名：{{item.name}}，年龄：{{item.age}}
    </li>
</div>
</body>

<!--导入js-->
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.21/dist/vue.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            items: [
                {name: "zhangsan", age: 12},
                {name: "lisi", age: 10},
                {name: "wangwu", age: 16}
            ]
        }
    })
</script>
</html>

```



## 4、v-on

```bash
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<p>狂神说Java</p>

<!--view层 模板-->
<div id="app">
    <button v-on:click="sayHi">Click Me</button>
</div>
</body>

<!--导入js-->
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.21/dist/vue.min.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            message: "你点我干嘛？"
        },
        methods: {
            //方法必须绑定在Vue的Methods对象中，v-on:事件
            sayHi: (function (event) {
                alert(this.message)
            })
        }
    })
</script>
</html>

```



# vue + ElementUI

### 1、创建一个名为 hello-vue 的工程

```bash
vue init webpack hello-vue
```

### 2、安装依赖，我们需要安装 `vue-router`、`element-ui`、`sass-loader` 和`node-sass` 四个插件

```bash
# 进入工程目录
cd hello-vue
# 安装 vue-router
npm install vue-router --save-dev
# 安装 element-ui
npm i element-ui -S
# 安装依赖
npm install
# 安装 SASS 加载器
cnpm install sass-loader node-sass --save-dev
# 启动测试
npm run dev	
```

### 3、Npm命令解释

1、npm install moduleName：安装模块到项目目录下

2、npm install -g moduleName：-g 的意思是将模块安装到全局，具体安装到磁盘的哪个位置，要看 npm config prefix的位置

3、npm install moduleName -save：–save的意思是将模块安装到项目目录下，并在package文件的dependencies节点写入依赖，-S为该命令的缩写

4、npm install moduleName -save-dev：–save-dev的意思是将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖，-D为该命令的缩写



### 4、创建成功后用idea打开，并删除净东西 创建views和router文件夹用来存放视图和路由

### 5、在views创建Main.vue

Main.vue:

```bash
<template>
  <h1>首页</h1>
</template>
<script>
    export default {
        name: "Main"
    }
</script>
<style scoped>
</style>

```

### 6、在views中创建Login.vue视图组件

**Login.vue:**（用的ElementUI中的代码）

```bash
<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        form: {
          username: '',
          password: ''
        },

        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          username: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        },

        // 对话框显示和隐藏
        dialogVisible: false
      }
    },
    methods: {
      onSubmit(formName) {
        // 为表单绑定验证功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
            this.$router.push("/main");
          } else {
            this.dialogVisible = true;
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>

```

### 7、创建路由

在 router 目录下创建一个名为 index.js 的 vue-router 路由配置文件

index.js：

```bash
import Vue from "vue";
import Router from "vue-router";
import Main from "../views/Main";
import Login from "../views/Login";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/main',
      component: Main
    },
    {
      path: '/login',
      component: Login
    }
  ]
});

```

### 8、在main.js中配置相关

main.js是index.html调用的 所以前面注册的组件要在这里导入

一定不要忘记扫描路由配置并将其用到new Vue中

main.js:

```bash
import Vue from 'vue'
import App from './App'
//扫描路由配置
import router from './router'
//导入elementUI
import ElementUI from "element-ui"
//导入element css
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(router);
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  render: h => h(App),//ElementUI规定这样使用
})

```

### 9、在App.vue中配置显示视图

App.vue :

```bash
<template>
  <div id="app">
    <router-link to="/login">login</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
}
</script>

```

### 10、测试运行

```bash
npm run dev
```

```
> 测试：在浏览器打开 http://localhost:8080/#/login
> 如果出现错误: 可能是因为sass-loader的版本过高导致的编译错误，当前最高版本是8.0.2，需要退回到7.3.1 ；
> 去package.json文件里面的 "sass-loader"的版本更换成7.3.1，然后重新cnpm install就可以了；
```

