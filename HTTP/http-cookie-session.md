# 会话机制

通常来说浏览器从打开到关闭这一些系列和服务器通信的过程都可以视为一次会话，在浏览器和服务器通信的一系列交互过程遵循一定的规则和工作原理，我们称这个交互过程为会话机制

## 解决方式

由于 HTTP 是无状态请求，客户端和服务器是独立无关联的，因为互相不知道对方什么状态。为了让服务端和客户端连接在某些场景下能够记录当前连接状态，有两种机制可以解决，两种机制: Cookie 机制和 Session 机制

### Cookie 机制

Cookie 是保存客户端的一种方式，Cookie 值来源于，响应头 `Set-Cookie` 设置，形式是通过 `k=v;k1=v1` 方式来设置。`Cookie`内值一般来说都是任意的，常用的会话标识，过期时间，安全标识(Secure, httpOnly, SameSite), 域名，路径. `Cookie`实际保存的位置在于本地文件中，所以 Cookie 过去也作为一种本地存储的方式，过期后浏览器会删除响应 cookie 数据

标识作用:
Secure: 只能用户 https 传递 cookie
httpOnly: 限制 document.Cookie 的访问，只能用于携带发送给浏览器
SameSite: 只允许同站域名携带，防止跨站请求伪造(CSRF)

用户:

- 会话状态管理(购物车，积分，游戏分数)
- 个性化设置(用户自定义设置，主题之类的)
- 浏览器行为跟踪(分析用户访问行为)

对于 web 开发者来说，发送同站异步请求需要携带 cookie 时候需要设置: withCredentials=true 才可以携带 cookie

### Session 机制

单独说 session 其实是有问题的，session 的完整工作，依赖于客户端的 cookie，服务器在收到客户端请求时候，创建一个 session 对象，这个 session 对象对应了一个 sessionId，这个 sessionId 服务器通过 set-cookie 的方式下放到客户端，客户端请求时候，携带这个 cookie，读取 cookie 内 sessionId 的值，最终得到会话期间的 session，保证会话状态保持.

在上面说道，session 依赖 cookie 传递，如果 cookie 被禁止，还可以通过`URL重写`技术(该技术只能引用服务器模板渲染)，将 SessionID 写到到 url 后面。

session 废止依赖于 session 的最大有效时间，除了这个方式外还可以手动废除 session 或者重启服务器都会导致 Session 移除。关闭浏览器不会导致 session 失效，仅仅只是 cookie 内 sessionId 失效而已, 但这里失效必须要过 cookie 设置超时时间才会，否则会保存在本地,下次重新打开会继续携带 sessionId 访问，继续上一次会话状态

session 持续化来说一般使用 redis 作为缓存，来保存 session 对象信息，保存信息有 sessionId, 过期时间之类的。主要是利用 redis 高效读取能力以及可以设置某个值过期功能
