import { eq } from "cypress/types/lodash";

describe('Vuelos', () => {

  it('Should login and navigate to vuelos', () => {
    cy.login('mladmin@matec.com.co', 'admin');
    cy.wait(1700);
    cy.get('.swal2-confirm').click();
    cy.wait(7000);
    cy.get('[data-cy="login-submit-button"]').click();
    // cy.url().should('include', 'pages/iot-dashboard');
    cy.wait(2100);
    cy.get('.sidebar-toggle').click();
    cy.get('a.ng-tns-c118-18').click();
    cy.get('.menu-item.ng-tns-c118-23').click();
    cy.wait(1900);
    cy.get('.sidebar-toggle').click();
    // cy.get('[data-cy="Consult-submit-button"]').click();
    // cy.url().should('include', 'pages/gantt');
  })

  it('Wrong start.', () => {
    cy.get('[data-cy="Consult-submit-button"]').click();
    // cy.get('[data-cy="date-std-field"]').click()
    // cy.get('[data-cy="date-std-field"]').clear().type('3/29/2022')
    // cy.get('[data-cy="date-etd-field"]').click()
    // cy.get('[data-cy="date-etd-field"]').clear().type('3/28/2022')
    // cy.get('[data-cy="consulta-submit-button"]').click();
  })

  it('Wrong start date and end date.', () => {
    cy.get('[data-cy="Consult-submit-button"]').click();
    cy.get('[data-cy="date-std"]').click()
    cy.get('[data-cy="date-std"]').type('3/28/22 2:00:00 AM')
    cy.get('[data-cy="date-etd"]').click()
    cy.get('[data-cy="date-etd"]').type('2022-03-28 12:00:00 AM')
    cy.get('[data-cy="Consult-submit-button"]').click();
  })

  it(' date and end date.', () => {
    cy.get('[data-cy="Consult-submit-button"]').click();
    cy.get('[data-cy="date-std"]').click()
    cy.get('[data-cy="date-std"]').clear().type('3/28/22 12:00:00 AM')
    cy.get('[data-cy="date-etd"]').click()
    cy.get('[data-cy="date-etd"]').clear().type('2022-03-28 2:00:00 AM')
    cy.get('[data-cy="Consult-submit-button"]').click();
  })
})
