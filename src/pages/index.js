import { fetchListings, searchListings, fetchListingsByTag } from '../api/listings.js';
import { getTimeUntilDate } from '../utils/date.js';
import { sortByNewest, sortByEndingSoon, sortByMostPopular } from '../utils/sort.js';
import { filterActiveListings, filterInactiveListings } from '../utils/filter.js';

export async function initHomePage() {
    const result = await fetchListings();
    const listings = result.data;
    const meta = result.meta;

    const categoryButtons = document.querySelectorAll('[data-category]');
    const searchInput = document.querySelector('#search-input');
    const nextBtn = document.querySelector('#next-page-btn');
    const prevBtn = document.querySelector('#prev-page-btn');
    const sortRadios = document.querySelectorAll('input[name="sort"]');
    const filterRadios = document.querySelectorAll('input[name="filter"]');

    setupCategoryFilters(categoryButtons);
    setupSearch(searchInput);
    setupPaginationButtons(prevBtn, nextBtn, meta);
    setupSortOptions(sortRadios, listings);
    setupFilterOptions(filterRadios, listings);

    renderListings(listings);
}

function renderListings(listings) {
    const container = document.querySelector('#listings-container');

    container.innerHTML = '';

    listings.forEach((listing) => {
        const item = document.createElement('div');

        item.addEventListener('click', () => {
            window.location.href = `/listing.html?id=${listing.id}`;
        });

        const image = document.createElement('img');
        image.src = listing.media?.[0]?.url || '';
        image.alt = listing.media?.[0]?.alt || 'Listing image';

        image.onerror = () => {
            image.src = 'https://placehold.co/300x200?text=No+Image';
        };

        const title = document.createElement('h3');
        title.textContent = listing.title;

        const bids = document.createElement('p');
        bids.textContent = `Bids: ${listing._count?.bids || 0}`;

        const endsAt = document.createElement('p');
        endsAt.textContent = `Ends in: ${getTimeUntilDate(listing.endsAt)}`;

        item.appendChild(image);
        item.appendChild(title);
        item.appendChild(bids);
        item.appendChild(endsAt);

        container.appendChild(item);
    });
}

function setupSortOptions(sortRadios, listings) {
    sortRadios.forEach((radio) => {
        radio.addEventListener('change', () => {
            if (radio.value === 'newest' && radio.checked) {
                const sorted = sortByNewest(listings);
                renderListings(sorted);
            }

            if (radio.value === 'endingSoon' && radio.checked) {
                const sorted = sortByEndingSoon(listings);
                renderListings(sorted);
            }

            if (radio.value === 'mostPopular' && radio.checked) {
                const sorted = sortByMostPopular(listings);
                renderListings(sorted);
            }
        });
    });
}

function setupFilterOptions(filterRadios, listings) {
    filterRadios.forEach((radio) => {
        radio.addEventListener('change', () => {
            if (radio.value === 'active' && radio.checked) {
                const filtered = filterActiveListings(listings);
                renderListings(filtered);
            }

            if (radio.value === 'inactive' && radio.checked) {
                const filtered = filterInactiveListings(listings);
                renderListings(filtered);
            }
        });
    });
}

function setupPaginationButtons(prevBtn, nextBtn, initialMeta) {
    let currentPage = initialMeta.currentPage;

    if (currentPage === 1) {
        prevBtn.disabled = true;
    }

    nextBtn.addEventListener('click', async () => {
        const nextPage = currentPage + 1;

        const result = await fetchListings(nextPage);
        const newListings = result.data;

        currentPage = result.meta.currentPage;

        prevBtn.disabled = currentPage === 1;

        renderListings(newListings);
    });

    prevBtn.addEventListener('click', async () => {
        const prevPage = currentPage - 1;

        if (prevPage < 1) {
            return;
        }

        const result = await fetchListings(prevPage);
        const newListings = result.data;

        currentPage = result.meta.currentPage;

        prevBtn.disabled = currentPage === 1;

        renderListings(newListings);
    });
}

function setupSearch(searchInput) {
    searchInput.addEventListener('keydown', async (event) => {
        if (event.key !== 'Enter') {
            return;
        }

        const query = searchInput.value;

        if (!query) {
            const result = await fetchListings();
            renderListings(result.data);
            return;
        }

        const result = await searchListings(query);
        renderListings(result.data);
    });
}

function setupCategoryFilters(buttons) {
    buttons.forEach((button) => {
        button.addEventListener('click', async () => {
            const category = button.dataset.category;

            const result = await fetchListingsByTag(category);
            renderListings(result.data);
        });
    });
}
