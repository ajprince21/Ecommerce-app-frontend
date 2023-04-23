import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const SplashScreen = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Getting token...</Text>
            <ActivityIndicator size="large" />
        </View>
    );
}
export default SplashScreen;