import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const initialState = {
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.token = action.payload;
      AsyncStorage.setItem('token', action.payload);
      navigation.navigate('MyDrawer');
    },
    loginFail(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      AsyncStorage.removeItem('token');
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logout } = authSlice.actions;

export default authSlice.reducer;