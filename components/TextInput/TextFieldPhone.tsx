import * as React from "react";
import { Input } from 'react-native-elements';
import { StyleSheet, View, TouchableOpacity, Text, StyleProp, TextStyle, ViewStyle } from "react-native";
import { DefaultColor } from "../../constants/Colors";
import { PoppinText } from "../StyledText";


interface Props {
    value: string,
    touched?: boolean;
    errorMessage?: string;
    textStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
    onTap?: () => void;
    textLabel?: string;
    required?: boolean;
    shadow?: boolean;
    onChange: (value: string) => void;
}

export default function TextFieldPhone(props: Props) {

    return (
        <View style={{ flex: 0, width: "100%", marginBottom: props.errorMessage && props.touched ? 0 : 10 }}>
            {props.textLabel && (
                <PoppinText style={styles.textLabel}>
                    {props.textLabel}
                    {props.required && (
                        <Text style={{ color: 'red' }}>*</Text>
                    )}
                </PoppinText>
            )}

            <Input
                placeholder=''
                leftIcon={<Text style={[styles.phoneCode, { color: "#878787" }]}>+63</Text>}
                inputContainerStyle={[styles.inputStyle, props.shadow && styles.shadowStyle]}
                containerStyle={[styles.container, props.containerStyle]}
                style={[styles.phoneCode, props.textStyle]}
                inputStyle={[{ margin: 0, padding: 0 }, props.inputStyle]}
                leftIconContainerStyle={{ margin: 0, padding: 0 }}
                keyboardType={"number-pad"}
                clearButtonMode={"while-editing"}
                value={props.value}
                onChangeText={props.onChange}
                // errorMessage={props.touched ? props.errorMessage : ""}
                onTouchStart={props.onTap}
                placeholderTextColor="#C9C9C9"
                errorMessage={props.errorMessage && props.touched ? props.errorMessage : ''}
                errorStyle={[styles.textLabel, { color: 'red' }]}
                renderErrorMessage={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
        marginHorizontal: 0,
        paddingVertical: 0,
    },
    inputStyle: {
        height: 45,
        paddingVertical: 0,
        flex: 0,
        borderColor: "#878787",
        borderWidth: 1,
        borderRadius: 10,
    },
    shadowStyle: {
        shadowColor: undefined, // IOS
        shadowOffset: { height: 6, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 4, //IOS
        elevation: 5, // Android
        backgroundColor: "white",
    },
    phoneCode: {
        fontFamily: 'poppins-regular',
        fontSize: 14,
        marginLeft: 5,
    },
    helpText: {
        color: '#878787',
        textAlign: 'justify',
        marginTop: 10
    },
    textLabel: {
        fontSize: 14,
        fontFamily: 'poppins-regular',
        color: "#262626",
    },
})