import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./reducer/chatSlice";
import modalSlice from "./reducer/modalSlice";
import groupSlice from "./reducer/groupSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    chat: chatSlice.reducer,
    group: groupSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
