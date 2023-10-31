// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig

const initialUser = () => {
  const item = window.localStorage.getItem('userData')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

const initialProfileData = () => {
  const item = window.localStorage.getItem('profileData')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

const initialApplicationData = () => {
  const item = window.localStorage.getItem('applicationData')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {}
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser(),
    profileData: initialProfileData(),
    applicationData: initialApplicationData(),
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload
      state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName]
      state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName]
      localStorage.setItem('userData', JSON.stringify(action.payload))
      localStorage.setItem(config.storageTokenKeyName, action.payload.accessToken)
      localStorage.setItem(config.storageRefreshTokenKeyName, action.payload.refreshToken)
    },
    handleProfileData: (state, action) => {
      state.profileData = action.payload
      localStorage.setItem('profileData', JSON.stringify(action.payload))
     
    },
    handleApplicationData: (state, action) => {
      state.applicationData = action.payload
      localStorage.setItem('applicationData', JSON.stringify(action.payload))

    },
    handleLogout: state => {
      state.userData = {}
      state[config.storageTokenKeyName] = null
      state[config.storageRefreshTokenKeyName] = null
      // ** Remove user, accessToken & refreshToken from sessionStorage
      localStorage.removeItem('userData')
      localStorage.removeItem(config.storageTokenKeyName)
      localStorage.removeItem(config.storageRefreshTokenKeyName)
    }
  }
})

export const { handleLogin, handleLogout, handleProfileData, handleApplicationData } = authSlice.actions

export default authSlice.reducer
