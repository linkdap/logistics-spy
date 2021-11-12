describe('index', () => {
  const ensureAuthedMock = jest.fn();
  beforeEach(() => {
    jest.resetModuleRegistry();
    jest.resetAllMocks();

    jest.doMock('./bootstrap', () => ({
      bootstrap: jest.fn()
    }));

    jest.doMock('@chr/common-web-ui-ajax-client', () => ({
      AjaxClient: {
        createDefault: jest.fn()
      }
    }))

    jest.doMock('@chr/common-web-ui-authentication', () => ({
      createClient: jest.fn().mockReturnValue({
        ensureAuthed: ensureAuthedMock
      })
    }));

    jest.doMock('@chr/common-web-ui-configuration', () => ({
      getConfiguration: jest.fn().mockReturnValue({
        enterpriseLoggingAppId: '',
        oAuthAudience: 'string',
        loggingApiUri: 'string',
        analyticsId: 'string',
        citySearchApiUri: 'string',
        productUrl: 'string',
        oAuthClientId: 'string',
        oAuthDomain: 'string'
      })
    }));
  });

  const config = {
    enterpriseLoggingAppId: '',
    oAuthAudience: 'string',
    loggingApiUri: 'string',
    analyticsId: 'string',
    citySearchApiUri: 'string',
    productUrl: 'string',
    oAuthClientId: 'string',
    oAuthDomain: 'string'
  };

  afterEach(() => {
    jest.resetModules();
  });

  it('configures the app and authenticates user', async () => {
    const { getConfiguration } = require('@chr/common-web-ui-configuration');
    const { createClient } = require('@chr/common-web-ui-authentication');
    const { index } = require('./index');
    await index;
    expect(getConfiguration).toHaveBeenCalledTimes(1);
    expect(createClient).toHaveBeenCalledWith(config);
    expect(ensureAuthedMock).toHaveBeenCalledTimes(1);
  });

  it('calls bootstrap when auth passes', async () => {
    const { bootstrap } = require('./bootstrap');
    ensureAuthedMock.mockResolvedValue('');
    const { createClient } = require('@chr/common-web-ui-authentication');
    const { index } = require('./index');
    await index;
    const authClient = createClient(config);
    expect(bootstrap).toHaveBeenCalledWith(config, authClient);
  });

  it('renders error message if bootstrapping fails', async () => {
    const rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);


    ensureAuthedMock.mockResolvedValue('');

    const { bootstrap } = require('./bootstrap');
    bootstrap.mockImplementation(() => { throw 'Bootstrapping Failed!'; });

    const { index } = require('./index');
    await index;

    expect(rootDiv.innerHTML).toBe('<h2>An error occurred while starting the application.</h2><p>Bootstrapping Failed!</p>')

    document.body.removeChild(rootDiv);
  });
});
