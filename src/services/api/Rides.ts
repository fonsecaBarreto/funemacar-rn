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

    find: async({ ride_id }: { ride_id: string } ) =>{
        const result = await ridesApi.send({ method: "get", url:`/${ride_id}` }) 
        console.log(result)
        return result.data;
    },

    list: async({ self }: { self?:boolean } ) =>{
        const result = await ridesApi.send({ method: "get", url:`/?strict=${self ? 1 : 0}` }) 
        return result.data;
    },

    save: async (newRide: Rides_Services.Add_Ride_DTO) =>{
        await ridesApi.send({ method: "post", url:"/", data: newRide }) 
        return;
    },

    requestRide: async (params: {to: string, from: string, ride_id:string })=>{
        const { to, from, ride_id } = params
        await ridesApi.send({ method: "post", url:`/${ride_id}/request`, data: { to, from } }) 
        return;
    },

    updateStatus: async (params: {run_id: string, status:string })=>{
        const { run_id, status } = params
        await ridesApi.send({ method: "patch", url:`/${run_id}/status`, data: { status } }) 
        return;
    }


}




