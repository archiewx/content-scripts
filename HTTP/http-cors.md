# HTTP-Cors 跨域

## 需要跨域原因

因为浏览器同源策略允许相同网站访问，不允许协议，域名，端口不同的网站访问，于是就有跨域访问的问题，一般应用场景：前后端分离独立部署无网关关联， 埋点请求。

浏览器一般方发生跨域的情况: ajax 请求不同域名资源，字体，canvas 的 drawImage

1. jsonp 跨域
2. image 跨域
3. node/nginx 配置代理跨域
4. socket 请求
5. iframe 通过 postMessage 或者 url+hash 或者 iframe.name 或者 domain 设置 来获取数据

## ajax 请求跨域访问

这了 ajax 请求访问分为两种类型: 简单请求和复杂请求， 简单请求不需要提前发送预检请求`OPTIONS` 请求，复杂请求需要提前发送预检请求或者 `Access-Control-*`相关请求，校验以后才可以发送真正的请求

### 简单请求

- 请求方法为: HEAD, GET, POST
- 请求必须由客户端自动动添加的请求头，例如 User-Agent, Connection 或者 Fetch 协议添加的 9 中安全请求头，例如: Accept, Accept-Language, Content-Encoding, Content-Type 等
- 请求体类型必须是这三种: text/plain, multipart/form-data, application/x-www-form-urlencoded
- 对于 XMLHttpRequest 来说, XMLHttpRequestUpload 对象不能绑定事件
- 请求中没有使用 ReadableSteam(ReadableStream 是一个流操作 API，用于读取一个二进制流，fetch-api 的 response.body 就是该对象一个实例)

### 复杂请求

非简单请求都是复杂请求。在复杂请求之前会先发一个 `OPTIONS` 请求，该请求包含跨域一下关键内容:

```HTTP
OPTIONS /resource HTTP/1.1
Host: a.com
Access-Control-Allow-Method: GET
Access-Control-Allow-Request-Headers: Authorization, X-Transaction-ID


----

HTTP/1.1 200 OK
Date: Mon, 01 Dec 2018 01:15:39 GMT
Server: Nginx
Access-Control-Allow-Origin: http://a.com
Access-Control-Allow-Method: GET, POST
Access-Control-Allow-Header: Authorization, X-Transaction-ID
Access-Control-Max-Age: 3600
```

经历了一个上面这个请求响应后，就会发出实际请求，在实际请求中，服务端响应时候也会携带相关 `Access-Control-*` 请求头。上面预检请求有效时间为 `3600s`， 也就是说浏览器不需要为同一个请求再次发出预检请求。

## cookie 跨域

Cookie 发送跨域请求时候，需要设置 `withCredentials` 为 true，同时服务器需要返回 `Access-Control-Allow-Credentials` 请求头， 否则浏览器不会将请求内容发送给用户
