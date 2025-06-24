const registerForm = document.querySelector('#register-form');

const modal = document.querySelector('#modal');
const modalMessage = document.querySelector('#modal-message');
const closeModalBtn = document.querySelector('#close-modal-btn');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        firstname: document.querySelector('#first-name').value,
        lastname: document.querySelector('#last-name').value,
        username: document.querySelector('#register-username').value,
        password: document.querySelector('#register-password').value
    };

    try {
        const response = await fetch('http://localhost:3000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            modalMessage.textContent = 'Usuário registrado com sucesso!';
        } else {
            if (response.status === 409) {
                modalMessage.textContent = 'Nome de usuário não disponível, tente novamente.';
            } else {
                modalMessage.textContent = 'Falha ao registrar usuário. Tente novamente.';
            }
        }

        modal.showModal();
    } catch (error) {
        console.error('Error registering user:', error);
    }
});

closeModalBtn.addEventListener('click', () => {
    modal.close();
    registerForm.reset(); // Reset the form fields
});