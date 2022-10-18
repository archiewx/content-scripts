# \_\_webpack_require\_\_ 实现

https://juejin.cn/post/6844903933618421773

```js
(function(modules) { // webpackBootstrap
    // The module cache
    // 模块缓存对象
    var installedModules = {};

    // The require function
    // webpack 实现的 require() 函数
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        // 如果模块已经加载过，直接返回缓存
        if(installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // Create a new module (and put it into the cache)
        // 创建一个新模块，并放入缓存
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };

        // Execute the module function
        // 执行模块函数
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        // Flag the module as loaded
        // 将模块标识为已加载
        module.l = true;

        // Return the exports of the module
        return module.exports;
    }


    // expose the modules object (__webpack_modules__)
    // 将所有的模块挂载到 require() 函数上
    __webpack_require__.m = modules;

    // expose the module cache
    // 将缓存对象挂载到 require() 函数上
    __webpack_require__.c = installedModules;

    // define getter function for harmony exports
    __webpack_require__.d = function(exports, name, getter) {
        if(!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, { enumerable: true, get: getter });
        }
    };

    // define __esModule on exports
    __webpack_require__.r = function(exports) {
        if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        }
        Object.defineProperty(exports, '__esModule', { value: true });
    };

    // create a fake namespace object
    // mode & 1: value is a module id, require it
    // mode & 2: merge all properties of value into the ns
    // mode & 4: return value when already ns object
    // mode & 8|1: behave like require
    __webpack_require__.t = function(value, mode) {
        if(mode & 1) value = __webpack_require__(value);
        if(mode & 8) return value;
        if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, 'default', { enumerable: true, value: value });
        if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
        return ns;
    };

    // getDefaultExport function for compatibility with non-harmony modules
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ?
            function getDefault() { return module['default']; } :
            function getModuleExports() { return module; };
        __webpack_require__.d(getter, 'a', getter);
        return getter;
    };

    // Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

    // __webpack_public_path__
    __webpack_require__.p = "";


    // Load entry module and return exports
    // 加载入口模块，并返回模块对象
    return __webpack_require__(__webpack_require__.s = "./src/index.js");
})({
  "./src/index.js": (function(module, exports, __webpack_require__) {
    eval("const test2 = __webpack_require__(/*! ./test2 */ \"./src/test2.js\")\r\n\r\nfunction test() {}\r\n\r\ntest()\r\ntest2()\n\n//# sourceURL=webpack:///./src/index.js?");
  }),
  
  "./src/test2.js": (function(module, exports) {
    eval("function test2() {}\r\n\r\nmodule.exports = test2\n\n//# sourceURL=webpack:///./src/test2.js?");
  })
});
```

require 做的事情：

- 初始化 \__webpack_require__ 函数，初始化函数体，定义函数从缓冲中获取，还是创建新的模块
- 挂载属性：
  - m：modules 所有的模块
  - c：已安装模块
  - d：导出模块定义
  - r：esModule 定义
  - t：通过 mode位运算 方式获取不同我只
  - n：获取模块的默认值
  - o：模块上是否存在某导出方法
  - p：\__webpack_public_path__
- 启动 entry 模块
- 加载入口文件，同时定义require的属性