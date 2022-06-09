import {GITHUB_LINK, TWITTER_LINK} from "../../src/components/AppBar/constants";
import * as MockData from "../fixtures/mock-data.json";

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

    it('check select', () => {
        cy.get('input').should('have.length', 2)
        // cy.get('input').first().click()
        cy.get('.css-njtkg2-MuiInputBase-root-MuiInput-root-MuiSelect-root').click()
        cy.get('li').last().click()
        cy.get('input').first().should('have.value', 'http://127.0.0.1:8899/')
        cy.get('.css-1o6p3yx-MuiLinearProgress-root').should('have.length', 0)
    })

    it('check input type', () => {
        cy.get('input').should('have.length', 2)
        cy.get('input').last().type(`12334`)
        cy.get('input').last().should('have.value', '12334')
        cy.get('.details').should('not.have.text', 'Details')
        cy.get('.details').should('have.text', 'No data')
    })

    it('check links', () => {
        cy.get('a').should('have.length', 2)
        cy.get('a').first().should('have.attr', 'href', GITHUB_LINK)
        cy.get('a').last().should('have.attr', 'href', TWITTER_LINK);
    });

    it('check loading', () => {
        cy.get('input').last().type(`9vwYtcJs`,)
        cy.get('.css-1o6p3yx-MuiLinearProgress-root').should('have.length', 1)
    });

    it('check request', () => {
        cy.get('.details').should('have.text', 'No data')
        cy.get('input').last().type(`9vwYtcJsH1MskNaixcjgNBnvBDkTBhyg25umod1rgMQL`, {delay: 300})
        cy.get('input').last().should('have.value', '9vwYtcJsH1MskNaixcjgNBnvBDkTBhyg25umod1rgMQL')
        cy.server()
        cy.fixture('mock-data.json').then((res) => {
            console.log(res)
            cy.get('.title').should('have.text', 'Details')
            cy.get('.details').contains('aury7LJUae7a92PBo35vVbP61GX8VbyxFKausvUtBrt')
        })
    });
})
