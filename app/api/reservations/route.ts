import getCurrentUser from '@/app/actions/getCurrentUser';
import  prisma  from '@/app/libs/prismadb';
import { NextResponse } from "next/server";

export async function POST(request:Request){
    const currentUser=await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }
    const body =await request.json();

    const {listingId,startDate,endDate,totalPrice}=body;

    if(!listingId||!startDate||!endDate||!totalPrice){
        return NextResponse.error();
    }
    const listingAndReservations = await prisma.listings.update({
        where:{
            id:listingId
        },
        data:{
            reservation:{
                create:{
                    userId:currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })
    return NextResponse.json(listingAndReservations);
}