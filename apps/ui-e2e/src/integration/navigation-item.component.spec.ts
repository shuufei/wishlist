describe('navigation item', () => {
  const componentName = 'navigationitemcomponent';
  describe('active', () => {
    beforeEach(() =>
      cy.visit('/iframe.html?id=navigationitemcomponent--active')
    );

    it('ナビゲーションの項目が表示されること', () => {
      cy.matchImageSnapshot(`${componentName}--active`);
    });
  });

  describe('deactive', () => {
    beforeEach(() =>
      cy.visit('/iframe.html?id=navigationitemcomponent--deactive')
    );

    it('ナビゲーションの項目が表示されること', () => {
      cy.matchImageSnapshot(`${componentName}--deactive`);
    });
  });
});
