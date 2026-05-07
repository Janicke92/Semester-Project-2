import { addImageInput, getListingFormData } from '../utils/listingForm.js';
import { createListing } from '../api/listings.js';

export function initCreateListingPage() {
    const form = document.querySelector('#create-listing-form');
    const addImageButton = document.querySelector('#add-image-button');
    const imageInputContainer = document.querySelector('#image-input-container');

    if (!form || !addImageButton || !imageInputContainer) return;

    addImageButton.addEventListener('click', () => {
        addImageInput(imageInputContainer);
    });

    form.addEventListener('submit', handleCreateListingFormSubmit);
}

async function handleCreateListingFormSubmit(event) {
    event.preventDefault();

    const listingData = getListingFormData();

    try {
        const result = await createListing(listingData);
        console.log('Listing created:', result);

        window.location.href = `listing.html?id=${result.data.id}`;
    } catch (error) {
        console.error(error.message);
    }
}
