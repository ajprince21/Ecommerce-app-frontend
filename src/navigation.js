import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStack, AppStack } from './NavigationStacks';
import { useEffect, useState } from 'react';
import { authCheck } from './store/authSlice';
import { useDispatch, useSelector } from 'react-redux';


const stack = createNativeStackNavigator();


const Navigation = () => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	useEffect(() => {
		dispatch(authCheck());
	}, [dispatch]);

	return (
		<NavigationContainer>
			<stack.Navigator
				screenOptions={{ contentStyle: { backgroundColor: '#ffffff' } }}
			>
				{isLoggedIn ? (
					<stack.Screen
						name="App"
						component={AppStack}
						options={{ headerShown: false }}
					/>
					) : (
					<stack.Screen
						name="Auth"
						component={AuthStack}
						options={{ headerShown: false }}
					/>
				)}
			</stack.Navigator>
		</NavigationContainer>

	)
}
export default Navigation