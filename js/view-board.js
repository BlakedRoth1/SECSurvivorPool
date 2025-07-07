// Ensure Firebase is loaded
if (typeof firebase === 'undefined') {
    console.error('Firebase SDK not loaded');
} else {
    const db = firebase.firestore();

    // DOM elements
    const picksTable = document.getElementById('picks-table');
    const picksTableBody = document.getElementById('picks-table-body');
    const logoutBtn = document.getElementById('logout-btn');

    // Sample data (to be replaced with Firestore later)
    const users = [
        { username: 'blake', status: 'alive' },
        { username: 'user1', status: 'alive' },
        { username: 'user2', status: 'eliminated' }
    ];

    const picks = [
        { week: 1, username: 'blake', team: 'Florida' },
        { week: 1, username: 'user1', team: 'Georgia' },
        { week: 1, username: 'user2', team: 'LSU' },
        { week: 2, username: 'blake', team: 'Texas' },
        { week: 2, username: 'user1', team: 'Missouri' }
    ];

    // Maximum number of weeks (for table rows)
    const maxWeeks = 3; // Adjust based on your season length

    // Populate table headers with users
    function populateTableHeaders() {
        const headerRow = picksTable.querySelector('thead tr');
        headerRow.innerHTML = '<th>Week</th>'; // Reset headers
        users.forEach(user => {
            const th = document.createElement('th');
            th.textContent = user.username;
            th.classList.add(user.status === 'alive' ? 'alive' : 'eliminated');
            headerRow.appendChild(th);
        });
    }

    // Populate table body with weeks and picks
    function populateTableBody() {
        picksTableBody.innerHTML = ''; // Clear existing rows
        for (let week = 1; week <= maxWeeks; week++) {
            const tr = document.createElement('tr');
            const weekCell = document.createElement('td');
            weekCell.textContent = `Week ${week}`;
            tr.appendChild(weekCell);

            users.forEach(user => {
                const td = document.createElement('td');
                const pick = picks.find(p => p.week === week && p.username === user.username);
                td.textContent = pick ? pick.team : '';
                tr.appendChild(td);
            });

            picksTableBody.appendChild(tr);
        }
    }

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    });

    // Initialize
    populateTableHeaders();
    populateTableBody();
}