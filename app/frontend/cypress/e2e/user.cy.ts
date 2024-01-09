describe('User details', () => {
  context('View details', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('Edits Patient', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-patient.json',
      }).as('login');
      cy.intercept('GET', 'http://localhost:5000/users/*', {
        fixture: 'user-details.json',
      }).as('fetchUser');

      cy.get('input[name="email"]').type('testuser@email.com');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').click();
      cy.wait('@login');
      cy.get('button').contains('My Profile').click();
      cy.wait('@fetchUser');
      cy.get('mat-card').should('be.visible');
      cy.get("input[formControlName='firstName']").should('have.value', 'John');
      cy.get("input[formControlName='lastName']").should('have.value', 'Doe');
      cy.get("input[formControlName='phone']").should(
        'have.value',
        '1234567890'
      );
      cy.get("input[formControlName='city']").should('have.value', 'New York');
      cy.get("input[formControlName='email']").should(
        'have.value',
        'test@mail.com'
      );
    });
  });
  context('Edit details', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('Edits Patient', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-patient.json',
      }).as('login');
      cy.intercept('PUT', 'http://localhost:5000/users/modify', {
        statusCode: 200,
      }).as('modify');

      cy.get('input[name="email"]').type('testuser@email.com');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').click();
      cy.wait('@login');
      cy.get('button').contains('My Profile').click();
      cy.get('mat-card').should('be.visible');
      cy.get('input[formControlName="firstName"]').type('John');
      cy.get('input[formControlName="lastName"]').type('Doe');
      cy.get('input[formControlName="phone"]').type('1234567890');
      cy.get('input[formControlName="city"]').type('New York');
      cy.get('input[formControlName="birthDate"]').type('1990-01-01');
      cy.get('input[formControlName="email"]').type('john.doe@example.com');
      cy.get('button').contains('Submit changes').click({ force: true });
      cy.wait('@modify');
    });

    it('Edits Doctor', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-doctor.json',
      }).as('login');
      cy.intercept('PUT', 'http://localhost:5000/users/modify', {
        statusCode: 200,
      }).as('modify');

      cy.get('input[name="email"]').type('testuser@email.com');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').click();
      cy.wait('@login');
      cy.get('button').contains('My Profile').click();
      cy.get('mat-card').should('be.visible');
      cy.get('input[formControlName="firstName"]').type('John');
      cy.get('input[formControlName="lastName"]').type('Doe');
      cy.get('input[formControlName="phone"]').type('1234567890');
      cy.get('input[formControlName="city"]').type('New York');
      cy.get('input[formControlName="education"]').type('Test University');
      cy.get('input[formControlName="birthDate"]').type('1990-01-01');
      cy.get('input[formControlName="email"]').type('john.doe@example.com');
      cy.get('button').contains('Submit changes').click({ force: true });
      cy.wait('@modify');
    });
    it('Disables button when form is invalid', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-patient.json',
      }).as('login');
      cy.intercept('PUT', 'http://localhost:5000/users/modify', {
        statusCode: 200,
      }).as('modify');

      cy.get('input[name="email"]').type('testuser@email.com');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').click();
      cy.wait('@login');
      cy.get('button').contains('My Profile').click();
      cy.get('mat-card').should('be.visible');
      cy.get('input[formControlName="firstName"]').clear();

      cy.get('button').contains('Submit changes').click({ force: true });
      cy.url().should('include', '/profile');
    });
  });
});
