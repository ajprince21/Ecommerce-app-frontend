import { FlatList, StyleSheet, Text, View, Pressable, ActivityIndicator, Alert,Image } from 'react-native'
import { useEffect, useState } from 'react';
import CartListItem from '../components/CartListItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubTotal, selectToatlPrice, selectDeliveryPrice , clear, cartSlice, fetchCart } from '../store/cartSlice';
import { useCreateOrderMutation } from '../store/apiSlice';
import { useNavigation } from '@react-navigation/native';



const shoppingCartTotals = () => {
    const subtoatl = useSelector(selectSubTotal);
    const deliveryFees = useSelector(selectDeliveryPrice);
    const total = useSelector(selectToatlPrice)
    return (
        <View style={styles.totalsContainer}>
            <View style={styles.row}>
                <Text style={styles.text}>Subtotal</Text>
                <Text style={styles.text}>{subtoatl}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Delivery</Text>
                <Text style={styles.text}>{deliveryFees}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textBold}>Total</Text>
                <Text style={styles.textBold}>{total}</Text>
            </View>
        </View>
    )
};


const ShoppingCart = () => {
    const subtoatl = useSelector(selectSubTotal);
    const deliveryFees = useSelector(selectDeliveryPrice);
    const total = useSelector(selectToatlPrice);
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const { items, loading , error  } = useSelector((state) => state.cart);
    const [createOrder, {data, isLoading}] = useCreateOrderMutation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          dispatch(fetchCart());
        });
    
        return unsubscribe;
    }, [dispatch, navigation]);
    
    const onCreateOrder = async() =>{
        console.log('Create order here ')
    }
    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <>
            <FlatList
                data={items}
                style={{backgroundColor:'white',}}
                contentContainerStyle={{paddingBottom:100}}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                ListFooterComponent={items?.length > 0 && shoppingCartTotals}
                ListEmptyComponent={ 
                    <View style={styles.emptyListComponent}>
                        <Image
                            style={{height:200, width:200,resizeMode:'contain',margin:25 }}
                            source={require('../assets/images/empty-cart.png')} 
                        />
                    </View>
                }
            />
            {items?.length > 0 && 
                <Pressable style={styles.button} onPress={onCreateOrder} >
                    <Text style={styles.buttonText}>Checkout {isLoading && <ActivityIndicator/>} </Text>
                </Pressable>
            }
        </>
    )
}

export default ShoppingCart

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    totalsContainer: {
        margin: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: 'gainsboro'
    },
    text: {
        fontSize: 16,
        color: 'gray'
    },
    textBold: {
        fontSize: 16,
        fontWeight: '500'
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
    },
    emptyListComponent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})