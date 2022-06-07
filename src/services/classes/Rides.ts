

export enum RideStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    CLOSED = "CLOSED",
}

export interface RideEntity{
    id: string,
    driver_id: string, 
    seats: number,
    to: string,
    from: string,
    price: number,
    date: Date,
    status: RideStatus
}

/* users rides */
export interface UsersRide {
    user_id: string
    ride_id: string,
    from: string,
    to: string,
    accepted: boolean
}

