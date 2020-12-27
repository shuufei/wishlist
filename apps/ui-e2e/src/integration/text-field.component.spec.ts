describe('text-field', () => {
  const componentName = 'textfieldcomponent';
  describe('input', () => {
    beforeEach(() => cy.visit('/iframe.html?id=textfieldcomponent--input'));

    it('default', () => {
      cy.matchImageSnapshot(`${componentName}--input`);
    });

    it('typing', () => {
      cy.get('.ui-body').first().type('ui-body input');
      cy.get('.ui-display1').type('ui-display1 input');
      cy.get('.ui-heading').type('ui-heading input');
      cy.get('.ui-heading-b').type('ui-heading-b input');
      cy.get('.ui-subheading').type('ui-subheading input');
      cy.get('.ui-subheading-b').type('ui-subheading-b input');
      cy.get('.ui-body').last().type('ui-body input');
      cy.get('.ui-body-b').type('ui-body-b input');
      cy.get('.ui-caption').type('ui-caption input');
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
      cy.get('.ui-display1').type('ui-display1 textarea');
      cy.get('.ui-heading').type('ui-heading textarea');
      cy.get('.ui-heading-b').type('ui-heading-b textarea');
      cy.get('.ui-subheading').type('ui-subheading textarea');
      cy.get('.ui-subheading-b').type('ui-subheading-b textarea');
      cy.get('.ui-body').last().type('ui-body textarea');
      cy.get('.ui-body-b').type('ui-body-b textarea');
      cy.get('.ui-caption').type('ui-caption textarea');
      cy.matchImageSnapshot(`${componentName}--textarea--typing`);
    });
  });
});
