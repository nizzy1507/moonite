import { createSlice } from '@reduxjs/toolkit';

const detailSlice = createSlice({
  name: 'detail',
  initialState: { detail: {}, screenshots: {}, isLoading: true },
  reducers: {
    getDetail(state, action) {
      const { detail, screenshots, isLoading } = action.payload;
      state.detail = detail;
      state.screenshots = screenshots;
      state.isLoading = isLoading;
    },
    loading(state) {
      state.isLoading = true;
    },
    resetDetail(state) {
      state.detail = {};
      state.screenshots = {};
      state.isLoading = true;
    },
  },
});

export const { getDetail, loading, resetDetail } = detailSlice.actions;
export default detailSlice.reducer;
