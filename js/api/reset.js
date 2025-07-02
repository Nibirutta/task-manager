const resetRequest = document.querySelector('#reset-request-form');
const resetPassword = document.querySelector('#reset-password-form');

const params = new URLSearchParams(window.location.search);

document.addEventListener('DOMContentLoaded', () => {
    const token = params.get('token');
    if (token) {
        resetRequest.classList.add('hidden'); // Hide the request form
        resetPassword.classList.remove('hidden'); // Show the reset password form
    } else {
        resetRequest.classList.remove('hidden'); // Show the request form
        resetPassword.classList.add('hidden'); // Hide the reset password form
    }   
});

resetRequest.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        email: document.querySelector('#reset-email').value
    };

    loadingOverlay.classList.remove('hidden'); // Show loading overlay

    try {
        const response = await fetch('http://localhost:3000/user/reset/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        loadingOverlay.classList.add('hidden'); // Hide loading overlay

        if (response.ok) {
            showModal("Email enviado com sucesso! Verifique sua caixa de entrada.", redirectToLogin);
        } else {
            showModal("Falha ao enviar email, verifique o email e tente novamente.", () => { resetRequest.reset() });
        }
    } catch (error) {
        console.error('Error sending reset email:', error);
    }
});

resetPassword.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const token = params.get('token');
    if (!token) {
        window.location.href = 'login.html'; // Redirect to login if no token is present

        return;
    }

    const newPassword = document.querySelector('#reset-password').value;
    const confirmPassword = document.querySelector('#reset-confirm-password').value;

    if (newPassword !== confirmPassword) {
        showModal("As senhas não coincidem. Por favor, tente novamente.", () => {
            resetPassword.reset(); // Reset the form fields
        });

        return;
    }

    const formData = {
        newPassword: newPassword
    };

    loadingOverlay.classList.remove('hidden'); // Show loading overlay

    try {
        const response = await fetch(`http://localhost:3000/user/reset/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        loadingOverlay.classList.add('hidden'); // Hide loading overlay

        if (response.ok) {
            showModal("Senha redefinida com sucesso! Você pode fazer login agora.", redirectToLogin);
        } else {
            showModal("Falha ao redefinir a senha, tente novamente.", () => { resetPassword.reset() });
        }
    } catch (error) {
        console.error('Error resetting password:', error);
    }
});

function redirectToLogin() {
    resetRequest.reset(); // Reset the form fields
    window.location.href = 'login.html'; // Redirect to the login page
}