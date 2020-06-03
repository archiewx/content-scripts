# react setState 原理

setState 实现过程中，react 团队充分利用了 JavaScript 的 event-loop，直接调用 setState，并不会立即更新，setState 会 “有意
”的延后更新一下，为了避免连续不断的 setState，可以合成一个更新单元，然后在这里也就是更新批处理。等待所有 setState 调用完
成后，react 会在微任务队列内进行更新, 伪代码:

```js
Promise.resolve().then(() => {
  batchUpdateState();
});
```
