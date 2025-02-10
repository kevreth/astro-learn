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
