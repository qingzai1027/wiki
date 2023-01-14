## 创建新的待办事项表单

我们的应用程序可以展示待办事项列表，但我们不能手动更改该列表，让我们新建待办组件来允许我们添加新的代码办事项。

在components目录下，新建文件 `ToDoForm.vue`。

### *<u>ToDoForm.vue里操作</u>*

1. 创建一个空的 `<template>` 和 `<script>` ：

   ```vue
   <template></template>
   
   <script>
     export default {};
   </script>
   ```

2. 新建一个 HTML 待办表格来允许我们输入新的项并将其提交到应用程序。我们需要一个 `<form>` ，它里面包含 `<label>`一个 ，一个`<input>`，一个 `<button>`。更新后的模版如下：

   ```vue
   <template>
     <form>
       <label for="new-todo-input">
         What needs to be done?
       </label>
       <input
         type="text"
         id="new-todo-input"
         name="new-todo"
         autocomplete="off"
       />
       <button type="submit">
         Add
       </button>
     </form>
   </template>
   ```

   现在我们有一个可以组成的组件可以使用输入新的待办事项的标题，它最终会渲染成`ToDoItem`的标签。

### *<u>App.vue里操作</u>*

3.我们把这个组件添加到app中， `App.vue` 然后在 `<script>` 下面的语句中添加：

```js
import ToDoForm from './components/ToDoForm';
```

4.在你的App组件中注册它

```vue
components: {
  ToDoItem,
  ToDoForm
}
```

5.最后将 `ToDoForm`组件添加到App中的`<template>` 中，像下面这样：

```vue 
<template>
  <div id="app">
    <h1>My To-Do List</h1>
    <to-do-form></to-do-form>
    <ul>
      <li v-for="item in ToDoItems" :key="item.id">
        <to-do-item :label="item.label" :done="item.done" :id="item.id"></to-do-item>
      </li>
    </ul>
  </div>
</template>
```

如果您填写并单击“添加”按钮，页面会将表单发送回服务器，但这并不是我们真正想要的。我们真正想做的是在[`submit`事件](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event)上运行一个方法，将新的 todo 添加到`ToDoItem`内部定义的数据列表中`App`。为此，我们需要向组件实例添加一个方法。



## 使用 v-on 创建方法并将其绑定到事件

为了使`ToDoForm`组件可以使用方法，我们需要将它添加到组件对象中，这是在组件的属性中完成的，该属性与,等`methods`位于相同的位置。该属性包含我们可能需要的任何方法调用我们的组件。引用时，方法已完全运行，因此使用它们在模板内显示信息不是一个好主意。为了显示来自计算的数据，您应该使用属性，我们稍后会介绍。`data() props methods computed`

### *<u>ToDoForm.vue里操作</u>*

1. 在这个组件中，我们需要给组件对象内部的一个属性添加一个`onSubmit()`方法。我们将使用它来处理提交操作。`methods ToDoForm`

   像这样添加：

   ```js
   export default {
      methods: {
          onSubmit() {
             console.log('form submitted')
          }
      }
   }
   ```

2. 接下来我们需要将该方法绑定到我们`<form>`元素的`submit`事件处理程序。就像 Vue 使用`v-bind`语法来绑定属性一样，Vue 有一个特殊的事件处理指令：`v-on`. 该`v-on`指令通过`v-on:event="method"`语法工作。和 非常相似`v-bind`，还有一种速记语法：`@event="method"`.

   为了保持一致性，我们将在这里使用简写语法。像这样将处理程序添加`submit`到您的`<form>`元素中：

   ```vue
   <form @submit="onSubmit">
   ```

3. 当您运行此程序时，应用程序仍会将数据发布到服务器，从而导致刷新。由于我们在客户端上进行所有处理，因此没有服务器来处理回发。我们还会在页面刷新时丢失所有本地状态。为了防止浏览器发布到服务器，我们需要阻止事件的默认操作在页面中冒泡（`Event.preventDefault()`在 vanilla JavaScript 中为 , ）。Vue 有一种称为**事件修饰符**的特殊语法，它可以在我们的模板中为我们处理这个问题。

   修饰符被附加到事件的末尾，并带有一个点，如下所示：`@event.modifier`. 以下是事件修饰符列表：

   - `.stop`：停止传播事件。等效`Event.stopPropagation()`于常规 JavaScript 事件。
   - `.prevent`: 防止事件的默认行为。相当于`Event.preventDefault()`。
   - `.self`：仅当事件是从这个确切的元素分派时才触发处理程序。
   - `{.key}`：仅通过指定的键触发事件处理程序。[MDN 有一个有效键值列表](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)；多词键只需要转换为 kebab 大小写（例如`page-down`）。
   - `.native`：在组件的根（最外层包装）元素上侦听本机事件。
   - `.once`：监听事件，直到它被触发一次，然后不再触发。
   - `.left`：仅通过鼠标左键事件触发处理程序。
   - `.right`：仅通过鼠标右键事件触发处理程序。
   - `.middle`：仅通过鼠标中键事件触发处理程序。
   - `.passive`: 等价于`{ passive: true }`在 vanilla JavaScript 中使用`addEventListener()`.

   在这种情况下，我们需要使用`.prevent`处理程序来停止浏览器的默认提交操作。添加`.prevent`到`@submit`模板中的处理程序，如下所示：

   ```vue
   <form @submit.prevent="onSubmit">
   ```

