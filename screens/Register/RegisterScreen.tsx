import * as React from "react";
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RegisterForm } from '../../components/Register';
import { PoppinText } from "../../components/StyledText";
import ViewWithLoading from '../../components/ViewWithLoading';

export default function RegisterScreen() {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <ViewWithLoading loading={loading}>
            <View style={styles.container}>
                <View style={{ alignItems: "center", padding: 10 }}>
                    <PoppinText style={{ fontFamily: "poppins-semibold", fontSize: 18 }}>Register</PoppinText>
                </View>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <RegisterForm setLoading={setLoading} />
                </ScrollView>
            </View>
        </ViewWithLoading>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
});