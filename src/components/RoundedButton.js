import React from "react";
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { white } from "react-native-paper/lib/typescript/styles/colors";
import { colors } from '../utils/colors';

export const RoundedButton = ({
    style = {},
    textStyle = {},
    size = 125,
    ...props
}) => {
    return (
        <TouchableOpacity style={[styles(size).radius, style]} onPress={props.onPress}>
            <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = (size) => StyleSheet.create({
    radius: {
        borderRadius: size / 2,
        width: size,
        height: size,
        borderWidth: 3,
        borderColor: colors.red,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: colors.red,
        fontSize: size/3

    }
})