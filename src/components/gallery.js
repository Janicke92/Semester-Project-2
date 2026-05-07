const MAX_GALLERY_IMAGES = 5;
const PLACEHOLDER_IMAGE = '/assets/images/placeholder-image.jpg';

export function renderListingGallery(media) {
    const mainImage = document.querySelector('#main-listing-image');
    const thumbnailsContainer = document.querySelector('#listing-thumbnails');
    const images = getGalleryImages(media);

    const prevBtn = document.querySelector('#prev-image-btn');
    const nextBtn = document.querySelector('#next-image-btn');

    clearThumbnails(thumbnailsContainer);

    if (images.length === 0) {
        showPlaceholderImage(mainImage);
        return;
    }

    showMainImage(mainImage, images[0]);
    renderThumbnails(images, thumbnailsContainer, mainImage);
    setupGalleryButtons(images, mainImage, prevBtn, nextBtn);
}

function getGalleryImages(media) {
    return media?.slice(0, MAX_GALLERY_IMAGES) || [];
}

function clearThumbnails(container) {
    container.innerHTML = '';
}

function showPlaceholderImage(mainImage) {
    mainImage.src = PLACEHOLDER_IMAGE;
    mainImage.alt = 'No listing image available';
}

function showMainImage(mainImage, image) {
    mainImage.src = image.url;
    mainImage.alt = image.alt || 'Listing image';
}

function renderThumbnails(images, container, mainImage) {
    images.forEach((image) => {
        const thumbnail = createThumbnail(image, mainImage);
        container.appendChild(thumbnail);
    });
}

function createThumbnail(image, mainImage) {
    const thumbnail = document.createElement('img');

    thumbnail.src = image.url;
    thumbnail.alt = image.alt || 'Listing thumbnail';

    thumbnail.addEventListener('click', () => {
        showMainImage(mainImage, image);
    });

    return thumbnail;
}

function setupGalleryButtons(images, mainImage, prevBtn, nextBtn) {
    let currentImageIndex = 0;

    nextBtn.addEventListener('click', () => {
        currentImageIndex++;

        if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }

        showMainImage(mainImage, images[currentImageIndex]);
    });

    prevBtn.addEventListener('click', () => {
        currentImageIndex--;

        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        }

        showMainImage(mainImage, images[currentImageIndex]);
    });
}
