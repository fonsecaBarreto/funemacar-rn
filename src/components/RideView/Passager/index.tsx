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
    const [ expand, setExpand ] = useState(true)
    return (
        <View {...rest } style={styles.container} >
            {
                data ?
                <Text> { data.user.name } </Text>
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
        borderWidth: 1,
        height: 36
    }
});

export default PassagerItem