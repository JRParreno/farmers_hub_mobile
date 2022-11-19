import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Pressable } from 'react-native';
import { DefaultColor } from '../constants/Colors';
import { AgriTypeScreen, AgriTypeDetailScreen } from '../screens/Agirculture';
import HomeScreen from '../screens/HomeScreen';
import { InfestationScreen, TreatScreen, InstructionScreen } from '../screens/Infestation';
import { LoginScreen } from '../screens/Login';
import PreventScreen from '../screens/PreventMeasures/PreventScreen';
import { RecommendationScreen, SeasonScreen, SearchScreen } from '../screens/Recommendation';
import RegisterScreen from '../screens/Register/RegisterScreen';
import { DrawerStackParamList } from '../types';
import { handleGetNames } from '../utils/utls';
import CommunityNavigator from './CommunityNavigator';
import DrawerContent from './DrawerContent';
import MainStackNavigator from './MainStackNavigator';

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
    </Drawer.Navigator>
  );
}