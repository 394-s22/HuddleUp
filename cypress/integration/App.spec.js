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

    it ('detects HuddleUp banner', () => {
        cy.get('[class=banner]').should('contain', 'HuddleUp');
    });

});