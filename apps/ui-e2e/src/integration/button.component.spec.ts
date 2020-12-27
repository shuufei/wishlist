describe('button', () => {
  const componentName = 'buttoncomponent';
  describe('default', () => {
    beforeEach(() => cy.visit('/iframe.html?id=buttoncomponent--default'));

    it('ボタンが表示されること', () => {
      cy.matchImageSnapshot(`${componentName}--default`);
    });
  });

  describe('stroked', () => {
    beforeEach(() => cy.visit('/iframe.html?id=buttoncomponent--stroked'));

    it('ボタンが表示されること', () => {
      cy.matchImageSnapshot(`${componentName}--stroked`);
    });
  });

  describe('fill', () => {
    beforeEach(() => cy.visit('/iframe.html?id=buttoncomponent--fill'));

    it('ボタンが表示されること', () => {
      cy.matchImageSnapshot(`${componentName}--fill`);
    });
  });
});
