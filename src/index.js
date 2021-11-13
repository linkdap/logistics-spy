import { getConfiguration } from '@chr/common-web-ui-configuration'
import { createClient } from '@chr/common-web-ui-authentication';
import { bootStrapAppAsync } from '@chr/common-ui-bootstrapper';

export const index = (async () => {
  const config = await getConfiguration();

  const authClient = createClient(config);

  await bootStrapAppAsync(authClient, async () => {
    const { bootstrap } = await import('./bootstrap');
    bootstrap(config, authClient);
  });

})();
