现在是时候添加我们仍然缺少的主要功能之一——编辑现有待办事项的能力。为此，我们将利用 Vue 的条件渲染功能——即`v-if`和`v-else`——允许我们在现有的待办事项视图和可以更新待办事项标签的编辑视图之间切换。我们还将着眼于添加删除待办事项的功能。



## 创建编辑组件

### *<u>ToDoItemEditForm.vue中操作</u>*

我们可以首先创建一个单独的组件来处理编辑功能。在您的`components`目录中，创建一个名为`ToDoItemEditForm.vue`. 将以下代码复制到该文件中：

```vue
<template>
  <form class="stack-small" @submit.prevent="onSubmit">
    <div>
      <label class="edit-label">Edit Name for &quot;{{label}}&quot;</label>
      <input :id="id" type="text" autocomplete="off" v-model.lazy.trim="newLabel" />
    </div>
    <div class="btn-group">
      <button type="button" class="btn" @click="onCancel">
        Cancel
        <span class="visually-hidden">editing {{label}}</span>
      </button>
      <button type="submit" class="btn btn__primary">
        Save
        <span class="visually-hidden">edit for {{label}}</span>
      </button>
    </div>
  </form>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      newLabel: this.label
    };
  },
  methods: {
    onSubmit() {
      if (this.newLabel && this.newLabel !== this.label) {
        this.$emit("item-edited", this.newLabel);
      }
    },
    onCancel() {
      this.$emit("edit-cancelled");
    }
  }
};
</script>
<style scoped>
.edit-label {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #0b0c0c;
  display: block;
  margin-bottom: 5px;
}
input {
  display: inline-block;
  margin-top: 0.4rem;
  width: 100%;
  min-height: 4.4rem;
  padding: 0.4rem 0.8rem;
  border: 2px solid #565656;
}
form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
form > * {
  flex: 0 0 100%;
}
</style>
```

此代码设置了编辑功能的核心。我们创建一个表单，其中包含一个`<input>`用于编辑待办事项名称的字段。

有一个“保存”按钮和一个“取消”按钮：

- 单击“保存”按钮时，组件会通过`item-edited`事件发出新标签。

- 单击“取消”按钮时，组件会通过发出`edit-cancelled`事件来发出信号。

  

## 修改我们的`ToDoItem`组件

在我们可以添加`ToDoItemEditForm`到我们的应用程序之前，我们需要对我们的`ToDoItem`组件进行一些修改。具体来说，我们需要添加一个变量来跟踪项目是否正在被编辑，并添加一个按钮来切换该变量。我们还将添加一个`Delete`按钮，因为删除是密切相关的。

### *<u>ToDoItem.vue中操作</u>*

`ToDoItem`如下所示更新您的模板。

```vue
<template>
  <div class="stack-small">
    <div class="custom-checkbox">
      <input type="checkbox" class="checkbox" :id="id" :checked="isDone"
             @change="$emit('checkbox-changed')" />
      <label :for="id" class="checkbox-label">{{label}}</label>
    </div>
    <div class="btn-group">
      <button type="button" class="btn"  @click="toggleToItemEditForm">
        Edit <span class="visually-hidden">{{label}}</span>
      </button>
      <button type="button" class="btn btn__danger" @click="deleteToDo">
        Delete <span class="visually-hidden">{{label}}</span>
      </button>
    </div>
  </div>
</template>
```

为了布局目的，我们在整个模板周围添加了一个包装器 <div>。

我们还添加了“编辑”和“删除”按钮：

- 单击“编辑”按钮时，将切换显示`ToDoItemEditForm`组件，以便我们可以使用它通过名为 的事件处理函数来编辑我们的待办事项`toggleToItemEditForm()`。此处理程序会将`isEditing`标志设置为 true。为此，我们需要首先在我们的`data()`属性中定义它。
- 单击“删除”按钮时，将通过一个名为 的事件处理函数删除待办事项`deleteToDo()`。在这个处理程序中，我们将向`item-deleted`父组件发出一个事件，以便更新列表。

让我们定义我们的点击处理程序和必要的`isEditing`标志。

`isEditing`在现有`isDone`数据点下方添加：

```js
data() {
  return {
    isDone: this.done,
    isEditing: false
  };
}
```

现在将您的方法添加到方法属性中，就在您的`data()`属性下方：

```js
methods: {
    deleteToDo() {
      this.$emit('item-deleted');
    },
    toggleToItemEditForm() {
      this.isEditing = true;
    }
  }
```



## `v:if`通过和有条件地显示组件`v:else`

