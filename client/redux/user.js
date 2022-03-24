import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    type: '',
  },
  reducers: {
    setTypeCaptain: (state) => {
      state.type = 'Captain';
    },
    setTypePlayer: (state) => {
      state.type = 'Player';
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});
export const { setTypeCaptain, setTypePlayer } = userSlice.actions;
export default userSlice.reducer;
