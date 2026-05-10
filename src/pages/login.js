import { sendLoginRequest } from '../api/auth.js';
import { saveAuthData } from '../utils/storage.js';
import { setupRedirectSearch } from '../utils/search.js';

function displayLoginError(message) {
    const errorElement = document.getElementById('login-error');

    if (!errorElement) return;

    errorElement.textContent = message;
}

export function initLoginPage() {
    const form = document.getElementById('login-form');

    if (!form) return;

    form.addEventListener('submit', handleLoginFormSubmit);

    setupRedirectSearch();
}

async function handleLoginFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const data = getLoginFormData(form);

    displayLoginError('');

    try {
        const result = await sendLoginRequest(data);
        console.log('User logged in:', result);

        saveAuthData(result);

        window.location.href = 'index.html';
    } catch (error) {
        displayLoginError(error.message);
    }
}

function getLoginFormData(form) {
    const formData = new FormData(form);

    return {
        email: formData.get('email'),
        password: formData.get('password'),
    };
}
