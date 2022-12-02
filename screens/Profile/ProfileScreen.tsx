import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import { ProfileForm } from "../../components/Profile";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import { ProfileContext } from "../../context/UserContext";
import Profile from "../../models/Profile";

export default function ProfileScreen() {
    const userContext = useContext(ProfileContext);
    const navigation = useNavigation();
    const handleLogout = async () => {
        Alert.alert("Farm Hub", "Are you sure you want to logout?",
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => { }
                },
                {
                    text: 'Ok',
                    style: 'destructive',
                    onPress: () => handleProceedLogout()
                },
            ]
        )
    };

    const handleProceedLogout = async () => {
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']).finally(() => {
            userContext?.setProfile(null);
            navigation.dispatch(StackActions.replace('Root'));
        });
    }

    return <ViewWithLoading loading={false}>
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ListItem bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}
                    onPress={() => {
                        //@ts-ignore
                        navigation.navigate("Info");
                    }}
                >
                    <Ionicons name="person" size={26} color={DefaultColor.main} />
                    <ListItem.Content>
                        <ListItem.Title>Update Profile</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron tvParallaxProperties={undefined} />
                </ListItem>

                <ListItem bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}
                    onPress={() => {
                        //@ts-ignore
                        navigation.navigate("Password");
                    }}
                >
                    <Ionicons name="lock-closed" size={26} color={DefaultColor.main} />
                    <ListItem.Content>
                        <ListItem.Title>Change Password</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron tvParallaxProperties={undefined} />
                </ListItem>

                <ListItem bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out" size={26} color={DefaultColor.main} />
                    <ListItem.Content>
                        <ListItem.Title>Logout</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </ScrollView>
        </View>
    </ViewWithLoading>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
});
