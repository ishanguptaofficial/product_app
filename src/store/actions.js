import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  nextId: 1, // Initial value for generating unique IDs
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: state.nextId,
      };
      state.products.push(newProduct);
      state.nextId++; // Increment nextId for the next product
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.products.findIndex((product) => product.id === id);
      console.log([...state.products])
      console.log([...state.products])
      if (index !== -1) {
        const updatedProducts = [...state.products];
        updatedProducts[index] = updatedProduct;
        return {
          ...state,
          products: updatedProducts,
        };
      }
      return state;
    },
  },
});

export const { addProduct, removeProduct, updateProduct } =
  productSlice.actions;
export default productSlice.reducer;
