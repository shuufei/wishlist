describe('popupmenu', () => {
  const componentName = 'popupmenucomponent';
  describe('default', () => {
    beforeEach(() => cy.visit('/iframe.html?id=popupmenucomponent--default'));

    it('表示非表示の制御', () => {
      cy.matchImageSnapshot(`${componentName}--default`);
      cy.get('img').click();
      cy.matchImageSnapshot(`${componentName}--default--open`);
      cy.get('body').click();
      cy.matchImageSnapshot(`${componentName}--default--close`);
    });
  });
});
