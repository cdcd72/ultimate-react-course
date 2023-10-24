import { createSlice } from '@reduxjs/toolkit';

import { ICart } from '../../models/cart';

const initialState: ICart = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // action.payload = newItem
      state.items = [...state.items, action.payload];
    },
    deleteItem(state, action) {
      // action.payload = pizzaId
      state.items = state.items.filter(
        (item) => item.pizzaId !== action.payload,
      );
    },
    increaseItemQuantity(state, action) {
      // action.payload = pizzaId
      const item = state.items.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      // action.payload = pizzaId
      const item = state.items.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
        if (item.quantity === 0) {
          cartSlice.caseReducers.deleteItem(state, action);
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCartItems = ({ cart }: { cart: ICart }) => cart.items;

export const getTotalCartQuantity = ({ cart }: { cart: ICart }) =>
  cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = ({ cart }: { cart: ICart }) =>
  cart.items.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById =
  (id: number) =>
  ({ cart }: { cart: ICart }) =>
    cart.items.find((item) => item.pizzaId === id)?.quantity ?? 0;
