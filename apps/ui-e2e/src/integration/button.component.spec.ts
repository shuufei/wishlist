describe('button', () => {
  const componentName = 'buttoncomponent';
  describe('fill', () => {
    beforeEach(() => cy.visit('/iframe.html?id=buttoncomponent--fill'));

    it('ボタンが表示されること', () => {
      cy.matchImageSnapshot(`${componentName}--fill`);
    });
  });

  describe('stroked', () => {
    beforeEach(() => cy.visit('/iframe.html?id=buttoncomponent--stroked'));

    it('ボタンが表示されること', () => {
      cy.matchImageSnapshot(`${componentName}--stroked`);
    });
  });
});
