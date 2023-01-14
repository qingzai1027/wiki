## 创建一个ToDoItem组件

### <u>***ToDoItem.vue里操作***</u>

1. 在你的`src/components`目录下，创建一个`ToDoItem.vue`的新文件。在你的代码编辑器中打开该文件。

2. 通过在文件顶部添加`<template></template>`来创建组件的模板部分。

3. 在你的模板部分下面创建一个`<script></script>`部分。在`<script>`标签内，添加一个默认导出对象`export default {}`，这是你的组件对象。

   ```vue
   <template> </template>
   <script>
     export default {};
   </script>
   ```

   现在我们可以开始为`ToDoItem`添加实际内容了。Vue模板目前只允许一个根元素--一个元素需要包裹模板内的所有内容。我们将为该根元素使用一个`<div>`。

   1. 现在在你的组件模板中添加一个空的`<div>`。

   2. 在那个`<div>`里面，让我们添加一个`checkbox`和一个对应的`label`。给复选框添加一个`id`，并添加一个`for`属性，将复选框映射到标签上

      ```vue
      <template>
        <div>
          <input type="checkbox" id="todo-item" checked="false" />
          <label for="todo-item">My Todo Item</label>
        </div>
      </template>
      ```



## 在应用程序中使用TodoItem组件

### *<u>App.vue里操作</u>*

1. 再次打开`App.vue`文件。

2. 在`<script>`标签的顶部，添加以下内容来引入`ToDoItem`组件：

   ```js
   import ToDoItem from './components/ToDoItem.vue';
   ```

3. 在你的组件对象里面，添加 `components` 属性，然后在它里面添加您的ToDoItem组件进行注册。

你的`<script>`内容现在应该是这样的:

```js
import ToDoItem from './components/ToDoItem.vue';

export default {
  name: 'app',
  components: {
    ToDoItem
  }
};
```

要在应用程序中实际展示`ToDoItem`组件，你需要在`<template>`模板内添加一个`<to-do-item>/to-do-item>`元素。请注意，组件文件名及其在JavaScript中的表示方式总是用大写驼色（例如`ToDoList`），而等价的自定义元素总是用连字符小写（例如`<to-do-list>`）。

1. 在`<h1>`下面，创建一个无序列表(`<ul>`)，其中包含一个列表项(`<li>`)。
2. 在列表项(<li>)里面添加`<to-do-item></to-do-item>`.

你的`App.vue`的`<template>`内容现在应该是这样的：

```vue
<div id="app">
  <h1>To-Do List</h1>
  <ul>
    <li>
      <to-do-item></to-do-item>
    </li>
  </ul>
</div>
```

渲染的`ToDoItem`组件，由一个复选框和一个标签组成。



## 使用props让组件动态化

我们的 `ToDoItem` 组件仍然不太可用，因为我们只能在页面上包含它一次（ID必须唯一），而且我们没有办法设置label标签的文本。这一切都不是动态的。

我们需要的是一些组件状态。这可以通过在组件中添加props来实现。您可以认为 props 与函数中的输入类似。prop的值给予了组件影响其显示的初始状态。

### 注册 props

在Vue中，注册props的方式有两种：

- 第一种方式是，以字符串数组的方式列出props，数组中的每个实体对应一个prop名称。
- 第二种方法是将props定义为一个对象，每个key对应于prop名称。将props列为对象允许您指定默认值，将props标记为required，执行基本的对象类型(特别是 JavaScript 基本类型) ，并执行简单的prop校验。

针对ToDoItem组件，我们将使用对象注册法。

### *<u>ToDoItem.vue里操作</u>*

1. 回到 `ToDoItem.vue` 文件。

2. 在默认导出的 `default {}` 对象中添加一个 `props` 属性，该props属性含有一个空对象。

3. 在这个对象里，添加两个key为 `label` 和 `done` 属性。

4. `label`的值应该是一个带有两个属性的对象（或者是props，因为它们被调用在可找到的组件的context）

   1. 第一个 `required` 属性, 它的值是 `true`. 这将会告诉Vue说，我们希望每个该组件的实例都必须有个label字段。如果 `ToDoItem` 组件没有label字段的话，Vue会提示警告。
   2. 第二是添加一个 `type` 属性。这个属性的值设为JavaScript的 `String` 类型。这等于告诉Vue，我们希望type属性的值是String类型的。

