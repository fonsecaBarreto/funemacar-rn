import { Ride, RideStatus } from "../domain/Classes"

export namespace RidesServices {
    export interface Add_Ride_DTO extends Omit<Ride, 'id'> {}
}

const rides: Ride[] = [ 
    {
        id: "test_id",
        seats: 8,
        from: "Rua Araujo Silva, 69",
        to:"FUNEMAC - Macape",
        driver_id: "some_user_id",
        date: new Date(),
        price: 8,
        status: RideStatus.OPEN
    }
]

export const RidesServices =  {
    list: async() =>{
        await new Promise((re)=>{setTimeout(()=>re(true),100)})
        return rides
    },
    find: async (id: string) =>{
        return rides.find((p)=>p.id == id)
    },
    save: async (newRide: RidesServices.Add_Ride_DTO) =>{
        rides.push({id: "some_user_id", ...newRide})
        return Promise.resolve()
    },
}