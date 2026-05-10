import { clearAuthData, getAuthData } from '../utils/storage.js';
import { fetchProfile, fetchProfileListings, fetchProfileBids } from '../api/profiles.js';
import { createListingCard } from '../components/listingCard.js';
import { openModal, closeModal } from '../components/modal.js';
import { deleteListing } from '../api/listings.js';
import { setupRedirectSearch } from '../utils/search.js';

let selectedListing = null;

const PROFILE_PLACEHOLDER_IMAGE = '/assets/images/profile-placeholder.jpg';

export function initProfilePage() {
    const logoutBtn = document.querySelector('#logout-btn');
    const profileName = document.querySelector('#profile-name');

    if (!logoutBtn || !profileName) {
        return;
    }

    logoutBtn.addEventListener('click', handleLogout);

    const manageListingModal = document.querySelector('#manage-listing-modal');
    const closeManageListingModalBtn = document.querySelector('#close-manage-listing-modal-btn');

    closeManageListingModalBtn.addEventListener('click', () => {
        closeModal(manageListingModal);
    });

    const updateListingBtn = document.querySelector('#update-listing-btn');

    updateListingBtn.addEventListener('click', handleUpdateListing);

    const deleteListingBtn = document.querySelector('#delete-listing-btn');

    deleteListingBtn.addEventListener('click', handleDeleteListing);

    const updateProfileBtn = document.querySelector('#update-profile-btn');

    updateProfileBtn.addEventListener('click', handleUpdateProfile);

    loadProfilePage();

    setupRedirectSearch();
}

function handleLogout() {
    clearAuthData();
    window.location.href = '/index.html';
}

async function loadProfilePage() {
    const authData = getAuthData();

    if (!authData?.name) {
        window.location.href = '/login.html';
        return;
    }

    try {
        const result = await fetchProfile(authData.name);

        renderProfile(result.data);

        const listingsResult = await fetchProfileListings(authData.name);

        renderProfileListings(listingsResult.data);

        const bidsResult = await fetchProfileBids(authData.name);

        renderProfileBids(bidsResult.data);
    } catch (error) {
        console.error(error.message);
    }
}

function renderProfile(profile) {
    renderProfileName(profile.name);
    renderProfileEmail(profile.email);
    renderProfileCredits(profile.credits);
    renderProfileAvatar(profile.avatar);
}

function renderProfileName(name) {
    const element = document.querySelector('#profile-name');

    element.textContent = name;
}

function renderProfileEmail(email) {
    const element = document.querySelector('#profile-email');

    element.textContent = email;
}

function renderProfileCredits(credits) {
    const element = document.querySelector('#profile-credits');

    element.textContent = `${credits} credits`;
}

function renderProfileAvatar(avatar) {
    const image = document.querySelector('#profile-avatar');

    image.src = avatar?.url || PROFILE_PLACEHOLDER_IMAGE;
    image.alt = avatar?.alt || 'Profile avatar';
}

function renderProfileListings(listings) {
    const container = document.querySelector('#profile-listings-container');

    container.innerHTML = '';

    listings.forEach((listing) => {
        const card = createListingCard(listing, () => {
            openManageListingModal(listing);
        });

        container.append(card);
    });
}

function renderProfileBids(bids) {
    const container = document.querySelector('#profile-bids-container');

    container.innerHTML = '';

    bids.forEach((bid) => {
        const listing = bid.listing;

        if (!listing) {
            return;
        }

        const card = createListingCard(listing, () => {
            window.location.href = `/listing.html?id=${listing.id}`;
        });

        container.append(card);
    });
}

function openManageListingModal(listing) {
    selectedListing = listing;
    const modal = document.querySelector('#manage-listing-modal');
    const previewContainer = document.querySelector('#manage-listing-preview');

    previewContainer.innerHTML = '';

    const card = createListingCard(listing, () => {
        window.location.href = `/listing.html?id=${listing.id}`;
    });

    previewContainer.append(card);

    openModal(modal);
}

function handleUpdateListing() {
    if (!selectedListing) {
        return;
    }

    window.location.href = `/update-listing.html?id=${selectedListing.id}`;
}

async function handleDeleteListing() {
    if (!selectedListing) {
        return;
    }

    const shouldDelete = confirm('Are you sure you want to delete this listing?');

    if (!shouldDelete) {
        return;
    }

    try {
        await deleteListing(selectedListing.id);

        window.location.reload();
    } catch (error) {
        console.error(error.message);
    }
}

function handleUpdateProfile() {
    window.location.href = '/update-profile.html';
}
