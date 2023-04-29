import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../store/authSlice';
import { storeUserToken, retrieveUserToken } from '../store/AsyncStorage';

export default function AuthLoading({ navigation }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await retrieveUserToken();
        if (token) {
          dispatch(loginSuccess());
          navigation.navigate('MyDrawer')
        } else {
          dispatch(loginFailure());
          navigation.navigate('SignIn')
        }
      } catch (error) {
        console.log('Error retrieving user token: ', error);
      }
    };

    checkToken();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
