import { eq } from "cypress/types/lodash";

describe('Vuelos', () => {

  // beforeEach(() => {
  //   cy.fixture('flight.json').as('flightData');
  // })

  // cy.viewport(75, 600)

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
    cy.wait(1200);
    cy.get('.sidebar-toggle').click();
    cy.wait(1200);
    cy.get('[data-cy="consulta-submit-button"]').click();
    cy.wait(1000);
  })

 

  it('save flight', () => {
    cy.get('.e-tbar-btn-text').click();
    cy.get('[data-cy="flight-field"]').type('2876');
    cy.wait(900);
    cy.get('#ej2_dropdownlist_0 > .e-float-input > .e-input-group-icon').click();
    cy.get('#ej2_dropdownlist_0 > .e-float-input > .e-input-group-icon').type('MU2');
    cy.wait(900);
    cy.get('#ej2_dropdownlist_1 > .e-float-input > .e-input-group-icon').click();
    cy.get('#ej2_dropdownlist_1 > .e-float-input > .e-input-group-icon').type('American Airlines');
    cy.get('#ej2_dropdownlist_1 > .e-float-input > .e-input-group-icon').click();
    cy.wait(900);
    // cy.get('#ej2_dropdownlist_1 > .e-float-input').click();
    cy.get('#StartTime_input').click();
    cy.get('#StartTime_input').type('05/25/2022 07:00:00');
    cy.get('#EndTime_input').click();
    cy.get('#EndTime_input').type('05/25/2022 10:30:00');
    cy.get('[data-cy="save-submit-field"]').click();
    cy.wait(1200);
    
  })

  it('Wrong start date and end date.', () => {
    // cy.url().should('include', 'pages/gantt/ganttScheduler');
    cy.get('[data-cy="date-std-field"]').click()
    cy.get('[data-cy="date-std-field"]').clear().type('5/29/2022').should('have.value', '5/29/2022')
    cy.get('[data-cy="date-etd-field"]').click()
    cy.get('[data-cy="date-etd-field"]').clear().type('5/28/2022')
    cy.get('[data-cy="consulta-submit-button"]').click();
    cy.wait(1900);
  })

  it('You should check the flights by start and end date.', () => {
    cy.get('[data-cy="date-std-field"]').click()
    cy.get('[data-cy="date-std-field"]').clear().type('5/24/2022')
    cy.get('[data-cy="date-etd-field"]').click()
    cy.get('[data-cy="date-etd-field"]').clear().type('5/24/2022')
    cy.get('[data-cy="consulta-submit-button"]').click();
    // cy.scrollTo('bottom')
    cy.get('.e-chart-scroll-container').scrollTo('right', { duration: 4000 })
    cy.get('.e-gridcontent > .e-content').scrollTo('right', { duration: 4000 })
    cy.get('.e-gridcontent > .e-content').scrollTo('left', { duration: 3000 })
    cy.get('.e-chart-scroll-container').scrollTo('left', { duration: 3000 })
    cy.wait(1500);
    


  })


  it('Editar.', () => {
    cy.get('[data-cy="date-std-field"]').click()
    cy.get('[data-cy="date-std-field"]').clear().type('5/25/2022')
    cy.get('[data-cy="date-etd-field"]').click()
    cy.get('[data-cy="date-etd-field"]').clear().type('5/25/2022')
    cy.get('[data-cy="consulta-submit-button"]').click();
    cy.wait(1500)
    cy.get('[aria-rowindex="9"] > .e-chart-row-cell > .e-taskbar-main-container > .e-gantt-child-taskbar-inner-div > .e-gantt-child-progressbar-inner-div > .e-task-label').dblclick();

    cy.get('#ej2_dropdownlist_2 > .e-float-input').click();
    cy.get('#ej2_dropdownlist_2 > .e-float-input').type('MU1');
    cy.wait(900);

    cy.get('[data-cy="edit-submit-field"]').click();
  })


  it('Eliminar.', () => {
    // cy.get('[data-cy="date-std-field"]').click()
    // cy.get('[data-cy="date-std-field"]').clear().type('5/25/2022')
    // cy.get('[data-cy="date-etd-field"]').click()
    // cy.get('[data-cy="date-etd-field"]').clear().type('5/25/2022')
    // cy.get('[data-cy="consulta-submit-button"]').click();
    cy.wait(1500)
    cy.get('[aria-rowindex="9"] > .e-chart-row-cell > .e-taskbar-main-container > .e-gantt-child-taskbar-inner-div > .e-gantt-child-progressbar-inner-div > .e-task-label').dblclick();
    cy.wait(1500)
    cy.get('[data-cy="delete-submit-field"]').click();
    cy.get('.swal2-confirm').click();
  })

  it('Intentar editar una asignacion de vuelo de sita.', () => {
    cy.wait(1200);
    cy.get('[aria-rowindex="2"] > .e-chart-row-cell > .e-taskbar-main-container > .e-gantt-child-taskbar-inner-div > .e-gantt-child-progressbar-inner-div > .e-task-label').dblclick();
    cy.wait(1900)
  })

  after(() => {
    cy.log('Test Finalizado')
})

})


describe('Inducccion manual', () => {

  it('Navegate', () => {
    cy.wait(2100);
    cy.get('.sidebar-toggle').click();
    cy.get('a.ng-tns-c118-33').click();
    cy.get('a.ng-tns-c118-36').click();
    cy.wait(2100);
    cy.get('.menu-item.ng-tns-c118-38 > .ng-star-inserted').click();
    cy.get('.sidebar-toggle').click();
  })

});