import React, { useState, useEffect } from 'react';
import {baseUrl} from '../environment';
import { View, TextInput, Button, StyleSheet, Animated, Easing, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import { authSlice } from '../store/authSlice';
import { storeUserToken } from '../store/AsyncStorage';





const LoginScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [logoScale] = useState(new Animated.Value(0.7));
	const [buttonScale] = useState(new Animated.Value(1.0));
	const [buttonOpacity] = useState(new Animated.Value(1.0));


	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
		  // Set initial state data for all states here
		  setUserName('');
		  setPassword('');
		});
	
		// Cleanup the listener when component unmounts
		return () => unsubscribe();
	}, [navigation]);
	// dispatch(cartSlice.actions.addCartItem({ product }))
	const handleLogin = async () => {
		axios
        .post(baseUrl+'login/',{
			username:userName,
			password:password
		})
        .then(async res => {
			await storeUserToken(res.data.userToken);
    		dispatch(loginSuccess());
        })
        .catch(error => {
			console.warn(error.message)
        });
	};

	return (
		<View style={styles.container}>
			<FontAwesome size={100} name="user-circle" style={{margin:24, alignSelf:'center'}} color={"tomato"}/>
			<TextInput
				style={styles.input}
				placeholder="Usernamer"
				value={userName}
				onChangeText={setUserName}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			<TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>
			<Text style={styles.loginText} onPress={()=>navigation.navigate('SignUp')}>Dont't have account? Sign up</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#fff',
	},
	logo: {
		width: 150,
		height: 150,
		marginBottom: 20,
	},
	input: {
		paddingVertical: 10,
		width: '100%',
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 20,
		paddingHorizontal: 10,
		borderRadius:8
	},
	buttonContainer: {
		width: '100%',
		alignItems: 'center',
	},
	button: {
		backgroundColor: '#2196F3',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	  },
	buttonContainer: {
		backgroundColor: 'blue',
		paddingVertical: 16,
		borderRadius: 8,
	},
	loginText: {
		marginTop: 16,
		alignSelf: 'center',
		color: 'gray',
		fontSize: 16,
	},
});

export default LoginScreen;
