import { getTimeUntilDate } from '../utils/date.js';

const PLACEHOLDER_IMAGE = '/assets/images/placeholder-image.jpg';

export function createListingCard(listing, onClick) {
    const item = document.createElement('article');
    item.classList.add('listing-card');
    item.classList.add('col-12', 'col-md-6');

    if (onClick) {
        item.addEventListener('click', () => onClick(listing));
    }

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('listing-card__image-container');

    const content = document.createElement('div');
    content.classList.add('listing-card__content');

    const image = createListingImage(listing);
    const title = createListingTitle(listing);
    const bids = createListingBids(listing);
    const endsAt = createListingEndsAt(listing);

    imageContainer.append(image);

    content.append(title, bids, endsAt);

    item.append(imageContainer, content);

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
