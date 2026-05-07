import { addImageInput, populateListingForm, getUpdateListingFormData } from '../utils/listingForm.js';

import { fetchListingById, updateListing } from '../api/listings.js';

export function initUpdateListingPage() {
    const form = document.querySelector('#update-listing-form');
    const addImageButton = document.querySelector('#add-image-button');
    const imageInputContainer = document.querySelector('#image-input-container');

    if (!form || !addImageButton || !imageInputContainer) {
        return;
    }

    addImageButton.addEventListener('click', () => {
        addImageInput(imageInputContainer);
    });

    form.addEventListener('submit', handleUpdateListingFormSubmit);

    loadListing();
}

async function loadListing() {
    const params = new URLSearchParams(window.location.search);

    const listingId = params.get('id');

    if (!listingId) {
        return;
    }

    try {
        const result = await fetchListingById(listingId);

        populateListingForm(result.data);
    } catch (error) {
        console.error(error.message);
    }
}

async function handleUpdateListingFormSubmit(event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);

    const listingId = params.get('id');

    if (!listingId) {
        return;
    }

    const listingData = getUpdateListingFormData();

    try {
        const result = await updateListing(listingId, listingData);

        console.log('Listing updated:', result);

        window.location.href = `/listing.html?id=${listingId}`;
    } catch (error) {
        console.error(error.message);
    }
}
