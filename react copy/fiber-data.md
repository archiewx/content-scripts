## Fiber 数据结构

```ts
interface Fiber {
  // 1. Instance 类型信息
  // 标记 Fiber 的实例的类型, 例如函数组件、类组件、宿主组件(即dom)
  tag: WorkTag,
  // class、function组件的构造函数，或者dom组件的标签名。
  type: any,
  // class、function组件的构造函数，或者dom组件的标签名。
  elementType: any,
  // DOM节点 | Class实例
  // 函数组件则为空
  stateNode: any,
	
  key: key,
  ref: ref,
	
  // 2. Fiber 结构信息
  // 指向父fiber 节点
  return: Fiber | null,
  // 指向子fiber节点
  child: Fiber | null,
  // 指向兄弟fiber节点
  sibling: Fiber | null,
	// 指向另外一颗树中对应的fiber节点
  alternate: Fiber | null,

  // 3. Fiber节点的状态
  // 本次更新的props
  pendingProps: any,
  // 上一次渲染的props
  memoizedProps: any, 
  // 如果是class组件，会保存上一次渲染的state
  // 如果是hooks组件，会保存所有hooks组成的链表
  memoizedState: any,
  // 如果是class，将保存setState产生的update链表
  // 如果是hooks，这个地方会存放effect链表
  // 如果是dom节点，会存放他所需更新的props
  updateQueue: UpdateQueue<any> | null, 

  // 4. 副作用
  // 用二进制来存储的当前节点的所需执行的操作，如节点更新、删除、移动
  flags: Flags,
  // 副作用链表，会把所有需要执行副作用的fiber串联起来
  nextEffect: Fiber | null,
  firstEffect: Fiber | null, 
  lastEffect: Fiber | null, 
	
  // 5. 调度优先级相关
  lanes = NoLanes;
  childLanes = NoLanes;

}
```