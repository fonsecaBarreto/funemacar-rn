import { global } from '../global-keys'
import { MakeApiSettings } from './helpers/ApiFactory'
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginApi = MakeApiSettings({
    base_url: `${global.base_url}/login`,
    storage_key: global.user_storage_key
})

export const LoginServices = {

    signin:async (data: any) => {
      console.log("Signin")
      const result = await loginApi.send({ method: "post", url:"/signin", data }) 
      const { access_token } = result.data
      AsyncStorage.setItem(global.user_storage_key, access_token) ;
      return access_token;
    },
  
    verify:async () =>{
      console.log("Verificando")
      const { data } = await loginApi.send({method: "get", url:"/verify"}) 
      return data
    }, 
  
    logout:() =>{
      console.log("LogOut")
      AsyncStorage.removeItem(global.user_storage_key) ;
    } 
}