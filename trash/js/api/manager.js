document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3000/user/refresh', {
        method: 'GET',
        credentials: 'include' // Include cookies in the request
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Manager Data:', data);
    } else {
        window.location.href = 'login.html'; // Redirect to login if not logged in
    }
});