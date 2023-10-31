import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById'
import EmptyState from '@/app/components/EmptyState';

import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservation';
interface Iparams {
    listingId?: string;
}
const ListingPage = async({params}:{params:Iparams}) => {
    const listing = await getListingById(params)
    const reservations = await getReservations(params)
    const currentUser= await getCurrentUser()
    if(!listing){
        return <EmptyState/>
    }
    
  return (
    <div><ListingClient
    reservations={reservations}
    listing={listing}
    currentUser={currentUser}
    />
    </div>
  )
}

export default ListingPage