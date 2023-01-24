import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Payload {
  roomId?: string;
  displayName: string;
  roomUsers: [];
}

const initialState: Payload = {
  roomId: "",
  displayName: "",
  roomUsers: [],
};

const chatSlice = createSlice({
  name: "chatting",
  initialState,
  reducers: {
    chatOpen: (state, action: PayloadAction<Payload>) => {
      state.roomId = action.payload.roomId;
      state.displayName = action.payload.displayName;
      state.roomUsers = action.payload.roomUsers;
    },
    chatClose: state => {
      state.roomId = "";
      state.displayName = "";
      state.roomUsers = [];
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
