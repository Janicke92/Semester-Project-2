export function setupRedirectSearch() {
    const searchInput = document.querySelector('#search-input');

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') {
            return;
        }

        const query = searchInput.value.trim();

        if (!query) {
            window.location.href = '/index.html';
            return;
        }

        window.location.href = `/index.html?search=${encodeURIComponent(query)}`;
    });
}
