context('Authentication testing', () => {
  it('loads examples', () => {
    cy.visit('/');
    cy.contains('Login');
  });
});
