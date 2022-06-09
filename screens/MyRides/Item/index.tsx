import React, { useEffect, useState } from 'react'
import { Container, ContentPanel, LocationIcon, LocationText, ContentFlow } from './style'
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native"
import { FlexCenter, FlexColumn, FlexRow } from 'components/Themed'
import { RidesServices, Rides_Services } from '@/services/api/Rides'
import PassagerItem from './SubItem'
import { FontAwesome } from '@expo/vector-icons'

export namespace RideMuralItem {
    export type Params = {
        entry?: { data?: Rides_Services.List_Rides_DTO, index: number }
        onPress: any
    }
}

export const RideMuralItem: React.FunctionComponent<RideMuralItem.Params> = ({ entry, ...rest }) =>{

    const [ index, setIndex ] = useState(0)
    const [ ride, setRide ] = useState<any>(null)
    const [ reload, setReload ] = useState(false)
    const [ passagers, setPassagers ] = useState([])

    const handleEntry = (data: any) =>{
        let { passagers, ...leftData } = data
        setRide(leftData)
        let result: any = [...new Array(data.seats)].map((b,i)=> {
            return  data.passagers[i] ? ({ ...data.passagers[i] }) : null
        });
        setPassagers(result)
    }
    
    /* entry from the parent */
    useEffect(()=>{
        if(!entry?.data) return
        const { data, index }: any = entry;
        handleEntry(data)
        setIndex(index)
    },[entry])

    /* Update state */
    useEffect(()=>{
        if(!ride) return;
        RidesServices.find({ride_id: ride.id}).then(handleEntry) 
        if(reload) setReload(false);
    },[reload])

    const handleChange = (k: string, p: any) =>{
        switch(k){
            case "RUN_CONFIRM": 
                RidesServices
                    .updateStatus({ run_id: p, status: "ACCEPTED" })
                    .then(()=>{ setReload(true)})
            ; break;
            case "RUN_CANCEL": 
                RidesServices
                    .updateStatus({run_id: p , status: "CANCELED" })
                    .then(()=>{ setReload(true)})
            break;
            case "RUN_DENY":
                RidesServices 
                    .updateStatus({run_id: p , status: "DENIED" })
                    .then(()=>{ setReload(true)})
            break;
        } 
    }

    if(!ride || reload) return <Text> Carregando... </Text>

    const { from, to, price, seats } = ride
    return (
        <Container {...rest } >
         

            <FlexRow>
                <LocationIcon>
                    <FontAwesome name="map-pin" size={20}/>
                </LocationIcon>
                <LocationText> { from }  </LocationText>
            </FlexRow>
            <FlexRow>
                <LocationIcon>
                    <FontAwesome name="map-marker" size={20}/>
                </LocationIcon>
                <LocationText> { to }  </LocationText>
            </FlexRow>

            <FlexRow>
                <Text>R$: { price }</Text>
                <Text> Vagas: { seats } </Text>
            </FlexRow>

           <ContentFlow>
                {
                    passagers.length > 0 && passagers.map((b: any, i: number)=>{
                        return <PassagerItem key={i} onChange={handleChange} entry={{ index:i, data:b }} />
                    })
                }
            </ContentFlow>
        </Container>
    )
}


export default RideMuralItem