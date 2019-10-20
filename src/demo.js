import createTimer from './index';

const timer = createTimer({
  interval: 1000,
  onElapsed: () => {
    console.log('onElapsed');
  },
});
console.log('timer start');
timer.start();

setTimeout(() => {
  console.log('timer stop');
  timer.stop();
}, 20000);
