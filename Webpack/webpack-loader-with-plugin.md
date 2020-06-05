# webpack 加载器和插件

## loader 基本形式

```js
module.exports = function (source) {};
```

source 是文件的原始内容, 可能是文本，也可能是二进制(Buffer)

意义: 让 webpack 具有加载和解析非 js 文件的能力，并且提供了单独运行机制, 用法依赖于 module.rules[n].test 的配置

## 插件的基本形式

```js
class CustomPlugin {
  apply(complier) {}
}
```

使用:

```js
plugins: [new CustomPlugin({})];
```

complier 是 webpack 的编译对象，内部包含 webpack 对外开放的 hooks，以及一些配置对象

意义：增加 webpack 额外的功能，webpack 在编译过程中会广播很多事件，在合适的时间通过 webpack 的 API 改变输出结果，增强
webpack 处理能力

常用的 hook 阶段:
compile: 在创建新的compilation 之前执行
compilation: 在创建compilation 后执行
emit: 生成文件之前运行
