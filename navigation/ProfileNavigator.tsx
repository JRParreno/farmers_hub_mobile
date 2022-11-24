import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/Profile';
import { ProfileStackParamLst } from '../types';

const Stack = createNativeStackNavigator<ProfileStackParamLst>();

export default function ProfileNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
}