jest.mock('@chr/web-components-labs', () => ({
  LoggingWrapper: () => 'an element'
}))

import App from './App';
import { render } from '@testing-library/react';

describe('App', () => {
  it("contains the LoggingWrapper component", () => {
    const loggingConfig = {};
    const store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn(),
      replaceReducer: jest.fn()
    };
    const { getByText } = render(
      <App loggingConfig={loggingConfig} store={store} />
    );

    expect(getByText('an element')).toBeVisible();
  });
});
