import * as React from "react";
import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import ViewWithLoading from "../components/ViewWithLoading";
import ApiConfig from "../constants/ApiConfig";

export default function HelpScreen() {
    return (
        <ViewWithLoading loading={false}>
            <WebView source={{ uri: `${ApiConfig().url}help` }} />
        </ViewWithLoading>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
