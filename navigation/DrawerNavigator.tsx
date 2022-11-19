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

const Drawer = createDrawerNavigator<DrawerStackParamList>();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={(nav,) => ({
        title: "",
        headerLeft: () => (
          <Pressable
            onPress={() => {
              nav.navigation.navigate("GeneralSearch");
            }}
          >
            <Ionicons name="search" size={24} />
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
      <Drawer.Screen name="Home" component={HomeScreen} />

      <Drawer.Screen name="AgicultureTypes" component={AgriTypeScreen} />
      <Drawer.Screen
        name="AgicultureTypeDetail"
        component={AgriTypeDetailScreen}
      />
      <Drawer.Screen
        name="RecommendationList"
        component={RecommendationScreen}
      />
      <Drawer.Screen name="Season" component={SeasonScreen} />
      <Drawer.Screen name="Infestation" component={InfestationScreen} />
      <Drawer.Screen name="Treat" component={TreatScreen} />
      <Drawer.Screen
        name="GeneralSearch"
        component={SearchScreen}
        options={{ title: "Search Recommendation" }}
      />

      <Drawer.Screen
        name="PreventMeasures"
        component={PreventScreen}
        options={{ title: "Preventive Measures" }}
      />

      <Drawer.Screen
        name="Instruction"
        component={InstructionScreen}
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
        })}
      />
    </Drawer.Navigator>
  );
}