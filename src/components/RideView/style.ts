import styled from 'styled-components/native'

export const Container = styled.View`
    width: 100%;
    border: solid 1px #ddd;
    background-color: #fefefe;
    box-shadow: 0px 2px #0003;
    flex-direction: column;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 6px;
`

export const ContentPanel = styled.View`
    width: 100%;
    flex: 1;
    flex-direction: row;
    padding-bottom: 8px;
`
export const LocationIcon = styled.View`
    align-items: center; justify-content: center;
    width: 28px; height: 28px;
    border-radius: 28px;
`

export const LocationText = styled.Text`
    font-size: 16px;
    padding-left: 8px;
`
export const PriceText = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #557;
` 
export const Image = styled.ImageBackground`
    width: 48px; height: 48px; margin-right: 12px;
`

export const HiddenBody = styled.TouchableOpacity`
    width: 100%;
    background-color: #fefefe;
    box-shadow: 0px 2px #0003;
    flex-direction: column;
    border-top-width: 1;
    border-top-color: #ccc
`