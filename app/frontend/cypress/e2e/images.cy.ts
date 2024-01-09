describe('Images', () => {
  context('Image display', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('Allows viewing images', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-doctor.json',
      }).as('login');
      cy.intercept('GET', 'http://localhost:5000/users/doctor-patients/*', {
        fixture: 'return-patients.json',
      }).as('patients');
      cy.intercept('GET', 'http://localhost:5000/images/user-images-all/*', {
        fixture: 'return-images.json',
      }).as('images');
      cy.get('input[name="email"]').type('testuser@email.com');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').click();
      cy.wait('@login');
      cy.get('button').contains('Images').click();
      cy.get('mat-select').contains('Select a patient').click();
      cy.get('mat-option').contains('test').click();
      cy.get('mat-card').should('be.visible');
      cy.get('span').contains('open_in_new').click();
      cy.get('img').should('be.visible');
      cy.get('button').contains('Start Processing').should('be.visible');
    });
    it('Shows no images when none are available', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-doctor.json',
      }).as('login');
      cy.intercept('GET', 'http://localhost:5000/users/doctor-patients/*', {
        fixture: 'return-patients.json',
      }).as('patients');
      cy.intercept('http://localhost:5000/images/user-images-all/*', (req) => {
        req.reply({
          statusCode: 200,
          body: [],
        });
      }).as('images');

      cy.get('input[name="email"]').type('testuser@email.com');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').click();
      cy.wait('@login');
      cy.get('button').contains('Images').click();
      cy.get('mat-select').contains('Select a patient').click();
      cy.get('mat-option').contains('test').click();
      cy.get('mat-card').should('be.visible');
      cy.get('button').contains('Start Processing').should('not.exist');
    });
  });
});
