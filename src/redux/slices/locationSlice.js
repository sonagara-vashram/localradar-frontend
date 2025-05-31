import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  data: {}, // Cached data for different locations
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setData: (state, action) => {
      const { location, category, data } = action.payload;
      if (!state.data[location]) {
        state.data[location] = {};
      }
      state.data[location][category] = data;
    },
  },
});

export const { setLocation, setData } = locationSlice.actions;
export default locationSlice.reducer;
