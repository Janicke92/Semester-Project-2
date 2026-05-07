import { getAccessToken } from '../utils/storage.js';
import { TEMP_API_KEY } from './config.js';

export async function fetchListings(page = 1, limit = 100) {
    const response = await fetch(`https://v2.api.noroff.dev/auction/listings?page=${page}&limit=${limit}`);

    const result = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch listings');
    }

    return result;
}

export async function searchListings(query) {
    const response = await fetch(`https://v2.api.noroff.dev/auction/listings/search?q=${query}`);

    const result = await response.json();

    if (!response.ok) {
        throw new Error('Failed to search listings');
    }

    return result;
}

export async function fetchListingsByTag(tag) {
    const response = await fetch(`https://v2.api.noroff.dev/auction/listings?_tag=${tag}&_active=true`);

    const result = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch listings by tag');
    }

    return result;
}

export async function fetchListingById(id) {
    const response = await fetch(`https://v2.api.noroff.dev/auction/listings/${id}?_seller=true&_bids=true`);

    const result = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch listing');
    }

    return result;
}

export async function createListing(listingData) {
    const accessToken = getAccessToken();

    const response = await fetch('https://v2.api.noroff.dev/auction/listings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'X-Noroff-API-Key': TEMP_API_KEY,
        },
        body: JSON.stringify(listingData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || 'Failed to create listing');
    }

    return result;
}

export async function updateListing(id, listingData) {
    const accessToken = getAccessToken();

    const response = await fetch(`https://v2.api.noroff.dev/auction/listings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'X-Noroff-API-Key': TEMP_API_KEY,
        },
        body: JSON.stringify(listingData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || 'Failed to update listing');
    }

    return result;
}

export async function deleteListing(id) {
    const accessToken = getAccessToken();

    const response = await fetch(`https://v2.api.noroff.dev/auction/listings/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-Noroff-API-Key': TEMP_API_KEY,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete listing');
    }
}
