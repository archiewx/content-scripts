# React Fiber

## 现状

react 在一些响应体验较高的场景中不适用，比如手势，布局，动画等。

## 原因

在现有的 react-v16.8.0 之前版本，一旦开启渲染过程，JavaScript 会一直占据主线程，导致其他任务无法执行，就会出现卡屏，掉帧
不佳的用户体验.

## 现有的方法

React 改用 Fiber 作为功能单元，去解决之前栈协调算法(stack reconciler)问题

## 解决方式

通过把整个渲染阶段分层许多子任务，每个任务可以停止，重启，中断，通过合理调整时间来执行这些任务（更细粒度，更强控制力）

Fiber 的关键特性如下：

- 增量渲染（把渲染任务拆分成块，匀到多帧）
- 更新时能够暂停，终止，复用渲染任务
- 给不同类型的更新赋予优先级
- 并发方面新的基础能力

## 如何拆

根据 react 执行过程，把任务分为两个阶段

- diff -> render/reconciliation
- patch -> commit

diff 阶段 的工作就是将上一次 prevInstance 和 nextInstance 进行比较, 找到 dom change 的改变和差异。diff 的本质就是对这些
改变进行递归计算, 这部分是可以拆分的，计算可以过一会再算或者重新算

patch 阶段 就是把这些改变提交到真实的节点上，进行一次性的更新。这阶段看起来也可以拆分出来一部分一部分更新，但是在实际中
，如果不一次性更新玩，就会导致真实节点和 react 内部维护状态不一致，还会导致用户体验问题。其次在真实中节点更新所消耗时间
比在 diff 阶段和生命周期内所消耗的时间要小

## 怎么拆

我们拆分 diff 阶段任务， 根据目前情况来看，依赖组件拆分或者工序拆分都是不合理的，1. 组件规模无法确定 2. 大型组件不合
理 3. 工序拆分又太细，无法具体量化

依赖于 vDom 下的 Fiber Tree 来拆分，每个虚拟节点(vDom Node) 对于一个 fiber Node。每个组件实例都是一个虚拟节点，每个虚拟
节点都对应一个工作单元。在工作循环中，每处理一个 fiber， 都可以挂起或者中断整个工作循环。

## 拆分之后如何调度任务

这里分为两部分:

- 工作循环
- 优先级

工作循环类似事件循环，不同的是每次工作循环完成都会有一次停止的机会

```js
while (nextUnitOfWork != null && !shouldYield()) {
  nextUnitOfWork = preformUnitOfWork(nextUnitOfWork);
}
```

这里`nextUnitOfWork` 就代表了下次工作单元， `shouldYield` 判断是否还有剩余时间, 没有用完时间就继续处理下一个任务，若已经
用完，则迅速处理好善后工作(firstEffect, lastEffect), 打好 Tag, 设置 requestIdleCallback, 等待下一次剩余时间。下次任务恢
复时候判断是否是中断任务，若是则就继续做或者重新做。这里被中断机制不管是自然中断，还是被粗暴中断，都是一样

```js
if (nextFlushexExpirationTime !== NoWork) {
  scheduleCallbackWithExpiration(nextFlushExpirationTime);
}
```

在不考虑突发事件情况下，正常调度是由工作循环完成的,基本逻辑: 每次任务单元执行完成后，查看是否还有剩余时间，若没有剩余时
间，则整体任务就挂起

### 优先级机制

而在优先级机制中用来处理突发事件和优化次序，如：

- 到 commit 阶段，提高优先级
- 任务做到一半出错了，降低一下优先级
- 适当关注低优先级任务，避免"饿死"
- 不显示的节点，优先级降到最低

### 工作循环

Fiber reconciliation 的工作循环流程:

1. 获取根节点的 `WorkInProgress Tree`, 获取其待处理节点(组件或者 DOM 节点)
2. 检查节点是否需要需要更新，不需要更新则到 `4`
3. 需要更新就打一个标记，更新自己(组价你更新 props, context 等, DOM 节点记为 DOM Change), 并且为孩子生成 workInProgress
   Node
4. 如果没有产生子节点，就向上传递到 effect list(包含 DOM Change) 到父级
5. 把孩子或者兄弟节点作为下一个待处理单元，准备进入下一个工作循环。如果没有待处理单元就直接回到 WorkInProgress 的根节点
   ，结束掉工作循环

## 最后

如果说工作任务可以拆分，那么意味着每个任务可以并发执行，在首屏渲染上，如果并发渲染可以获取到更好效率。已知在 FireFox 上
130ms 首页渲染可以在 30ms 内渲染完成

参考: http://www.ayqy.net/blog/dive-into-react-fiber
