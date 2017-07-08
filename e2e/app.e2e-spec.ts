import { IkeAngularPage } from './app.po';

describe('ike-angular App', () => {
  let page: IkeAngularPage;

  beforeEach(() => {
    page = new IkeAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
