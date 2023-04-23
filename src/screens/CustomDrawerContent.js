import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Linking } from 'react-native';
import DrawerProfile from '../components/DrawerProfile ';
import { FontAwesome5, FontAwesome, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function CustomDrawerContent(props) {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerProfile />
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        inactiveBackgroundColor="yellow"
        icon={({ focused, color, size }) =>
          <AntDesign color={'tomato'} size={size} name="message1" />}
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
      <DrawerItem
        label="Logout"
        icon={({ focused, color, size }) =>
          <AntDesign
            name="logout"
            size={size}
            color={focused ? '#7cc' : '#ccc'}
          />
        }
        onPress={ async () =>
          {
            await AsyncStorage.removeItem('userToken')
            navigation.navigate('SignIn')
          }
        }
      />
    </DrawerContentScrollView>
  );
}
