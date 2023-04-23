import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from "./screens/CustomDrawerContent"
import NotificationScreen from "./screens/NotificationScreen";
import WishListScreen from "./screens/WishListScreen";
import TrackOrder from "./screens/TrackOrder";
import ShoppingCart from "./screens/ShoppingCart";
import ProductsScreen from './screens/ProductScreen';
import { FontAwesome5, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { selectNumberOfItems } from "./store/cartSlice";

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
        </Drawer.Navigator>
    );
}

export default MyDrawer