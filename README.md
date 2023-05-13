# timer.js &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/shhhplus/timer.js/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@shhhplus/timer.js.svg?style=flat)](https://www.npmjs.com/package/@shhhplus/timer.js)

## Introduction

This timer is very easy!

## Install

`npm install @shhhplus/timer.js --save`

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
    return new Promise((resolve) => {
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
