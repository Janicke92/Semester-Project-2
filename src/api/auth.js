import { REGISTER_URL, LOGIN_URL } from './config.js';

export async function sendRegisterRequest(userData) {
    const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || 'Registration failed');
    }

    return result.data;
}

export async function sendLoginRequest(userData) {
    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || 'Login failed');
    }

    return result.data;
}
