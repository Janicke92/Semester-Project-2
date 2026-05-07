import { fetchListingById } from '../api/listings.js';
import { renderListingGallery } from '../components/gallery.js';
import { openModal, closeModal } from '../components/modal.js';
import { isLoggedIn, getAuthData } from '../utils/storage.js';
import { fetchProfile } from '../api/profiles.js';
import { renderAvailableCredits } from '../components/userCredits.js';
import { placeBid } from '../api/bids.js';

export async function initListingPage() {
    const mainListingImage = document.querySelector('#main-listing-image');

    if (!mainListingImage) {
        return;
    }

    const listingId = getListingIdFromUrl();

    if (!listingId) {
        return;
    }

    const result = await fetchListingById(listingId);
    const listing = result.data;

    renderListingGallery(listing.media);
    renderListingDetails(listing);

    try {
        const auth = getAuthData();

        if (auth) {
            const profileResult = await fetchProfile(auth.name);

            renderAvailableCredits(profileResult.data);
        }
    } catch (error) {
        console.error(error);
    }

    setupBidButton();
    setupBidModal();
    setupBidForm(listingId);
}

function getListingIdFromUrl() {
    const params = new URLSearchParams(window.location.search);

    return params.get('id');
}

function renderListingDetails(listing) {
    const title = document.querySelector('#listing-title');
    const description = document.querySelector('#listing-description');
    const sellerName = document.querySelector('#listing-seller-name');
    const endsAt = document.querySelector('#listing-ends-at');
    const currentBid = document.querySelector('#listing-current-bid');
    const bidCount = document.querySelector('#listing-bid-count');
    const highestBid = getHighestBid(listing.bids);

    title.textContent = listing.title;

    description.textContent = listing.description || 'No description provided.';

    sellerName.textContent = listing.seller.name;

    endsAt.textContent = listing.endsAt;

    currentBid.textContent = `${highestBid} credits`;
    bidCount.textContent = listing._count.bids;
}

function getHighestBid(bids) {
    if (!bids.length) {
        return 0;
    }

    return bids[bids.length - 1].amount;
}

function setupBidButton() {
    const bidButton = document.querySelector('#make-bid-btn');

    if (!isLoggedIn()) {
        bidButton.textContent = 'Login to bid';

        bidButton.addEventListener('click', () => {
            window.location.href = '/login.html';
        });

        return;
    }

    bidButton.textContent = 'Make a bid';
}

function setupBidModal() {
    const modal = document.querySelector('#bid-modal');
    const openBtn = document.querySelector('#make-bid-btn');
    const closeBtn = document.querySelector('#close-bid-modal-btn');

    openBtn.addEventListener('click', () => {
        openModal(modal);
    });

    closeBtn.addEventListener('click', () => {
        closeModal(modal);
    });
}

function setupBidForm(listingId) {
    const form = document.querySelector('#bid-form');
    const amountInput = document.querySelector('#bid-amount');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const amount = Number(amountInput.value);

        try {
            await placeBid(listingId, amount);

            alert('Bid placed successfully!');
        } catch (error) {
            alert(error.message);
        }
    });
}
