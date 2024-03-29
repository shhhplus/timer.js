# timer.js

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/shhhplus/timer.js/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/@shhhplus/timer.js.svg?style=flat)](https://www.npmjs.com/package/@shhhplus/timer.js) [![codecov](https://img.shields.io/codecov/c/github/shhhplus/timer.js/master?token=EMW62R8Q78)](https://codecov.io/gh/shhhplus/timer.js) [![build status](https://img.shields.io/github/actions/workflow/status/shhhplus/timer.js/cd.yml)](https://github.com/shhhplus/timer.js/actions)

This timer is very simple and framework independent.

## Install

```sh
npm install @shhhplus/timer.js --save
```

## How to use

### sync

```javascript
import createTimer from '@shhhplus/timer.js';

const timer = createTimer({
  interval: 1000,
  onElapsed: () => {
    console.log('onElapsed ...');
  },
});

timer.start();

timer.stop();
```

### async

```javascript
import createTimer from '@shhhplus/timer.js';

const timer = createTimer({
  interval: 5000,
  onElapsed: () => {
    console.log('onElapsed ...');
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  },
});

timer.start();

timer.stop();
```