5. 现在转向 `done`prop.

   1. 首先添加一个 `default` 属性，它的值是 `false`。这意味着当没有 `done` prop被传递给 `ToDoItem` 组件时， `done` prop的值会是false（注意default属性不是必需的————我们只在非required props里才需要 `default` ）

   2. 接着，添加一个 `type` 属性，值为 `Boolean`。这将告诉Vue，我们希望这个prop的值是JavaScript的Boolean类型。

      你的组件对象现在看起来应该像是这样：

      ```vue
      <script>
        export default {
          props: {
            label: { required: true, type: String },
            done: { default: false, type: Boolean }
          }
        };
      </script>
      ```



### 使用已注册的props

随着组件对象中这些props的定义，我们可以在template里使用这些变量值。让我们开始向组件模版中添加 `label` prop。

在你的 `<template>` 中，将 `<label>` 标签的contents内容修改为 `{{label}}`。

`{{}}` 是Vue中的一个特殊的模版语法，它能在template内打印 类中定义的JavaScript表达式的结果，包括值和方法。重要的是， `{{}}` 里的内容是作为text文本显示，而非HTML。在此例中，我们打印的是 `label` 的值。

现在，你组件的template部分应该是像这样：

```vue
<template>
  <div>
    <input type="checkbox" id="todo-item" checked="false" />
    <label for="todo-item">{{label}}</label>
  </div>
</template>
```



### *<u>App.vue里操作</u>*

我们已经在template内定义了希望使用这个prop值的位置，但在调用时我们没有把它传递进组件。让我们修复这个问题。

在我们的 `App.vue `文件中，像常规HTML属性那样，在 `<to-do-item></to-do-item>` 里添加一个 `label` 属性：

```vue
<to-do-item label="My ToDo Item"></to-do-item>
```

这就是一个简单的props。接下来我们将讨论Vue如何持久化数据状态



## Vue的数据对象

如果您更改`label`传递`<to-do-item></to-do-item>`给 App 组件中调用的道具的值，您应该会看到它更新。这很棒。我们有一个带有可更新标签的复选框。然而，我们目前没有对“done”属性做任何事情——我们可以检查 UI 中的复选框，但在应用程序中我们没有记录待办事项是否实际完成。

如果您更改了您在访问您的应用程序组件中的属性`<to-do-item></to-do-item>`值`label`，应该会看到该值被更新。这很好。我们现在有一个复选框，一个可更新的标签标签。然而，我们目前没有对“done”道具做任何事情——我们可以在UI中勾选复选框，但在应用程序中，我们并没有实际记录todo item是否已经完成。

为此，我们希望将组件的`done`prop 绑定到元素上的`checked`属性上`<input>`，这样它就可以作为复选框是否被选中的记录。然而，重要的是 props 作为单向数据绑定——一个组件永远不应该改变它自己的 props 的值。这有很多原因。在某种程度上，组件编辑道具会使调试成为挑战。如果将一个值传递给多个子级，则可能很难跟踪对该值的更改来自何处。此外，更改 props 可能会导致组件重新渲染。因此，在组件中改变 props 会触发组件重新渲染，这可能反过来再次触发突变。

为此，我们将组件绑定的`done`标签`<input>`的`checked`属性。 ，这点很重要。坚守这个点的重要有很多修改。它的一个原因是，道具会造成程序问题的麻烦。如果一个值被传递进多个子组件，这个点很容易解决在哪里被修改的原因。此外，修改道具会导致组件重新添加，一个组件重新添加的道具。

为了解决这个问题，我们可以`done`使用 Vue 的`data`属性来管理状态。`data`属性是您可以在组件中管理本地状态的地方，它与属性一起位于组件对象中，并`props`具有以下结构：

```js
data() {
  return {
    key: value
  }
}
```

您会注意到该`data`属性是一个函数。这是为了在运行时为组件的每个实例保持数据值唯一——为每个组件实例单独调用该函数。如果您将数据声明为只是一个对象，则该组件的所有实例都将共享相同的值。这是 Vue 注册组件的方式的副作用以及您不想要的东西。

如您所料，您可以`this`从内部数据中访问组件的 props 和其他属性。

