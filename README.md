# timer.js

## Introduction

this timer is very easy!

## Install

`npm install @shhhplus/timer.js`

## How to use

### sync

```javascript
import Timer from '@shhhplus/timer.js';

const timer = new Timer({
  interval: 1000,
  onElapsed: () => {
    console.log('onElapsed');
  },
});
```

### async

```javascript
import Timer from '@shhhplus/timer.js';

const timer = new Timer({
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
```
