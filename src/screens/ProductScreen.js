import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { productsSlice } from '../store/productSlice';
const ProductScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products)
    return (
        <View>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <Pressable style={styles.itemContainer} onPress={() => {
                        // update selected product
                        dispatch(productsSlice.actions.setSelectedProduct(item.id))

                        navigation.navigate('Product Details')
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