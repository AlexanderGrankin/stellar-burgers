describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('createOrder');

    window.localStorage.setItem('refreshToken', 'test-refreshToken');
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('/');
  })

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  })

  it('создает заказ, если пользователь авторизован', () => {
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

    // Клик по кнопке заказа
    cy.get('[data-cy=order_button]').contains('Оформить заказ').click();

    // Открывается модалка с номером заказа
    cy.get('[data-cy=order_number]').contains('98917').should('exist');

    // Закрытие модалки при клике на крестик
    // cy.get('[data-cy=modal-close-button]').click();
    // cy.get('[data-cy=modal]').should('not.exist');
  })
});