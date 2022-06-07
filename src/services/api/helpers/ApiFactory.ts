import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorHandler } from "./ErrorHandler"

export interface MakeApiParams {
  base_url: string, 
  storage_key: string
}

export interface SendParams {
  method: any,
  url: string, 
  data?: any, 
  headers?: any
}

export function MakeApiSettings({base_url, storage_key}: MakeApiParams){
  const axiosApi = axios.create({  baseURL: base_url })
  return ({
    send: async ({ method, url, data, headers }: SendParams) => {

      const final_url = `${base_url}${url}`
      console.log("fetching << "+final_url + " >>")

      if(storage_key){
        const token = await AsyncStorage.getItem(storage_key);
        axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      try{ 
        const result = await axiosApi({ method, url: final_url, data, headers })
        return result;

      } catch(err) { 
          throw errorHandler(err) 
      } 
    }
  })
}



