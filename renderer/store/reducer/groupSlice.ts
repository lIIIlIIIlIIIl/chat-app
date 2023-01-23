import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Payload {
  uid: string;
  displayName: string;
  members: string[];
  lastChatUpdate: string;
}

const initialState: Payload = {
  uid: "",
  displayName: "",
  members: [],
  lastChatUpdate: "",
};

const groupSlice = createSlice({
  name: "groupChatting",
  initialState,
  reducers: {
    startGroupInfo: (state, action: PayloadAction<Payload>) => {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.members = action.payload.members;
      state.lastChatUpdate = action.payload.lastChatUpdate;
    },
    endGroupInfo: state => {
      state.uid = "";
      state.displayName = "";
      state.members = [];
      state.lastChatUpdate = "";
    },
  },
});

export const groupActions = groupSlice.actions;

export default groupSlice;
