# webpack 动态加载模型

## 动态加载形式

- require.ensure
- import()

## webpack 加载形式

1. 通过两种方式动态导入代码，会形成 webpack 支持代码分割点
2. webpack 会把代码分割到不同文件, import() 方法会被编译成 `__webpack_require__.e` 方法
3. `__webpack_require__.e` 方法实现就是 requireEnsure 方法，该方法内部做资源链接加载，原本同步加载模块在主模块中变成资源
   地址, 资源加载完成后会缓存到 installedChunks
4. 在记载异步脚本完成后，会继续调用 `__webpack_require__`方法执行模块， 在这里 main.js 也就是入口文件中，webpack 定义
   webpackJsonpCallback 方法与 window['webpackJsonp'] 对象，通过 `webpackJsonpCallback` 替换 `window['webpackJsonp']` 的
   `push` 方法, 上面说加载完成后完成后执行，执行就会知道到 `webpackJsonpCallback` 方法内，该方法内执行 Promise 的
   resolve 方法，让动态注册模块继续执行，同时把 chunk 都缓存到 modules 变量内
