# timer.js

## Introduction

this timer is very easy!

## Install

`npm install @shhhplus/timer.js`

## How to use

### sync

```javascript
import createTimer from '@shhhplus/timer.js';

// init
const timer = createTimer({
  interval: 1000,
  onElapsed: () => {
    console.log('onElapsed');
  },
});

// start
timer.start();

// stop
timer.stop();
```

### async

```javascript
import createTimer from '@shhhplus/timer.js';

// init
const timer = createTimer({
  interval: 5000,
  onElapsed: () => {
    console.log('onElapsed');
    return new Promise(resolve => {
      // mock api call
      setTimeout(() => {
        // Start timing after the asynchronous operation is completed
        resolve();
      }, 500);
    });
  },
});

// start
timer.start();

// stop
timer.stop();
```
