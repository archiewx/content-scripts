# 网页优化要点

## 原则

RAIL

1. R: response -> 响应
2. A: animation -> 流程的动画
3. I: interactive -> 快速的交互
4. L: load -> 加载过渡

- 立即响应用户；在 100 毫秒以内确认用户输入。
- 设置动画或滚动时，在 10 毫秒以内生成帧。
- 最大程度增加主线程的空闲时间。
- 持续吸引用户；在 1000 毫秒以内呈现交互内容。

## CSS Sprite 的优点

- 更流畅的用户体验，因为一旦雪碧图被下载，所有使用雪碧图上面的图片的地方都会得到渲染，而不是一个文件一个文件的加载。(这个是从渲染角度来说，构建雪碧图内容可以让所有使用到的该图片地方都可以一起得到加载，并不是一个一个加载，更有效利率渲染)

- 减少 HTTP 请求，将原本需要的多个请求合并为一个，较少服务器压力，从而较少网络堵塞。对于拥有百万级别用户的 web 服务，雪碧图可能意味着下载数量从一亿变为一百万的区别。(原因: 在 HTTP1.1 版本下，建立 keep-alive 的 HTTP 连接，也就是网络层 TCP 建立了信道通信，同一个信道可以发送多个 http 请求，但是这些请求不能一起发送，http 里面请求的生命周期不能重叠，同一时间只能发送一个，这就导致了网络阻塞，减少了 http 请求数量，就相当减少了网络阻塞，提高了网络利用率，提高了网页加载速度)

- 减少图片的字节。多次比较，三张图片合并成一张图片之后的字节总是小于这三长图片的总和。
- 更换风格方便，只需要在一张或少张图片上修改图片的颜色或样式，整个网页的风格就可以改变。维护起来更加方便。
