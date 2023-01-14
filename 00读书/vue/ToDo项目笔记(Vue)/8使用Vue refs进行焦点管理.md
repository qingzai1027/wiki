我们几乎完成了 Vue。最后一点要查看的功能是焦点管理，或者换句话说，我们如何改进应用程序的键盘可访问性。我们将研究使用**Vue refs**来处理这个问题——这是一项高级功能，它允许您直接访问虚拟 DOM 下方的底层 DOM 节点，或者从一个组件直接访问子组件的内部 DOM 结构。



## 焦点管理问题

虽然我们确实有有效的编辑功能，但我们并没有为非鼠标用户提供出色的体验。具体来说，当用户激活“编辑”按钮时，我们会从 DOM 中移除“编辑”按钮，但我们不会将用户的焦点移动到任何地方，因此实际上它只是消失了。这可能会让键盘和非视觉用户迷失方向。

要了解当前正在发生的事情：

1. 重新加载您的页面，然后按 Tab 。您应该会在用于添加新待办事项的输入上看到焦点轮廓。
2. 再按 Tab 一次。焦点应移至“添加”按钮。
3. 再次点击它，它将出现在第一个复选框上。再过一次，重点应该放在第一个“编辑”按钮上。
4. 按 激活“编辑”按钮 Enter 。复选框将替换为我们的编辑组件，但焦点轮廓将消失。

这种行为可能会令人不快。此外，Tab再次按下时会发生什么，这取决于您使用的浏览器。同样，如果您保存或取消您的编辑，焦点将在您移回非编辑视图时再次消失。

为了给用户更好的体验，我们将添加代码来控制焦点，以便在显示编辑表单时将其设置为编辑字段。当用户取消或保存他们的编辑时，我们还希望将焦点重新放在“编辑”按钮上。为了集中注意力，我们需要更多地了解 Vue 内部是如何工作的。



## 虚拟 DOM 和 refs

Vue 与其他一些框架一样，使用虚拟 DOM (VDOM) 来管理元素。这意味着 Vue 在内存中保留了我们应用程序中所有节点的表示。任何更新都首先在内存中的节点上执行，然后所有需要对页面上的实际节点进行的更改都批量同步。

由于读取和写入实际 DOM 节点通常比虚拟节点更昂贵，因此这可以带来更好的性能。但是，这也意味着您在使用框架时通常不应该直接通过本机浏览器 API（例如`Document.getElementById`）编辑 HTML 元素，因为这会导致 VDOM 和真实 DOM 不同步。

相反，如果你需要访问底层的 DOM 节点（比如设置焦点时），你可以使用**Vue refs**。对于自定义 Vue 组件，您还可以使用 refs 直接访问子组件的内部结构，但是应该谨慎这样做，因为它会使代码更难推理和理解。

要在组件中使用 ref `ref`，您需要向要访问的元素添加一个属性，并为该属性的值添加一个字符串标识符。重要的是要注意 ref 在组件中必须是唯一的。任何两个同时渲染的元素都不应该具有相同的 ref。



### 向我们的应用添加 ref

### *<u>ToDoItem.vue中操作</u>*

所以，让我们为我们的“编辑”按钮附加一个引用`ToDoItem.vue`。像这样更新它：

```vue
<button type="button" class="btn" ref="editButton" @click="toggleToItemEditForm">
  Edit
  <span class="visually-hidden">{{label}}</span>
</button>
```

要访问与我们的 ref 关联的值，我们使用`$refs`组件实例上提供的属性。要在单击“编辑”按钮时查看 ref 的值，请将 a 添加`console.log()`到我们的`toggleToItemEditForm()`方法中，如下所示：

```js
toggleToItemEditForm() {
  console.log(this.$refs.editButton);
  this.isEditing = true;
}
```

如果此时激活“编辑”按钮，您应该会看到`<button>`控制台中引用的 HTML 元素。



## Vue的`$nextTick()`方法

### *<u>ToDoItem.vue中操作</u>*

当用户保存或取消他们的编辑时，我们希望将焦点设置在“编辑”按钮上。为此，我们需要处理`ToDoItem`组件`itemEdited()`和`editCancelled()`方法中的焦点。

为方便起见，创建一个不带参数的新方法，称为`focusOnEditButton()`. 在其中，将您分配`ref`给一个变量，然后`focus()`在 ref 上调用该方法。

```js
focusOnEditButton() {
  const editButtonRef = this.$refs.editButton;
  editButtonRef.focus();
}
```

Next, add a call to `this.focusOnEditButton()` at the end of the `itemEdited()` and `editCancelled()` methods:

```js
itemEdited(newLabel) {
  this.$emit("item-edited", newLabel);
  this.isEditing = false;
  this.focusOnEditButton();
},
editCancelled() {
  this.isEditing = false;
  this.focusOnEditButton();
},
```

尝试通过键盘编辑然后保存/取消待办事项。你会注意到没有设置焦点，所以我们还有一个问题要解决。如果你打开你的控制台，你会看到一个错误*提示“can't access property "focus", editButtonRef is undefined"*。这似乎很奇怪。您的按钮引用是在您激活“编辑”按钮时定义的，但现在不是。到底是怎么回事？

好吧，请记住，当我们更改`isEditing`为时`true`，我们不再渲染具有“编辑”按钮的组件部分。这意味着没有将 ref 绑定到的元素，因此它变为`undefined`.

您现在可能在想“嘿，我们不是`isEditing=false`在尝试访问之前设置的`ref`，所以`v-if`现在不应该显示按钮吗？” 这就是虚拟 DOM 发挥作用的地方。因为 Vue 正在尝试优化和批量更改，所以当我们设置`isEditing`为`false`. 所以当我们调用时`focusOnEdit()`，“编辑”按钮还没有被渲染。

