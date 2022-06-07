import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
    width: 100%;
    border: solid 1px #ddd;
    background-color: #fefefe;
    box-shadow: 0px 2px #0003;
    flex-direction: column;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 6px;
`
export const ContentPanel = styled.TouchableOpacity`
    width: 100%;
    flex: 1;
    flex-direction: row;
    padding-bottom: 8px;
`
export const LocationIcon = styled.View`
    width: 28px; height: 28px;
    border-radius: 32px;
    border: solid 5px #ddd
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
    width: 64px; height: 64px; margin-right: 12px;
`
