import { rootReducer } from './store';

describe('rootReducer', () => {
  it('должен вернуть начальное состояние', () => {
    const initialState = rootReducer(undefined, { type: '' });

    expect(initialState).toEqual({
      user: expect.any(Object),
      ingredients: expect.any(Object),
      burgerConstructor: expect.any(Object),
      feed: expect.any(Object),
      orders: expect.any(Object)
    });
  });

  it('должен обрабатывать неизвестное действие', () => {
    const initialState = rootReducer(undefined, { type: '' });
    const newState = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });

    expect(newState).toBe(initialState);
  });
});