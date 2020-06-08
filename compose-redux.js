class Store {
  constructor() {}

  getStore() {}
}

const store = new Store();

function dispatch(action) {
  // redux在dispatch 内会去通知所有监听store的订阅者 - redux是典型的观察者模式
  return action;
}

function applyMiddleware(middlewares = []) {
  const middlewareAPI = {
    getStore: store.getStore.bind(store),
    dispatch: (action, ...args) => dispatch(action, ...args),
  };

  const dispatch = middlewares
    .map((middleare) => middleare(middlewareAPI))
    .reduce((prev, cuv) => (...args) => prev(curv(...args)));

  return dispatch
}

// 一般中间件的形式
function customMiddleware(store) {
  return (next) => (action) => {};
}
