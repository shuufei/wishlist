describe('wishlist-desktop-app', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appcomponent--primary'));

  it('should render the component', () => {
    cy.get('wda-root').should('exist');
  });
});
