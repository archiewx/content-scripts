# react 的一些生命周期变动

```js
class ExampleComponent extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // Called after a component is instantiated or before it receives new props.
    // Return an object to update state in response to prop changes.
    // Return null to indicate no change to state.
  }

  UNSAFE_componentWillMount() {
    // New name for componentWillMount()
    // Indicates that this method can be unsafe for async rendering.
    // Prefer componentDidMount() instead.
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    // New name for componentWillUpdate()
    // Indicates that this method can be unsafe for async rendering.
    // Prefer componentDidUpdate() instead.
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // New name for componentWillReceiveProps()
    // Indicates that this method can be unsafe for async rendering.
    // Prefer static getDerivedStateFromProps() instead.
  }
}
```

将 三个 `Will*` 方法标记为不安全的意思是说他们在异步渲染过程中，可能会出现 bug，并且难以调试.在此之前三个生命周期函数存
在大量误解和滥用的情况，在开启 react 异步渲染后，存在问题会更多

`getDerivedStateFromProps` 静态原因是放置呈现阶段动态修改该方法，导致用户出现不一致的副作用，其次该组件调用时间，初始化
阶段，props 变化阶段都会多次重复调用该方法

## react 生命周期

初始化阶段:
constructor
static getDerivedStateFromProps
render
componentDidMount

更新阶段:
static getDerivedStateFromProps
shouldComponentUpdate
render
getSnapshotBeforeUpdate
componentDidUpdate

卸载:
componentWillUnmount
