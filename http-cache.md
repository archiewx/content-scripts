# HTTP 缓存简单记录

一种保存资源副本，并在下次请求时候不用请求直接使用资源副本的技术

## 资源缓存的目标
目前只有Get请求才能被缓存

## 缓存的意义
减少http请求，提高资源在互联网的使用效率


## 缓存的分类

1. 私有缓存, 也就是浏览器缓存(private cache)
这类主要缓存在用户设备上，只能用户一个人使用, 使用 `Cache-Control: private` 请求头指令

2. 公共缓存, 代理缓存(public cache)
这里缓存主要分布在dns，网关服务器，isp(互联网服务商)等，提供给多人使用 `Cache-Control: public` 请求头使用

## 缓存的控制

### 通用字段

1. [Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)  区分缓存支持情况，并通过不同值来决定使用什么缓存策略, 常用取值:
  * no-store: 完全不使用缓存
  * no-cache: 使用缓存，但是会发送一个304请求
  * max-age=N: N去秒值，代表N秒后过期
  * s-max-age=N: 同上，但是使用在共享缓存上
  * must-revalidate: 在使用缓存时候，必须校验资源的有效性


### 控制缓存的请求头

1. Program 从HTTP/1.0 开始。该值目前和Cache-Control类似，但是不能拿来替换Cache-Control，可用来兼容之前HTTP协议。
2. 新鲜度, 这个相对于已过期资源来说，在c/s架构下， 会与服务端约定一个最大过期时间，在过期时间之前，资源都是新鲜的。 过期后客户端不会直接清除或者忽略资源副本
  而是通过一种缓存策略(驱逐算法)
  ![](./http-cache/HTTPStaleness.png)
  * If-None-Match 在资源过期后，客户端会携带该请求头请求服务器资源，若返回 `304(Not Modify)`， 则表示资源还是新鲜的，该请求会返回空内容. 同时刷新当前过期计时，重新开始计算过期时间
  * If-Modified-Since 
  若服务器通过 `If-None-Match`或者 `If-Modified-Since` 检测资源已经修改，则会在请求中发回新的资源,图示则表示资源资源的处理过程. 缓存计算公式:

  ```text
  expirationTime = responseTime + freshnessLifetime - currentAge
  ```
  responseTime: 代表浏览器接收到资源时间
  freshnessLifetime: 新鲜度生命周期时间
  currentAge: 当前过了多久


### 控制缓存的响应头

1. Last-Modified: 标识请求资源修改日期和时间
2. Vary: 这里信息决定未来的一个请求头，应该用一个缓存的回复(response)还是向源服务器请求一个新的回复。接下来的请求若请求头与`Vary: <Header-Name>`对应,值和缓存都对应则使用缓存，否则就请求服务器![](./http-cache/HTTPVary.png)
3. Date: 用一标识表文创建的日期和时间
4. Expired: 资源过期时间,这个和 `Cache-Control`内 `max-age` 冲突，二者只能选取一种。若使用 `max-age`, 则该请求头会被忽略
5. ETags: 资源特定版本的标识，让资源更高效并节省带宽。使用ETags防止资源的同时更新并相互覆盖(也就是防止`空中碰撞`)

## 缓存相关状态码:

1. 301: 资源永久转移到新地址, 通过Location来获取新地址，并跳转过去,这里只能是Get/Head请求
2. 302: 资源临时转移到新地址，表示暂时从新地址获取资源,该状态码必须要显式返回`Cache-Control`和`Expired`才能缓存
3. 303: 对应当前请求的响应可以在另一个 URI 上被找到，而且客户端应当采用 GET 的方式访问那个资源。表示重定向资源链接不是新的资源链接。
4. 304: Not Modified, 资源未修改，这个和资源的新鲜度有关
5. 307: 和302类似，但是会保持请求方法和消息体不变,该状态码必须要显式返回`Cache-Control`和`Expired`才能缓存
6. 308: 资源永久跳转到新地址，请求方式和消息体不变
