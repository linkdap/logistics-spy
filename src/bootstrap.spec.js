jest.mock('./App', () => () => 'an element');

jest.mock('react-dom', () => ({
  render: jest.fn(() => {})
}));

jest.mock('@chr/common-web-ui-ajax-client', () => ({
  AjaxClient: {
    createDefault: jest.fn()
  }
}));

jest.mock('./createStore', () => ({
  createStore: jest.fn()
}));

import { render } from 'react-dom';
import { AjaxClient } from '@chr/common-web-ui-ajax-client';
import { createStore } from './createStore';

window.fetch = jest.fn();

describe('bootstrap', () => {
  it('calls functions and renders App', () => {
    const config = {};
    const authClient = {};
  
    const { bootstrap } = require('./bootstrap');
    bootstrap(config, authClient);
    
    expect(render).toHaveBeenCalledTimes(1);
    expect(AjaxClient.createDefault).toHaveBeenCalledWith(authClient);
    const ajaxClient = AjaxClient.createDefault(authClient);
    expect(createStore).toHaveBeenCalledWith(config, authClient, ajaxClient);
  });
});
