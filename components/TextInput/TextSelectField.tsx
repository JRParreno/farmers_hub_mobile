import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardTypeOptions, StyleProp, StyleSheet, TextInput, useColorScheme, ViewStyle, View, TouchableOpacity, ScrollView } from "react-native";
import { Surface } from "react-native-paper";
import { DefaultColor } from "../../constants/Colors";
import { PoppinText } from "../StyledText";

interface IProps {
    text: string;
    setText: (value: string) => void;
    label: string;
    secureEntry?: boolean;
    multiline?: boolean;
    toggleEye?: () => void;
    showPassword?: boolean;
    inputStyle?: StyleProp<ViewStyle>;
    errorMessage?: string;
    touched?: boolean;
    keyboardType?: KeyboardTypeOptions;
    phoneCode?: string;
    placeholder?: string;
    onPressIn?: () => void;
    disabled?: boolean;
}

export default function TextSelectField(props: IProps) {
    const colorScheme = useColorScheme();

    return (
        <View style={styles.container}>
            <PoppinText style={styles.labelContainer}>
                {props.label}
            </PoppinText>
            <Surface style={[styles.surfaceContainer, { borderColor: DefaultColor.main }]}>
                <TouchableOpacity
                    style={{
                        height: 50,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: DefaultColor.dark,
                        paddingHorizontal: 10
                    }}
                    onPress={props.onPressIn}
                >
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1
                        }}
                        horizontal={true}
                    >
                        <View
                            style={styles.inputContainer}
                        >
                            <PoppinText
                                numberOfLines={1}

                            >
                                {props.text}
                            </PoppinText>
                        </View>
                    </ScrollView>


                </TouchableOpacity>
            </Surface>

            {props.touched && props.errorMessage &&
                <PoppinText style={styles.errorStyle}>{props.errorMessage}</PoppinText>
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 0,
        marginVertical: 10,
    },
    inputContainer: {
        flex: 0,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    labelContainer: {
        paddingHorizontal: 0,
    },
    errorStyle: {
        color: 'red',
        marginVertical: 5,
    },
    eyeContainer: {
        margin: 10
    },
    surfaceContainer: {
        flex: 0,
        elevation: 4,
        borderRadius: 10,
        borderWidth: 1,
        padding: 3
    },
    phoneContainer: {
        flex: 0,
        backgroundColor: 'white',
        marginLeft: 10,
        borderRadius: 100,
    },
    affixContainer: {
        flex: 0,
        justifyContent: 'center'
    }
});