import { RideEntity, UsersRide } from '../classes/Rides'
import { global } from '../global-keys'
import { MakeApiSettings } from './helpers/ApiFactory'

const ridesApi = MakeApiSettings({
    base_url: `${global.base_url}/rides`,
    storage_key: global.user_storage_key
})

export namespace Rides_Services {
    export type Driver_Dto = {    
        id: string,
        name: string
        phone: string
    }

    export interface Passager extends UsersRide {
        user: {
            name: string,
            phone: string
        }
    }

    export interface Add_Ride_DTO extends Omit<RideEntity, 'id' | 'status'> {}
    export interface List_Rides_DTO extends RideEntity { 
        driver: Driver_Dto 
        passagers: Passager[] 
    }
}

export const RidesServices = {

    list: async() =>{
        const result = await ridesApi.send({ method: "get", url:"/" }) 
        return result.data;
    },

    save: async (newRide: Rides_Services.Add_Ride_DTO) =>{
        await ridesApi.send({ method: "post", url:"/", data: newRide }) 
        return;
    }
}




