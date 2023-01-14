## 使用CSS样式化Vue组件

在继续向我们的应用程序基本高级之前，我们应该添加一些 CSS 的添加方法看起来更好。Vue 带有样式化应用程序的：

- 外部CSS文件。
- 奇异文件组件（`.vue`文件）中的样式。
- 组件中组件范围的样式。

结合为帮助您应用程序的每个功能，我们将使用三个程序，以使我们的所有应用程序具有更好的外观。



## 外部CSS文件的样式

您包括外部 CSS 文件，可以让我们看到它的外部应用程序是如何完成的。

首先，在`src/assets`目录下创建一个名为`reset.css`Webpack这个文件夹中的文件。这意味着我们可以使用 CSS 文件或将如 SCSS 中的内容处理。

图本教程不会使用此类工具，但很可能在资产文件夹中包含此类代码后，就知道如何自动进行处理。

将以下内容添加到`reset.css`文件中：

```css
/*reset.css*/
/* RESETS */
*,
*::before,
*::after {
  box-sizing: border-box;
}
*:focus {
  outline: 3px dashed #228bec;
}
html {
  font: 62.5% / 1.15 sans-serif;
}
h1,
h2 {
  margin-bottom: 0;
}
ul {
  list-style: none;
  padding: 0;
}
button {
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
}
button::-moz-focus-inner {
  border: 0;
}
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}
button,
input {
  /* 1 */
  overflow: visible;
}
input[type="text"] {
  border-radius: 0;
}
body {
  width: 100%;
  max-width: 68rem;
  margin: 0 auto;
  font: 1.6rem/1.25 "Helvetica Neue", Helvetica, Arial, sans-serif;
  background-color: #f5f5f5;
  color: #4d4d4d;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}
@media screen and (min-width: 620px) {
  body {
    font-size: 1.9rem;
    line-height: 1.31579;
  }
}
/*END RESETS*/
```

如下，在您的`src/main.js`文件中，导入导入`reset.css`文件：

```js
import './assets/reset.css';
```

这将导致在制造步骤中添加拾取文件并自动将其带到我们的网站。

立即应用该应用程序的应用图显示应用该重置应用的外观。



## 向单个文件组件添加全局样式

现在，我们已将CSS重置为在浏览器之间统一，我们需要对样式进行更多自定义。我们希望将某些样式应用于应用程序中的各个组件。虽然可以直接将这些文件添加到`reset.css`样式表中，但是我们将它们添加到的`<style>`标签中，`App.vue`以演示如何使用它们。

文件中已经存在一些样式。让我们删除它们，并用下面的样式替换它们。这些样式可以做一些事情-为按钮和输入添加一些样式，并自定义`#app`元素及其子元素。

### *<u>App.vue中操作</u>*

更新`App.vue`文件的`<style>`元素，如下所示：

```css
<style>
/* Global styles */
.btn {
  padding: 0.8rem 1rem 0.7rem;
  border: 0.2rem solid #4d4d4d;
  cursor: pointer;
  text-transform: capitalize;
}
.btn__danger {
  color: #fff;
  background-color: #ca3c3c;
  border-color: #bd2130;
}
.btn__filter {
  border-color: lightgrey;
}
.btn__danger:focus {
  outline-color: #c82333;
}
.btn__primary {
  color: #fff;
  background-color: #000;
}
.btn-group {
  display: flex;
  justify-content: space-between;
}
.btn-group > * {
  flex: 1 1 auto;
}
.btn-group > * + * {
  margin-left: 0.8rem;
}
.label-wrapper {
  margin: 0;
  flex: 0 0 100%;
  text-align: center;
}
[class*="__lg"] {
  display: inline-block;
  width: 100%;
  font-size: 1.9rem;
}
[class*="__lg"]:not(:last-child) {
  margin-bottom: 1rem;
}
@media screen and (min-width: 620px) {
  [class*="__lg"] {
    font-size: 2.4rem;
  }
}
.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
[class*="stack"] > * {
  margin-top: 0;
  margin-bottom: 0;
}
.stack-small > * + * {
  margin-top: 1.25rem;
}
.stack-large > * + * {
  margin-top: 2.5rem;
}
@media screen and (min-width: 550px) {
  .stack-small > * + * {
    margin-top: 1.4rem;
  }
  .stack-large > * + * {
    margin-top: 2.8rem;
  }
}
/* End global styles */
#app {
  background: #fff;
  margin: 2rem 0 4rem 0;
  padding: 1rem;
  padding-top: 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
}
@media screen and (min-width: 550px) {
  #app {
    padding: 4rem;
  }
}
#app > * {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
#app > form {
  max-width: 100%;
}
#app h1 {
  display: block;
  min-width: 100%;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
}
</style>
```

如果您检查应用程序，您会看到我们的待办事项列表现在在一张卡片中，并且我们的待办事项有一些更好的格式。现在我们可以通过并开始编辑我们的组件以使用其中一些样式。



