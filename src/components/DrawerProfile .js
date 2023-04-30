import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { selectToken } from '../store/authSlice';
import { useSelector } from 'react-redux';


const DrawerProfile = (props) => {
	const userToken = useSelector(selectToken);
	return (
		<LinearGradient
			colors={['#0052D4', '#4364F7', '#6FB1FC']}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
			style={styles.profileContainer}
		>
			{userToken
				? <>
					<View style={styles.profileIconContainer}>
						<Icon name="user-circle" size={80} color="#fff" />
					</View>
					<Text style={styles.name}>{userToken.username.toUpperCase()}</Text>
					<Text style={styles.email}>{userToken.email}</Text>
					<TouchableOpacity style={styles.editProfileButton}>
						<Text style={styles.editProfileButtonText}>Edit Profile</Text>
					</TouchableOpacity>
				</>
				: null
			}
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	profileContainer: {
		padding: 20,
	},
	profileIconContainer: {
		alignItems: 'center',
		marginBottom: 10,
	},
	name: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 5,
	},
	email: {
		fontSize: 16,
		color: '#fff',
		marginBottom: 10,
	},
	editProfileButton: {
		backgroundColor: '#fff',
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	editProfileButtonText: {
		color: '#0066cc',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default DrawerProfile;
