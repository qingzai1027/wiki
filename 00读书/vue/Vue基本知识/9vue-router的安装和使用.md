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