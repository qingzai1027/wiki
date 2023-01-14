## Javascript对象介绍

函数可以有属性。 每个函数都有一个特殊的属性叫作原型（prototype）



## create( )

我们曾经讲过如何用 `Object.create()` 方法创建新的对象实例。               

1. 例如，在 JavaScript 控制台中输入：

   ```js
   var person2 = Object.create(person1);
   ```

2. create( )实际做的是从指定原型对象创建一个新的对象。这里以person1为原型对象创建了person2对象。在控制台输入：

   ```js
   person2.__proto__
   ```

​      结果返回对象`person1`。



## 使用JSON

JavaScript对象表示法（JSON）是用于将结构化数据表示为JavaScript对象的标准格式，通常用于在网站上表示和传输数据（例如从服务器向客户端发送一些数据，因此可以将其显示在网页上）。

JSON是一种按照JavaScript对象语法的数据格式，这是 `Douglas Crockford` 推广的。虽然它是基于 JavaScript 语法，但它独立于JavaScript，这也是为什么许多程序环境能够读取（解读）和生成 JSON。 

JSON可以作为一个对象或者字符串存在，前者用于解读 JSON 中的数据，后者用于通过网络传输 JSON 数据。 这不是一个大事件——JavaScript 提供一个全局的 可访问的 JSON 对象来对这两种数据进行转换。

一个 JSON 对象可以被储存在它自己的文件中，这基本上就是一个文本文件，扩展名为 `.json`， 还有`MIME type用于 ` `application/json`.

### 注意事项

- JSON 是一种纯数据格式，它只包含属性，没有方法。
- JSON要求在字符串和属性名称周围使用双引号。 单引号无效。
- 甚至一个错位的逗号或分号就可以导致  JSON 文件出错。您应该小心的检查您想使用的数据(虽然计算机生成的 JSON 很少出错，只要生成程序正常工作)。您可以通过像 `JSONLint`的应用程序来检验 JSON。
- JSON 可以将任何标准合法的 JSON 数据格式化保存，不只是数组和对象。比如，一个单一的字符串或者数字可以是合法的 JSON 对象。虽然不是特别有用处……
- 与 JavaScript 代码中对象属性可以不加引号不同，JSON 中只有带引号的字符串可以用作属性。











