export function openModal(modal) {
    modal.classList.remove('d-none');

    requestAnimationFrame(() => {
        modal.classList.add('modal-visible');
    });
}

export function closeModal(modal) {
    modal.classList.remove('modal-visible');

    setTimeout(() => {
        modal.classList.add('d-none');
    }, 250);
}
