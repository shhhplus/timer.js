type Options = {
  interval: number;
  onElapsed: () => any;
};

export default ({ interval, onElapsed }: Options) => {
  let timer: NodeJS.Timeout | null = null;

  const start = () => {
    if (timer) {
      return;
    }

    const once = () => {
      return new Promise<unknown>(function (resolve, reject) {
        const res = onElapsed();
        if (res instanceof Promise) {
          res.then(resolve, reject);
        } else {
          resolve(null);
        }
      });
    };

    const next = function () {
      timer = setTimeout(function () {
        once().then(function () {
          if (!timer) {
            return;
          }
          next();
        });
      }, interval);
    };

    next();
  };

  const stop = () => {
    if (!timer) {
      return;
    }

    clearTimeout(timer);
    timer = null;
  };

  return {
    start,
    stop,
  };
};
