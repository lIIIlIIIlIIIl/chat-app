import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: state => {
      state.isVisible = true;
    },
    closeModal: state => {
      state.isVisible = false;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice;
