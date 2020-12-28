describe('wishlist-form-group', () => {
  const componentName = 'wishlistformgroupcomponent';
  describe('default', () => {
    beforeEach(() =>
      cy.visit('/iframe.html?id=wishlistformgroupcomponent--default')
    );

    it('フォームグループが表示されること', () => {
      cy.matchImageSnapshot(`${componentName}--default`);
    });

    it('フォームグループに入力できること', () => {
      cy.get('input.text-field').type('wishlist title');
      cy.get('textarea.text-field').type('wishlist description');
      cy.matchImageSnapshot(`${componentName}--default--typing`);
    });
  });
});
