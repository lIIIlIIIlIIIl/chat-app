import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Payload {
  roomId?: string;
  displayName: string;
}

const initialState: Payload = {
  roomId: "",
  displayName: "",
};

const chatSlice = createSlice({
  name: "chatting",
  initialState,
  reducers: {
    chatOpen: (state, action: PayloadAction<Payload>) => {
      state.roomId = action.payload.roomId;
      state.displayName = action.payload.displayName;
    },
    chatClose: state => {
      state.roomId = "";
      state.displayName = "";
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
