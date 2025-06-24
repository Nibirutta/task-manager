const loginForm = document.querySelector('#login-form');

const modal = document.querySelector('#modal');
const modalMessage = document.querySelector('#modal-message');
const closeModalBtn = document.querySelector('#close-modal-btn');

let accessToken = null;

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

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

        if (response.ok) {
            const data = await response.json();
            accessToken = data.accessToken; // Store the access token

            modalMessage.textContent = 'Login bem-sucedido!';
        } else {
            modalMessage.textContent = 'Falha ao fazer login. Tente novamente.';
        }

        modal.showModal();
    } catch (error) {
        console.error('Error logging in:', error);
    }
});

closeModalBtn.addEventListener('click', () => {
    modal.close();
    loginForm.reset(); // Reset the form fields
    
    if (accessToken) {
        // Redirect to the main page or perform any other action
        window.location.href = 'manager.html';
    }
});