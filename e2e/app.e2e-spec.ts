import { FirebaseGpsPage } from './app.po';

describe('firebase-gps App', () => {
  let page: FirebaseGpsPage;

  beforeEach(() => {
    page = new FirebaseGpsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
