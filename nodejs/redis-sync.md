## redis 缓冲 不一致问题

原因：缓存和数据库双存储双写原因，只要是双写原因就会有数据不一致的问题

## 缓存+数据库读写模式

1. 读的时候先读缓存，缓存没有的话就读数据库，然后取出数据放到数据库，同时响应请求
2. 更新时候，先更新数据库，然后删除缓存

参考链接：https://mp.weixin.qq.com/s/5_dfOW9mltLA0W1-XSQB4Q
