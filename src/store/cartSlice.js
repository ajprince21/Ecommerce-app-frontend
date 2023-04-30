import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from '../environment';


const initialState = {
    items: [],
    deliveryFee: 15,
    freeDeliveryFrom: 200,
    loading: false,
    error: null,
    status:'idle'
};



export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState }) => {
    const { token } = getState().auth; // Access token from the auth slice 
    const response = await axios.get(baseUrl + 'cart/', {
      headers: {
        Authorization: `Token ${token.token}`,
      },
    });
    return response.data;
});

export const addCartItem = createAsyncThunk('cart/addCartItem', async (newProduct, { getState, dispatch  }) => {
    const { token } = getState().auth;
    await dispatch(fetchCart()); // fetch latest cart data before adding new item
    const { items } = getState().cart;
    const existingCartItem = items.find(item => item.product_id === newProduct.id);
    if (existingCartItem) {
      const response = await axios.put(baseUrl + `cart/update/${existingCartItem.id}/`, { quantity: existingCartItem.quantity + 1 }, {
        headers: {
          Authorization: `Token ${token.token}`,
        },
      });
      return response.data;
    } else {
        const response = await axios.post(baseUrl + `cart/add/${newProduct.id}/`, { product_id: newProduct.id }, {
            headers: {
              Authorization: `Token ${token.token}`,
            },
        });
        return response.data;
    }
});



export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        })
        .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        })
        .addCase(addCartItem.pending, state => {
            state.status = 'loading';
        })
        .addCase(addCartItem.fulfilled, (state, action) => {
            state.status = 'succeeded';
        })
        .addCase(addCartItem.rejected, (state, action) => {
            state.status = 'failed';
        })
    },
})

export const selectNumberOfItems = (state) => state.cart.items.length;

export const selectSubTotal = (state) => state.cart.items.reduce((sum, cartItem) => sum + cartItem.price * cartItem.quantity, 0);

const cartSelector = (state) => state.cart;

export const selectDeliveryPrice = createSelector(
    cartSelector,
    selectSubTotal,
    (cart, subTotal) => (subTotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFee)
);

export const selectToatlPrice = createSelector(
    selectSubTotal, selectDeliveryPrice, (subtotal, deliveryFee) => subtotal + deliveryFee
);