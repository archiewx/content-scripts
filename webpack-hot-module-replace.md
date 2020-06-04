# webpack 热替换原理

查看下图:

![](./webpack-hmr/hmr-example.jpg)

在整个热更新系统中，分为两部分，分别服务器部分和浏览器部分, 他们之间通过 socketjs 以及 ajax, jsonp 进行连接

从打包系统中一个文件更新开始流程:

1. 当问一个文件更新， 也就是一个 module 更新时候，webpack 会通过 `fs.watch` 监听到模块改变，进行重新编译打包构建内容, 并
   将打包内容通过`fs-memeroy` 的方式保存在内存中
2. 在 webpack 构建完成后，webpack 通过 webpack-dev-server 进行交互，webpack-dev-server 内置了 express 服务器，express 安
   装了 webpack-dev-middleware, 真实来说就是 webpack-dev-middleware 与 webpack 进行接口交互, 告知 webpack-dev-server 文
   件以及编译完成，并存在内存中了
3. webpack-dev-server 对文件的监听，这一步主要是可以通过配置 `devServer.watchContentBase` 来确定， 设置为 `true` 的时候
   ，就会监听静态目录下的变化，变化后会通知浏览器端进行 `live reload` 操作。这里更改会通知浏览器刷新，重新获取资源，会丢
   失页面内的状态。这里和热更新(hmr)是两个概念
4. webpack-dev-server 得到资源更新通知后，通过 `sockjs`长链接 通知客户端 `webpack-dev-server/client`， 该文件在项目启动
   会作为客户端文件依赖和源码打包到一起，浏览器启动时候会就和 sockserver 建立一个连接，用来接收服务器构建各阶段的构建状
   态信息, 浏览器端接收到服务器构建的 socket 信息，根据不同 socket 信息做不同的操作，在 hmr 中，socket 接收的就是
   webpack 构建完成后新的 hash 值
5. `webpack-dev-server/client` 仅仅和服务端进行消息通讯，并不会直接去做代码请求和更新，该部分工作将交给
   `webpack/hot/dev-server` 来做， 该模块也是在项目启动同源码模块一起打包到客户端的, 该模块接收到
   `webpack-dev-server/client` 消息后, 根据消息类型来决定是否刷新客户端还是热更新,如果该步骤直接刷新浏览器，后续流程不再
   继续
6. webpack 在构建时候，还会注入 `HotModuleReplacement`、`JsonpMainTemplate` 这些模块，在`HotModuleReplacement.runtime`
   则是热更新的中枢, 他接受从 `webpack-dev-server/client` 传递过来新的 hash 值，根据最新的 hash，通过
   `JsonpMainTemplate` 做一个 ajax 请求，获取一个 json 数据，该 json 数据包含要更新的模块的 hash 值， 获取到更新列表后，
   该模块再次通过 JSONP 获取到最新的模块代码
7. 在获取到最新的代码后, `HotModuleReplacement` 模块内不会新旧模块进行对比，决定是否更新模块，决定更新模块后，检查模块的
   依赖关系，更新模块同时也会更新模块之间的引用关系
8. 在热更新如果失败的情况下，就会降级进行`live reload`处理，通过刷新浏览器来获取最新的代码
