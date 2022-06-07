import React, { useEffect, useState } from 'react'
import { Container, ContentPanel, LocationIcon, LocationText, PriceText, Image } from './style'
import { Text, StyleSheet, View} from "react-native"
import { FlexCenter, FlexColumn, FlexRow } from 'components/Themed'
import UserImage from "@assets/images/icons/user.png"
export namespace RideMuralItem {
    export type Params = {
        entry?: { data?: any, index: number }
        onPress: any
    }
}

export const RideMuralItem: React.FunctionComponent<RideMuralItem.Params> = ({ entry, ...rest }) =>{
    const { data, index }: any = entry;

    if(!data) return <Text> Carregando... </Text>
    return (
        <Container {...rest}>
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
                        <Text> Nome do usuario </Text>
                        <Text> avaliação do usuario </Text>
                    </FlexColumn>
                </FlexRow>
            }
            right={
                <FlexRow>
                    <Text> Vagas: { data.seats} </Text>
                </FlexRow> 
            }/>
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