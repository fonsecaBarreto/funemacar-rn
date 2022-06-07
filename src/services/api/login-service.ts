import { global } from '../global-keys'
import { MakeApiSettings, errorHandler } from './helpers'
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginApi = MakeApiSettings({
     base_url: `${global.base_url}/login`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export const loginServices = {

  signin:async (data: any) => {
    const result = await loginApi.send({ method: "post", url:"/signin", data }) 
    AsyncStorage.setItem(global.user_storage_key, result.data['accessToken'])
  },
  
  auth:async () =>{
    const { data } = await loginApi.send({method: "post", url:"/auth"}) 
    return data
  }, 
  
  logout:() =>{
    localStorage.removeItem(global.user_storage_key)
    window.location.href="/login"
  } 
}