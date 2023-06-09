import { View, Text, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { cartSlice , updateCartItemQuantity} from '../store/cartSlice';

const CartListItem = ({ cartItem }) => {
	const dispatch = useDispatch();

	const increaseQuantity = () => {
		dispatch(updateCartItemQuantity({ cartItemId: cartItem.id, quantity: 1 }));
	};

	const decreaseQuantity = () => {
		dispatch(updateCartItemQuantity({ cartItemId: cartItem.id, quantity: -1 }));
	};
	return (
		<View style={styles.container}>
			<Image source={{ uri: cartItem.product_image }} style={styles.image} />
			<View style={styles.contentContainer}>
				<Text style={styles.name}>{cartItem.product}</Text>
				<Text style={styles.size}>Size {cartItem.sizes}</Text>

				<View style={styles.footer}>
					<Feather
						onPress={decreaseQuantity}
						name="minus-circle"
						size={24}
						color="gray"
					/>
					<Text style={styles.quantity}>{cartItem.quantity}</Text>
					<Feather
						onPress={increaseQuantity}
						name="plus-circle"
						size={24}
						color="gray"
					/>
					<Text style={styles.itemTotal}>₹ {cartItem.total_price}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		paddingHorizontal: 20,
		flexDirection: "row",
	},
	contentContainer: {
		flex: 1,
		marginLeft: 10,
	},
	image: {
		width: "40%",
		aspectRatio: 1,
	},
	name: {
		fontWeight: "500",
		fontSize: 18,
	},
	size: {
		fontSize: 16,
		color: "gray",
	},
	quantity: {
		marginHorizontal: 10,
		fontWeight: "bold",
		color: "gray",
	},
	footer: {
		marginTop: "auto",
		flexDirection: "row",
		alignItems: "center",
	},
	itemTotal: {
		fontSize: 16,
		marginLeft: "auto",
		fontWeight: "500",
	},
});

export default CartListItem;
