import { constructorSlice, initialState } from './slice';
import { TIngredient } from '@utils-types';

const { reducer, actions } = constructorSlice;

describe('burgerConstructor reducer', () => {
  const mockBun: TIngredient = {
    _id: 'bun-1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'image.jpg',
    image_mobile: 'image_mobile.jpg',
    image_large: 'image_large.jpg'
  };

  const mockIngredient: TIngredient = {
    _id: 'ing-1',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 150,
    price: 90,
    image: 'image.jpg',
    image_mobile: 'image_mobile.jpg',
    image_large: 'image_large.jpg'
  };

  describe('Добавление ингредиента', () => {
    it('должен правильно добавлять булки', () => {
      const action = actions.addIngredient(mockBun);
      const state = reducer(initialState, action);

      expect(state.items.bun).toEqual(expect.objectContaining({ ...mockBun, id: expect.any(String) }));
      expect(state.items.ingredients).toHaveLength(0);
    });

    it('должен правильно добавлять ингредиенты', () => {
      const action = actions.addIngredient(mockIngredient);
      const state = reducer(initialState, action);

      expect(state.items.bun).toBeNull();
      expect(state.items.ingredients).toHaveLength(1);
      expect(state.items.ingredients[0]).toEqual(
        expect.objectContaining({ ...mockIngredient, id: expect.any(String) })
      );
    });
  });

  describe('Удаление ингредиента', () => {
    it('должен удалить ингредиент по id', () => {
      const addedAction = actions.addIngredient(mockIngredient);
      let state = reducer(initialState, addedAction);
      const ingredientId = state.items.ingredients[0].id;

      const removeAction = actions.removeIngredient({ ...mockIngredient, id: ingredientId });
      state = reducer(state, removeAction);

      expect(state.items.ingredients).toHaveLength(0);
    });
  });

  describe('Изменение порядка ингредиентов (вверх)', () => {
    it('должен изменить порядок на одну позицию', () => {
      const ingredient1 = { ...mockIngredient, _id: 'ing-1' };
      const ingredient2 = { ...mockIngredient, _id: 'ing-2' };

      let state = reducer(initialState, actions.addIngredient(ingredient1));
      state = reducer(state, actions.addIngredient(ingredient2));

      const moveAction = actions.moveIngredientUp(1);
      state = reducer(state, moveAction);

      expect(state.items.ingredients[0]._id).toBe('ing-2');
      expect(state.items.ingredients[1]._id).toBe('ing-1');
    });

    it('первый ингредиент не должен двигаться вверх', () => {
      let state = reducer(initialState, actions.addIngredient(mockIngredient));

      const moveAction = actions.moveIngredientUp(0);
      state = reducer(state, moveAction);

      expect(state.items.ingredients[0]._id).toBe(mockIngredient._id);
    });
  });

  describe('Изменение порядка ингредиентов (вниз)', () => {
    it('должен изменить порядок на одну позицию', () => {
      const ingredient1 = { ...mockIngredient, _id: 'ing-1' };
      const ingredient2 = { ...mockIngredient, _id: 'ing-2' };

      let state = reducer(initialState, actions.addIngredient(ingredient1));
      state = reducer(state, actions.addIngredient(ingredient2));

      const moveAction = actions.moveIngredientDown(0);
      state = reducer(state, moveAction);

      expect(state.items.ingredients[0]._id).toBe('ing-2');
      expect(state.items.ingredients[1]._id).toBe('ing-1');
    });

    it('последний ингредиент не должен двигаться вниз', () => {
      const ingredient1 = { ...mockIngredient, _id: 'ing-1' };
      const ingredient2 = { ...mockIngredient, _id: 'ing-2' };

      let state = reducer(initialState, actions.addIngredient(ingredient1));
      state = reducer(state, actions.addIngredient(ingredient2));

      const moveAction = actions.moveIngredientDown(1);
      state = reducer(state, moveAction);

      expect(state.items.ingredients[0]._id).toBe('ing-1');
      expect(state.items.ingredients[1]._id).toBe('ing-2');
    });
  });
});