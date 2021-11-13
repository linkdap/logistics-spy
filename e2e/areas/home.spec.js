import { HomePage } from './home.po';

describe('home page', () => {
  const homePage = new HomePage();

  beforeEach(async () => {
    await homePage.load();
  });

  it('doesnt blow up when a request is made to the root of the app', async () => {
    const logo = await homePage.logo();

    expect(logo).toBeTruthy();
  });
});
