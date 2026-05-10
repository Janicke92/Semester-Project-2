import { API_BASE_URL, API_KEY } from './config.js';
import { getAccessToken } from '../utils/storage.js';

export async function placeBid(listingId, amount) {
    const response = await fetch(`${API_BASE_URL}/auction/listings/${listingId}/bids`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
            'X-Noroff-API-Key': API_KEY,
        },
        body: JSON.stringify({ amount }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || 'Failed to place bid');
    }

    return result;
}
