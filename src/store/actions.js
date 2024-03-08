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
      const arr = state.products;
      // console.log(">>>>>>>", action.payload, ...state)
      const index = arr.findIndex((product,i) => i === id);
      console.log('alread here')
      console.log(index)
      if (index !== -1) {
        const updatedProducts = [...arr];
        updatedProducts[index] = updatedProduct;
        console.log({updatedProducts,chck:updatedProducts[index]});
        state.products = updatedProducts; 
        // return {
        //   ...state,
        //   products: updatedProducts,
        // };
      }
      // return state;
    },
    
  },
});

export const { addProduct, removeProduct, updateProduct } =
  productSlice.actions;
export default productSlice.reducer;
