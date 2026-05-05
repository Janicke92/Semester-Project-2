export function sortByNewest(listings) {
    return listings.sort((a, b) => {
        return new Date(b.created) - new Date(a.created);
    });
}

export function sortByEndingSoon(listings) {
    const now = new Date();

    const activeListings = listings.filter((listing) => {
        return new Date(listing.endsAt) > now;
    });

    return activeListings.sort((a, b) => {
        return new Date(a.endsAt) - new Date(b.endsAt);
    });
}

export function sortByMostPopular(listings) {
    return listings.sort((a, b) => {
        return (b._count?.bids || 0) - (a._count?.bids || 0);
    });
}
