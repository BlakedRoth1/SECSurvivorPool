// Ensure Firebase is loaded before running this script
if (typeof firebase === 'undefined') {
    console.error('Firebase SDK not loaded');
} else {
    const auth = firebase.auth();
    const db = firebase.firestore();

    // DOM elements
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const loginError = document.getElementById('login-error');

    // Debug: Confirm elements are found
    console.log('loginForm:', loginForm);
    console.log('usernameInput:', usernameInput);
    console.log('loginError:', loginError);

    // List of valid usernames (to be moved to Firestore later)
    const validUsernames = ['blake', 'user1', 'user2'];

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitted'); // Debug
            const username = usernameInput.value.trim();
            console.log('Username entered:', username); // Debug

            if (username) {
                if (validUsernames.includes(username)) {
                    console.log('Valid username, saving to localStorage:', username); // Debug
                    try {
                        localStorage.setItem('username', username);
                        console.log('Username saved, redirecting to index.html'); // Debug
                        window.location.href = 'index.html';
                    } catch (e) {
                        console.error('Error saving to localStorage:', e);
                        loginError.textContent = 'An error occurred. Please try again.';
                    }
                } else {
                    loginError.textContent = 'Invalid username. Please try again.';
                    console.log('Invalid username:', username); // Debug
                }
            } else {
                loginError.textContent = 'Please enter a username.';
            }
        });
    } else {
        console.error('Login form not found');
    }
}