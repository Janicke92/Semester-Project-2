import { getAuthData } from '../utils/storage.js';
import { fetchProfile, updateProfile } from '../api/profiles.js';
import { setupRedirectSearch } from '../utils/search.js';

export function initUpdateProfilePage() {
    const form = document.querySelector('#update-profile-form');

    if (!form) {
        return;
    }

    setupRedirectSearch();

    loadProfileForm();

    form.addEventListener('submit', handleUpdateProfileSubmit);
}

async function loadProfileForm() {
    const authData = getAuthData();

    if (!authData?.name) {
        window.location.href = '/login.html';
        return;
    }

    try {
        const result = await fetchProfile(authData.name);

        populateProfileForm(result.data);
    } catch (error) {
        console.error(error.message);
    }
}

function populateProfileForm(profile) {
    document.querySelector('#profile-bio').value = profile.bio || '';
    document.querySelector('#profile-avatar-url').value = profile.avatar?.url || '';
    document.querySelector('#profile-banner-url').value = profile.banner?.url || '';
}

async function handleUpdateProfileSubmit(event) {
    event.preventDefault();

    const authData = getAuthData();

    if (!authData?.name) {
        return;
    }

    const profileData = getProfileFormData();

    try {
        await updateProfile(authData.name, profileData);

        window.location.href = '/profile.html';
    } catch (error) {
        console.error(error.message);
    }
}

function getProfileFormData() {
    return {
        bio: document.querySelector('#profile-bio').value.trim(),
        avatar: {
            url: document.querySelector('#profile-avatar-url').value.trim(),
            alt: '',
        },
        banner: {
            url: document.querySelector('#profile-banner-url').value.trim(),
            alt: '',
        },
    };
}
