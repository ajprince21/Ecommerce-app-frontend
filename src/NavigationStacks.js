import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthLoading from './screens/AuthLoading';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignupScreen";
import MyDrawer from "./MyDrawer";

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AuthLoading"
                component={AuthLoading}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="SignIn" component={LoginScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false, }} />
        </Stack.Navigator>
    );
};

export const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MyDrawer"
                component={MyDrawer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Product Details"
                component={ProductDetailsScreen}
                options={{ presentation: 'modal' }}
            />
        </Stack.Navigator>
    );
};
