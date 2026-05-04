export function isValidNoroffEmail(email) {
    return email.endsWith('@stud.noroff.no');
}

export function isValidPassword(password) {
    return password.length >= 8;
}

export function isValidName(name) {
    return !/[^\w]/.test(name);
}
