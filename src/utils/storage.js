export function saveAuthData(data) {
    localStorage.setItem('auth', JSON.stringify(data));
}

export function getAuthData() {
    const data = localStorage.getItem('auth');
    return data ? JSON.parse(data) : null;
}

export function getAccessToken() {
    const auth = getAuthData();
    return auth?.accessToken || null;
}

export function clearAuthData() {
    localStorage.removeItem('auth');
}

export function isLoggedIn() {
    return Boolean(getAuthData()?.accessToken);
}
