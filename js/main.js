const sidebarBtn = document.querySelector('#sidebar-btn');
const sidebar = document.querySelector('#sidebar');

const logoutBtn = document.querySelector('#logout-btn');

const loadingOverlay = document.querySelector('.loading-overlay');

const modal = document.querySelector('#modal');
const modalMessage = document.querySelector('#modal-message');
const closeModalBtn = document.querySelector('#close-modal-btn');

sidebarBtn.addEventListener('click', () => {
    if (sidebar.classList.contains('expanded')) {
        sidebar.classList.remove('expanded');
    } else {
        sidebar.classList.add('expanded');
    }
});

logoutBtn.addEventListener('click', async () => {
    if (!await checkIfUserIsLoggedIn()) {
        return; // If the user is not logged in, do not proceed with logout
    }

    try {
        const response = await fetch('http://localhost:3000/user/logout', {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        });

        if (response.ok) {
            showModal("Logout realizado com sucesso!", () => {
                window.location.href = 'login.html'; // Redirect to the login page
            });
        } else {
            console.error('Failed to log out');
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
});

function showModal(message, onClose) {
    modalMessage.textContent = message;
    modal.showModal();

    closeModalBtn.addEventListener('click', () => {
        modal.close();
        if (onClose) onClose();
    }, { once: true }); // Ensure the event listener is removed after execution
}

async function checkIfUserIsLoggedIn() {
    loadingOverlay.classList.remove('hidden'); // Show loading overlay

    const response = await fetch('http://localhost:3000/user/refresh', {
        method: 'GET',
        credentials: 'include' // Include cookies in the request
    });

    loadingOverlay.classList.add('hidden'); // Hide loading overlay

    if (response.status === 200) {
        return true; // User is logged in
    } else {
        return false;
    }
}