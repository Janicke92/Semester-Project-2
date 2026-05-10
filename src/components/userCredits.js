import { getAuthData, isLoggedIn } from '../utils/storage.js';
import { fetchProfile } from '../api/profiles.js';

export function renderAvailableCredits(profile) {
    const creditsElements = document.querySelectorAll('.available-credits');

    creditsElements.forEach((creditsElement) => {
        creditsElement.textContent = profile.credits;
    });
}

export async function initHeaderCredits() {
    const creditsContainer = document.querySelector('#credits-container');

    if (!creditsContainer) {
        return;
    }

    if (!isLoggedIn()) {
        creditsContainer.classList.add('d-none');
        return;
    }

    creditsContainer.classList.remove('d-none');

    const authData = getAuthData();

    if (!authData?.name) {
        return;
    }

    try {
        const result = await fetchProfile(authData.name);

        renderAvailableCredits(result.data);
    } catch (error) {
        console.error(error.message);
    }
}
