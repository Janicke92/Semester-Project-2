export const MAX_IMAGES = 5;

export function createImageInput() {
    const input = document.createElement('input');

    input.type = 'url';
    input.classList.add('image-url-input');

    return input;
}

export function getImageInputCount(container) {
    return container.querySelectorAll('.image-url-input').length;
}

export function hasReachedImageLimit(container) {
    return getImageInputCount(container) >= MAX_IMAGES;
}

export function addImageInput(container) {
    if (hasReachedImageLimit(container)) {
        alert(`Maximum ${MAX_IMAGES} images allowed`);

        return;
    }

    const input = createImageInput();

    container.append(input);
}

export function getTitleValue() {
    const input = document.querySelector('#listing-title');

    return input.value.trim();
}

export function getDescriptionValue() {
    const textarea = document.querySelector('#listing-description');

    return textarea.value.trim();
}

export function getTagsValue() {
    const input = document.querySelector('#listing-tags');

    return input.value.trim();
}

export function getTagsArray() {
    const tags = getTagsValue();

    if (!tags) {
        return [];
    }

    return tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
}

export function getMediaArray() {
    const imageInputs = document.querySelectorAll('.image-url-input');

    return Array.from(imageInputs)
        .map((input) => input.value.trim())
        .filter(Boolean)
        .map((url) => ({
            url,
            alt: '',
        }));
}

export function getDeadlineValue() {
    const input = document.querySelector('#listing-deadline');

    return input.value;
}

export function getListingFormData() {
    return {
        title: getTitleValue(),
        description: getDescriptionValue(),
        tags: getTagsArray(),
        media: getMediaArray(),
        endsAt: getEndsAtISODate(),
    };
}

export function getEndsAtISODate() {
    const deadline = getDeadlineValue();

    return new Date(deadline).toISOString();
}

export function populateListingForm(listing) {
    setInputValue('#listing-title', listing.title);
    setInputValue('#listing-tags', listing.tags?.join(', '));
    setTextareaValue('#listing-description', listing.description);
    populateImageInputs(listing.media);
}

function setInputValue(selector, value) {
    const input = document.querySelector(selector);

    input.value = value || '';
}

function setTextareaValue(selector, value) {
    const textarea = document.querySelector(selector);

    textarea.value = value || '';
}

function populateImageInputs(media = []) {
    const container = document.querySelector('#image-input-container');

    container.innerHTML = '';

    if (!media.length) {
        addImageInput(container);
        return;
    }

    media.slice(0, MAX_IMAGES).forEach((image) => {
        const input = createImageInput();

        input.value = image.url;

        container.append(input);
    });
}

export function getUpdateListingFormData() {
    return {
        title: getTitleValue(),
        description: getDescriptionValue(),
        tags: getTagsArray(),
        media: getMediaArray(),
    };
}
