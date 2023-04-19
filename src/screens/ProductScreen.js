import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, FlatList, Pressable, ActivityIndicator, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { productsSlice } from '../store/productSlice';
import { useGetProductsQuery } from '../store/apiSlice';
import { FontAwesome5, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from '@rneui/themed';
import axios from 'axios';

const ProductScreen = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
       getProducts();
    },[]);

    getProducts = async () =>{
        axios
        .get('http://192.168.29.98:8000/products/')
        .then(res => {
            // console.log(data.data);
            setProducts(res.data.data)
            setLoading(false)
            setIsRefreshing(false)
        })
        .catch(error => {
            setLoading(false)
            setIsRefreshing(false)
            console.log(error)
        });
    }

    const onRefresh = () => {
        setIsRefreshing(true)
        getProducts()
    }

    if (isLoading) {
        return <ActivityIndicator />;
    }
    return (
        <View style={styles.container}>
            <Header
                backgroundColor="#ffffff"
                leftComponent={()=>(
                   <Pressable onPress={()=>navigation.openDrawer()} style={{padding:10 , flexDirection:'row', alignItems:'center'}}>
                        <MaterialCommunityIcons name="menu-open" size ={35} color={'gray'} />
                        <Image
                            style={{height:28, width:50,resizeMode:'contain'}}
                            source={require('../assets/images/icon.png')} 
                        />
                   </Pressable>
                )}
                rightComponent={()=>(
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Pressable onPress={()=> null} style={{padding:10}}>
                            <AntDesign
                                name="hearto"
                                size={30}
                                color={'gray'}
                            />
                        </Pressable>
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
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                style={{margin:5}}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <Pressable style={styles.itemContainer} 
                        onPress={() => {
                        // update selected product
                        dispatch(productsSlice.actions.setSelectedProduct(item.id))
                        navigation.navigate('Product Details', { id: item.id })
                    }}
                    >   
                        <Image
                            source={{ uri: item.image_url}}
                            style={styles.image}
                        />
                        <Text numberOfLines={1} style={styles.nameText}>{item.name}</Text>
                        <Text numberOfLines={1} style={styles.priceText}>₹ {item.price}</Text>
                    </Pressable>
                )}
                numColumns={2}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
    },
    itemContainer: {
        width: '48%',
        padding: 8,
        borderColor:'#808080',
        borderRadius:5,
        borderWidth:1.5,
        margin:2
    },
    image: {
        width: '95%',
        aspectRatio: 1,
        resizeMode:'contain'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight
    },
    row: {
        flex: 1,
        justifyContent: "space-around"
    },
    nameText:{
        fontSize:16,
        fontWeight:'bold',
        color:'gray'
    },
    priceText:{
        fontSize:14,
        color:'gray'
    }
});

export default ProductScreen