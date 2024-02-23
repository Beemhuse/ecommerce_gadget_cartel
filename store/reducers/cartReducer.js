// src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showCart: false,
    cartItems: [],
    totalPrice: 0,
    totalQuantities: 0,
    qty: 1,
  },
  reducers: {
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
    addCartItem: (state, action) => {
      const { product, quantity } = action.payload;

      const existingItem = state.cartItems.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ ...product, quantity });
      }

      state.totalPrice += product.price * quantity;
      state.totalQuantities += quantity;
    },
    removeCartItem: (state, action) => {
      const { product } = action.payload;
      const itemToRemove = state.cartItems.find((item) => item._id === product._id);

      if (itemToRemove) {
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
        state.totalQuantities -= itemToRemove.quantity;
        state.cartItems = state.cartItems.filter((item) => item._id !== product._id);
      }
    },
    toggleCartItemQuantity: (state, action) => {
      const { id, value } = action.payload;
      const itemToToggle = state.cartItems.find((item) => item._id === id);

      if (itemToToggle) {
        if (value === 'inc') {
          itemToToggle.quantity += 1;
          state.totalPrice += itemToToggle.price;
          state.totalQuantities += 1;
        } else if (value === 'dec' && itemToToggle.quantity > 1) {
          itemToToggle.quantity -= 1;
          state.totalPrice -= itemToToggle.price;
          state.totalQuantities -= 1;
        }
      }
    },
    incrementQuantity: (state) => {
      state.qty += 1;
    },
    decrementQuantity: (state) => {
      state.qty = state.qty - 1 < 1 ? 1 : state.qty - 1;
    },
  },
});

export const { toggleCart, addCartItem, removeCartItem, toggleCartItemQuantity, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