现在我们有一个`isEditing`标志，我们可以用它来表示该项目正在被编辑（或不被编辑）。如果`isEditing`为真，我们希望使用该标志来显示我们的`ToDoItemEditForm`而不是复选框。为此，我们将使用另一个 Vue 指令：`v-if`.

如果传递给它的值是真实的，该`v-if`指令只会呈现一个块。这类似于`if`JavaScript 中语句的工作方式。`v-if`也有相应的`v-else-if`和指令来在 Vue 模板`v-else`中提供等效的 JavaScript`else if`和逻辑。`else`

需要注意的是，`v-else`和`v-else-if`块必须是`v-if`/`v-else-if`块的第一个兄弟，否则 Vue 将无法识别它们。如果您需要有条件地呈现整个模板，也可以附加`v-if`到标签。`<template>`

最后，您可以在组件的根部使用`v-if`+`v-else`来仅显示一个或另一个块，因为 Vue 一次只会渲染这些块中的一个。我们将在我们的应用程序中执行此操作，因为它允许我们将显示待办事项的代码替换为编辑表单。

### *<u>ToDoItem.vue中操作</u>*

首先添加到组件`v-if="!isEditing"`的根目录，`<div>``ToDoItem`

```vue
<div class="stack-small" v-if="!isEditing">
```

接下来，在它`<div>`的结束标记下面添加以下行：

```vue
<to-do-item-edit-form v-else :id="id" :label="label"></to-do-item-edit-form>
```

我们还需要导入和注册`ToDoItemEditForm`组件，所以我们可以在这个模板中使用它。`<script>`在元素顶部添加这一行：

```js
import ToDoItemEditForm from "./ToDoItemEditForm";
```

并在组件对象内的`components`属性上方添加一个属性：`props`

```vue
components: {
  ToDoItemEditForm
},
```

现在，如果您转到您的应用程序并单击待办事项的“编辑”按钮，您应该会看到复选框被替换为编辑表单。但是，目前没有办法回去。为了解决这个问题，我们需要向我们的组件添加更多的事件处理程序。



## 退出编辑模式

`itemEdited()`首先，我们需要在`ToDoItem`组件的`methods`. `itemEdited`此方法应将新项目标签作为参数，向父组件发出事件，并设置`isEditing`为`false`.

现在添加它，在您现有的方法下方：

### *<u>ToDoItem.vue中操作</u>*

```js
itemEdited(newLabel) {
  this.$emit('item-edited', newLabel);
  this.isEditing = false;
}
```

接下来，我们需要一个`editCancelled()`方法。此方法不接受任何参数，仅用于设置`isEditing`回`false`. 在上一个方法下面添加此方法：

```js
editCancelled() {
  this.isEditing = false;
}
```

在本节的最后，我们将为`ToDoItemEditForm`组件发出的事件添加事件处理程序，并将适当的方法附加到每个事件。

更新您的`<to-do-item-edit-form></to-do-item-edit-form>`电话，使其看起来像这样：

```vue
<to-do-item-edit-form v-else :id="id" :label="label"
                      @item-edited="itemEdited"
                      @edit-cancelled="editCancelled">
</to-do-item-edit-form>
```



## 更新和删除待办事项

现在我们可以在编辑表单和复选框之间切换。但是，我们实际上并没有处理将`ToDoItems`数组更新回`App.vue`. 为了解决这个问题，我们需要监听`item-edited`事件，并相应地更新列表。我们还需要处理删除事件，以便我们可以删除待办事项。

### *<u>APP.vue中操作</u>*

将以下新方法添加到您`App.vue`的组件对象，在属性内的现有方法下方`methods`：

```js
deleteToDo(toDoId) {
  const itemIndex = this.ToDoItems.findIndex(item => item.id === toDoId);
  this.ToDoItems.splice(itemIndex, 1);
},
editToDo(toDoId, newLabel) {
  const toDoToEdit = this.ToDoItems.find(item => item.id === toDoId);
  toDoToEdit.label = newLabel;
}
```

接下来，我们将为`item-deleted`和`item-edited`事件添加事件侦听器：

- 对于`item-deleted`，您需要将 传递`item.id`给该方法。
- 对于`item-edited`，您需要传递`item.id`和 特殊`$event`变量。这是一个特殊的 Vue 变量，用于将事件数据传递给方法。当使用原生 HTML 事件（如`click`）时，这会将原生事件对象传递给您的方法。

`<to-do-item></to-do-item>`将模板内的调用更新`App.vue`为如下所示：

```vue
<to-do-item :label="item.label" :done="item.done" :id="item.id"
            @checkbox-changed="updateDoneStatus(item.id)"
            @item-deleted="deleteToDo(item.id)"
            @item-edited="editToDo(item.id, $event)">
</to-do-item>
```

