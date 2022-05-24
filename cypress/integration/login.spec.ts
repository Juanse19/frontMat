describe('Login', () => {
  it('Should not login if the form is invalid', () => {
    cy.visit('/');
    cy.url().should('includes', 'auth/login');
    cy.get('[data-cy="login-email-field"]').type('mladmin@matec.com.co');
    // cy.get('[formControlName="password"]').type('test');
    // cy.get('button').click();
    // cy.get('.error-msg').should('be.visible')
    cy.url().should('not.include', 'dashboard')
    
    
  })

  it('Should not login if the form is valid', () => {
    cy.login('mladmin@matec.com.co', 'admin');
    cy.wait(1700);
    cy.get('.swal2-confirm').click();
    cy.wait(7000);
    cy.get('[data-cy="login-submit-button"]').click();
    // cy.get('.user-picture').click();
  })



})
