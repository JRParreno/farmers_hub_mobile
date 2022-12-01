import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { InformationScreen, ProfileScreen } from '../screens/Profile';
import { ProfileStackParamLst } from '../types';

const Stack = createNativeStackNavigator<ProfileStackParamLst>();

export default function ProfileNavigator() {
    return (
        <Stack.Navigator
            screenOptions={(nav) => ({
                title: "",
                headerRight: () => (
                    <Pressable
                        onPress={() => {
                            nav.navigation.toggleDrawer();
                        }}
                    >
                        <Ionicons name="menu" size={24} />
                    </Pressable>
                ),
                headerBackButtonMenuEnabled: true,
                headerBackTitleVisible: false
            })}
            initialRouteName='Profile'
        >
            <Stack.Screen name="Profile" component={ProfileScreen}
                options={(nav) => ({
                    title: "Profile",
                    headerLeft: () => (
                        <Pressable
                            onPress={() => {
                                nav.navigation.navigate("GeneralSearch");
                            }}
                        >
                            <Ionicons name="search-outline" size={24} />
                        </Pressable>
                    ),
                })}
            />
            <Stack.Screen name="Info" component={InformationScreen} />
        </Stack.Navigator>
    );
}