import React, { useEffect, useState } from 'react'
import { Container, ContentPanel, LocationIcon, LocationText, PriceText, Image, HiddenBody } from './style'
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native"
import { FlexCenter, FlexColumn, FlexRow } from 'components/Themed'
import UserImage from "@assets/images/icons/user.png"
import { RidesServices, Rides_Services } from '@/services/api/Rides'
import PassagerItem from './Passager'
import { FontAwesome } from '@expo/vector-icons'

export namespace RideMuralItem {
    export type Params = {
        entry?: { data?: Rides_Services.List_Rides_DTO, index: number }
        onPress: any
    }
}

export const CPanel: React.FunctionComponent<any> = ({ left, right}) =>{
    return (
        <ContentPanel>
            <View style={styles.left}>
                { left }
            </View>
            <View style={styles.right}>
                {right}
            </View>
        </ContentPanel>
    )
}

export const RideMuralItem: React.FunctionComponent<RideMuralItem.Params> = ({ entry, ...rest }) =>{

    const { data, index }: any = entry;
    const [ passagers, setPassagers ] = useState<any>([])
    const [ expand, setExpand ] = useState(false)

    useEffect(()=>{
        const { seats } = data;
        let result = [...new Array(seats)].map((b,i)=> {
            return  data.passagers[i] ? ({ ...data.passagers[i] }) : null
        });
        setPassagers(result)
    },[data])


    const handleChange = () =>{
        const dto: any = { to: "a tratar", from: "a tratar", ride_id: data.id }
        RidesServices.requestRide(dto)
        .then(r=>alert("Reservado com sucesso..."))
        .finally(()=>setExpand(false))
    }

    if(!data) return <Text> Carregando... </Text>
    return (
        <Container {...rest } >
            <CPanel left={
                <React.Fragment>
                    <FlexRow>
                        <LocationIcon>
                            <FontAwesome name="map-pin" size={20}/>
                        </LocationIcon>
                        <LocationText> {data.from}  </LocationText>
                    </FlexRow>
                    <FlexRow>
                        <LocationIcon>
                            <FontAwesome name="map-marker" size={20}/>
                        </LocationIcon>
                        <LocationText> { data.to }  </LocationText>
                    </FlexRow>
                </React.Fragment>
            }  right={
                <FlexRow>
                    <PriceText>
                        R$: {data.price}
                    </PriceText> 
                    
                </FlexRow>
            }/>

            <CPanel left={
                 <FlexRow>
                        <Image source={UserImage}></Image>
                    <FlexColumn>
                        <Text> {data.driver.name} </Text>
                        <Text> {data.driver.phone} </Text>
                    </FlexColumn>
                </FlexRow>
            }
            right={
                <FlexRow>
                    <TouchableOpacity onPress={ () => setExpand(prev=>!prev) }>
                        <Text> Vagas: { data.seats} </Text>
                    </TouchableOpacity>
                </FlexRow> 
            }/>
            { expand === true && <HiddenBody>
                {
                    passagers.length > 0 && passagers.map((b: any, i: number)=>{
                        return <PassagerItem key={i} onChange={()=>handleChange()} entry={{ index:i, data:b }} />
                    })
                }
            </HiddenBody> }
        </Container>
    )
}



const styles = StyleSheet.create({
    left: {
        width: "70%", height: "100%",
        flexDirection: "column",
        justifyContent: "center"
    }, 
    right: {
        width: "30%",
    }
});

export default RideMuralItem