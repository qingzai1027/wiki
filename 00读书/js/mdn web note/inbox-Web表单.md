- `action` 属性定义了在提交表单时，应该把所收集的数据送给谁 (/那个模块)(URL) 去处理。.
-  `method` 属性定义了发送数据的 HTTP 方法 (它可以是“get”或“post”).

fieldset元素是一种方便的用于创建具有相同目的的小部件组的方式，出于样式和语义目的。

- 常见的输入（input）类型元素：[button](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/button)、[checkbox](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/checkbox)、[file](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file)、[hidden](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/hidden)、[image](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/image)、[password](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/password)、[radio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/radio)、[reset](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/reset)、[submit](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/submit) 和 [text](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/text)。

| 属性名称            | 默认值 | 描述                                                         |
| :------------------ | :----- | :----------------------------------------------------------- |
| `autofocus (en-US)` | false  | 这个布尔属性允许您指定当页面加载时元素应该自动具有输入焦点，除非用户覆盖它，例如通过键入不同的控件。文档中只有一个与表单相关的元素可以指定这个属性。 |
| `disabled (en-US)`  | false  | 这个布尔属性表示用户不能与元素交互。如果没有指定这个属性，元素将从包含它的元素继承设置，例如 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/fieldset)；如果没有包含在设定了 `disabled` 属性的元素里，那么这个元素就是可用的。 |
| `form`              |        | 小部件与之相关联的表单元素。属性值必需是同个文档中的 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form) 元素的 `id` 属性。理论上，它允许您在 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form) 元素之外设置一个表单小部件。 |
| `name`              |        | 元素的名称；这是跟表单数据一起提交的。                       |
| `value`             |        | 元素的初始值。                                               |



### [定义语义化的 HTML 结构](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/How_to_build_custom_form_controls#定义语义化的_html_结构)

现在控件的基本功能已经决定了，可以开始构建自定义控件了。第一步是要确定 HTML 结构并给予一些基本的语义规则。第一步就是去确定它的 HTML 结构并给予一些基本的语义。重构[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/select)元素需要怎么做如下：

```html
<!-- 这是我们小部件的主要容器。
     tabindex 属性是用来让用户聚焦在小部件上的。
     稍后我们会发现最好通过 JavaScript 来设定它的值。-->
<div class="select" tabindex="0">

  <!-- 这个容器用来显示组件现在的值 -->
  <span class="value">Cherry</span>

  <!-- 这个容器包含我们的组件的所有可用选项。
       因为他是一个列表，用 ul 元素是有意义的。-->
  <ul class="optList">
    <!-- 每个选项只包含用来显示的值，
         稍后我们会知道如何处理和表单一起发送的真实值 -->
    <li class="option">Cherry</li>
    <li class="option">Lemon</li>
    <li class="option">Banana</li>
    <li class="option">Strawberry</li>
    <li class="option">Apple</li>
  </ul>

</div>
```



### [它为什么不生效？](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/How_to_build_custom_form_controls#它为什么不生效？)

在我们开始之前，要记住一件和 JavaScript 有关的非常重要的事情：在浏览器中，**这是一种不可靠的技术。**当你构建一个自定义组件时，你会不得不得依赖于 JavaScript，因为这是将所有的东西联系在一起的线索。但是，很多情况下，JavaScript 不能在浏览器中运行。