所以让`data`我们为我们的组件添加一个属性`ToDoItem`。这将返回一个对象，其中包含我们将调用的单个属性`isDone`，其值为`this.done`。

### *<u>ToDoItem.vue里操作</u>*

像这样更新组件对象：

```js
export default {
  props: {
    label: { required: true, type: String },
    done: { default: false, type: Boolean }
  },
  data() {
    return {
      isDone: this.done
    };
  }
};
```

Vue 在这里做了一个小魔术——它将你所有的 props 直接绑定到组件实例，所以我们不必调用`this.props.done`. 它还将其他属性（`data`您已经看到的，以及其他属性，如`methods`,`computed`等）直接绑定到实例。这部分是为了使它们可用于您的模板。这样做的缺点是您需要在这些属性中保持键的唯一性。这就是为什么我们调用我们的`data`属性`isDone`而不是`done`.

所以现在我们需要将`isDone`属性附加到我们的组件。`{{}}`与 Vue 使用表达式在模板中显示 JavaScript 表达式的方式类似，Vue 有一种特殊的语法来将 JavaScript 表达式绑定到 HTML 元素和组件： `v-bind`. `v-bind`表达式如下所示：

```vue
v-bind:attribute="expression"
```

换句话说，您可以为要绑定的任何属性/道具添加前缀`v-bind:`。在大多数情况下，您可以使用属性的简写`v-bind`，即在属性/属性前面加上冒号。所以`:attribute="expression"`与`v-bind:attribute="expression"`.

因此，对于我们组件中的复选框`ToDoItem`，我们可以使用将属性`v-bind`映射到元素上的属性。以下两个是等价的：`isDone`checked`<input>`

```vue
<input type="checkbox" id="todo-item" v-bind:checked="isDone" />

<input type="checkbox" id="todo-item" :checked="isDone" />
```

您可以随意使用您喜欢的任何模式。不过最好保持一致。因为简写语法更常用，本教程将坚持这种模式。

所以让我们这样做。立即更新您的`<input>`元素以替换`checked="false"`为`:checked="isDone"`.



### *<u>App.vue里操作</u>*

通过传入调用`:done="true"`来测试你的组件。请注意，您需要使用语法，否则将作为字符串传递。应选中显示的复选框。`ToDoItem`App.vue``v-bind``true

```vue
<template>
  <div id="app">
    <h1>My To-Do List</h1>
    <ul>
      <li>
        <to-do-item label="My ToDo Item" :done="true"></to-do-item>
      </li>
    </ul>
  </div>
</template>
```

尝试再次切换`true`，`false`重新加载您的应用程序以查看状态如何更改。



## 给 Todos 一个唯一的 id

我们现在有一个工作复选框，我们可以在其中以编程方式设置状态。但是，我们目前只能`ToDoList`向页面添加一个组件，因为它`id`是硬编码的。这将导致辅助技术出错，因为`id`需要将标签正确映射到其复选框。为了解决这个问题，我们可以`id`在组件数据中以编程方式设置。

我们可以使用[lodash](https://www.npmjs.com/package/lodash)包的`uniqueid()`方法来帮助保持索引的唯一性。这个包导出一个函数，该函数接受一个字符串并将一个唯一的整数附加到前缀的末尾。这足以保持组件`id`的唯一性。

让我们使用 npm 将包添加到我们的项目中；停止服务器并在终端中输入以下命令：

```bash
npm install --save lodash.uniqueid
```



### *<u>ToDoItem.vue</u>里操作*

接下来，向我们的 data 属性添加一个`id`字段，因此组件对象最终看起来像这样（`uniqueId()`返回指定的前缀 — `todo-`— 并附加一个唯一的字符串）：

```js
import uniqueId from 'lodash.uniqueid';

export default {
  props: {
    label: { required: true, type: String },
    done: { default: false, type: Boolean }
  },
  data() {
    return {
      isDone: this.done,
      id: uniqueId('todo-')
    };
  }
};
```

接下来，将 绑定`id`到我们的复选框的`id`属性和标签的`for`属性，更新现有的`id`和`for`属性，如下所示：

```vue
<template>
  <div>
    <input type="checkbox" :id="id" :checked="isDone" />
    <label :for="id">{{label}}</label>
  </div>
</template>
```
