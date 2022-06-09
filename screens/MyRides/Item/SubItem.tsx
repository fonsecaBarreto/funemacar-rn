import { RidesServices } from '@/services/api/Rides'
import { FontAwesome, AntDesign, MaterialIcons, MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Button, TouchableOpacity, Text } from "react-native"

export namespace SubItem {
    export type Params = {
        entry?: { data: any, index: number }
        onChange: any
    }
}

export const OptButton: React.FunctionComponent<any> = ({children, ...rest}) =>{
    return (
        <TouchableOpacity style={styles.optButton} {...rest}>
            {children}
        </TouchableOpacity>
    )
}

export type Status =  "REQUESTED" | "DENIED" | "ACCEPTED" | "CANCELED" | "CLOSED" | "EMPTY";

const StatusStyles = StyleSheet.create<Record<Status, any>>({
    ACCEPTED:{
        backgroundColor: "#accfd8"
    },
    CANCELED:{
        backgroundColor: "#e99e9e"
    },
    CLOSED:{
        backgroundColor: "#b9b9b9"
    },
    DENIED:{
        backgroundColor: "#e99e9e"
    },
    REQUESTED: {
        backgroundColor: "#efefef"
    },
    EMPTY:{
        backgroundColor: "#e4e4e4"
    }
});

export const SubItem: React.FunctionComponent<SubItem.Params> = ({ entry, onChange }) =>{

    const [ data, setData ]  = useState<{ status: Status, id: string,index: number, userName: string }>({
        id: "",
        index: 0,
        status: "EMPTY",
        userName: "Vago"
    })

    useEffect(()=>{
        if(!entry?.data) return
        const { data, index }: any = entry;
        setData( { 
            id: data.id, 
            index, 
            status: data.status,
            userName: data.user.name
        })
    },[entry])

    const { id, index, status, userName } = data

    const handleChange = (k: string) =>{
        onChange("RUN_"+k,id)
    }

    return (
        <View style={styles.container} >
            <View style={[styles.content, styles.fullRun, StatusStyles[status]]}>
                <OptButton>
                    {   (status == "REQUESTED") ?
                        <FontAwesome5 name="user-clock" size={28} color="black" />
                        : (status == "ACCEPTED") ?
                        <FontAwesome5 name="user-alt" size={28} color="black" />
                        : (status == "DENIED" || status == "CANCELED") ?
                            <MaterialCommunityIcons name="cancel" size={32} color="#c51c1c" />
                        :(status == "CLOSED") ?
                            <FontAwesome5 name="user-alt" size={28} color="black" />
                        :
                        <FontAwesome5 name="user-alt-slash" size={24} color="black" />
                    }
                </OptButton>

                <View style={styles.viewPort}>
                    <Text>{userName}</Text>
                </View>

                <View style={styles.asideOpts}>
                    {  
                        (status == "REQUESTED") ?
                            <React.Fragment>
                                <OptButton onPress={()=>handleChange("DENY")} ><AntDesign name="closecircle" size={32} color={"#db384b"}/></OptButton>   
                                <OptButton onPress={()=>handleChange("CONFIRM")}><AntDesign name="checkcircle" size={32} color={"#09bb68"}/></OptButton>   
                            </React.Fragment>
                        : (status == "ACCEPTED") ?
                            <OptButton onPress={()=>handleChange("CANCEL")}>
                                <FontAwesome name="times" size={24} color="black" />
                            </OptButton>
                        :
                        <React.Fragment></React.Fragment>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",
        marginBottom: 2,
    },
    content : {
        width: "100%",
        height:64,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    emptyRun: {
        borderStyle: "dashed",
        backgroundColor: "#d1d1d1"
    },
    fullRun:{
        borderStyle: "solid",
        backgroundColor: "#efefef",
    },
    viewPort:{
        fill:1,
        flexGrow: 1,
        overflow: "hidden",
        paddingHorizontal: 8
    }, 
    asideOpts:{
        flexDirection: "row"        
    },
    optButton:{
        height: 38,
        width: 38,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default SubItem