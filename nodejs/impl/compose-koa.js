// 实现洋葱模型

function koaCompose(middlewares = []) {
  return function (ctx, next) {
    let index = -1;
    const dispatch = function (i) {
      if (i < index) return Promise.reject(new Error('call the `dispatch` too times'));

      index = i;

      let fn = middlewares[i];
      // 达到最后中间件后
      if (i === middlewares.length) fn = next;

      if (!fn) return Promise.resolve();

      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    };

    dispatch(0);
  };
}

class Koa {
  constructor(props) {
    this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
  }

  listen() {
    const fn = koaCompose(this.middlewares);
    fn({ env: 'test' });
  }
}

const koa = new Koa();

koa.use(async function middleware1(ctx, next) {
  console.log(1, ctx);
  await next();
  console.log(1, 1, ctx);
});

koa.use(async function middleware2(ctx, next) {
  console.log(2, ctx);
  ctx.name = 'zs';
  await next();
  console.log(2, 2, ctx);
});

koa.listen();
