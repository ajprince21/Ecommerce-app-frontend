import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView, Pressable } from 'react-native'
import React from 'react'
import products from '../data/products'
import { FlatList } from 'react-native';

const ProductDetailsScreen = () => {

    const { width } = useWindowDimensions();

    const addToCart = () => {
        console.warn('Add to Cart')
    }
    const product = products[0];
    return (
        <View>
            <ScrollView>
                <FlatList
                    data={product.images}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={[{ width }, styles.image]} />
                    )}
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
        backgroundColor: 'black',
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