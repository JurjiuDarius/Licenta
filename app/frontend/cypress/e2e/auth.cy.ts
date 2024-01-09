describe('Authentication', () => {
  context('Login', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('displays the login form', () => {
      cy.contains('Login');
    });

    it('logs in successfully', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-doctor.json',
      }).as('login');
      cy.get('input[name="email"]').type('testuser@email.com');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').click();
      cy.wait('@login');
      cy.url().should('include', '/appointments');
    });

    it('Disallows login', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-doctor.json',
      }).as('login');
      cy.get('input[name="email"]').type('invalid');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').should('be.disabled');
    });
  });

  context('Sign Up', () => {
    beforeEach(() => {
      cy.visit('/signup');
    });

    it('displays the sign up form', () => {
      cy.get('form').should('be.visible');
    });

    it('signs up successfully', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/signup', {
        statusCode: 200,
      }).as('signup');

      // Select the role
      cy.contains('mat-radio-button', 'Patient').click({ force: true });

      // Fill in the form
      cy.get('input[formControlName="firstName"]').type('John');
      cy.get('input[formControlName="lastName"]').type('Doe');
      cy.get('input[formControlName="phone"]').type('1234567890');
      cy.get('input[formControlName="city"]').type('New York');
      cy.get('input[formControlName="birthDate"]').type('1990-01-01');
      cy.get('input[formControlName="email"]').type('john.doe@example.com');
      cy.get('input[formControlName="password"]').type('password');
      cy.get('input[formControlName="confirmPassword"]').type('password');

      // Click the submit button
      cy.contains('button', 'Sign Up').click();

      cy.wait('@signup');
      cy.url().should('include', '/login');
    });
  });
});
