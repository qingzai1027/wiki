Vue Router是Vue.js官方的路由管理器（路径跳转）。它和Vue.js的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有:

```
1、嵌套的路由/视图表
2、模块化的、基于组件的路由配置
3、路由参数、查询、通配符
4、基于Vue.js过渡系统的视图过渡效果
5、细粒度的导航控制
6、带有自动激活的CSS class的链接
7、HTML5历史模式或hash模式，在IE9中自动降级
```

### 1、安装

基于第一个vue-cli进行测试学习;先查看node_modules中是否存在 vue-router
vue-router 是一个插件包，所以我们还是需要用 npm/cnpm 来进行安装的。打开命令行工具，进入你的项目目录，输入下面命令。

```
npm install vue-router --save-dev
```


 安装完之后去node_modules路径看看是否有vue-router信息，有的话则表明安装成功。

### 2、vue-router demo实例

1、将之前案例由vue-cli生成的案例用idea打开

2、清理不用的东西 assert下的logo图片 component定义的helloworld组件 我们用自己定义的组件

3、清理代码 以下为清理之后的代码 src下的App.vue 和main.js以及根目录的index.html
这三个文件的关系是 index.html 调用main.js 调用App.vue

index.html:

```bash
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>myvue</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

main.js:

```bash
import Vue from 'vue'
import App from './App'
import router from './router' //自动扫描里面的路由配置

Vue.config.productionTip = false

new Vue({
  el: '#app',
  //配置路由
  router,
  components: { App },
  template: '<App/>'
})
```

App.vue:

```bash
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>迪师傅</h1>

    <router-link to="/main">首页</router-link>
    <router-link to="/content">内容页</router-link>
    <router-link to="/kuang">Kuang</router-link>
    <router-view></router-view>

  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

4、在components目录下创建一个自己的组件Content,Test,Main(这两个和Content内容一样的就不放示例代码了

Content.vue:

```bash
<template>
  <h1>内容</h1>
</template>

<script>
    export default {
        name: "Content"
    }
</script>

<style scoped>

</style>
```

5、安装路由,在src目录下,新建一个文件夹 : router,专门存放路由 index.js(默认配置文件都是这个名字)

```bash
import Vue from "vue";
import VueRouter from "vue-router";
import Content from "../components/Content";
import Main from "../components/Main";
import Kuang from "../components/Kuang";

//安装路由
Vue.use(VueRouter);

//配置导出路由
export default new VueRouter({
  routes: [
    {
      //路由路径
      path: '/content',
      name: 'content',
      //跳转的组件
      component: Content
    },
    {
      //路由路径
      path: '/main',
      name: 'main',
      //跳转的组件
      component: Main
    },
    {
      //路由路径
      path: '/kuang',
      name: 'kuang',
      //跳转的组件
      component: Kuang
    }
  ]
})
```

6、在main.js中配置路由

main.js:

```bash
import Vue from 'vue'
import App from './App'
import router from './router' //自动扫描里面的路由配置

Vue.config.productionTip = false

new Vue({
  el: '#app',
  //配置路由
  router,
  components: { App },
  template: '<App/>'
})
```

7、在App.vue中使用路由

App.vue:

```bash
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>迪师傅</h1>

    <router-link to="/main">首页</router-link>
    <router-link to="/content">内容页</router-link>
    <router-link to="/kuang">Kuang</router-link>
    <router-view></router-view>

  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

8、启动测试一下 ： npm run dev

