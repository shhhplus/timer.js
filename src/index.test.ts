import createTimer from './index';

// interval: ==
// duration: |
// ==|==|==|

test('create timer success', () => {
  const timer = createTimer({
    interval: 1000,
    onElapsed: () => {},
  });
});

test('timer.start can be called multiple times', done => {
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
  }, duration2stop);

  setTimeout(() => {
    expect(mockFn.mock.calls.length).toBe(count);
    done();
  }, duration2stop + interval);
});

test('timer.stop can be called multiple times', done => {
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
  }, duration2stop);

  setTimeout(() => {
    expect(mockFn.mock.calls.length).toBe(count);
    done();
  }, duration2stop + interval);
});

test('sync onElapsed success', done => {
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
  }, duration2stop);

  setTimeout(() => {
    expect(mockFn.mock.calls.length).toBe(count);
    done();
  }, duration2stop + interval);
});

test('async onElapsed success', done => {
  const mockFn = jest.fn(() => {});

  const interval = 400;
  const duration = 100;
  const count = 5;

  const duration2stop = (interval + duration) * count + interval / 2;

  const timer = createTimer({
    interval,
    onElapsed: () => {
      mockFn();
      return new Promise(resolve => {
        setTimeout(resolve, duration);
      });
    },
  });
  timer.start();

  setTimeout(() => {
    timer.stop();
  }, duration2stop);

  setTimeout(() => {
    expect(mockFn.mock.calls.length).toBe(count);
    done();
  }, duration2stop + interval);
});
