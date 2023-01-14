现在，我们将通过为您提供可用于进一步学习的资源列表以及其他一些有用的提示来完成对 Vue 的研究。



## 更多资源

这里是你应该去了解更多关于 Vue 的地方：

- [Vue Docs](https://vuejs.org/) ——Vue 的主要站点。包含全面的文档，包括示例、食谱和参考资料。这是开始深入学习 Vue 的最佳场所。

- [Vue GitHub Repo](https://github.com/vuejs/vue) — Vue 代码本身。您可以在这里报告问题和/或直接为 Vue 代码库做出贡献。学习 Vue 源代码可以帮助你更好地理解框架的工作原理，并编写更好的代码。

- [Vue 论坛](https://forum.vuejs.org/)— 获取 Vue 帮助的官方论坛。

- [Vue CLI Docs](https://cli.vuejs.org/) — Vue CLI 的文档。这包含有关自定义和扩展您通过 CLI 生成的输出的信息。

- [NuxtJS](https://nuxtjs.org/) — NuxtJS 是一个服务器端 Vue 框架，即使您不使用它提供的任何服务器端渲染功能，它的一些架构观点也可用于创建可维护的应用程序。该站点提供了有关使用 NuxtJS 的详细文档。

- [Vue Mastery——](https://www.vuemastery.com/courses/)一个专门研究 Vue 的付费教育平台，包括一些免费课程。

- [Vue School——](https://vueschool.io/)另一个专门研究 Vue 的付费教育平台。

  

## 构建和发布你的 Vue 应用

Vue CLI 还为我们提供了准备发布到 Web 的应用程序的工具。你可以这样做：

- 如果您的本地服务器仍在运行，请在终端中按 Ctrl + 结束它C 。
- 接下来，在控制台中运行`npm run build`（或）。`yarn build`

这将创建一个`dist`包含所有生产就绪文件的新目录。要将您的网站发布到 Web，请将此文件夹的内容复制到您的托管环境。



## 视图 3

Vue 3 是该框架的主要版本，有很多重大变化。它于 2020 年 4 月进入活跃测试阶段。最大的变化是一个新的 Composition API，它可以替代当前基于属性的 API。在这个新 API 中，组件上使用了一个`setup()`函数。只有您从此函数返回的内容在您`<template>`的 s 中可用。使用此 API 时，您需要明确“反应性”属性。Vue 使用 Options API 为您处理这个问题。这使得新 API 通常被认为是更高级的用例。

还有一些其他更改，包括在 Vue 中初始化应用程序的方式的更改。要了解有关 Vue 3 所涉及的更改的更多信息，请参阅[Vue School 的这篇文章，其中介绍了 Vue 3 中的大部分主要更改](https://vueschool.io/articles/vuejs-tutorials/exciting-new-features-in-vue-3/)。