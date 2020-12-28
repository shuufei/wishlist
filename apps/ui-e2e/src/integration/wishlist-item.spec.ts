describe('wishlist-item', () => {
  const componentName = 'wishlistitemcomponent';
  describe('default', () => {
    beforeEach(() =>
      cy.visit('/iframe.html?id=wishlistitemcomponent--default')
    );

    it('wishlist項目が表示されること', () => {
      cy.matchImageSnapshot(`${componentName}--default`);
    });

    it('編集モードに移行できること', () => {
      cy.get('ui-popup-menu').click();
      cy.contains('編集').click();
      cy.matchImageSnapshot(`${componentName}--default--edit-mode`);
    });

    it('編集モードをキャンセルできること', () => {
      cy.get('ui-popup-menu').click();
      cy.contains('編集').click();
      cy.contains('キャンセル').click();
      cy.matchImageSnapshot(`${componentName}--default--edit-mode-cancel`);
    });

    it('更新できること', () => {
      cy.get('ui-popup-menu').click();
      cy.contains('編集').click();
      cy.get('input[ui-text-field]').type('update wishlist title');
      cy.get('textarea[ui-text-field]').type(
        'update wishlist description{enter}update wishlist description'
      );
      cy.contains('更新').click();
      cy.matchImageSnapshot(`${componentName}--default--update`);
    });

    it('削除モードに移行できること', () => {
      cy.get('ui-popup-menu').click();
      cy.contains('削除').click();
      cy.matchImageSnapshot(`${componentName}--default--delete-mode`);
    });

    it('削除モードをキャンセルできること', () => {
      cy.get('ui-popup-menu').click();
      cy.contains('削除').click();
      cy.contains('キャンセル').click();
      cy.matchImageSnapshot(`${componentName}--default--delete-mode-cancel`);
    });
  });

  describe('no-separator', () => {
    beforeEach(() =>
      cy.visit('/iframe.html?id=wishlistitemcomponent--no-separator')
    );

    it('separatorなしのwishlist項目が表示されること', () => {
      cy.matchImageSnapshot(`${componentName}--no-separator`);
    });
  });
});
