# redux 原理

redux 是一种单一状态管理。基于 state 进行状态管理，基于 action 做下次状态改变分发，基于 reducer 做下一次状态返回。redux 是四大特性，中心化，申明式，可调式，弹性的状态管理。

## redux 和 react

redux 可以适用于任何js 应用，但是为了使用方便，react一般直接使用react-redux库来连接redux状态。通过Provider组件注入全局一个Context上下文，这个Context依赖于react ContextAPI来做跨组件传递，在单个组件通过高阶组件connect来做组件属性链接。
