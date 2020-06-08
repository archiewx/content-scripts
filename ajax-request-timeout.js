// ajax请求超时中断

function request({ url, body, method, timeout }) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);

  const requestPromise = new Promise(function (resolve, reject) {
    xhr.onreadystatechange = function (evt) {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        resolve(xhr.responseText);
      }
    };
    xhr.onerror = function (err) {
      reject(err);
    };
    // 直接设置xhr.timeout = timeout
    // xhr.timeout = timeout;

    // setTimeout
    // setTimeout(function () {
    //   const err = new Error("Timeout Error");
    //   reject(err);
    // }, timeout);
    xhr.send(body);
  });

  return requestPromise;
}
