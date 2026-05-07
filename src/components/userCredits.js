export function renderAvailableCredits(profile) {
    const creditsElement = document.querySelector('#available-credits');

    creditsElement.textContent = `${profile.credits} credits`;
}
