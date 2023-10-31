import { Listings, Reservations, User } from "@prisma/client";
export type SafeListing =Omit<
Listings,
"createdAt"
>&{
    createdAt:string
}
export type SafeReservation = Omit<Reservations,"createdDate"|"startDate"|"endDate"|"listing">&{
    createdDate:string,
    startDate:string,
    endDate:string,
    listing:SafeListing
    
}
export type SafeUser = Omit<User,"createdAt"|"updatedAt"|"emailVerified"> & {
    createdAt: string,
    updatedAt: string,
    emailVerified:string|null


}