const http = require("http");
const assert = require("assert");

http
  .createServer(function (req, resp) {
    const commonHeader = { "Content-Type": "text/plain" };
    try {
      assert.notEqual(req.url, '');
      assert.match(req.url, /^\/[0-9]{3}/g);

      const statusCode = req.url.slice(1);

      resp.writeHead(statusCode, commonHeader);
      resp.end(`Test StatusCode =${statusCode}:${resp.statusMessage}`);
    } catch (error) {
      resp.writeHead(500, commonHeader);
      resp.end(error.message);
    }
  })
  .listen(3000);

console.log("service run on 3000");
