describe('Добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
  });

  it('должен добавить булку и начинки в конструктор', () => {
    cy.wait('@getIngredients');
    // Добавляем булку
    const bunName = 'Краторная булка N-200i';
    cy.contains('[data-testid^="ingredient-card"]', bunName)
      .parents('li')
      .find('button')
      .contains('Добавить')
      .should('be.visible')
      .scrollIntoView()
      .click();

    cy.get(`[data-testid^="constructor-bun-top-"]`)
      .should('contain.text', `${bunName} (верх)`);

    cy.get('[data-testid="burger-constructor"]')
      .find('.constructor-element')
      .last()
      .should('contain.text', `${bunName} (низ)`);

    // Добавляем соус
    const sauceName = 'Соус Spicy-X';
    cy.contains('[data-testid^="ingredient-card"]', sauceName)
      .parents('li')
      .find('button')
      .contains('Добавить')
      .click();

    // Добавляем основной ингредиент
    const mainName = 'Биокотлета из марсианской Магнолии';
    cy.contains('[data-testid^="ingredient-card"]', mainName)
      .parents('li')
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('[data-testid="burger-constructor"] ul li')
      .should('have.length', 2);

    cy.get('[data-testid="burger-constructor"] ul')
      .should('contain.text', sauceName)
      .and('contain.text', mainName);
  });
});