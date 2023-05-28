import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Animated, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const WishListScreen = () => {
  const [wishlistItems, setWishlistItems] = useState([
    { id: '1', name: 'Item 1', price: '$10', image:"https://picsum.photos/200/300" },
    { id: '2', name: 'Item 2', price: '$20', image: "https://picsum.photos/200/300" },
    { id: '3', name: 'Item 3', price: '$15', image: "https://picsum.photos/200/300" },
  ]);

  const removeItemFromWishlist = (item) => {
    Alert.alert(`Are you sure want to remove ${item.name} `);
  };

  const renderWishlistItem = ({ item }) => {
    const swipeX = new Animated.Value(0);

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Image source={{ uri: item.image}} style={styles.itemImage} />
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        </View>
        <AntDesign name="delete" size={24} color="red" onPress={() => removeItemFromWishlist(item)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlistItems}
        renderItem={renderWishlistItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingRight:12,
    elevation:5,
    margin:10
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  itemDetailsContainer: {
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
});

export default WishListScreen;
