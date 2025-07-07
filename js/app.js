// DOM elements
const welcomeMessage = document.getElementById('welcome-message');
const userStatus = document.getElementById('user-status');
const currentWeek = document.getElementById('current-week');
const logoutBtn = document.getElementById('logout-btn');
const submitPickBtn = document.getElementById('submit-pick-btn');
const viewBoardBtn = document.getElementById('view-board-btn');

// Set initial week
let currentWeekNumber = 1;
currentWeek.textContent = `Week: ${currentWeekNumber}`;

// Check for logged-in user via localStorage
const username = localStorage.getItem('username');
console.log('Username on index:', username); // Debug
if (username) {
    welcomeMessage.textContent = `Welcome, ${username}`;
    userStatus.textContent = 'Status: Alive';
} else {
    console.log('No username found, redirecting to login.html'); // Debug
    window.location.href = 'login.html';
}

// Logout functionality
logoutBtn.addEventListener('click', () => {
    console.log('Logout button clicked'); // Debug
    localStorage.removeItem('username');
    window.location.href = 'login.html';
});

// Button actions
submitPickBtn.addEventListener('click', () => {
    console.log('Submit Pick button clicked, redirecting...');
    window.location.href = 'submit-pick.html';
});

viewBoardBtn.addEventListener('click', () => {
    console.log('View Board button clicked, redirecting...');
    window.location.href = 'view-board.html';
});

// Function to update week
function updateWeek() {
    currentWeekNumber = 1; // Hardcoded for now
    currentWeek.textContent = `Week: ${currentWeekNumber}`;
}

updateWeek();