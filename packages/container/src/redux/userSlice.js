import { createSlice } from "@reduxjs/toolkit";

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
    profilePictureUrl:`${localStorage.getItem('profilePictureUrl') ? localStorage.getItem('profilePictureUrl') : ''  }`,
    profilePictureName:`${localStorage.getItem('profilePictureName') ? localStorage.getItem('profilePictureName') : ''  }`,
    specialPermissions:`${localStorage.getItem('specialPermissions') ? localStorage.getItem('specialPermissions') : ''  }`,
    phone:`${localStorage.getItem('phone') ? localStorage.getItem('phone') : ''  }`,
  },
  reducers:{
    login(state, action) {
      const authResponse = action.payload
      state.isAuthenticated = !!authResponse
      state.idToken = authResponse.idToken
      state.refreshToken = authResponse.refreshToken
      state.email = authResponse.data.email
      state.firstName = authResponse.data.firstName
      state.lastName = authResponse.data.lastName
      state.role = authResponse.data.role
      state.localId = authResponse.localId
      state.specialPermissions = authResponse.data.specialPermissions
      state.profilePictureUrl = authResponse.data.profilePictureUrl
      state.profilePictureName = authResponse.data.profilePictureName
      state.phone = authResponse.data.phone
      localStorage.setItem('email', authResponse.data.email);
      localStorage.setItem('idToken', authResponse.idToken);
      localStorage.setItem('refreshToken', authResponse.refreshToken);
      localStorage.setItem('firstName', authResponse.data.firstName);
      localStorage.setItem('lastName', authResponse.data.lastName);
      localStorage.setItem('role', authResponse.data.role);
      localStorage.setItem('localId', authResponse.localId);
      localStorage.setItem('specialPermissions', authResponse.data.specialPermissions);
      localStorage.setItem('profilePictureUrl', authResponse.data.profilePictureUrl);
      localStorage.setItem('profilePictureName', authResponse.data.profilePictureName);
      localStorage.setItem('phone', authResponse.data.phone);
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
      state.specialPermissions = { }
      state.profilePictureUrl = ''
      state.profilePictureName = ''
      state.phone = ''
      localStorage.removeItem('email');
      localStorage.removeItem('idToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('role');
      localStorage.removeItem('localId');
      localStorage.removeItem('specialPermissions');
      localStorage.removeItem('profilePictureUrl');
      localStorage.removeItem('profilePictureName');
      localStorage.removeItem('phone');
    },
    refreshToken(state, action){
      state.idToken = action.payload.id_token
      state.refreshToken = action.payload.refresh_token
      localStorage.setItem("idToken", action.payload.id_token)
      localStorage.setItem("refreshToken", action.payload.refresh_token)
    },
    idToken(state, action){
      state.idToken = action.payload.idToken
      localStorage.setItem("idToken", action.payload.idToken)
    },
    updateUser(state, action){
      const user = action.payload
      state.email = user.email
      state.firstName = user.firstName
      state.lastName = user.lastName
      state.profilePictureUrl = user.profilePictureUrl
      state.profilePictureName = user.profilePictureName
      state.phone = user.phone
      localStorage.setItem('email', user.email);
      localStorage.setItem('firstName', user.firstName);
      localStorage.setItem('lastName', user.lastName);
      localStorage.setItem('profilePictureUrl', user.profilePictureUrl);
      localStorage.setItem('profilePictureName', user.profilePictureName);
      localStorage.setItem('phone', user.phone);
    }

  }
})

export const userActions = userSlice.actions;

export default userSlice