相反，我们需要等到 Vue 经历下一个 DOM 更新周期之后。为此，Vue 组件有一个特殊的方法，称为`$nextTick()`. 这个方法接受一个回调函数，然后在 DOM 更新后执行。

由于`focusOnEditButton()`需要在 DOM 更新后调用该方法，我们可以将现有的函数体包装在一个`$nextTick()`调用中。

```js
focusOnEditButton() {
  this.$nextTick(() => {
    const editButtonRef = this.$refs.editButton;
    editButtonRef.focus();
  });
}
```

现在，当您激活“编辑”按钮，然后通过键盘取消或保存更改时，焦点应返回到“编辑”按钮。成功！



## Vue 生命周期方法

`<input>`接下来，当单击“编辑”按钮时，我们需要将焦点移到编辑表单的元素上。但是，因为我们的编辑表单与“编辑”按钮位于不同的组件中，所以我们不能只在“编辑”按钮的单击事件处理程序中设置焦点。`ToDoItemEditForm`相反，我们可以使用这样一个事实，即每当单击“编辑”按钮时，我们都会删除并重新安装我们的组件来处理这个问题。

那么这是如何工作的呢？嗯，Vue 组件会经历一系列事件，称为**生命周期**。*这个生命周期从创建*元素并将其添加到 VDOM（*mounted*）之前的所有过程，直到它们从 VDOM 中删除（*destroyed*）。

**Vue 允许您使用生命周期方法**在此生命周期的各个阶段运行方法。这对于诸如数据获取之类的事情很有用，您可能需要在组件呈现之前或属性更改之后获取数据。生命周期方法列表如下，按照它们触发的顺序。

1. `beforeCreate()`— 在创建组件实例之前运行。数据和事件尚不可用。
2. `created()`— 在您的组件初始化之后但在组件添加到 VDOM 之前运行。这通常是发生数据提取的地方。
3. `beforeMount()`— 在你的模板编译之后，但在你的组件被渲染到实际的 DOM 之前运行。
4. `mounted()`— 在您的组件安装到 DOM 后运行。可以访问`refs`这里。
5. `beforeUpdate()`— 只要组件中的数据发生更改，但在将更改呈现到 DOM 之前运行。
6. `updated()`— 每当您的组件中的数据发生更改以及将更改呈现到 DOM 后运行。
7. `beforeDestroy()`— 在从 DOM 中删除组件之前运行。
8. `destroyed()`— 在组件从 DOM 中移除后运行
9. `activated()`— 仅用于包装在特殊`keep-alive`标签中的组件。在组件激活后运行。
10. `deactivated()`— 仅用于包装在特殊`keep-alive`标签中的组件。在组件停用后运行。

现在我们已经了解了生命周期方法，让我们`ToDoItemEditForm`在安装组件时使用一种方法来触发焦点。

### *<u>ToDoItemEditForm.vue中操作</u>*

在`ToDoItemEditForm.vue`中，附加`ref="labelInput"`到`<input>`元素，如下所示：

```vue
<input :id="id" ref="labelInput" type="text" autocomplete="off" v-model.lazy.trim="newName" />
```

接下来，`mounted()`在您的组件对象内添加一个属性 -**请注意，这不应放在属性内，而应放在与、和`methods`相同的层次结构级别。`props``data()``methods`**生命周期方法是独立存在的特殊方法，而不是与用户定义的方法并列。这应该不需要输入。请注意，您不能在此处使用箭头功能，因为我们需要访问`this`来访问我们的`labelInput`ref。

```vue
mounted() {

}
```

在您的`mounted()`方法中，将您的`labelInput`ref 分配给一个变量，然后调用`focus()`ref 的函数。您不必`$nextTick`在此处使用，因为该组件在调用时已经添加到 DOM`mounted()`中。

```js
mounted() {
   const labelInputRef = this.$refs.labelInput;
   labelInputRef.focus();
}
```

现在，当您使用键盘激活“编辑”按钮时，焦点应立即移至编辑`<input>`。



## 删除待办事项时处理焦点

还有一个地方我们需要考虑焦点管理：当用户删除待办事项时。单击“编辑”按钮时，将焦点移至编辑名称文本框，从编辑屏幕取消或保存时，将焦点移回“编辑”按钮。

但是，与编辑表单不同的是，当删除元素时，我们没有明确的焦点移动位置。我们还需要一种方法来为辅助技术用户提供确认元素已删除的信息。

我们已经在跟踪列表标题中的元素数量——in——`<h2>`它`App.vue`与我们的待办事项列表相关联。这使得我们在删除节点时将焦点移到一个合理的位置。

首先，我们需要在列表标题中添加一个 ref。我们还需要在其中添加一个`tabindex="-1"`—— 这使得元素可以通过编程获得焦点（即它可以通过 JavaScript 获得焦点），而默认情况下它不是。

### *<u>App.vue中操作</u>*

在`App.vue`，更新你`<h2>`的如下：

```vue
 <h2 id="list-summary" ref="listSummary" tabindex="-1">{{listSummary}}</h2>
```

现在我们有了 a`ref`并且已经让浏览器知道我们可以通过编程方式聚焦`<h2>`，我们需要将焦点设置在它上面。最后`deleteToDo()`，使用`listSummary`ref 将焦点设置在`<h2>`. 由于`<h2>`始终在应用程序中呈现，因此您无需担心使用`$nextTick`生命周期方法来处理焦点。

```js
deleteToDo(toDoId) {
    const itemIndex = this.ToDoItems.findIndex(item => item.id === toDoId);
    this.ToDoItems.splice(itemIndex, 1);
    this.$refs.listSummary.focus();
}
```

现在，当您从列表中删除一个项目时，焦点应该向上移动到列表标题。这应该为我们所有的用户提供合理的专注体验。