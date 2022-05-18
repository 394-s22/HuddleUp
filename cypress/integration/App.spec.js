/* globals cy */
    
describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });
  
  });

describe('Banner Test', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    it ('detects HuddleUp baner', () => {
        cy.get('[data-cy=Banner]').should('contain', 'HuddleUp');
    });

});