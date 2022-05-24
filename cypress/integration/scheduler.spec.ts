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
    // cy.get('a.ng-tns-c118-25').click();
    cy.get('a.ng-tns-c118-18').click();
    cy.get('.menu-item.ng-tns-c118-19 ').click();
    cy.wait(1900);
    cy.get('.sidebar-toggle').click();
    cy.get('[data-cy="consulta-submit-button"]').click();
    // cy.url().should('include', 'pages/gantt');
  })

  it('Wrong start date and end date.', () => {
    cy.url().should('include', 'pages/gantt/ganttScheduler');
    cy.get('[data-cy="date-std-field"]').click()
    cy.get('[data-cy="date-std-field"]').clear().type('3/29/2022')
    cy.get('[data-cy="date-etd-field"]').click()
    cy.get('[data-cy="date-etd-field"]').clear().type('3/28/2022')
    cy.get('[data-cy="consulta-submit-button"]').click();
  })

  it('You should check the flights by start and end date.', () => {
    cy.get('[data-cy="date-std-field"]').click()
    cy.get('[data-cy="date-std-field"]').clear().type('3/29/2022')
    cy.get('[data-cy="date-etd-field"]').click()
    cy.get('[data-cy="date-etd-field"]').clear().type('3/29/2022')
    cy.get('[data-cy="consulta-submit-button"]').click();
    // cy.scrollTo('bottom')
    cy.get('.e-chart-scroll-container').scrollTo('right', { duration: 4000 })
    cy.get('.e-gridcontent > .e-content').scrollTo('right', { duration: 4000 })
    cy.get('.e-gridcontent > .e-content').scrollTo('left', { duration: 3000 })
    cy.get('.e-chart-scroll-container').scrollTo('left', { duration: 3000 })

    
    
  })
})
