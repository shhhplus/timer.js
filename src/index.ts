type Options = {
  interval: number;
  onElapsed: () => any;
};

const doTask = (task: Options['onElapsed']) => {
  return new Promise<unknown>((resolve, reject) => {
    const res = task();
    if (res instanceof Promise) {
      res.then(resolve, reject);
    } else {
      resolve(null);
    }
  });
};

export default ({ interval, onElapsed }: Options) => {
  if (interval <= 0) {
    return {
      start: () => {},
      stop: () => {},
    };
  }

  let timer: NodeJS.Timeout | null = null;

  const start = () => {
    if (timer) {
      return;
    }

    const next = () => {
      timer = setTimeout(() => {
        doTask(onElapsed).then(() => {
          timer && next();
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
