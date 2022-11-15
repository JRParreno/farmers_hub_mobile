import * as React from "react";
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { DefaultColor } from "../../constants/Colors";
import { PoppinText } from "../StyledText";
import { View, Text, } from "../Themed";

export enum LinkType {
    primary,
    secondary,
    white,
}

interface IProps {
    title: string;
    onPress: () => void;
    type?: LinkType;
    style?: StyleProp<ViewStyle>;
    styleText?: StyleProp<TextStyle>;
    underlineText?: string;
}

function textStyle(type: LinkType): StyleProp<TextStyle> {
    switch (type) {
        case LinkType.primary:
            return {
                color: DefaultColor.main,
            };
        case LinkType.secondary:
            return {
                color: '#575757',
            };
        default:
            return {
                color: 'white',
            };
    }
}

export default function TouchableLink(props: IProps) {
    return (
        <TouchableOpacity onPress={props.onPress} style={[
            styles.container,
            props.style
        ]}
            activeOpacity={1}
        >
            <PoppinText style={props.styleText}>
                <PoppinText style={[props.styleText]}>
                    {props.title}
                    {props.underlineText && (
                        <PoppinText style={{ textDecorationLine: 'underline', color: DefaultColor.main }}>{props.underlineText}</PoppinText>
                    )}
                </PoppinText>
            </PoppinText>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});
