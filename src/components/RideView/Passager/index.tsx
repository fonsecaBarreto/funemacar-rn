import { FlexCenter, FlexRow } from 'components/Themed'
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, Button } from "react-native"

export namespace RideMuralItem {
    export type Params = {
        entry?: { data: any, index: number }
        onPress: any
    }
}

export const PassagerItem: React.FunctionComponent<RideMuralItem.Params> = ({ entry, ...rest }) =>{
    const { data, index }: any = entry;
    return (
        <View {...rest } style={styles.container} >
            {
                data ?
                <FlexRow>
                    <Text> { data.user.name } </Text>
                    <Text> { JSON.stringify(data.status)} </Text>
                </FlexRow>
                :
                <FlexRow>
                    <Text> Vaga </Text>
                    <Button title="reservar" onPress={()=>{}}/>
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
    }
});

export default PassagerItem