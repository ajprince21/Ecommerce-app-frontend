import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProductsScreen from './screens/ProductScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ShoppingCart from "./screens/ShoppingCart";
import { Pressable, Text } from "react-native";

import {FontAwesome5} from '@expo/vector-icons';


const stack = createNativeStackNavigator();


const Navigation = () => {
  return (
    <NavigationContainer>
        <stack.Navigator screenOptions={{contentStyle:{backgroundColor:'#ffffff'}}}>
            <stack.Screen 
                name="Products" 
                component={ProductsScreen}
                options={({navigation})=> ({
                    headerRight:()=>(
                        <Pressable style={{flexDirection:'row'}} onPress={()=> navigation.navigate('Cart') }>
                            <FontAwesome5 name="shopping-cart" size={18} color="gray"/>
                            <Text style={{marginLeft:5, fontWeight:'500'}}>10</Text>
                        </Pressable>
                    )
                })}
            />
            <stack.Screen 
                name="Product Details" 
                component={ProductDetailsScreen}
                options={{presentation:'modal'}}
            />
            <stack.Screen name="Cart" component={ShoppingCart}/>
        </stack.Navigator>
    </NavigationContainer>

  )
}

export default Navigation