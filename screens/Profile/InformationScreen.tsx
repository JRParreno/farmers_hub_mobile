import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ProfileForm } from "../../components/Profile";
import ViewWithLoading from "../../components/ViewWithLoading";
import { ProfileContext } from "../../context/UserContext";
import Profile from "../../models/Profile";

export default function InformationScreen() {
    const [loading, setLoading] = useState<boolean>(true);
    const profileContext = useContext(ProfileContext);

    return <ViewWithLoading loading={false}>
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {profileContext && profileContext.profile && <ProfileForm
                    setLoading={setLoading}
                    email={profileContext.profile.email}
                    firstName={profileContext.profile.firstName}
                    lastName={profileContext.profile.lastName}
                    mobileNumber={profileContext.profile.mobileNumber}
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
