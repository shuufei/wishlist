describe('icon', () => {
  const componentName = 'iconcomponent';
  describe('default', () => {
    beforeEach(() => cy.visit('/iframe.html?id=iconcomponent--default'));

    it('アイコンが表示されること', () => {
      cy.matchImageSnapshot(`${componentName}--default`);
    });
  });
});
