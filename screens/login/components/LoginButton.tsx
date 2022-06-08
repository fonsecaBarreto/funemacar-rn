import Colors from 'constants/Colors';
import * as React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export type ButtonType = "primary" | "light"

export namespace LoginButton {
    export type Params = {
        type?: ButtonType,
        label?: string,
        onPress?: any
    }
}
export const LoginButton: React.FunctionComponent<LoginButton.Params> = ({ type="primary", label="submit", ...rest }) =>{
    return (
        <TouchableOpacity {...rest} style={[ styles.container, ((type == "primary" )? styles.primary : styles.light)]}>
            <Text  style={[((type == "primary" )? styles.textPrimary : styles.textLight)]} > {label} </Text>
        </TouchableOpacity>
    )
}


export const styles = StyleSheet.create({
    container: {
        textAlign: "center",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    primary: {
        backgroundColor: "#005b96",
        height: 56,
    },
    light: {
        backgroundColor: "white",
        height: 32,
    },
    textPrimary:{
        color: "white"
    },
    textLight: {
        color: "#555"
    }
})

export default LoginButton