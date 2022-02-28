#### CSS 层叠式样式表

## 链接方式

1. 三个：内嵌式，嵌入式，外部式。

2. 优先级：
    - 内嵌式 > 嵌入 > 外部
    - 嵌入式>外部式的前提：嵌入式 css 样式的位置一定在外部式的后面。

## 选择器

选择器是 HTML 和 CSS 的纽带。

### 优先级

1. 内联样式 > id 选择器 > 类选择器 > 标签选择器 > 通配符选择器。

### 标签选择器

1. 标签选择器又叫元素选择器、类型选择器.
2. 标签选择器“覆盖面非常大”，通常用于标签的初始化

```css
ul{list-style:none} /*去掉无序列表的小圆点*/
a{text-decoration:none} /*去掉超级链接的下划线*/
```

###  复合选择器：

CSS 选择器中，使用空格表示后代。

#### 后代选择器

.box .spec 选择 box 内 spec 的标签（所有的 spec）
.box p{color:red;}

<div class="box">
    <p>我是盒子中的段落  （被选择）
    <p>我是盒子中的段落   （被选择）
</div>
<p>我是段落<p>
<p>我是段落<p>

#### 交集选择器：

li.spec     选择又是li和又拥有spec俩标签


#### 并集选择器

ul,ol       选择所有ul和ol标签

伪类的超级链接有四个特殊状态：
(1)a:link 没有被访问的超级链接
(2)a:visited 已被访问过的超级链接
(3)a:hover 正被鼠标悬停的超链接
(4)a:active 正被激活的超级链接（按下按键但是还没有松开按键）
爱恨准则（LoVe HAte）按照顺序，否则会有伪类不生效

#### 元素关系选择器：
（1）子选择器 div>p div 的字标签 p(匹配第一个元素的直接后代)
（2）相邻兄弟选择器 img+p 图片后面紧跟的段落将被选中

（3）通用兄弟选择器 p~span p 元素之后的所有同层级 span 元素
 举例：   

 ```css
 h3~span { font-style: italic;}
 ```
 ```html
<span>我是后面的span</span>
<h3>我是一个三级标题</h3>
<span>我是后面的span</span> 将被选择
<span>我是后面的span</span> 将被选择
<span>我是后面的span</span> 将被选择
<span>我是后面的span</span>
<p>我是一个段落</p>
<span>我是后面的span</span> 将被选择
<span>我是后面的span</span> 将被选择
<div>
    <span>多了一个级别span</span>
    <span>多了一个级别span</span>
</div>
 ```
