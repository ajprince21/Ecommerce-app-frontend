import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    let token = await AsyncStorage.getItem('userToken');
    console.log(token)
    const response = await axios.get(baseUrl+'cart/',{
        headers: {
            Authorization: 'Token '+"0cbdd6094a84d2e7d60e9c34c343286ec4ae8031"
        },
    });
    return response.data;
});