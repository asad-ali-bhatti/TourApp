import { TourAppPage } from './app.po';

describe('tour-app App', function() {
  let page: TourAppPage;

  beforeEach(() => {
    page = new TourAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
