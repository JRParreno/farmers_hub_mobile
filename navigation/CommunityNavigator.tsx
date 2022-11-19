import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommunityScreen, PostCreateScreen, PostDetailScreen } from '../screens/Community';
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
            <Stack.Screen name="Post" component={PostDetailScreen} />
            <Stack.Screen name="PostCreate" component={PostCreateScreen} />
        </Stack.Navigator>
    );
}