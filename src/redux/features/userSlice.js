import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: [],
    tokenData:"",
  },
  reducers: {
    setUserDetails: (state, action) => {
      console.log("action payloadd from uer ",action.payload)
      state.userDetails = action.payload;
    },
    setUserLogout: (state) => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      state.user = null;
    },
  
    setToken : (state,action)=>{
      state.tokenData = action.payload;
    },
    
   
  },
});

export const userState = (state) => state.user.user;

export const { setUserDetails, setToken, setUserLogout } = userSlice.actions;

export default userSlice.reducer;
