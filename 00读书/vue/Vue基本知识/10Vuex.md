官方解释:Vuex是一个专门为Vue.js应用程序开发的状态管理模式。

采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

Vuex也集成到Vue的官方调试工具devtools extension，提供了诸如零配置的time-travel调试、状态快照的导入导出等高级调试功能。

可以简单理解为把需要多个组件共享的变量全部存储在一个对象里面，然后将对象放在顶层的Vue示例中，让其他组件可以使用
Vuex最大的优点是响应式。

state、action(异步操作)、view、

mutation(操作)，通过$store.commit('mutation中的方法')来修改状态

通过提交mutation的方法，而非直接修改state中的数据，便于更明确的追踪。

不要再mutation中使用异步操作，devtools无法进行跟踪，若需要用异步操作推荐action ，调用mutation使用dispatch()方法

Module用于将store分割为模块，每个模块拥有自己的state、mutation、action、getters等，取出时直接再state中取用模块，引用根store时，传递root参数