import { getAccessToken } from '../utils/storage.js';
import { API_BASE_URL, TEMP_API_KEY } from './config.js';

export async function fetchProfile(name) {
    const response = await fetch(`${API_BASE_URL}/auction/profiles/${name}`, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            'X-Noroff-API-Key': TEMP_API_KEY,
        },
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch profile');
    }

    return result;
}

export async function fetchProfileListings(name) {
    const response = await fetch(`${API_BASE_URL}/auction/profiles/${name}/listings`, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            'X-Noroff-API-Key': TEMP_API_KEY,
        },
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch profile listings');
    }

    return result;
}

export async function fetchProfileBids(name) {
    const response = await fetch(`${API_BASE_URL}/auction/profiles/${name}/bids?_listings=true`, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            'X-Noroff-API-Key': TEMP_API_KEY,
        },
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch profile bids');
    }

    return result;
}

export async function updateProfile(name, profileData) {
    const response = await fetch(`${API_BASE_URL}/auction/profiles/${name}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
            'X-Noroff-API-Key': TEMP_API_KEY,
        },
        body: JSON.stringify(profileData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || 'Failed to update profile');
    }

    return result;
}
