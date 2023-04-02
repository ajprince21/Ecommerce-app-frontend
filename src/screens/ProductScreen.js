import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { productsSlice } from '../store/productSlice';
import { useGetProductsQuery } from '../store/apiSlice';

const ProductScreen = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { data, isLoading, error } = useGetProductsQuery();

    const onRefresh = () => {
        setIsRefreshing(true)
        // callApiMethod()
        // and set isRefreshing to false at the end of your callApiMethod()
    }

    if (isLoading) {
        return <ActivityIndicator />;
    }
    if (error) {
        return <Text> Error fetching products{error.error}</Text>
    }
    const products = data.data;
    return (
        <View>
            <FlatList
                data={products}
                // onRefresh={onRefresh}
                // refreshing={isRefreshing}
                renderItem={({ item }) => (
                    <Pressable style={styles.itemContainer} onPress={() => {
                        // update selected product
                        dispatch(productsSlice.actions.setSelectedProduct(item.id))

                        navigation.navigate('Product Details',{id:item._id})
                    }}
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={styles.image}
                        />
                    </Pressable>
                )}
                numColumns={2}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: '50%',
        padding: 1
    },
    image: {
        width: '100%',
        aspectRatio: 1
    }
});

export default ProductScreen