如果您现在尝试提交表单，您会注意到页面没有重新加载。如果您打开控制台，您可以看到`console.log()`我们在`onSubmit()`方法中添加的结果。



## 使用 v-model 将数据绑定到输入

接下来，我们需要一种从表单中获取值的方法，`<input>`以便我们可以将新的待办事项添加到我们的`ToDoItems`数据列表中。

我们需要的第一件事是`data`我们表单中的一个属性来跟踪待办事项的价值。

### *<u>ToDoForm.vue里操作</u>*

1. `data()`向我们的`ToDoForm`组件对象添加一个返回`label`字段的方法。我们可以将 的初始值设置为`label`空字符串。

   您的组件对象现在应该如下所示：

   ```js
   export default {
     methods: {
       onSubmit() {
         console.log("form submitted");
       }
     },
     data() {
       return {
         label: ""
       };
     }
   };
   ```

2. 我们现在需要一些方法来将字段的值附加`new-todo-input` `<input>`到`label`字段上。Vue 对此有一个特殊的指令：`v-model`. `v-model`绑定到您在其上设置的数据属性并使其与`<input>`. `v-model`适用于所有不同的输入类型，包括复选框、收音机和选择输入。要使用`v-model`，您将具有结构的属性添加`v-model="variable"`到`<input>`.

   所以在我们的例子中，我们会将它添加到我们的`new-todo-input`字段中，如下所示。现在执行此操作：

   ```vue
   <input
     type="text"
     id="new-todo-input"
     name="new-todo"
     autocomplete="off"
     v-model="label" />
   ```

3.让我们通过记录我们方法`v-model`中提交的数据的值来测试我们的使用。在组件中，使用关键字`onSubmit()`访问数据属性。`this`所以我们`label`使用`this.label`.

将您的`onSubmit()`方法更新为如下所示：

```js
methods: {
  onSubmit() {
    console.log('Label value: ', this.label);
  }
},
```

4.现在回到您正在运行的应用程序，在`<input>`字段中添加一些文本，然后单击“添加”按钮。您应该会看到您输入的值已记录到控制台，例如：

```vue
Label value: My value
```



## `v-model`使用修饰符改变行为

与事件修饰符类似，我们也可以添加修饰符来改变`v-model`. 在我们的案例中，有两个值得考虑。第一个 ,`.trim`将删除输入之前或之后的空格。我们可以像这样将修饰符添加到我们的`v-model`语句中`v-model.trim="label"`：

我们应该考虑的第二个修饰符叫做`.lazy`. `v-model`当同步文本输入的值时，此修饰符会发生变化。如前所述，`v-model`同步通过使用事件更新变量来工作。对于文本输入，此同步使用[`input`事件发生](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event)。通常，这意味着 Vue 在每次击键后都会同步数据。`.lazy`修饰符导致`v-model`使用该[`change`事件](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)。这意味着 Vue 只会在输入失去焦点或提交表单时同步数据。出于我们的目的，这更合理，因为我们只需要最终数据。

要同时使用`.lazy`修饰符和`.trim`修饰符，我们可以将它们链接起来，例如`v-model.lazy.trim="label"`.

将您的属性更新`v-model`为链`lazy`和`trim`如上所示，然后再次测试您的应用程序。例如，尝试提交一个两端带有空格的值。



## 使用自定义事件将数据传递给父母

我们现在非常接近能够将新的待办事项添加到我们的列表中。我们需要做的下一件事是将新创建的待办事项传递给我们的`App`组件。为此，我们可以让我们`ToDoForm`发出一个传递数据的自定义事件，并`App`监听它。这与 HTML 元素上的原生事件非常相似：子组件可以发出一个事件，该事件可以通过`v-on`.

在我们的`onSubmit`事件中`ToDoForm`，让我们添加一个`todo-added`事件。自定义事件是这样发出的：`this.$emit("event-name")`. 重要的是要知道事件处理程序区分大小写并且不能包含空格。Vue 模板也被转换为小写，这意味着 Vue 模板无法监听以大写字母命名的事件。

### *<u>ToDoForm.vue里操作</u>*

