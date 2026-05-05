import { clearAuthData } from '../utils/storage.js';

export function initProfilePage() {
    const logoutBtn = document.querySelector('#logout-btn');

    if (!logoutBtn) {
        return;
    }

    logoutBtn.addEventListener('click', handleLogout);
}

function handleLogout() {
    clearAuthData();
    window.location.href = '/index.html';
}
