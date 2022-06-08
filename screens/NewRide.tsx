import * as React from 'react';

import InputsHandler from '@/components/controls/InputsHandler';
import { Button, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/store/reducers/main';
import { RidesServices, Rides_Services } from '@/services/api/Rides';
import { View } from 'components/Themed';
import ControlWrapper from '@/components/controls/Wrapper';
import TextInputControl from '@/components/controls/TextInput';
import { DatePicker } from '@/components/controls/DatePicker';
import { useIsFocused } from '@react-navigation/native';

export namespace NewRideModal {
  export type Params = { navigation: any }
}
const today = new Date(Date.now())

const INTIAL_DATA = {
  seats: 1,
  price: 0,
  from: "Rua Santa Marta 1072",
  to:"FEMASS",
  date: today
}

export const NewRideScreen: React.FunctionComponent<NewRideModal.Params> = ({navigation}) =>{

  const dispatch = useDispatch();
  const { user } = useSelector((state:any)=>state.main)
  const inputsState = InputsHandler(INTIAL_DATA);


  const isFocused = useIsFocused();

  React.useEffect(()=>{
    if(isFocused == true){
        if(!user) {
          navigation.navigate("Modal")
        }
    }
  },[isFocused]) 



  const onChangeText = (name: string, value: string, format:string = "text") =>{
      inputsState.handleInputs({[name]: value})
  }
  
  const submit = async () =>{
      dispatch(setLoading(true))
      const dto: Rides_Services.Add_Ride_DTO ={
          ...inputsState.data,
          driver_id: user.id
      }
      RidesServices.save(dto)
        .then(result=>{navigation.navigate("Home")})
        .finally(()=>dispatch(setLoading(false)))
  }

  const datePickerChange = (value: any) => {
    inputsState.handleInputs({'date': value})
  };

  return (
      <View style={styles.container}>

          <View style={styles.formContainer}>

              <ControlWrapper label={"Origem"}>
                  <TextInputControl 
                      value={inputsState.data.from}
                      placeholder={'Descreva o local de partida'}
                      onChangeText={(v:string)=>onChangeText('from', v)}
                  />
              </ControlWrapper>

              <ControlWrapper label={"Destino"}>
                  <TextInputControl 
                      value={inputsState.data.to}
                      placeholder={'Descreva o local de chegada'}
                      onChangeText={(v:string)=>onChangeText('to', v)}
                  />
              </ControlWrapper>

              <ControlWrapper label={"Assentos"}>
                  <TextInputControl 
                      value={inputsState.data.seats+""}
                      placeholder={'Numero de assentos disponíveis'}
                      onChangeText={(v:string)=>onChangeText('seats', v, 'number')}
                      keyboardType="numeric"
                  />
              </ControlWrapper>

              <ControlWrapper label={"Preço"}>
                  <TextInputControl 
                      value={inputsState.data.price+""}
                      placeholder={'Preço da viagem'}
                      onChangeText={(v:string)=>onChangeText('price', v, 'number')}
                      keyboardType="numeric"
                  />
              </ControlWrapper>

              <ControlWrapper label={"Selecione a hora da viagem"}>
                  <DatePicker value={inputsState.data.date} onChange={datePickerChange}></DatePicker>
              </ControlWrapper>

              <Button title="Confirmar " onPress={submit}/>
  
          </View> 
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  formContainer: {
      width: "100%",
      padding: 10
  }
});


export default NewRideScreen;



  /* React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => ( <Button onPress={submit} title="Add" /> ),
      });
    }, [navigation]); */

