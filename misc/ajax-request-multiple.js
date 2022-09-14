// 简单方法请求
function simpleQs(data) {
  return Object.keys(data)
    .reduce((qs, key) => qs.concat(`${key}=${data[key]}`), [])
    .join("&");
}

function request({
  url,
  method,
  withCredentials,
  data,
  responseType = "text",
}) {
  const xhr = new XMLHttpRequest();
  if (
    method === "GET" &&
    Object.prototype.toString.apply(data) === "[object Object]"
  ) {
    url = url.indexOf("?") ? "&" + simpleQs(data) : "?" + simpleQs(data);
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

async function get(url, query) {
  await new Promise((resolve) => setTimeout(resolve, 2000 * Math.random()));
  return request({ url, method: "GET", data: query });
}

async function multipleRequest(urls = [], maxCount = 3) {
  if (urls.length <= maxCount) return Promise.all(urls.map((url) => get(url)));

  return new Promise((resolve) => {
    const urlSorted = urls.map((url, i) => ({ url, i }));
    const runQueue = urlSorted.slice(0, maxCount);
    const waitQueue = urlSorted.slice(maxCount);

    let flag = 0;
    let results = [];
    const runTask = () => {
      while (runQueue.length) {
        const { url, i } = runQueue.shift();
        get(url)
          .then((res) => {
            flag++;
            results[i] = JSON.parse(res);
            if (waitQueue.length) {
              const meta = waitQueue.shift();
              runQueue.push(meta);
            }
            if (flag === urls.length) {
              resolve(results.slice());
            }
          })
          .finally(() => {
            runTask();
          });
      }
    };
    runTask();
  });
}
multipleRequest(
  [
    "/imported-maps.json",
    "/imported-maps.json",
    "/imported-maps.json",
    "/imported-maps.json",
    "/imported-maps.json",
  ],
  2
).then((data) => {
  console.log(data);
});
