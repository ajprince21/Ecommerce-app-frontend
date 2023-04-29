import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserToken = async (token) => {
  try {
    const jsonValue = JSON.stringify(token)
    await AsyncStorage.setItem('userToken', jsonValue);
  } catch (error) {
    console.log('Error storing user token: ', error);
  }
};

export const retrieveUserToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token != null ? JSON.parse(token) : null;
  } catch (error) {
    console.log('Error retrieving user token: ', error);
  }
};


export const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    // clear error
  }
}