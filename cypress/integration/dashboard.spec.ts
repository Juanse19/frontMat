

describe('Dashboard', () => {

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
        // cy.get('.active').click();
        // cy.get('a.ng-tns-c118-1').click();
        // cy.get('.sidebar-toggle').click();
        // cy.get('.user-container').click();  
        // cy.wait(1000);
        // cy.get('.menu-item.ng-tns-c118-45').click();
    })

    it('tests dashboard', () => {
        cy.get('.active').click();
        cy.get('a.ng-tns-c118-1').click();
        cy.get('.sidebar-toggle').click();
        cy.get(':nth-child(1) > .container > img').click();
        // cy.get('[x="60.33"]').click();
        // cy.wait(4500);
        // cy.get('#ejDialogSFC_dialog-header > .e-dlg-closeicon-btn > .e-btn-icon').click();
        // cy.get('[x="212.33"]').click();
        // cy.wait(3500);
        // cy.get('#ejDialogSF_dialog-header > .e-dlg-closeicon-btn > .e-btn-icon').click();
        // cy.get('[x="309.33"]').click();
        // cy.wait(3500);
        // cy.get('#ejDialogSS_dialog-header > .e-dlg-closeicon-btn > .e-btn-icon').click();
        // cy.wait(3500);
    })

    it('Navigation zones', () => {
        cy.get('#Layer_0_Imagen-24').click();
        cy.get('[x="53.93"]').click();
    })

    // after(() => {
    //     cy.log('Test Finalizado')
    // })

})
