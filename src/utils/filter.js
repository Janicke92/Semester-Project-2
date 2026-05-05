export function filterActiveListings(listings) {
    const now = new Date();

    return listings.filter((listing) => {
        return new Date(listing.endsAt) > now;
    });
}

export function filterInactiveListings(listings) {
    const now = new Date();

    return listings.filter((listing) => {
        return new Date(listing.endsAt) <= now;
    });
}
