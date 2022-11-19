import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommunityScreen } from '../screens/Community';
import { CommunityStackParamLst } from '../types';

const Stack = createNativeStackNavigator<CommunityStackParamLst>();

export default function CommunityNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="PostList" component={CommunityScreen} />
            {/* <Stack.Screen name="Post" component={Notifications} /> */}
        </Stack.Navigator>
    );
}