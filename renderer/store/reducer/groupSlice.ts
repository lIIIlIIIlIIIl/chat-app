import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Payload {
  roomId: string;
  displayName: string;
  members: string[];
  lastChatUpdate?: string;
}

const initialState: Payload = {
  roomId: "",
  displayName: "",
  members: [],
  lastChatUpdate: "",
};

const groupSlice = createSlice({
  name: "groupChatting",
  initialState,
  reducers: {
    startGroupInfo: (state, action: PayloadAction<Payload>) => {
      state.roomId = action.payload.roomId;
      state.displayName = action.payload.displayName;
      state.members = action.payload.members;
      state.lastChatUpdate = action.payload.lastChatUpdate;
    },
    endGroupInfo: state => {
      state.roomId = "";
      state.displayName = "";
      state.members = [];
      state.lastChatUpdate = "";
    },
  },
});

export const groupActions = groupSlice.actions;

export default groupSlice;
