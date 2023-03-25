import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';
import products from '../data/products';

const ProductScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <Pressable style={styles.itemContainer} onPress={() => navigation.navigate('Product Details')}>
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