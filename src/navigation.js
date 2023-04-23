import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import SplashScreen from "./screens/SplashScreen";
import { Pressable, Text } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignupScreen";
import MyDrawer from "./MyDrawer";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const stack = createNativeStackNavigator();


const Navigation = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [userToken, setUserToken] = useState(null);



	useEffect(() => {
		getUserToken();
	}, []);

	const getUserToken = async () => {
		try {
			let token = await AsyncStorage.getItem('userToken');
			token = token != null ? JSON.parse(token) : null;
			setUserToken(token);
		} finally {
			setIsLoading(false);
		}
	};
	if (isLoading) {
		return <SplashScreen />;
	}

	return (
		<NavigationContainer>
			<stack.Navigator
				screenOptions={{ contentStyle: { backgroundColor: '#ffffff' } }}
				initialRouteName={userToken ? "MyDrawer" : "SignIn" }
			>
				<stack.Screen
					name="MyDrawer"
					component={MyDrawer}
					options={{ headerShown: false }}
				/>
				<stack.Screen
					name="Product Details"
					component={ProductDetailsScreen}
					options={{ presentation: 'modal' }}
				/>
				<stack.Screen name="SignIn" component={LoginScreen} options={{  headerShown: false, }} />
				<stack.Screen name="SignUp" component={SignUpScreen} options={{  headerShown: false, }} />
			</stack.Navigator>
		</NavigationContainer>

	)
}
export default Navigation