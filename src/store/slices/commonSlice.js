/* eslint no-param-reassign: ["error", {"props": false}] */
import { createSlice /* , createAsyncThunk */ } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'common',
  initialState: {
    loadingCategories: false,
    loadingBanners: false,
    loadingSuppliers: false,
    banners: [],
    categories: [],
    suppliers: [],
    supplierProducts: [],
  },
  reducers: {},
  extraReducers: {},
});

export const getBanners = (state) => state.commonSlice.banners;
export const getCategories = (state) => state.commonSlice.categories;
export const getSuppliers = (state) => state.commonSlice.suppliers;
export const getSupplierProducts = (state) => state.commonSlice.supplierProducts;
export const getLoadingBanners = (state) => state.commonSlice.loadingBanners;
export const getLoadingCategories = (state) => state.commonSlice.loadingCategories;
export const getLoadingSuppliers = (state) => state.commonSlice.loadingSuppliers;
export const getLoadingSupplierProducts = (state) => state.commonSlice.loadingSupplierProducts;

export default slice.reducer;
