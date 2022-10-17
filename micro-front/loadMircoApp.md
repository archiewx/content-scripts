# loadMicroApp 过程

![](./images/loadMicroApp.png)

加载过程：
1. 读取微应用配置
2. 获取当前应用的容器 container
3. 判断当前应用是否有 `autoStart` 属性，有就启动 start
4. 挂载应用，传入加载逻辑
5. 调用loadApp，内部逻辑进行html-entry的资源加载解析，调用render方法
6. 将创建的应用加入应用管理队列，并返回当前创建的应用实例