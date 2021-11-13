import './index.scss';
import { render } from 'react-dom';
import App from './App';
import { AjaxClient } from '@chr/common-web-ui-ajax-client';
import { createStore } from './createStore';
import { defaultForWebApps } from '@chr/common-javascript-logging-core';

export const bootstrap = (config, authClient) => {
  const ajaxClient = AjaxClient.createDefault(authClient);

  const store = createStore(config, authClient, ajaxClient);

  const loggingConfig = defaultForWebApps(config, authClient);

  render(
    <App loggingConfig={loggingConfig} store={store} />,
    document.getElementById('root')
  );
}
