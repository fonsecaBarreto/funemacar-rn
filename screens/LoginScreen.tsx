import InputsHandler from '@/components/controls/InputsHandler';
import TextInputControl from '@/components/controls/TextInput';
import ControlWrapper from '@/components/controls/Wrapper';
import { LoginServices } from '@/services/api/Login';
import { setUser } from '@/store/reducers/main';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View  } from '../components/Themed';


const INTIAL_DATA = {
  phone: "",
  password: "",
}

export const ModalScreen:React.FunctionComponent<any> = ({navigation}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state:any)=>state.main)
  const inputsState = InputsHandler(INTIAL_DATA);

  const onChangeText = (name: string, value: string, format:string = "text") =>{
    inputsState.handleInputs({[name]: value})
  }


  const submit = () =>{

    LoginServices.signin({...inputsState.data})
      .then(LoginServices.verify)
      .then(user=>dispatch(setUser(user)))
      .then(user=>navigation.navigate("Home"))
      .catch(LoginServices.logout)
  
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Login aqui </Text>

          <ControlWrapper label={"Telefone"}>
                <TextInputControl 
                    value={inputsState.data.phone}
                    placeholder={'Telefone'}
                    keyboardType="numeric"
                    onChangeText={(v:string)=>onChangeText('phone', v)}
                />
          </ControlWrapper>

          <ControlWrapper label={"Senha"}>
              <TextInputControl 
                  value={inputsState.data.password}
                  placeholder={'Senha de acesso'}
                  onChangeText={(v:string)=>onChangeText('password', v)}
              />
          </ControlWrapper>
  
      <Button title="Entrar" onPress={submit}> </Button>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});


export default ModalScreen

/* const CLIENT_ID="957431303739-9o07c44jtktbcjc1qopglahf3si1g95i.apps.googleusercontent.com";
const REDIRECT_URI="https://auth.expo.io/@fonsecabarreto/funemcar-react-native";
const RESPONSE_TYPE="token";
const SCOPE= encodeURI("profile email");

const AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id${CLIENT_ID}&redirect_URI=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
  
const GoogleLogin = async () => {
  console.log("url:",AUTH_URL)
  const response = await AuthSession.startAsync({authUrl: AUTH_URL})
  console.log(response)
} */