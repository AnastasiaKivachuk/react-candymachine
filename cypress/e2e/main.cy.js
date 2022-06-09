import {GITHUB_LINK, TWITTER_LINK} from "../../src/components/AppBar/constants";

describe('MAIN PAGE', () => {
    beforeEach(() => {

        cy.visit('http://localhost:3000');
    })

    it('should render text', () => {
        cy.contains('Candy Machine Explorer');
    });

    it('displays two input', () => {
        cy.get('input').should('have.length', 2)
        cy.get('label').first().should('have.text', 'Cluster')
        cy.get('label').last().should('have.text', 'Candy Machine ID')
    })

    it('check input type', () => {
        cy.get('input').should('have.length', 2)
        cy.get('input').last().type(`12334{enter}`)
        cy.get('input').last().should('have.value', '12334')
        cy.get('.details').should('not.have.text', 'Details')
        cy.get('.details').should('have.text', 'No data')
    })

    it('links', () => {
      cy.get('a').should('have.length', 2)
      cy.get('a').first().should('attr', 'href', GITHUB_LINK)
      cy.get('a').last().should('have.attr', 'href', TWITTER_LINK);
    });
})
