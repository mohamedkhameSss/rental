import  prisma  from '@/app/libs/prismadb';

export interface IListingsParams {
    userId?:string;
    guestCount?:number;
    roomCount?:number;
    bathroomCount?:number;
    startDate?:string;
    endDate?:string;
    locationValue?:string;
    category?:string;
}

export default async function getListing(
    params:IListingsParams
) {
    try{
        const { userId,bathroomCount ,category,endDate,
            guestCount,locationValue,
            roomCount,startDate
        }=params;
        let query:any={};
        if(userId){
            query.userId=userId;
        }
        if(category){
            query.category=category;
        }
        if(roomCount){
            query.roomCount={
                gte:+roomCount
            };
        }
        if(guestCount){
            query.guestCount={
                gte:+guestCount
            };
        }
        if(bathroomCount){
            query.bathroomCount={
                gte:+bathroomCount
            };
        }
        if(locationValue){
            query.locationValue=locationValue;
        }
        if(startDate && endDate){
            query.NOT={
                reservation:{
                    some:{
                        OR:[{
                            endDate:{gte:startDate},
                            startDate:{gte:endDate}
                        },
                        {
                            startDate:{lte:endDate},
                            endDate:{lte:endDate}

                        }
                    ]
                }
            }
        }}
        const listings =await prisma.listings.findMany({
            where:query,
            orderBy:{
                createdAt:'desc'
            }
        })
        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt:listing.createdAt.toISOString(),
        }))
        return safeListings;
    }catch(error:any){
        throw new Error(error)
    }
    }