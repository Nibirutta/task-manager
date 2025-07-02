const registerForm = document.querySelector('#register-form');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        firstname: document.querySelector('#first-name').value,
        lastname: document.querySelector('#last-name').value,
        email: document.querySelector('#email').value,
        username: document.querySelector('#register-username').value,
        password: document.querySelector('#register-password').value
    };

    loadingOverlay.classList.remove('hidden'); // Show loading overlay

    try {
        const response = await fetch('http://localhost:3000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        loadingOverlay.classList.add('hidden'); // Hide loading overlay

        if (response.ok) {
            showModal("Usuário registrado com sucesso!",
                 redirectToLogin);
        } else {
            if (response.status === 409) {
                showModal("Nome de usuário ou email não disponível, tente novamente.",
                 () => {registerForm.reset()});
            } else {
                showModal("Falha ao registrar usuário, tente novamente.",
                 () => {registerForm.reset()});
            }
        }
    } catch (error) {
        console.error('Error registering user:', error);
    }
});

function redirectToLogin() {
    registerForm.reset(); // Reset the form fields
    window.location.href = 'login.html'; // Redirect to the login page
}