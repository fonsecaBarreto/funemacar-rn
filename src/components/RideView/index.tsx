import React, { useEffect, useState } from 'react'
import { Container, ContentPanel, LocationIcon, LocationText, PriceText, Image, HiddenBody } from './style'
import { Text, StyleSheet, View, Button } from "react-native"
import { FlexCenter, FlexColumn, FlexRow } from 'components/Themed'
import UserImage from "@assets/images/icons/user.png"
import { Rides_Services } from '@/services/api/Rides'
import PassagerItem from './Passager'
export namespace RideMuralItem {
    export type Params = {
        entry?: { data?: Rides_Services.List_Rides_DTO, index: number }
        onPress: any
    }
}

export const RideMuralItem: React.FunctionComponent<RideMuralItem.Params> = ({ entry, ...rest }) =>{

    const { data, index }: any = entry;
    const [ passagers, setPassagers ] = useState<any>([])
    const [ expand, setExpand ] = useState(true)

    /*   if(data.passagers && data.passagers.length > 0){
        setPassagers
    } */

    useEffect(()=>{

        const { seats } = data;

        let result = [...new Array(seats)].map((b,i)=> {

            return  data.passagers[i] ? ({ ...data.passagers[i] }) : null

        });

        setPassagers(result)

    },[data])

    if(!data) return <Text> Carregando... </Text>
    return (
        <Container {...rest } onPress={ () => setExpand(prev=>!prev) } >
            <CPanel left={
                <React.Fragment>
                    <FlexRow>
                        <LocationIcon></LocationIcon>
                        <LocationText> {data.from}  </LocationText>
                    </FlexRow>
                    <FlexRow>
                        <LocationIcon></LocationIcon>
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
                    <Text> Vagas: { data.seats} </Text>
                </FlexRow> 
            }/>
            { expand === true && <HiddenBody>
                {
                    passagers.length > 0 && passagers.map((b: any, i: number)=>{
                        return <PassagerItem key={i} onPress={()=>{}} entry={{ index:i, data:b }} />
                    })
                }
            </HiddenBody> }
        </Container>
    )
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

const styles = StyleSheet.create({
    left: {
        width: "70%", height: "100%",
        flexDirection: "column",
        justifyContent: "center",
    }, 
    right: {
        width: "30%",
    }
});

export default RideMuralItem