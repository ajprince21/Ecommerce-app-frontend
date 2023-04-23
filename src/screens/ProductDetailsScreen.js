import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { cartSlice } from '../store/cartSlice';
import { useGetProductQuery } from '../store/apiSlice';
import { AntDesign } from '@expo/vector-icons';
const ProductDetailsScreen = ({ route }) => {
    const id = route.params.id;
    const {data, isLoading, error} = useGetProductQuery(id);
    const product = data;
    console.log(product)
    let { width } = useWindowDimensions();
    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch(cartSlice.actions.addCartItem({ product }))
    }
    if(isLoading){
        return <ActivityIndicator/>;
    }
    if(error){
        return <Text>Error fetching the product, {error.error}</Text>
    }
    
    return (
        <View style={{paddingBottom:100}}>
            <ScrollView>
                <FlatList
                    data={product.images}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <Image source={{ uri: item.image }} style={[{ width }, styles.image]} />
                                <Pressable onPress={()=> null} 
                                    style={{position:'absolute',backgroundColor: 'transparent',right: 15,top:15}}
                                >
                                    <AntDesign
                                        name="hearto"
                                        size={28}
                                        color={'gray'}
                                    />
                                </Pressable>
                            </View> 
                        )
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                />
                <View style={{ padding: 20 }}>
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.price}>₹{product.price}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </ScrollView>
            <Pressable style={styles.button} onPress={addToCart}>
                <Text style={styles.buttonText}>Add to cart</Text>
            </Pressable>
        </View>
    )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
    image: {
        aspectRatio: 1,
    },
    title: {
        fontSize: 34,
        fontWeight: '500',
        marginVertical: 10
    },
    price: {
        fontWeight: 500,
        fontSize: 16,
        letterSpacing: 1.5
    },
    description: {
        marginVertical: 10,
        fontSize: 18,
        lineHeight: 30,
        fontWeight: '300'
    },
    button: {
        position: 'absolute',
        backgroundColor: '#4681f4',
        bottom: 30,
        width: '90%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    }

})