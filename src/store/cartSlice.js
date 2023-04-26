import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    items: [],
    deliveryFee: 15,
    freeDeliveryFrom: 200,
    loading: false,
    error: null,
};
const baseUrl = 'http://192.168.29.98:8000/';

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    let token = await AsyncStorage.getItem('userToken');
    console.log(token)
    const response = await axios.get('http://192.168.29.98:8000/cart/',{
        headers: {
            Authorization: 'Token '+"0cbdd6094a84d2e7d60e9c34c343286ec4ae8031"
        },
    });
    return response.data;
});


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            const newProduct = action.payload.product;
            const cartItem = state.items.find((item) => item.product.id === newProduct.id);
            console.log('cartItem',cartItem);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                state.items.push({ product: newProduct, quantity: 1 })
            }
        },
        changeQuantity: (state, action) => {
            const { productId, amount } = action.payload;
            const cartItem = state.items.find((item) => item.product.id === productId);
            if (cartItem) {
                cartItem.quantity += amount;
            }
            if (cartItem.quantity <= 0) {
                state.items = state.items.filter((item) => item !== cartItem);
            }
        },
        clear : (state) => {
            state.items = [];
        }
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
        });
    },
})

export const selectNumberOfItems = (state) => state.cart.items.length;

export const selectSubTotal = (state) => state.cart.items.reduce((sum, cartItem) => sum + cartItem.product.price * cartItem.quantity, 0);

const cartSelector = (state) => state.cart;

export const selectDeliveryPrice = createSelector(
    cartSelector,
    selectSubTotal,
    (cart, subTotal) => (subTotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFee)
);

export const selectToatlPrice = createSelector(
    selectSubTotal, selectDeliveryPrice, (subtotal, deliveryFee) => subtotal + deliveryFee
);