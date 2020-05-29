# React Diffing

react diffing 实在两个前提下实现的 O(n)复杂度

- 任何不同类型的节点产生的都是两个不同树
- 通过 key 属性可以暗示某些子元素在不同渲染下都能保持稳定, 这里希望key值是稳定的

## 对于不同类型元素

任何根节点不同的元素，react 都会卸载原来的组件，并建立新的树。在卸载组件时候会执行 componentWillUnmount, 重新安装组件时
候会依次执行 componentWillMount, componentDidMount.先前相关的 state 也会被销毁

## 对于相同类型元素

react 会保留 dom 节点，并对比属性不同，仅仅更改不同的属性.每次处理完当前节点就会递归向下执行

## 对于同类型的组件元素

react 会保留组件示例，并调用 componentWillReceiveProps, componentWillUpdate, 来保证组件内部属性和外部一致. 最后调用
render 方法， 重新渲染

## 递归子节点

在形同父级元素情况下，react 会递归子节点，若有差异就会生成一个 mutate, 在仅仅插入修改内容. 在这个情况下，尾部插入效率高
于头部插入

为了解决在列表中这种低效情况，key 值就用来确认那些元素是新元素，那些元素是老元素, 这里`key` 不要使用列表下标来表示.