有了它——您现在应该能够从列表中编辑和删除项目了！



## 使用 isDone 状态修复一个小错误

到目前为止这很好，但我们实际上通过添加编辑功能引入了一个错误。尝试这样做：

1. 选中（或取消选中）待办事项复选框之一。
2. 按该待办事项的“编辑”按钮。
3. 按“取消”按钮取消编辑。

注意取消后复选框的状态——应用程序不仅忘记了复选框的状态，而且该待办事项的完成状态现在已经不正常了。如果您再次尝试选中（或取消选中）它，完成的计数将以与您预期相反的方式发生变化。这是因为`isDone`内部`data`只给出了`this.done`组件负载的值。

幸运的是，解决这个问题很容易——我们可以通过将我们的`isDone`数据项转换为计算属性来做到这一点——计算属性的另一个优点是它们保留了反应性，这意味着（除其他外）当模板发生变化时它们的状态被保存为我们的现在在做。

### *<u>ToDoItem.vue中操作</u>*

因此，让我们实施修复：

1. `data()`从我们的属性 中删除以下行：

   ```js
   isDone: this.done,
   ```

2. 在 data() { } 块下方添加以下块：

   ```js
   computed: {
     isDone() {
       return this.done;
     }
   },
   ```

现在，当您保存并重新加载时，您会发现问题已解决——当您在待办事项模板之间切换时，复选框状态现在得以保留。



## 了解事件的纠结

最可能令人困惑的部分之一是我们用来触发应用程序中所有交互性的标准事件和自定义事件的混乱。为了更好地理解这一点，最好写出流程图、描述或图表，说明哪些事件在哪里发出，在哪里被监听，以及触发后会发生什么。

例如：

**App.vue**

`<to-do-form>`：

- `todo-added`提交表单时由组件 `onSubmit()`内部的方法发出的事件。**结果**：调用方法以将新的待办事项添加到数组中。 `ToDoForm``addToDo()``ToDoItems`

`<to-do-item>`：

- `checkbox-changed``<input>`组件内的复选框在`ToDoItem`选中或取消选中时 发出的事件。**结果**：`updateDoneStatus()`调用方法来更新相关待办事项的完成状态。
- `item-deleted`当按下“删除”按钮时，由组件 `deleteToDo()`内部的方法发出的事件。**结果**：调用方法以删除关联的待办事项。 `ToDoItem``deleteToDo()`
- `item-edited`当组件`itemEdited()`内部的方法发出的事件被成功监听时，组件内部的方法发出的事件。是的，这是两个不同事件的链！ **结果**：调用方法来更新相关待办事项的标签。 `ToDoItem``item-edited``onSubmit()``ToDoItemEditForm``item-edit``editToDo()`

**ToDoForm.vue**

`<form>`监听`submit`事件。 **结果**：`onSubmit()`方法被调用，检查新标签不为空，然后发出`todo-added`事件（然后在里面监听`App.vue`，见上文），最后清除新标签`<input>`。

**ToDoItem.vue**

`checkbox` `<input>`监听`change`事件。 **结果**：`checkbox-changed`当复选框被选中/取消选中时发出事件（然后在里面监听`App.vue`；见上文）。

“编辑”`<button>`监听`click`事件。 **结果**:`toggleToItemEditForm()`方法被调用，切换`this.isEditing`到`true`，然后在重新渲染时显示待办事项的编辑表单。

“删除”`<button>`监听`click`事件。 **结果**：`deleteToDo()`方法被调用，它发出`item-deleted`事件（然后在里面监听`App.vue`；见上文）

`<to-do-item-edit-form>`听：

- `item-edited`成功提交表单时，组件 `onSubmit()`内部的方法发出的事件。**结果**：方法被调用，它发出事件（然后在里面监听，见上文），并设置回，因此编辑表单不再显示在重新渲染时。 `ToDoItemEditForm``itemEdited()``item-edited``App.vue``this.isEditing``false`
- `edit-cancelled`单击“取消”按钮时，由组件 `onCancel()`内部的方法发出的事件。**结果**:方法被调用，该方法设置回，因此重新渲染时不再显示编辑表单。 `ToDoItemEditForm``editCancelled()``this.isEditing``false`

**ToDoItemEditForm.vue**

`<form>`监听`submit`事件。 **结果**：`onSubmit()`方法被调用，它检查新标签值是否不为空，并且与旧标签值不同，如果是，则发出`item-edited`事件（然后在里面监听`ToDoItem.vue`，见上文）。

“取消”`<button>`监听`click`事件。 **结果**：`onCancel()`方法被调用，它发出`edit-cancelled`事件