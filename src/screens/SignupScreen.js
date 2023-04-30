import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {baseUrl} from '../environment'

const SignupScreen = () => {
	const navigation = useNavigation();
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignup = () => {
		// Perform sign-up logic here
		axios
			.post(baseUrl+'signup/', {
				username: username,
				password: password,
				first_name: firstName,
				last_name: lastName,
				email: email,
				password: password
			})
			.then(res => {
				navigation.navigate('SignIn')
			})
			.catch(error => {
				console.log(error);
			});
	};
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			// Set initial state data for all states here
			setUsername('');
			setPassword('');
			setEmail('');
			setFirstName('');
			setLastName('');
		});

		// Cleanup the listener when component unmounts
		return () => unsubscribe();
	}, [navigation]);

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Sign Up</Text>
			<TextInput
				style={styles.input}
				placeholder="Username"
				onChangeText={setUsername}
				value={username}
			/>
			<TextInput
				style={styles.input}
				placeholder="First Name"
				onChangeText={setFirstName}
				value={firstName}
			/>
			<TextInput
				style={styles.input}
				placeholder="Last Name"
				onChangeText={setLastName}
				value={lastName}
			/>
			<TextInput
				style={styles.input}
				placeholder="Email"
				onChangeText={setEmail}
				value={email}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				onChangeText={setPassword}
				secureTextEntry
				value={password}
			/>
			<TouchableOpacity style={styles.buttonContainer} onPress={handleSignup} >
				<Text style={styles.buttonText}>Sign Up</Text>
			</TouchableOpacity>
			<Text onPress={() => navigation.navigate('SignIn')} style={styles.loginText}>Already have an account? Log in</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#fff',
	},
	heading: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 32,
		marginTop:25,
		alignSelf: 'center',
	},
	input: {
		height: 50,
		borderColor: '#ddd',
		borderWidth: 1,
		marginBottom: 16,
		paddingHorizontal: 16,
		borderRadius: 8,
		fontSize: 16,
	},
	buttonContainer: {
		backgroundColor: 'blue',
		paddingVertical: 16,
		borderRadius: 8,
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	loginText: {
		marginTop: 16,
		alignSelf: 'center',
		color: 'gray',
		fontSize: 16,
	},
});

export default SignupScreen;
