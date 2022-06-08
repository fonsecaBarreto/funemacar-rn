import { FontAwesome } from '@expo/vector-icons'
import { FlexCenter, FlexRow } from 'components/Themed'
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, Button } from "react-native"
import { useSelector } from 'react-redux'

export namespace PassagerItem {
    export type Params = {
        entry?: { data: any, index: number }
        onChange: any
    }
}

export const PassagerItem: React.FunctionComponent<PassagerItem.Params> = ({ entry, onChange }) =>{
    const { user } = useSelector((state:any)=>state.main)
    const { data, index }: any = entry;

    return (
        <View style={styles.container} >
            {
                data ?
                <FlexRow>
                    <Text> { data.user.name } </Text>
                    <Text> { JSON.stringify(data.status)} </Text>
                </FlexRow>
                :
                <FlexRow>
                    <FontAwesome name="user"></FontAwesome>
                    <Text> Vaga </Text>
                    <Button title="reservar" onPress={onChange}/>
                </FlexRow>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",
        marginBottom: 2,
        height:42
    },
});

export default PassagerItem