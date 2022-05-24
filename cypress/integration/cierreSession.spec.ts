describe('Logout', () => {

    it('Navitation Mat', () => {
        cy.login('mladmin@matec.com.co', 'admin');
        cy.wait(1700);
        cy.get('.swal2-confirm').click();
        cy.wait(7000);
        cy.get('[data-cy="login-submit-button"]').click();
        // cy.url().should('include', 'pages/iot-dashboard');
        cy.wait(2100);
        cy.get('.sidebar-toggle').click();
        cy.wait(1000);
        cy.get('.sidebar-toggle').click();
        cy.get('.user-container').click();  
        cy.wait(1000);
        cy.get('.menu-item.ng-tns-c118-45').click();
    })

    it.skip('Should not login if the form is valid', () => {
        cy.login('mladmin@matec.com.co', 'admin');
        // cy.wait(1700);
        // cy.get('.swal2-confirm').click();
        // cy.wait(7000);
        // cy.get('[data-cy="login-submit-button"]').click();
        // cy.get('.user-picture').click();
    })

    after(() => {
        cy.log('Test Finalizado')
    })
})