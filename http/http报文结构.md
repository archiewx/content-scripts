### HTTP 报文结构

```http
POST http://localhost:8099/miniprogram/f2come/newbudgetrecord.json  HTTP/1.1
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2Nlc3NEYXRhIjp7IkRhdGEiOjEsIk5vIjowLCJFbWFpbCI6InpoZW5nbGZzaXJAZ21haWwuY29tIiwiQ29weXJpZ2h0IjoienN3ZnguY29tIn0sImV4cCI6MTYxNTI5Mzg3MX0.tzet6vFSCxCHELD0cT6M4uPx1H2UJoDFCL1k77_fgnE
Content-Type: application/json

{
  "mbId": 10,
  "happenedAt": "2021-03-03 11:49:09",
  "type": 1,
  "amount": 1000,
  "remark": "22432"
}
```

![](./http报文结构/请求报文.png)
* 请求方法
* 请求路径
* 请求协议及其版本
* 请求头，描述本次请求
* 请求体


![](./http报文结构/响应报文.png)
