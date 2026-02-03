describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('открывается при клике на карточку ингредиента и закрывается по крестику', () => {
    const ingredientName = 'Краторная булка N-200i';

    cy.contains('[data-testid^="ingredient-card"]', ingredientName).click();

    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').contains(ingredientName).should('be.visible');

    cy.get('[data-cy="modal-close-button"]').click();

    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('закрывается при клике на оверлей', () => {
    const ingredientName = 'Соус Spicy-X';

    cy.contains('[data-testid^="ingredient-card"]', ingredientName).click();

    cy.get('[data-cy="modal"]').should('be.visible');

    // Кликаем по фону
    cy.get('[data-cy="modal-overlay"]').click({ force: true });

    cy.get('[data-cy="modal"]').should('not.exist');
  });
});