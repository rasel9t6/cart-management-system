import { createSlice } from '@reduxjs/toolkit';
const storedCart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: storedCart,
    totalQuantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      state.totalQuantity -= state.items[itemIndex].quantity;
      state.items.splice(itemIndex, 1);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        const difference = action.payload.quantity - item.quantity;
        item.quantity = action.payload.quantity;
        state.totalQuantity += difference;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;