# 基本原理

react-hooks 是 react 16.8 版本推出的新的功能特性，hooks 只能应用的函数式组件内，他的行为依赖于闭包。在 react 内部实现依赖单链表实现方式，每次函数组件执行的时候都会不断在链表内添加新的 hook 节点， 为了保证 hooks 的节点顺序和调用，不能在条件内使用 hook, 这样会导致节点顺序错误，这也是 react 不允许的操作

自己实现 hooks 时候可以通过一个 hooks 数组，cursor 指针来实现

```js
const MyReact = (function () {
  let hooks = [],
    cursor = 0;

  return {
    render(Component) {
      const Comp = Component();
      Comp.render();
      cursor = 0;
      return Comp;
    },
    useState(initialValue) {
      hooks[cursor] = hooks[cursor] || initialValue;
      const setStateHookIndex = cursor;
      const setState = (newState) => (hooks[setStateHookIndex] = newState);

      return [hooks[cursor++], setState];
    },
    useEffect(callback, depArray) {
      const hasDeps = !depArray;
      const deps = hooks[cursor];
      const hasChangedDeps = deps
        ? !depArray.every((el, i) => el === deps[i])
        : true;
      if (hasDeps || hasChangedDeps) {
        callback();
        hooks[cursor] = depArray;
      }
      cursor++;
    },
    useRef(initialVal) {
      hooks[cursor] = hooks[cursor] || { current: initialVal };
      return hooks[cursor++];
    },
  };
})();
```

常用的一些 hooks:

useState: 用于申明一个状态值
useCallback/useMemo: 用户申明一个回调函数，或者一个 memoize 计算数学
useEffect/useLayoutEffect: 用来 mock 在 class 上的一些生命周期函数，以及页面小会回调
useRef: 用来保存一个引用值, 该值是一个 `{current: any}` 类型。
