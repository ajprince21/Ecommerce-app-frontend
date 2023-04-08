import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';

import ProductsScreen from './screens/ProductScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ShoppingCart from "./screens/ShoppingCart";
import { Pressable, Text } from "react-native";

import { FontAwesome5, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { useSelector } from "react-redux";
import { selectNumberOfItems } from "./store/cartSlice";
import TrackOrder from "./screens/TrackOrder";
import LoginScreen from "./screens/LoginScreen";
import CustomDrawerContent from "./screens/CustomDrawerContent"
import NotificationScreen from "./screens/NotificationScreen";
import WishListScreen from "./screens/WishListScreen";

const stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
    const numberOfItems = useSelector(selectNumberOfItems);
    return (
        <Drawer.Navigator
        
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                overlayColor: 'transparent',
            }}
        >
            <Drawer.Screen
                name="Products"
                component={ProductsScreen}
                options={{
                    headerShown:false,
                    title: 'Products',
                    drawerIcon: ({ focused, size }) => (
                        <AntDesign
                            name="home"
                            size={size}
                            color={focused ? '#7cc' : '#ccc'}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Cart"
                component={ShoppingCart}
                options={{
                    title: 'Cart',
                    drawerIcon: ({ focused, size }) => (
                        <AntDesign
                            name="shoppingcart"
                            size={size}
                            color={focused ? '#7cc' : '#ccc'}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Wish list"
                component={WishListScreen}
                options={{
                    title: 'Wish list',
                    drawerIcon: ({ focused, size }) => (
                        <AntDesign
                            name="hearto"
                            size={size}
                            color={focused ? '#7cc' : '#ccc'}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    title: 'Notification',
                    drawerIcon: ({ focused, size }) => (
                        <AntDesign
                            name="notification"
                            size={size}
                            color={focused ? '#7cc' : '#ccc'}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Track Order"
                component={TrackOrder}
                options={{
                    title: 'Track Order',
                    drawerIcon: ({ focused, size }) => (
                        <AntDesign
                            name="find"
                            size={size}
                            color={focused ? '#7cc' : '#ccc'}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Login Screen"
                component={LoginScreen}
                options={{
                    title: 'Login',
                    drawerIcon: ({ focused, size }) => (
                        <AntDesign
                            name="login"
                            size={size}
                            color={focused ? '#7cc' : '#ccc'}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <stack.Navigator
                screenOptions={{ contentStyle: { backgroundColor: '#ffffff' } }}
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
            </stack.Navigator>
        </NavigationContainer>

    )
}

export default Navigation