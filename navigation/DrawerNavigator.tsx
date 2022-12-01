import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Pressable } from 'react-native';
import { LoginScreen } from '../screens/Login';
import { ProfileScreen } from '../screens/Profile';
import RegisterScreen from '../screens/Register/RegisterScreen';
import { DrawerStackParamList } from '../types';
import CommunityNavigator from './CommunityNavigator';
import DrawerContent from './DrawerContent';
import MainStackNavigator from './MainStackNavigator';
import ProfileNavigator from './ProfileNavigator';

const Drawer = createDrawerNavigator<DrawerStackParamList>();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={(nav,) => ({
        title: "",
        headerShown: false,
        headerLeft: () => (
          <Pressable
            onPress={() => {
              nav.navigation.navigate("GeneralSearch");
            }}
          >
            <Ionicons name="search-outline" size={24} />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable
            onPress={() => {
              nav.navigation.toggleDrawer();
            }}
          >
            <Ionicons name="menu" size={24} />
          </Pressable>
        ),
        headerLeftContainerStyle: { padding: 10 },
        headerRightContainerStyle: { padding: 10 },
        drawerPosition: 'right'
      })}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={MainStackNavigator}
        options={(data) => ({
          title: "",
        })}
      />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={(data) => ({
          title: "",
        })}
      />
      <Drawer.Screen
        name="Register"
        component={RegisterScreen}
        options={(data) => ({
          title: "",
        })}
      />
      <Drawer.Screen
        name="Community"
        component={CommunityNavigator}
        options={(data) => ({
          title: "Community",
          headerShown: true
        })}
      />
      <Drawer.Screen
        name="ProfileDrawer"
        component={ProfileNavigator}
        options={(data) => ({
          title: "Profile",
        })}
      />
    </Drawer.Navigator>
  );
}