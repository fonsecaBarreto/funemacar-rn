
import React, { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, Text} from 'react-native'

export namespace ListView {
    export type Parmas = {
        records: any[],
        onChange: any,
        item: any,
        isLoading: boolean,
    }
}
 
export const ListView: React.FunctionComponent<ListView.Parmas> = ({ item: Item, records, onChange, isLoading}) =>{

    const handleChanges = (r:any,k: any) =>{ onChange(r,k)  }
    return (
        <View style={[styles.container]}>
            { isLoading ? <Text> Carregando... </Text> :
            <ScrollView style={styles.content}>
                {  records?.length > 0 && records.map( (b: any,i: number)=> ( 
                    <Item key={i} onChange={handleChanges} entry={{ data: b, index: i}} />
                    ))}  
            </ScrollView>
            }
        </View>
    )
}
export default ListView;

const styles = StyleSheet.create({
    container: {
        width:"100%",
        height: "100%",
    },
    content: {
        padding: 12,
        width: "100%"
    }
});
