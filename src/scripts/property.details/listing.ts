export function generateStaticPaths(data: any) {
  return (data.listings_details || []).map((listing: { id: number }) => ({
    params: { id: listing.id.toString() },
  }));
}

export function findListingById(data: any, id: string) {
  return {
    mainListing: (data.listings || []).find(
      (item: { id: number }) => item.id.toString() === id
    ),
    listing: (data.listings_details || []).find(
      (item: { id: number }) => item.id.toString() === id
    ),
  };
}

export function getRelatedListings(data: any) {
  const currentIds = data.listings_details.map(
    (item: { id: number }) => item.id
  );
  return data.listings.filter(
    (listing: { id: number }) => !currentIds.includes(listing.id)
  );
}
