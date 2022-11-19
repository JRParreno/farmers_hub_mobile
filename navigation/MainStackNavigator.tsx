import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { AgriTypeScreen, AgriTypeDetailScreen } from '../screens/Agirculture';
import { CommunityScreen, PostCreateScreen, PostDetailScreen } from '../screens/Community';
import HomeScreen from '../screens/HomeScreen';
import { InfestationScreen, TreatScreen, InstructionScreen } from '../screens/Infestation';
import PreventScreen from '../screens/PreventMeasures/PreventScreen';
import { RecommendationScreen, SeasonScreen, SearchScreen } from '../screens/Recommendation';
import { MainStackParamLst } from '../types';

const Stack = createNativeStackNavigator<MainStackParamLst>();

export default function MainStackNavigator() {
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
        >

            <Stack.Screen name="HomeMain" component={HomeScreen}
                options={(nav) => ({
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
                })}
            />

            <Stack.Screen name="AgicultureTypes" component={AgriTypeScreen}
            />
            <Stack.Screen
                name="AgicultureTypeDetail"
                component={AgriTypeDetailScreen}
            />
            <Stack.Screen
                name="RecommendationList"
                component={RecommendationScreen}
            />
            <Stack.Screen name="Season" component={SeasonScreen}

            />
            <Stack.Screen name="Infestation" component={InfestationScreen}

            />
            <Stack.Screen name="Treat" component={TreatScreen} />
            <Stack.Screen
                name="GeneralSearch"
                component={SearchScreen}
                options={{ title: "Search Recommendation" }}
            />

            <Stack.Screen
                name="PreventMeasures"
                component={PreventScreen}
                options={{ title: "Preventive Measures" }}
            />

            <Stack.Screen
                name="Instruction"
                component={InstructionScreen}
                options={(data) => ({
                    title: "",
                })}
            />
        </Stack.Navigator>
    );
}