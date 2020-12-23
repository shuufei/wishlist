describe('button', () => {
  const componentName = 'buttoncomponent';
  describe('fill', () => {
    beforeEach(() => cy.visit('/iframe.html?id=buttoncomponent--fill'));

    it('default', () => {
      cy.matchImageSnapshot(`${componentName}--fill`);
    });
  });

  describe('stroked', () => {
    beforeEach(() => cy.visit('/iframe.html?id=buttoncomponent--stroked'));

    it('default', () => {
      cy.matchImageSnapshot(`${componentName}--stroked`);
    });
  });
});
