const loginForm = document.querySelector('#login-form');

document.addEventListener('DOMContentLoaded', async () => {
    if (await checkIfUserIsLoggedIn()) {
        window.location.href = 'manager.html'; // Redirect to manager page if already logged in
    }
});

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    loadingOverlay.classList.remove('hidden'); // Show loading overlay

    const formData = {
        username: document.querySelector('#login-username').value,
        password: document.querySelector('#login-password').value
    };

    try {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });

        loadingOverlay.classList.add('hidden'); // Hide loading overlay

        if (response.ok) {
            showModal("Login realizado com sucesso!", redirectToManager);
        } else {
            showModal("Falha ao fazer login, verifique suas credenciais e tente novamente.",
                 () => {loginForm.reset()});
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
});

function redirectToManager() {
    loginForm.reset(); // Reset the form fields
    window.location.href = 'manager.html'; // Redirect to the manager page
}