import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ProfileForm } from "../../components/Profile";
import ViewWithLoading from "../../components/ViewWithLoading";
import { ProfileContext } from "../../context/UserContext";
import Profile from "../../models/Profile";

export default function ProfileScreen() {
    const [loading, setLoading] = useState<boolean>(true);
    const profileContext = useContext(ProfileContext);
    const { email, firstName, lastName, mobileNumber } = profileContext!.profile!;
    const [profile, setProfile] = useState<Profile | null>(null);

    useFocusEffect(
        useCallback(
            () => {
                setLoading(true);
                setProfile(null);
                setTimeout(() => {
                    setProfile(profileContext!.profile!);
                    setLoading(false);
                }, 1000);
            },
            [useIsFocused()],
        )
    )

    return <ViewWithLoading loading={loading}>
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {profile && <ProfileForm
                    setLoading={setLoading}
                    email={profile.email}
                    firstName={profile.firstName}
                    lastName={profile.lastName}
                    mobileNumber={profile.mobileNumber}
                />}
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
