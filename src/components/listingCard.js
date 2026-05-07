import { getTimeUntilDate } from '../utils/date.js';

const PLACEHOLDER_IMAGE = '/assets/images/placeholder-listing.jpg';

export function createListingCard(listing, onClick) {
    const item = document.createElement('article');

    if (onClick) {
        item.addEventListener('click', () => onClick(listing));
    }

    const image = createListingImage(listing);
    const title = createListingTitle(listing);
    const bids = createListingBids(listing);
    const endsAt = createListingEndsAt(listing);

    item.append(image, title, bids, endsAt);

    return item;
}

function createListingImage(listing) {
    const image = document.createElement('img');

    image.src = listing.media?.[0]?.url || PLACEHOLDER_IMAGE;
    image.alt = listing.media?.[0]?.alt || listing.title || 'Listing image';

    image.onerror = () => {
        image.src = PLACEHOLDER_IMAGE;
    };

    return image;
}

function createListingTitle(listing) {
    const title = document.createElement('h3');

    title.textContent = listing.title;

    return title;
}

function createListingBids(listing) {
    const bids = document.createElement('p');

    bids.textContent = `Bids: ${listing._count?.bids || 0}`;

    return bids;
}

function createListingEndsAt(listing) {
    const endsAt = document.createElement('p');

    endsAt.textContent = `Ends in: ${getTimeUntilDate(listing.endsAt)}`;

    return endsAt;
}
