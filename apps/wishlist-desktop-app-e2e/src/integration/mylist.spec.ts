describe('wishlist-desktop-app mylist', () => {
  beforeEach(() => {
    cy.clock();
    cy.visit('/mylist');
    cy.tick(2000);
  });

  describe('一覧表示', () => {
    it('自分のほしいものリストが表示される', () => {
      cy.matchImageSnapshot();
    });
  });

  describe('追加', () => {
    it('フォームが表示される', () => {
      cy.get('wda-add-item-form button').click();
      cy.matchImageSnapshot();
    });

    it('フォーム表示後、キャンセルボタン押下でフォームが非表示になる', () => {
      cy.get('wda-add-item-form button').click();
      cy.contains('キャンセル').click();
      cy.matchImageSnapshot();
    });

    it('フォーム表示後、ほしいものを追加できる', () => {
      cy.get('wda-add-item-form button').click();
      cy.get('wda-add-item-form input[ui-text-field]').type('new item title');
      cy.get('wda-add-item-form textarea[ui-text-field]').type(
        'new item description'
      );
      cy.contains('追加').click();
      cy.tick(500);
      cy.matchImageSnapshot();
    });

    it('ほしいものを追加後、再度追加しようとするとフォームの値がリセットされている', () => {
      cy.get('wda-add-item-form button').click();
      cy.get('wda-add-item-form input[ui-text-field]').type('new item title');
      cy.get('wda-add-item-form textarea[ui-text-field]').type(
        'new item description'
      );
      cy.contains('追加').click();
      cy.tick(500);
      cy.get('wda-add-item-form button').click();
      cy.matchImageSnapshot();
      cy.contains('キャンセル').click();
    });
  });

  describe('更新', () => {
    it('ほしいものの内容を更新できる', () => {
      cy.get('ui-wishlist-item ui-popup-menu').first().click();
      cy.contains('編集').click();
      cy.get('input[ui-text-field]').type('update wishlist title');
      cy.get('textarea[ui-text-field]').type(
        'update wishlist description{enter}update wishlist description'
      );
      cy.contains('更新').click();
      cy.matchImageSnapshot();
    });
  });

  describe('削除', () => {
    it('ほしいものを削除できる', () => {
      cy.get('ui-wishlist-item ui-popup-menu').first().click();
      cy.contains('削除').click();
      cy.contains('削除').click();
      cy.tick(500);
      cy.matchImageSnapshot();
    });
  });
});