- 用户关掉了 JavaScript: 这是最不常见的情形。现在只有很少的人会关掉 JavaScript。
- 脚本没有加载。这是最常见的情形，特别是在移动端上，在那些网络非常不可靠的地方。
- 脚本是有问题的。你应该总是考虑这种可能性。
- 脚本和第三方脚本冲突。这可能会由用户使用的跟踪脚本和一些书签工具引发。
- 脚本与一个浏览器的拓展冲突，或者受其影响。 (比如 Firefox 的 [NoScript](https://addons.mozilla.org/fr/firefox/addon/noscript/) 拓展 或者 Chrome 的 [NotScripts](https://chrome.google.com/webstore/detail/notscripts/odjhifogjcknibkahlpidmdajjpkkcfn) 拓展)。
- 用户在使用老旧的浏览器，而且你需要的一些功能没有被支持。当你使用一些最新的 API 时，这种情况会经常发生。



### [构造事件回调](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/How_to_build_custom_form_controls#构造事件回调)

基础已经准备好了，我们现在可以开始定义用户每次同我们的组件交互时会用到的所有函数了。

```js
// 这个函数会用在每当我们想要停用一个自定义组件的时候
// 它需要一个参数：
// select :要停用的带有 'select' 类的节点
function deactivateSelect(select) {

  // 如果组件没有运行，不用进行任何操作
  if (!select.classList.contains('active')) return;

  // 我们需要获取自定义组件的选项列表
  var optList = select.querySelector('.optList');

  // 关闭选项列表
  optList.classList.add('hidden');

  // 然后停用组件本身
  select.classList.remove('active');
}

// 每当用户想要激活（或停用）这个组件的时候，会调用这个函数
// 它需要 2 个参数：
// select : 要激活的带有'select'类的 DOM 节点
// selectList : 包含所有带'select'类的 DOM 节点的列表
function activeSelect(select, selectList) {

  // 如果组件已经激活了，不进行任何操作
  if (select.classList.contains('active')) return;

  // 我们需要关闭所有自定义组件的活动状态
  // 因为 deactiveselect 函数满足 forEach 回调函数的所有请求，
  // 我们直接使用它，不使用中间匿名函数
  selectList.forEach(deactivateSelect);

  // 然后我们激活特定的组件
  select.classList.add('active');
}

// 每当用户想要打开/关闭选项列表的时候，会调用这个函数
// 它需要一个参数：
// select : 要触发的列表的 DOM 节点
function toggleOptList(select) {

  // 该列表不包含在组件中
  var optList = select.querySelector('.optList');

  // 我们改变列表的class去显示/隐藏它
  optList.classList.toggle('hidden');
}

// 每当我们要高亮一个选项的时候，会调用该函数
// 它需要两个参数：
// select : 带有'select'类的 DOM 节点，包含了需要高亮强调的选项
// option : 需要高亮强调的带有'option'类的 DOM 节点
function highlightOption(select, option) {

  // 为我们的自定义 select 元素获取所有有效选项的列表
  var optionList = select.querySelectorAll('.option');

  // 我们移除所有选项的高亮强调
  optionList.forEach(function (other) {
    other.classList.remove('highlight');
  });

  // 我们高亮强调正确的选项
  option.classList.add('highlight');
};
```

这是你需要用来处理组件不同状态的所有代码。

接下来，我们将这些函数绑定到合适的事件上：

```js
// 我们处理文档加载时的事件绑定。
window.addEventListener('load', function () {
  var selectList = document.querySelectorAll('.select');

  // 每个自定义组件都需要初始化
  selectList.forEach(function (select) {

    // 它的'option'元素也需要
    var optionList = select.querySelectorAll('.option');

    // 每当用户的鼠标悬停在一个选项上时，我们高亮这个指定的选项
    optionList.forEach(function (option) {
      option.addEventListener('mouseover', function () {
        // 注意:'select'和'option'变量是我们函数调用范围内有效的闭包。
        highlightOption(select, option);
      });
    });

    // 每当用户点击一个自定义的 select 元素时
    select.addEventListener('click', function (event) {
      // 注意:'select'变量是我们函数调用范围内有效的闭包。

      // 我们改变选项列表的可见性
      toggleOptList(select);
    });

    // 如果组件获得了焦点
    // 每当用户点击它或是用 tab 键访问这个组件时，组件获得焦点
    select.addEventListener('focus', function (event) {
      // 注意:'select'和'selectlist'变量是我们函数调用范围内有效的闭包。

      // 我们激活这个组件
      activeSelect(select, selectList);
    });

    // 如果组件失去焦点
    select.addEventListener('blur', function (event) {
      // 注意:'select'变量是我们函数调用范围内有效的闭包。

      // 我们关闭这个组件
      deactivateSelect(select);
    });
  });
});
```



## [如何阅读表格](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/Property_compatibility_table_for_form_controls#如何阅读表格)

### [值](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/Property_compatibility_table_for_form_controls#值)

对于每个属性，有四种可能地取值：

- YES

  此属性具有相当一致的跨浏览器支持。在某些极端情况下，你可能仍然会面临奇怪的副作用。

- PARTIAL

  尽管这个属性会生效，你还是会经常面对奇怪的副作用和不一致性。你应该尽力避免这些属性，除非你已经深知那些副作用。

- NO

  此属性就是不工作或者表现得非常不一致，所以并不可靠。

- N.A.

  此属性对这种类型的组件没有意义。

### [渲染](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/Property_compatibility_table_for_form_controls#渲染)

对于每个属性有两种可能的渲染方式：

- N (Normal)

  表示这个属性会像设置的那样应用。

- T (Tweaked)

  表示这个属性需要通过下列的额外规则来使用：

  ```css
  * {
  /* This turn off the native look and feel on WebKit based browsers */
    -webkit-appearance: none;
  
  /* This turn off the native look and feel on Gecko based browsers */
    -moz-appearance: none;
  
  /* This turn off the native look and feel on several different browsers
     including Opera, Internet Explorer and Firefox */
    background: none;
  }
  ```

  

| Property                                                     |       N       |     T      | Note                                                         |
| :----------------------------------------------------------- | :-----------: | :--------: | :----------------------------------------------------------- |
| *CSS box model*                                              |               |            |                                                              |
| [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) |      Yes      |    Yes     |                                                              |
| [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) | Partial[1][2] |    Yes     | WebKit 浏览器 (主要在 Mac OSX and iOS 上) 的搜索域使用原生的样式和行为。因此，需要使用 `-webkit-appearance:none` 才能将这个属性应用到搜索域上。在 Windows 7, Internet Explorer 9 不会应用到边框上，除非 `background:none` 已应用。 |
| [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border) | Partial[1][2] |    Yes     | WebKit 浏览器 (主要在 Mac OSX and iOS 上) 的搜索域使用原生的样式和行为。因此，需要使用 `-webkit-appearance:none` 才能将这个属性应用到搜索域上。在 Windows 7, Internet Explorer 9 不会应用到边框上，除非 `background:none` 已应用。 |
| [`margin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin) |      Yes      |    Yes     |                                                              |
| [`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding) | Partial[1][2] |    Yes     | WebKit 浏览器 (主要在 Mac OSX and iOS 上) 的搜索域使用原生的样式和行为。因此，需要使用 `-webkit-appearance:none` 才能将这个属性应用到搜索域上。在 Windows 7, Internet Explorer 9 不会应用到边框上，除非 `background:none` 已应用。 |
| *Text and font*                                              |               |            |                                                              |
| [`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color)[1] |      Yes      |    Yes     | 如果 [`border-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-color) 属性没有设置，一些基于 WebKit 的浏览器会将 [`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color) 属性应用到边框上，颜色和 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea) 的字体颜色一样。 |
| [`font`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font) |      Yes      |    Yes     | 查看有关 [`line-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height) 的注释 |
| [`letter-spacing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/letter-spacing) |      Yes      |    Yes     |                                                              |
| [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align) |      Yes      |    Yes     |                                                              |
| [`text-decoration`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration) |    Partial    |  Partial   | 查看有关 Opera 的注释                                        |
| [`text-indent`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-indent) |  Partial[1]   | Partial[1] | IE9 只在 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea) 上支持这个属性，而 Opera 只在单行文本域中支持。 |
| [`text-overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-overflow) |    Partial    |  Partial   |                                                              |
| [`text-shadow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow) |    Partial    |  Partial   |                                                              |
| [`text-transform`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-transform) |      Yes      |    Yes     |                                                              |
| *Border and background*                                      |               |            |                                                              |
| [`background`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background) |  Partial[1]   |    Yes     | WebKit 浏览器 (主要在 Mac OSX and iOS 上) 的搜索域使用原生的样式和行为。因此，需要使用 `-webkit-appearance:none` 才能将这个属性应用到搜索域上。在 Windows 7 上，Internet Explorer 9 不会应用到边框上，除非 `background:none` 已应用。 |
| [`border-radius`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius) | Partial[1][2] |    Yes     | WebKit 浏览器 (主要在 Mac OSX and iOS 上) 的搜索域使用原生的样式和行为。因此，需要使用 `-webkit-appearance:none` 才能将这个属性应用到搜索域上。在 Windows 7 上，Internet Explorer 9 不会应用到边框上，除非 `background:none` 已应用。在 Opera 上，只有当边框明确设定时 [`border-radius`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius) 属性才会应用 |
| [`box-shadow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow) |      No       | Partial[1] | IE9 不支持这个属性                                           |



### [Buttons](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/Property_compatibility_table_for_form_controls#buttons)

| Property                                                     |     N      |     T      | Note                                                         |
| :----------------------------------------------------------- | :--------: | :--------: | :----------------------------------------------------------- |
| *CSS box model*                                              |            |            |                                                              |
| [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) |    Yes     |    Yes     |                                                              |
| [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) | Partial[1] |    Yes     | 这个属性不能应用于 Mac OSX or iOS 上基于 WebKit 的浏览器。   |
| [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border) |  Partial   |    Yes     |                                                              |
| [`margin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin) |    Yes     |    Yes     |                                                              |
| [`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding) | Partial[1] |    Yes     | 这个属性不能应用于 Mac OSX or iOS 上基于 WebKit 的浏览器。   |
| *Text and font*                                              |            |            |                                                              |
| [`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color) |    Yes     |    Yes     |                                                              |
| [`font`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font) |    Yes     |    Yes     | 查看[`line-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height) 的注意事项。 |
| [`letter-spacing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/letter-spacing) |    Yes     |    Yes     |                                                              |
| [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align) |     No     |     No     |                                                              |
| [`text-decoration`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration) |  Partial   |    Yes     |                                                              |
| [`text-indent`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-indent) |    Yes     |    Yes     |                                                              |
| [`text-overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-overflow) |     No     |     No     |                                                              |
| [`text-shadow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow) |  Partial   |  Partial   |                                                              |
| [`text-transform`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-transform) |    Yes     |    Yes     |                                                              |
| *Border and background*                                      |            |            |                                                              |
| [`background`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background) |    Yes     |    Yes     |                                                              |
| [`border-radius`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius) |   Yes[1]   |   Yes[1]   | 在 Opera 上，只有当边框明确设定时 [`border-radius`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius) 属性才会应用 |
| [`box-shadow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow) |     No     | Partial[1] | IE9 不支持这个属性                                           |























