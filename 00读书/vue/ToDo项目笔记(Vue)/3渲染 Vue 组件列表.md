# 使用 v-for 指令渲染列表

## App.vue中操作

### 添加一些需要被渲染的数据

首先需要准备一个待办事项清单。我们添加 `data` 属性到 `App.vue`组件对象中，它包含一个 `ToDoItems`事项，其价值是待办事项。 ，每个待办项目可以用一个对象表示，这个对象包含 `name` 和 `done` 属性。

像下面这样添加一些待办项目让我们可以利用`v-for` 来对它们进行渲染。

```javascript
export default {
  name: 'app',
  components: {
    ToDoItem
  },
  data() {
    return {
      ToDoItems: [
        { label: 'Learn Vue', done: false },
        { label: 'Create a Vue project with the CLI', done: true },
        { label: 'Have fun', done: true },
        { label: 'Create a to-do list', done: false }
      ]
    };
  }
};
```



### Key属性

在进行数据传递之前，我们要了解下`key`属性，它和`v-for`使用，使用帮助Vue标识中的元素，这样Vue就不需要在列表变化时重新创建它们。但是Vue需要一个唯一的标识，即`key`来识别哪些元素是被复用的。

为了让 Vue 能够正确的比较`key` ，key 属性需要是数字或字符串类型。使用名称字段不是好主意，因为这个字段会被用户控制，无法保证唯一性。

我们可以使用`lodash.uniqueid()` ，像我们前一章那样。

1. 导入 `lodash.uniqueid`到 `App`组件。

   ```js
    import uniqueId from 'lodash.uniqueid';
   ```

2. 添加 `id` 到各种 `ToDoItems`元素中的每一个元素中，并且将他们为名 `uniqueId('todo-')。`

   `App.vue` `<script>` 元素内容如下：

   ```js
   import ToDoItem from './components/ToDoItem.vue';
   import uniqueId from 'lodash.uniqueid'
   
   export default {
     name: 'app',
     components: {
       ToDoItem
     },
     data() {
       return {
         ToDoItems: [
           { id: uniqueId('todo-'), label: 'Learn Vue', done: false },
           { id: uniqueId('todo-'), label: 'Create a Vue project with the CLI', done: true },
           { id: uniqueId('todo-'), label: 'Have fun', done: true },
           { id: uniqueId('todo-'), label: 'Create a to-do list', done: false }
         ]
       };
     }
   };
   ```

3. 添加 `v-for`指令和 `key`属性到 `<li>` 元素：

   ```vue
   <ul>
     <li v-for="item in ToDoItems" :key="item.id">
       <to-do-item label="My ToDo Item" :done="true"></to-do-item>
     </li>
   </ul>
   ```

   修改后，`<cli>`标签中就可以脚本访问`item`了，这意味着我们可以使用`v-bind`来传递对象的字段`item`给`ToDoItem`组件了。`label`，而不是显示一个默认的“我的待办事项”。另外，状态是我们正在检查他们的反应的`done`字段，默认的`done="false"`。

4. 把`label="My ToDo Item"`成 `:label="item.label"`， `:done="false"` 改成 `:done="item.done"` 

   ```vue
   <ul>
     <li v-for="item in ToDoItems" :key="item.id">
        <to-do-item :label="item.label" :done="item.done"></to-do-item>
     </li>
   </ul>
   ```

现在当你去看运行着的app时，你会发现待办事项显示了它们自己正确的名字，如果你查看源码的话，你会发现输入都有了唯一的id。



## 让我们来一点小重构

### ToDoItem.vue里操作

我们可以做一点代码重构。 因为我们已经要为每一个待办事项创建一个唯一id，所以不妨把id作为ToDoItem的一个prop，而不是在每个checkbox里生成它。

添加一个新的prop `id` 到 `ToDoItem` 组件。

1. 标记它为required，类型是 `String` 。
2. 为防止命名冲突，删除掉`data`属性中的`id`字段。
3. 删除掉 `import uniqueId from 'lodash.uniqueid';` 这行。

`ToDoItem` 中的 `<script>` 如下所示：

```js
export default {
    props: {
        label: {required: true, type: String},
        done: {default: false, type: Boolean},
        id: {required: true, type: String}
    },
    data() {
        return {
           isDone : this.done,
        }
    },
}
```



### App.vue里操作

现在，在 `App.vue` 组件中将 `item.id` 作为一个prop传递给 `ToDoItem` 组件。你的 `App.vue` template如下所示：

```vue
<template>
  <div id="app">
    <h1>My To-Do List</h1>
    <ul>
      <li v-for="item in ToDoItems" :key="item.id">
        <to-do-item :label="item.label" :done="item.done" :id="item.id"></to-do-item>
      </li>
    </ul>
  </div>
</template>
```

你渲染后的站点看起来是没有变化的，但是这次重构使得`item.id`像其他参数一样，作为prop从`App.vue`传递给`ToDoItem`。现在代码变得更有逻辑性和一致。

## 总结

我们现在有了样例数据，然后我们用循环将每一项渲染成`ToDoItem`。

接下来我们需要让用户可以输入它们自己的待办事项，想做到这一点，我们需要一个文本输入`<input>`，当用户输入数据时触发一个事件，在事件响应函数中需要将数据添加到待办事项列表并且重新渲染列表，我们还需要一个模型操控数据。
