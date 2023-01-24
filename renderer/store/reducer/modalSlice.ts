import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  inviteView: false,
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
    inviteModalOpen: state => {
      state.inviteView = true;
    },
    inviteModalClose: state => {
      state.inviteView = false;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice;