### 在 Vue 中添加 CSS 类

### *<u>ToDoForm.vue中操作</u>*

我们应该将按钮 CSS 类应用到`<button>`我们的`ToDoForm`组件中。由于 Vue 模板是有效的 HTML，这与您在纯 HTML 中的操作方式相同——通过向`class=""`元素添加属性。

添加`class="btn btn__primary btn__lg"`到表单的`<button>`元素：

```vue
<button type="submit" class="btn btn__primary btn__lg">
  Add
</button>
```

当我们在这里时，我们可以进行更多的语义和样式更改。由于我们的表单表示页面的特定部分，它可以从`<h2>`元素中受益。然而，标签已经表明了表格的目的。为了避免重复我们自己，让我们将标签包装在一个`<h2>`. 我们还可以添加一些其他全局 CSS 样式。我们还将`input__lg`类添加到我们的`<input>`元素中。

更新您的`ToDoForm`模板，使其看起来像这样：

```vue
<template>
  <form @submit.prevent="onSubmit">
    <h2 class="label-wrapper">
      <label for="new-todo-input" class="label__lg">
        What needs to be done?
      </label>
    </h2>
    <input
      type="text"
      id="new-todo-input"
      name="new-todo"
      autocomplete="off"
      v-model.lazy.trim="label"
      class="input__lg"
    />
    <button type="submit" class="btn btn__primary btn__lg">
      Add
    </button>
  </form>
</template>
```

### *<u>App.vue中操作</u>*

让我们也将`stack-large`类添加到文件中的`<ul>`标签中`App.vue`。这将有助于稍微改善我们待办事项的间距。

更新如下：

```vue
<ul aria-labelledby="list-summary" class="stack-large">
```



## 添加范围样式

我们要设置样式的最后一个组件是我们的`ToDoItem`组件。为了使样式定义靠近组件，我们可以在`<style>`其中添加一个元素。但是，如果这些样式改变了这个组件之外的东西，那么追踪负责的样式并解决问题可能会很有挑战性。这就是`scoped`属性有用的地方——它`data`为你的所有样式附加了一个唯一的 HTML 属性选择器，防止它们在全局范围内发生冲突。

### *<u>ToDoItem.vue中操作</u>*

要使用修饰符，请在文件底部的内部`scoped`创建一个`<style>`元素，并为其赋予一个属性：`ToDoItem.vue``scoped`

```vue
<style scoped>
</style>
```

接下来，将以下 CSS 复制到新创建的`<style>`元素中：

```css
.custom-checkbox > .checkbox-label {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  font-size: 16px;
  font-size: 1rem;
  line-height: 1.25;
  color: #0b0c0c;
  display: block;
  margin-bottom: 5px;
}
.custom-checkbox > .checkbox {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  font-size: 16px;
  font-size: 1rem;
  line-height: 1.25;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  height: 2.5rem;
  margin-top: 0;
  padding: 5px;
  border: 2px solid #0b0c0c;
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.custom-checkbox > input:focus {
  outline: 3px dashed #fd0;
  outline-offset: 0;
  box-shadow: inset 0 0 0 2px;
}
.custom-checkbox {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.25;
  display: block;
  position: relative;
  min-height: 40px;
  margin-bottom: 10px;
  padding-left: 40px;
  clear: left;
}
.custom-checkbox > input[type="checkbox"] {
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  top: -2px;
  left: -2px;
  width: 44px;
  height: 44px;
  margin: 0;
  opacity: 0;
}
.custom-checkbox > .checkbox-label {
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  display: inline-block;
  margin-bottom: 0;
  padding: 8px 15px 5px;
  cursor: pointer;
  touch-action: manipulation;
}
.custom-checkbox > label::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 2px solid currentColor;
  background: transparent;
}
.custom-checkbox > input[type="checkbox"]:focus + label::before {
  border-width: 4px;
  outline: 3px dashed #228bec;
}
.custom-checkbox > label::after {
  box-sizing: content-box;
  content: "";
  position: absolute;
  top: 11px;
  left: 9px;
  width: 18px;
  height: 7px;
  transform: rotate(-45deg);
  border: solid;
  border-width: 0 0 5px 5px;
  border-top-color: transparent;
  opacity: 0;
  background: transparent;
}
.custom-checkbox > input[type="checkbox"]:checked + label::after {
  opacity: 1;
}
@media only screen and (min-width: 40rem) {
  label,
  input,
  .custom-checkbox {
    font-size: 19px;
    font-size: 1.9rem;
    line-height: 1.31579;
  }
}
```

现在我们需要在模板中添加一些 CSS 类来连接样式。

在 root`<div>`中，添加一个`custom-checkbox`类。向`<input>`, 添加一个`checkbox`类。最后，`<label>`添加一个`checkbox-label`类。更新后的模板如下：

该应用程序现在应该有自定义复选框
