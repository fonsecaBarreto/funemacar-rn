export interface User {
    id: string,
    name: string,
    email: string,
    price: number,
    phone: string
    password: string
}

export interface Address {
    google_id: string
    cep: string
    label: string
}

export enum RideStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    CLOSED = "CLOSED",
}

export interface Ride{
    id: string,
    driver_id: string, 
    seats: number,
    to: string,
    from: string,
    price: number,
    date: Date,
    status: RideStatus
}