## 使用计算属性

这里的目的是添加我们的待办事项列表的摘要计数。这对用户很有用，同时也用于标记辅助技术列表。如果我们在待办事项列表中完成了 5 项中的 2 项，那么我们的摘要可能会显示为“5 项中完成了 2 项”。虽然这样做可能很诱人：

```vue
<h2>{{ToDoItems.filter(item => item.done).length}} out of {{ToDoItems.length}} items completed</h2>
```

它将在每次渲染时重新计算。对于像这样的小应用程序，这可能无关紧要。对于更大的应用程序，或者当表达式更复杂时，这可能会导致严重的性能问题。

更好的解决方案是使用 Vue 的**[计算属性](https://vuejs.org/v2/guide/computed.html)**。计算属性的工作方式与方法类似，但仅在其依赖项之一发生更改时才会重新运行。在我们的例子中，这只会在`ToDoItems`数组更改时重新运行。

要创建一个计算属性，我们需要向`computed`我们的组件对象添加一个属性，就像`methods`我们之前使用的属性一样。



## 添加汇总计数器

### *<u>App.vue里操作</u>*

将以下代码添加到`App`组件对象的属性下方`methods`。列表摘要方法将获取已完成的数量`ToDoItems`，并返回一个报告此情况的字符串。

```js
computed: {
  listSummary() {
    const numberFinishedItems = this.ToDoItems.filter(item =>item.done).length
    return `${numberFinishedItems} out of ${this.ToDoItems.length} items completed`
  }
}
```

现在我们可以`{{listSummary}}`直接添加到我们的模板中；我们将把它添加到一个`<h2>`元素中，就在我们的`<ul>`. 我们还将添加一个`id`和一个`aria-labelledby`属性来将`<h2>`内容分配为`<ul>`元素的标签。

添加描述`<h2>`并更新`<ul>`您的应用程序模板内部，如下所示：

```vue
<h2 id="list-summary">{{listSummary}}</h2>
<ul aria-labelledby="list-summary" class="stack-large">
  <li v-for="item in ToDoItems" :key="item.id">
    <to-do-item :label="item.label" :done="item.done" :id="item.id"></to-do-item>
  </li>
</ul>
```

您现在应该在您的应用程序中看到列表摘要，并且随着您添加更多待办事项项目，项目总数会更新！但是，如果您尝试选中和取消选中某些项目，则会发现一个错误。目前，我们实际上并没有以任何方式跟踪“完成”数据，因此完成项目的数量不会改变。



## 跟踪对“完成”的更改

我们可以使用事件来捕获复选框更新并相应地管理我们的列表。

由于我们不依赖按钮按下来触发更改，因此我们可以将`@change`事件处理程序附加到每个复选框，而不是使用`v-model`.

### *<u>ToDoItem.vue里操作</u>*

`<input>`将元素更新`ToDoItem.vue`为如下所示。

```vue
<input type="checkbox" class="checkbox" :id="id" :checked="isDone"
       @change="$emit('checkbox-changed')" />
```

由于我们需要做的就是发出复选框已被选中的信息，因此我们可以包含`$emit()`内联。

In `App.vue`, add a new method called `updateDoneStatus()`, below your `addToDo()` method.

### *<u>App.vue里操作</u>*

```js
updateDoneStatus(toDoId) {
  const toDoToUpdate = this.ToDoItems.find(item => item.id === toDoId)
  toDoToUpdate.done = !toDoToUpdate.done
}
```

我们希望在 a`ToDoItem`发出`checkbox-changed`事件时运行此方法，并将其`item.id`作为参数传入。`<to-do-item></to-do-item>`按如下方式更新：

```vue
<to-do-item :label="item.label" :done="item.done" :id="item.id"
            @checkbox-changed="updateDoneStatus(item.id)">
</to-do-item>
```

现在，如果您检查 a `ToDoItem`，您应该会适当地看到摘要更新