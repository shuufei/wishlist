describe('text-field', () => {
  const componentName = 'textfieldcomponent';
  describe('input', () => {
    beforeEach(() => cy.visit('/iframe.html?id=textfieldcomponent--input'));

    it('default', () => {
      cy.matchImageSnapshot(`${componentName}--input`);
    });

    it('typing', () => {
      cy.get('.ui-body').first().type('ui-body input');
      cy.matchImageSnapshot(`${componentName}--input--typing`);
    });
  });

  describe('textarea', () => {
    beforeEach(() => cy.visit('/iframe.html?id=textfieldcomponent--textarea'));

    it('default', () => {
      cy.matchImageSnapshot(`${componentName}--textarea`);
    });

    it('typing', () => {
      cy.get('.ui-body').first().type('ui-body textarea');
      cy.matchImageSnapshot(`${componentName}--textarea--typing`);
    });
  });
});
