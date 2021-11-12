const Redux = require('redux');

jest.spyOn(Redux, 'applyMiddleware');

import { createStore } from './createStore';

it('leaves logger out in production', () => {
  process.env.NODE_ENV = 'development';

  const applyMiddleware = Redux.applyMiddleware;

  createStore({}, null, null);

  expect(
    applyMiddleware.mock.calls[applyMiddleware.mock.calls.length - 1].length
  ).toBe(3)

  process.env.NODE_ENV = 'production';

  createStore({}, null, null);

  expect(
    applyMiddleware.mock.calls[applyMiddleware.mock.calls.length - 1].length
  ).toBe(2)
})
