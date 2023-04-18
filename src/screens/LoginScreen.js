import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Animated, Easing, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [logoScale] = useState(new Animated.Value(0.7));
	const [buttonScale] = useState(new Animated.Value(1.0));
	const [buttonOpacity] = useState(new Animated.Value(1.0));

	const handleLogin = () => {
		// Handle login logic here
		navigation.navigate('Products')
		if (validateEmail(email)) {
			// Handle login logic here

		} else {
			Alert.alert('Invalid email', 'Please enter a valid email address.');
		}
	};
	const validateEmail = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const handlePressIn = () => {
		Animated.parallel([
			Animated.timing(buttonScale, {
				toValue: 0.9,
				duration: 200,
				useNativeDriver: true,
			}),
			Animated.timing(buttonOpacity, {
				toValue: 0.5,
				duration: 200,
				useNativeDriver: true,
			}),
		]).start();
	};

	const handlePressOut = () => {
		Animated.parallel([
			Animated.timing(buttonScale, {
				toValue: 1.0,
				duration: 200,
				useNativeDriver: true,
			}),
			Animated.timing(buttonOpacity, {
				toValue: 1.0,
				duration: 200,
				useNativeDriver: true,
			}),
		]).start(() => handleLogin());
	};

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(logoScale, {
					toValue: 1.0,
					duration: 1000,
					easing: Easing.out(Easing.quad),
					useNativeDriver: true,
				}),
				Animated.timing(logoScale, {
					toValue: 0.7,
					duration: 1000,
					easing: Easing.in(Easing.quad),
					useNativeDriver: true,
				}),
			])
		).start();
	}, []);

	return (
		<View style={styles.container}>
			<Animated.Image
				style={[styles.logo, { transform: [{ scale: logoScale }] }]}
				source={require('./icon.png')}
			/>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			<TouchableOpacity
				style={styles.buttonContainer}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				activeOpacity={1.0}
			>
				<Animated.View
					style={[
						styles.button,
						{ transform: [{ scale: buttonScale }], opacity: buttonOpacity },
					]}
				>
					<Text style={styles.buttonText}>Login</Text>
				</Animated.View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#ffffff'
	},
	logo: {
		width: 150,
		height: 150,
		marginBottom: 20,
	},
	input: {
		height: 40,
		width: '100%',
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 20,
		paddingHorizontal: 10,
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
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default LoginScreen;
