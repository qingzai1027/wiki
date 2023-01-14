Vue中使用v-model指令来实现表单元素和数据的双向绑定。

input中的内容与Vue中的变量进行双向绑定，当一方修改，另一方跟着同步。

```bash
1、v-model:text

2、v-model:radio

3、v-model:checkbox 用数组保存

4、v-model:select 单选，绑定到select元素上，多选加上 multiple
```



##### 值绑定

```bash
<label v-for="item in originHobbies" :for="item">
    <inout type="checkbox" :value="item" :id="item" v-model="hobbies">{{item}}
</label>
```

##### 