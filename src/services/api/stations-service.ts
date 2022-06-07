import { global } from '../global-keys'
import { MakeApiSettings, errorHandler } from './helpers'

const stationsApi = MakeApiSettings({
     base_url: `${global.base_url}/stations`,
     errorHelper: errorHandler, 
     storage_key: global.user_storage_key
})

export namespace stationsService {
     export type MetricsParams = {
          station_id: string,
          date: Date, 
          intervals: string, 
          amplitude: number   
     }
}
export const stationsService = {

     find:async (station_id: string, p: any) => {
          const { data } = await stationsApi.send({ method: "get", url:`/${station_id}?p=${p}` }) 
          return data
     },

     findStationMetrics:async (params: any) => {
  
          const { station_id, date, intervals, amplitude } = params
          var state_date = new Date(date); state_date.setHours(0, 0, 0, 0);

          const { data } = await stationsApi.send({
                method: "get", 
                url:`/${station_id}/metrics?s=${state_date.getTime()}
                    &intervals=${intervals}
                    &amplitude=${amplitude}`
               }) 
          return data
     },

     save:async (inputs: any) =>{
          const { id, description, longitude, latitude, altitude, address_id } = inputs;
          const METHOD = id ? 'PUT' : 'POST';
          const URL = id ? `/${id}` : '/'
          const body = id ? { description, longitude, latitude, altitude } 
          : { description, longitude, latitude, altitude, address_id }
          const { data } = await stationsApi.send({method: METHOD, url:URL , data: body });
          return data
     }, 

     remove: async (station: any) =>{
          await stationsApi.send({method: "delete", url:`/${station.id}`});
     },

     saveMeasurements: async (station_id: string, csvFile: any, force = 0) => {
          const formData = new FormData();
          formData.append('csv_entry', csvFile)
          await stationsApi.send({method: "post", url:`/${station_id}/measurements/multiples?f=${force}`, data: formData });
          return
     }
}