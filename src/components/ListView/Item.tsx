import React, { useState } from 'react'
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from "react-native"
import Dots from "@assets/icons/dots.png"

export namespace ListViewItem {
    export type Params = {
        entry: { data?: any, index: number }
        onChange: any
    }
}

export const ListViewItem: React.FunctionComponent<ListViewItem.Params> = ({ entry, onChange }) =>{
    const [ image, setImage] = useState(Dots)
    const { data, index } = entry
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.content}>
                <ImageBackground style={styles.image} source={image}></ImageBackground>
                <Text> Teste </Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width:"100%",
        marginBottom: 8
    },
    content: {
        padding: 12
    },
    image: {
        width: 64,
        height: 64,
        marginRight: 12
    }
});

export default ListViewItem