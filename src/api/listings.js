export async function fetchListings(page = 1, limit = 20) {
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
