import { createSlice } from '@reduxjs/toolkit';
import { storeUserToken, retrieveUserToken } from '../store/AsyncStorage';

const initialState = {
    isLoggedIn: false,
    token: null,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
            state.isLoggedIn = false;
            state.token = null;
        },
        logoutSuccess(state) {
            state.isLoggedIn = false;
            state.token = null;
        },
    },
});



export const { loginSuccess, logoutSuccess , loginFailure} = authSlice.actions;


export const authCheck = () => async (dispatch) => {
    try {
        const token = await retrieveUserToken();
        if (token) {
            dispatch(loginSuccess(token));
        } else {
            dispatch(logoutSuccess());
        }
    } catch (err) {
        console.log(err);
        dispatch(logoutSuccess());
    }
};

export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;