1. 将方法`console.log()`中的替换`onSubmit()`为以下内容：

   ```js
   this.$emit("todo-added");
   ```

   ### *<u>App.vue里操作</u>*

2. 接下来，返回并为包含方法的组件对象`App.vue`添加一个属性，如下所示。目前，此方法只能登录到控制台。`methods``addToDo()``To-do added`

   ```js
   export default {
     name: 'app',
     components: {
       ToDoItem,
       ToDoForm
     },
    data() {
       return {
         ToDoItems: [
           { id:uniqueId('todo-'), label: 'Learn Vue', done: false },
           { id:uniqueId('todo-'), label: 'Create a Vue project with the CLI', done: true },
           { id:uniqueId('todo-'), label: 'Have fun', done: true },
           { id:uniqueId('todo-'), label: 'Create a to-do list', done: false }
         ]
       };
     },
     methods: {
       addToDo() {
         console.log('To-do added');
       }
     }
   };
   ```

3. 接下来，将事件的事件侦听器添加`todo-added`到，它会在事件触发时`<to-do-form></to-do-form>`调用该方法。`addToDo()`使用`@`速记，侦听器将如下所示`@todo-added="addToDo"`：

   ```vue
   <to-do-form @todo-added="addToDo"></to-do-form>
   ```

   ### *<u>ToDoForm.vue里操作</u>*

4. 当你提交你的，你应该从方法中`ToDoForm`看到控制台日志。`addToDo()`这很好，但我们仍然没有将任何数据传回`App.vue`组件。我们可以通过将额外的参数传递`this.$emit()`回`ToDoForm`组件中的函数来做到这一点。

   在这种情况下，当我们触发事件时，我们希望将`label`数据连同它一起传递。这是通过在方法中包含要作为另一个参数传递的数据来完成的`$emit()`： `this.$emit("todo-added", this.label)`。这类似于原生 JavaScript 事件如何包含数据，除了自定义 Vue 事件默认不包含事件对象。这意味着发出的事件将直接匹配您提交的任何对象。所以在我们的例子中，我们的事件对象只是一个字符串。

   像这样更新您的`onSubmit()`方法：

   ```vue
   onSubmit() {
     this.$emit('todo-added', this.label)
   }
   ```

   ### *<u>App.vue里操作</u>*

5. 要真正在 内部获取这些数据`App.vue`，我们需要向我们的`addToDo()`方法添加一个参数，其中包括`label`新的待办事项的 。

   现在返回`App.vue`并更新：

   ```js
   methods: {
     addToDo(toDoLabel) {
       console.log('To-do added:', toDoLabel);
     }
   }
   ```

如果您再次测试您的表单，您将在提交时看到您输入的任何文本都记录在控制台中。Vue 会自动将事件名称后面的参数传递`this.$emit()`给您的事件处理程序。



## 将新的待办事项添加到我们的数据中

现在我们有了 中`ToDoForm`可用的数据`App.vue`，我们需要将一个表示它的项目添加到`ToDoItems`数组中。这可以通过将新的待办事项对象推送到包含我们新数据的数组来完成。

### *<u>App.vue里操作</u>*

1. 像这样更新您的`addToDo()`方法：

   ```js
   addToDo(toDoLabel) {
     this.ToDoItems.push({id:uniqueId('todo-'), label: toDoLabel, done: false});
   }
   ```

2. 再次尝试测试您的表单，您应该会看到新的待办事项被附加到列表的末尾。

   ### *<u>ToDoForm.vue里操作</u>*

3. 在继续之前，让我们进一步改进。如果您在输入为空时提交表单，则没有文本的待办事项仍会添加到列表中。为了解决这个问题，我们可以防止在 name 为空时触发 todo-added 事件。由于 name 已经被`.trim`指令修剪，我们只需要测试空字符串。

   回到你的`ToDoForm`组件，`onSubmit()`像这样更新方法。如果标签值为空，我们就不发出`todo-added`事件。

   ```js
   onSubmit() {
     if(this.label === "") {
       return;
     }
     this.$emit('todo-added', this.label);
   }
   ```

4. 再次尝试您的表格。现在您将无法将空项目添加到待办事项列表中。



## 用于`v-model`更新输入值

在我们的组件中还有一件事要修复`ToDoForm`——提交后，`<input>`仍然包含旧值。但这很容易解决——因为我们使用`v-model`将数据绑定到`<input>`in `ToDoForm`，如果我们将 name 参数设置为等于一个空字符串，输入也会更新。

### *<u>ToDoForm.vue里操作</u>*

`ToDoForm`将组件的`onSubmit()`方法更新为：

```js
onSubmit() {
  if(this.label === "") {
    return;
  }
  this.$emit('todo-added', this.label);
  this.label = "";
}
```

现在，当您单击“添加”按钮时，“new-todo-input”将自行清除。