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

```bash
1、npm install moduleName：安装模块到项目目录下

2、npm install -g moduleName：-g 的意思是将模块安装到全局，具体安装到磁盘的哪个位置，要看 npm config prefix的位置

3、npm install moduleName -save：–save的意思是将模块安装到项目目录下，并在package文件的dependencies节点写入依赖，-S为该命令的缩写

4、npm install moduleName -save-dev：–save-dev的意思是将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖，-D为该命令的缩写
```



### 4、创建成功后用idea打开，并删除净东西 创建views和router文件夹用来存放视图和路由

### 5、在views创建Main.vue

Main.vue:

```vue
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

```vue
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

```js
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

```js
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

```vue
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

