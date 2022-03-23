## 目录结构

```bash
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局 filter
│   ├── icons                  // 项目所有 svg icons
│   ├── lang                   // 国际化 language
│   ├── mock                   // 项目mock 模拟数据
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor
│   ├── views                   // view
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   └── permission.js          // 权限管理
├── static                     // 第三方不打包资源
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

这里来简单讲一下src文件

### api 和 views

随着业务的迭代，模块还会会越来越多。 所以这里建议根据业务模块来划分 views，并且 将views 和 api 两个模块一一对应，从而方便维护.如 article 模块下放的都是文章相关的 api，这样不管项目怎么累加，api和views的维护还是清晰的，当然也有一些全区公用的api模块，如七牛upload，remoteSearch等等，这些单独放置就行.

### components

这里的 components 放置的都是全局公用的一些组件，如上传组件，富文本等等。一些页面级的组件建议还是放在各自views文件下，方便管理。

### store

不要为了用 vuex 而用 vuex。后台项目虽然比较庞大，几十个业务模块，几十种权限，但业务之间的耦合度是很低的，文章模块和评论模块几乎是俩个独立的东西，所以根本没有必要使用 vuex 来存储data，每个页面里存放自己的 data 就行。当然有些数据还是需要用 vuex 来统一管理的，如登录token,用户信息，或者是一些全局个人偏好设置等，还是用vuex管理更加的方便，具体当然还是要结合自己的业务场景的。总之还是那句话，不要为了用vuex而用vuex！

### jquery (本项目已移除)

管理后台不同于前台项目，会经常用到一些第三方插件，但有些插件是不得不依赖 jquery 的，如市面很多富文本基都是依赖 jquery 的，所以干脆就直接引入到项目中省事(gzip之后只有34kb，而且常年from cache,不要考虑那些吹毛求疵的大小问题，这几kb和提高的开发效率根本不能比)。但是如果第三方库的代码中出现![.xxx或jQuery.xxx或window.jQuery或window.](https://juejin.cn/equation?tex=.xxx%E6%88%96jQuery.xxx%E6%88%96window.jQuery%E6%88%96window.)则会直接报错。要达到类似的效果，则需要使用 webpack 内置的 `ProvidePlugin` 插件，配置很简单，只需要

```vue
new webpack.ProvidePlugin({
  $: 'jquery' ,
  'jQuery': 'jquery'
})

```

这样当 webpack 碰到 require 的第三方库中出现全局的$、jQeury和window.jQuery 时，就会使用 node_module 下 jquery 包 export 出来的东西了。

### alias

当项目逐渐变大之后，文件与文件直接的引用关系会很复杂，这时候就需要使用[alias](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Fresolve%2F) 了。 有的人喜欢alias 指向src目录下，再使用相对路径找文件

```vue
resolve: {
  alias: {
    '~': resolve(__dirname, 'src')
  }
}

//使用
import stickTop from '~/components/stickTop'
```

或者也可以

```vue
alias: {
  'src': path.resolve(__dirname, '../src'),
  'components': path.resolve(__dirname, '../src/components'),
  'api': path.resolve(__dirname, '../src/api'),
  'utils': path.resolve(__dirname, '../src/utils'),
  'store': path.resolve(__dirname, '../src/store'),
  'router': path.resolve(__dirname, '../src/router')
}

//使用
import stickTop from 'components/stickTop'
import getArticle from 'api/article'

```

