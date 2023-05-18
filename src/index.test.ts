import createTimer from './index';

// interval: ==
// duration: |
// ==|==|==|

test('create timer should success', () => {
  const timer = createTimer({
    interval: 100,
    onElapsed: () => {},
  });

  expect(timer).toHaveProperty('start');
  expect(timer).toHaveProperty('stop');
});

test('timer.start should be called multiple times', (done) => {
  const mockFn = jest.fn(() => {});

  const interval = 200;
  const count = 2;

  const timer = createTimer({
    interval,
    onElapsed: mockFn,
  });
  timer.start();
  timer.start();

  const duration2stop = interval * (count + 1) - 1;

  setTimeout(() => {
    timer.stop();
    expect(mockFn.mock.calls.length).toBe(count);
    done();
  }, duration2stop);
});

test('timer.stop should be called multiple times', (done) => {
  const mockFn = jest.fn(() => {});

  const interval = 200;
  const count = 2;

  const timer = createTimer({
    interval,
    onElapsed: mockFn,
  });
  timer.start();

  const duration2stop = interval * (count + 1) - 1;

  setTimeout(() => {
    timer.stop();
    timer.stop();
    expect(mockFn.mock.calls.length).toBe(count);
    done();
  }, duration2stop);
});

test('onElapsed should not be called when interval = 0', (done) => {
  const mockFn = jest.fn(() => {});
  const timer = createTimer({
    interval: 0,
    onElapsed: mockFn,
  });
  timer.start();

  setTimeout(() => {
    timer.stop();
    expect(mockFn.mock.calls.length).toBe(0);
    done();
  }, 100);
});

test('onElapsed should not be called when interval < 0', (done) => {
  const mockFn = jest.fn(() => {});
  const timer = createTimer({
    interval: -1,
    onElapsed: mockFn,
  });
  timer.start();

  setTimeout(() => {
    timer.stop();
    expect(mockFn.mock.calls.length).toBe(0);
    done();
  }, 100);
});

test('sync onElapsed should be called', (done) => {
  const mockFn = jest.fn(() => {});

  const interval = 200;
  const count = 2;

  const timer = createTimer({
    interval,
    onElapsed: mockFn,
  });
  timer.start();

  const duration2stop = interval * (count + 1) - 1;

  setTimeout(() => {
    timer.stop();
    expect(mockFn.mock.calls.length).toBe(count);
    done();
  }, duration2stop);
});

test('async onElapsed should be called', (done) => {
  const mockFn = jest.fn(() => {});

  const interval = 200;
  const duration = 100;
  const count = 5;

  const duration2stop = (interval + duration) * count + interval / 2;

  const timer = createTimer({
    interval,
    onElapsed: () => {
      mockFn();
      return new Promise((resolve) => {
        setTimeout(resolve, duration);
      });
    },
  });
  timer.start();

  setTimeout(() => {
    timer.stop();
    expect(mockFn.mock.calls.length).toBe(count);
    done();
  }, duration2stop);
});

test('stop timer before onElapsed is finished should works', (done) => {
  const mockFn = jest.fn(() => {});

  const interval = 100;
  const duration = 200;
  const count = 3;

  const timer = createTimer({
    interval,
    onElapsed: () => {
      mockFn();
      return new Promise((resolve) => {
        setTimeout(resolve, duration);
      });
    },
  });
  timer.start();

  setTimeout(() => {
    timer.stop();
  }, (interval + duration) * (count - 1) - duration / 2);

  setTimeout(() => {
    expect(mockFn.mock.calls.length).toBe(count - 1);
    done();
  }, (interval + duration) * count + interval / 2);
});
