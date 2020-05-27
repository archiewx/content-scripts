// 简单方法请求
function simpleQs(data) {
  return Object.keys(data)
    .reduce((qs, key) => qs.concat(`${key}=${data[key]}`), [])
    .join('&');
}

function request({ url, method, withCredentials, data, responseType = 'text' }) {
  const xhr = new XMLHttpRequest();
  if (method === 'GET' && Object.prototype.toString.apply(data) === '[object Object]') {
    url = url.indexOf('?') ? '&' + simpleQs(data) : '?' + simpleQs(data);
  }
  xhr.open(method, url);
  xhr.withCredentials = withCredentials;
  xhr.responseType = responseType;

  const responsePromise = new Promise((resolve, reject) => {
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        resolve(xhr.responseText);
      }
    };
    xhr.onerror = function () {
      console.error(err);
      reject(err);
    };

    xhr.send(data);
  });
  responsePromise.abort = () => xhr.abort();

  return responsePromise;
}

function get(url, query) {
  return request({ url, method: 'GET', data: query });
}

async function multipleRequest(urls = [], maxCount = 3, callback) {
  if (urls.length <= maxCount) return Promise.all(urls.map((url) => get(url)));

  const runQueue = urls.slice(0, maxCount);
  const waitQueue = urls.slice(maxCount);
  const results = [];

  const runTask = (results) => {
    while (runQueue.length) {
      const url = runQueue.shift();
      get(url)
        .then((res) => {
          results.push(res);
          if (waitQueue.length) {
            const waitUrl = waitQueue.shift();
            runQueue.push(waitUrl);
          }
          if (results.length === urls.length) {
            callback(results);
          }
        })
        .finally(() => {
          runTask(results);
        });
    }
  };
  runTask(results);
}
multipleRequest(
  [
    '/imported-maps.json',
    '/imported-maps.json',
    '/imported-maps.json',
    '/imported-maps.json',
    '/imported-maps.json',
    '/imported-maps.json',
    '/imported-maps.json',
    '/imported-maps.json',
    '/imported-maps.json',
    '/imported-maps.json',
    '/imported-maps.json',
    '/imported-maps.json',
    '/imported-maps.json',
    '/imported-maps.json',
  ],
  2,
  (res) => console.log(res)
);
