import { sendRegisterRequest } from '../api/auth.js';
import { isValidNoroffEmail, isValidPassword, isValidName } from '../utils/validation.js';
import { setupRedirectSearch } from '../utils/search.js';

function displayRegisterError(message) {
    const errorElement = document.getElementById('register-error');

    if (!errorElement) return;

    errorElement.textContent = message;
}

export function initRegisterPage() {
    const form = document.getElementById('register-form');

    if (!form) return;

    form.addEventListener('submit', handleRegisterFormSubmit);

    setupRedirectSearch();
}

async function handleRegisterFormSubmit(event) {
    event.preventDefault();

    const form = event.target;

    const data = getRegisterFormData(form);

    const errors = [];

    if (!isValidNoroffEmail(data.email)) {
        errors.push('Email must be a @stud.noroff.no address');
    }

    if (!isValidPassword(data.password)) {
        errors.push('Password must be at least 8 characters');
    }

    if (!isValidName(data.name)) {
        errors.push('Name can only contain letters, numbers and underscores');
    }

    if (errors.length > 0) {
        displayRegisterError(errors.join(', '));
        return;
    }

    displayRegisterError('');

    try {
        const result = await sendRegisterRequest(data);
        console.log('User registered:', result);

        window.location.href = 'login.html';
    } catch (error) {
        displayRegisterError(error.message);
    }
}

function getRegisterFormData(form) {
    const formData = new FormData(form);

    const avatarUrl = formData.get('avatar');

    return {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        avatar: {
            url: avatarUrl,
            alt: `${formData.get('name')}'s avatar`,
        },
    };
}
