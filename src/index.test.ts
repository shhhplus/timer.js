import createTimer from './index';

// interval: ==
// duration: |
// ==|==|==|

test('create timer should return null when interval <= 0', () => {
  expect(
    createTimer({
      interval: 0,
      onElapsed: () => {},
    }),
  ).toBe(null);

  expect(
    createTimer({
      interval: -100,
      onElapsed: () => {},
    }),
  ).toBe(null);
});

test('create timer should success when interval > 0', () => {
  const timer = createTimer({
    interval: 100,
    onElapsed: () => {},
  });

  expect(timer).toHaveProperty('start');
  expect(timer).toHaveProperty('stop');
});

test('timer.start can be called multiple times', (done) => {
  const mockFn = jest.fn(() => {});

  const interval = 200;
  const count = 2;

  const timer = createTimer({
    interval,
    onElapsed: mockFn,
  });
  timer?.start();
  timer?.start();

  const duration2stop = interval * (count + 1) - 1;

  setTimeout(() => {
    timer?.stop();
    expect(mockFn.mock.calls.length).toBe(count);
    done();
  }, duration2stop);
});

test('timer.stop can be called multiple times', (done) => {
  const mockFn = jest.fn(() => {});

  const interval = 200;
  const count = 2;

  const timer = createTimer({
    interval,
    onElapsed: mockFn,
  });
  timer?.start();

  const duration2stop = interval * (count + 1) - 1;

  setTimeout(() => {
    timer?.stop();
    timer?.stop();
    expect(mockFn.mock.calls.length).toBe(count);
    done();
  }, duration2stop);
});

test('sync onElapsed should work', (done) => {
  const mockFn = jest.fn(() => {});

  const interval = 200;
  const count = 2;

  const timer = createTimer({
    interval,
    onElapsed: mockFn,
  });
  timer?.start();

  const duration2stop = interval * (count + 1) - 1;

  setTimeout(() => {
    timer?.stop();
    expect(mockFn.mock.calls.length).toBe(count);
    done();
  }, duration2stop);
});

test('async onElapsed should work', (done) => {
  const mockFn = jest.fn(() => {});

  const interval = 400;
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
  timer?.start();

  setTimeout(() => {
    timer?.stop();
    expect(mockFn.mock.calls.length).toBe(count);
    done();
  }, duration2stop);
});

test('stop timer before onElapsed is finished should work', (done) => {
  const mockFn = jest.fn(() => {});

  const interval = 100;
  const duration = 400;
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
  timer?.start();

  setTimeout(() => {
    timer?.stop();
  }, (interval + duration) * (count - 1) - duration / 2);

  setTimeout(() => {
    expect(mockFn.mock.calls.length).toBe(count - 1);
    done();
  }, (interval + duration) * count + interval / 2);
});
