import Container from "./Container";
import getCurrentUser from "./actions/getCurrentUser";
import getListing, { IListingsParams } from "./actions/getListing";

import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: IListingsParams;
}
export default async function Home({ searchParams }: HomeProps) {
  const currentUser = await getCurrentUser();
  const listings = await getListing(searchParams);
  const isEmpty = true;
  if (listings?.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div
        className='
    pt-24
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-8
    '
      >
        {listings?.map((listing: any) => {
          return (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          );
        })}
      </div>
    </Container>
  );
}
