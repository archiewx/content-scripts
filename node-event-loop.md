# NodeJS 时间轮训机制

## 过程

timers -> pending callback -> idle, prepare -> poll -> check -> close callback -> timers ...

在上面每一个阶段，都会有个 FIFO 队列来执行回调，执行该队列完成或者达到最大回调数，也就是回调足最大限制后，就会移动到下一
个阶段

- timers: 该阶段执行`setTimeout` 和 `setInterval` 调度的回调函数
- pending callaback： 执行延迟到下一次循环的 i/o 回调, 此阶段对某些系统操作（如 TCP 错误类型）执行回调。例如，如果 TCP
  套接字在尝试连接时接收到 ECONNREFUSED，则某些 \*nix 的系统希望等待报告错误。这将被排队以在 挂起的回调 阶段执行。
- idle, prepare: 仅用于系统内部回调
- poll: 轮询阶段，检索新的 i/o 事件，但是这些事件不包含例如定时器回调，关闭回调，node 也会在这个阶段做一些适当的阻塞, 这
  个阶段情况也会决定定时器什么时间执行
- check: 检测 setImmediate 在这个阶段执行
- close callback: 一些关闭回调，例如 `socket.on('close', callback)` 就会在这里回调
