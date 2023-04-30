import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Linking } from 'react-native';
import DrawerProfile from '../components/DrawerProfile ';
import { FontAwesome5, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../store/authSlice';
import { clearAll } from '../store/AsyncStorage';
import { Alert } from 'react-native';

export default function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
        onPress={async () => {
          Alert.alert(
            'Confirm logout',
            'Are you sure you want to logout?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Logout',
                style: 'destructive',
                onPress: () => {
                  dispatch(logoutSuccess());
                  clearAll();
                },
              },
            ],
            { cancelable: false }
          );
         
        }
        }
      />
    </DrawerContentScrollView>
  );
}
