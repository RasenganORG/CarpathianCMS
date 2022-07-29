import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:'user',
  initialState:{
    isAuthenticated: !!localStorage.getItem('idToken'),
    idToken:`${localStorage.getItem('idToken') ? localStorage.getItem('idToken') : ''  }`,
    refreshToken:`${localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : ''  }`,
    firstName:`${localStorage.getItem('firstName') ? localStorage.getItem('firstName') : ''  }`,
    lastName:`${localStorage.getItem('lastName') ? localStorage.getItem('lastName') : ''  }`,
    role:`${localStorage.getItem('role') ? localStorage.getItem('role') : ''  }`,
    localId:`${localStorage.getItem('localId') ? localStorage.getItem('localId') : ''  }`,
    email:`${localStorage.getItem('email') ? localStorage.getItem('email') : ''  }`,
  },
  reducers:{
    login(state, action) {
      const authResponse = action.payload
      console.log(authResponse)
      state.isAuthenticated = !!authResponse
      state.idToken = authResponse.idToken
      state.refreshToken = authResponse.refreshToken
      state.email = authResponse.data.email
      state.firstName = authResponse.data.firstName
      state.lastName = authResponse.data.lastName
      state.role = authResponse.data.role
      state.localId = authResponse.localId
      localStorage.setItem('email', authResponse.data.email);
      localStorage.setItem('idToken', authResponse.idToken);
      localStorage.setItem('refreshToken', authResponse.refreshToken);
      localStorage.setItem('firstName', authResponse.data.firstName);
      localStorage.setItem('lastName', authResponse.data.lastName);
      localStorage.setItem('role', authResponse.data.role);
      localStorage.setItem('localId', authResponse.localId);
    },
    logout(state, action){
      state.isAuthenticated = false
      state.idToken = ''
      state.refreshToken = ''
      state.email = ''
      state.firstName = ''
      state.lastName = ''
      state.role = ''
      state.localId = ''
      localStorage.removeItem('email');
      localStorage.removeItem('idToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('role');
      localStorage.removeItem('localId');
    }

  }
})

export const userActions = userSlice.actions;

export default userSlice