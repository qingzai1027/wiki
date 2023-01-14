Webpack是一个现代的JavaScript应用的静态模块打包工具

1、依赖于node环境和npm工具

2、将npm包保存到 开发环境 --save -dev

3、配置webpack配置文件，即可直接使用webpack文件



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

