export default ({ onElapsed, interval }) => {
    let timer;
  
    const start = () => {
      if (timer) {
        return;
      }
  
      const once = () => {
        return new Promise(function(resolve, reject) {
          const res = onElapsed();
          if (res instanceof Promise) {
            res.then(resolve, reject);
          } else {
            resolve();
          }
        });
      };
  
      const next = function() {
        timer = setTimeout(function() {
          once().then(function() {
            // 已被stop
            if (!timer) return;
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
  
  