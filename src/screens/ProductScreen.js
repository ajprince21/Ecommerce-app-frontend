import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, FlatList, Pressable, ActivityIndicator, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { productsSlice } from '../store/productSlice';
import { useGetProductsQuery } from '../store/apiSlice';
import { FontAwesome5, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from '@rneui/themed';

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
            <Header
                backgroundColor="#ffffff"
                leftComponent={()=>(
                   <Pressable onPress={()=>navigation.openDrawer()} style={{padding:10}}>
                        <Image
                            style={{height:30, width:30}}
                            source={require('./icon.png')} 
                        />
                   </Pressable>
                )}
                rightComponent={()=>(
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Pressable onPress={()=> null} style={{padding:10}}>
                            <AntDesign
                                name="search1"
                                size={30}
                                color={'gray'}
                                
                            />
                        </Pressable>
                        <Pressable onPress={()=> null} style={{padding:10}}>
                        <AntDesign
                            name="filter"
                            size={30}
                            color={'gray'}
                        />
                        </Pressable>
                    </View>
                 )}
            />
            <FlatList
                data={products}
                // onRefresh={onRefresh}
                // refreshing={isRefreshing}
                renderItem={({ item }) => (
                    <Pressable style={styles.itemContainer} onPress={() => {
                        // update selected product
                        dispatch(productsSlice.actions.setSelectedProduct(item.id))

                        navigation.navigate('Product Details', { id: item._id })
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
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight
    }
});

export default ProductScreen