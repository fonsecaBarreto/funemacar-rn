import { global } from '../global-keys'
import { MakeApiSettings, errorHandler } from './helpers'

const addressesApi = MakeApiSettings({
     base_url: `${global.base_url}/addresses`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export const addressesServices = {

     list:async (view = null) => {
          const url = view === "labelview" ? `/?v=labelview` : '/'
          const { data } = await addressesApi.send({ method: "get", url }) 
          return data
     },
     
     find:async (address_id: string, view=null) => {
          const url = view === "labelview" ? `/${address_id}?v=labelview` : `/${address_id}` 
          const { data } = await addressesApi.send({ method: "get", url }) 
          return data
     },

     save:async (inputs: any) =>{
          const { id, street, region, number, uf, city, details, postalCode } = inputs;
          const body = { street, region, number, uf, city, details, postalCode }
          const METHOD = id ? 'PUT' : 'POST';
          const URL = id ? `/${id}` : '/'
          const { data } = await addressesApi.send({method: METHOD, url:URL , data: body });
          return data
     }, 

     remove: async (address: any) =>{
          await addressesApi.send({method: "delete", url:`/${address.id}`});
          return 
     }
}