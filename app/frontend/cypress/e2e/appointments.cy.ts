describe('Appointments', () => {
  context('Gets appointments', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('Gets appointments for doctor', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-doctor.json',
      }).as('login');
      cy.intercept('GET', 'http://localhost:5000/appointments/doctor/*', {
        fixture: 'return-appointments.json',
      }).as('appointments');
      cy.get('input[name="email"]').type('testuser@email.com');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').click();
      cy.wait('@login');
      cy.wait('@appointments');
    });
    it('Gets appointments for patient', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-patient.json',
      }).as('login');
      cy.intercept('GET', 'http://localhost:5000/appointments/patient/*', {
        fixture: 'return-appointments.json',
      }).as('appointments');
      cy.get('input[name="email"]').type('testuser@email.com');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').click();
      cy.wait('@login');
      cy.wait('@appointments');
    });
  });
  context('Gets appointment details', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('Gets appointment details for doctor', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-doctor.json',
      }).as('login');
      cy.intercept('GET', 'http://localhost:5000/appointments/doctor/*', {
        fixture: 'return-appointments.json',
      }).as('appointments');
      cy.intercept('GET', 'http://localhost:5000/appointments/*', {
        fixture: 'appointment-details.json',
      }).as('appointment');
      cy.get('input[name="email"]').type('testuser@email.com');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').click();
      cy.wait('@login');
      cy.wait('@appointments');
      cy.get('mat-card').first().click();
      cy.wait('@appointment');
    });

    it('Allows adding image for patient', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-patient.json',
      }).as('login');
      cy.intercept('GET', 'http://localhost:5000/appointments/patient/*', {
        fixture: 'return-appointments.json',
      }).as('appointments');
      cy.intercept('GET', 'http://localhost:5000/appointments/*', {
        fixture: 'appointment-details.json',
      }).as('appointment');
      cy.get('input[name="email"]').type('testuser@email.com');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').click();
      cy.wait('@login');
      cy.wait('@appointments');
      cy.get('mat-card').first().click();
      cy.wait('@appointment');
      cy.get('input[type="file"]').click({ force: true });
    });

    it("Doesn't show file upload when unnecessary", () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-patient.json',
      }).as('login');
      cy.intercept('GET', 'http://localhost:5000/appointments/patient/*', {
        fixture: 'return-appointments.json',
      }).as('appointments');
      cy.intercept('GET', 'http://localhost:5000/appointments/*', {
        fixture: 'appointment-details-no-file.json',
      }).as('appointment');
      cy.get('input[name="email"]').type('testuser@email.com');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').click();
      cy.wait('@login');
      cy.wait('@appointments');
      cy.get('mat-card').first().click();
      cy.wait('@appointment');
      cy.get('input[type="file"]').should('not.exist');
    });
  });

  context('Creates appointments', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('Creates appointment for doctor', () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-doctor.json',
      }).as('login');
      cy.intercept('GET', 'http://localhost:5000/appointments/doctor/*', {
        fixture: 'return-appointments.json',
      }).as('appointments');
      cy.intercept('POST', 'http://localhost:5000/appointments', {
        fixture: 'new-appointment.json',
      }).as('createAppointment');
      cy.intercept('GET', 'http://localhost:5000/users/doctor-patients/*', {
        fixture: 'return-patients.json',
      }).as('patients');
      cy.get('input[name="email"]').type('testuser@email.com');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').click();
      cy.wait('@login');
      cy.wait('@appointments');
      cy.contains('button', 'New').click();
      cy.get('input[formControlName="requirements"]').type('Test requirements');
      cy.get('input[formControlName="address"]').type('Test address');
      cy.get('input[formControlName="date"]').type('2021-05-05');
      cy.get('input[formControlName="startTime"]').type('12:00');
      cy.get('input[formControlName="endTime"]').type('13:00');
      cy.get('mat-select[formControlName="patientId"]').click();
      cy.get('mat-option').contains('test').click();
      cy.contains('button', 'Save appointment').click();
      cy.wait('@createAppointment');
    });
    it("Doesn't allow create when time is invalid", () => {
      cy.intercept('POST', 'http://localhost:5000/auth/login', {
        fixture: 'login-response-doctor.json',
      }).as('login');
      cy.intercept('GET', 'http://localhost:5000/appointments/doctor/*', {
        fixture: 'return-appointments.json',
      }).as('appointments');
      cy.intercept('POST', 'http://localhost:5000/appointments', {
        fixture: 'new-appointment.json',
      }).as('createAppointment');
      cy.intercept('GET', 'http://localhost:5000/users/doctor-patients/*', {
        fixture: 'return-patients.json',
      }).as('patients');
      cy.get('input[name="email"]').type('testuser@email.com');
      cy.get('input[name="password"]').type('testpassword');
      cy.contains('mat-radio-button', 'Patient').click();
      cy.contains('button', 'Login').click();
      cy.wait('@login');
      cy.wait('@appointments');
      cy.contains('button', 'New').click();
      cy.get('input[formControlName="requirements"]').type('Test requirements');
      cy.get('input[formControlName="address"]').type('Test address');
      cy.get('input[formControlName="date"]').type('2021-05-05');
      cy.get('input[formControlName="startTime"]').type('14:00');
      cy.get('input[formControlName="endTime"]').type('13:00');
      cy.get('mat-select[formControlName="patientId"]').click();
      cy.get('mat-option').contains('test').click();
      cy.contains('button', 'Save appointment').should('be.disabled');
    });
  });
});
