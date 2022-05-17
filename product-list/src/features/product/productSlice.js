import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "../../services/product";

const initialState = {
  productList: [],
  searchedProduct: {},
  selectedProduct: {},
  productLoader: false,
  status: "idle",
};

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    try {
      const response = await fetchAllProducts();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    toggleProductLoader: (state, action) => {
      return {
        ...state,
        productLoader: action.payload === "TRUE" ? true : false,
      };
    },
    setSelectedProduct: (state, action) => {
      localStorage.setItem("selected__product", JSON.stringify(action.payload));
      return {
        ...state,
        selectedProduct: { ...action.payload },
      };
    },
    setSearchedProduct: (state, action) => {
      return {
        ...state,
        searchedProduct: { ...action.payload },
      };
    },
  },
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.status = "loading";
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      if (action.payload && action.payload.success) {
        state.productList = action.payload.allProducts;
      }
      state.productLoader = false;
    },
    [getAllProducts.rejected]: (state) => {
      state.productLoader = false;
      state.status = "error";
    },
  },
});

export const { toggleProductLoader, setSelectedProduct, setSearchedProduct } =
  productSlice.actions;
export default productSlice.reducer;
