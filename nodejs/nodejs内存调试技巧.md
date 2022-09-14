在nodejs 中经常会遇到v8内存内存不足，导致程序以外退出

```text
Heap allocated 4 GB
Heap allocated 4.01 GB

<--- Last few GCs --->

[18820:000001A45B4680A0] 26146 ms: Mark-sweep (reduce) 4103.7 (4107.3) -> 4103.7 (4108.3) MB, 1196.5 / 0.0 ms (average mu = 0.112, current mu = 0.000) last resort GC in old space requested

<--- JS stacktrace --->

FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
```

一般的解决方式通过调用 `--max-old-space-size=8000` 的方式，来增加内存分配。

跟踪内存泄露分配：https://zhuanlan.zhihu.com/p/58971111
https://wizardforcel.gitbooks.io/node-in-debugging/content/2.2.html