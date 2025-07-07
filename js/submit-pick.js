// Ensure Firebase is loaded
if (typeof firebase === 'undefined') {
    console.error('Firebase SDK not loaded');
} else {
    const db = firebase.firestore();

    // DOM elements
    const currentWeek = document.getElementById('current-week');
    const availableTeams = document.getElementById('available-teams');
    const usedTeams = document.getElementById('used-teams');
    const selectedTeam = document.getElementById('selected-team');
    const submitPickBtn = document.getElementById('submit-pick-btn');
    const pickError = document.getElementById('pick-error');
    const logoutBtn = document.getElementById('logout-btn');

    // SEC teams
    const secTeams = [
        'Alabama', 'Arkansas', 'Auburn', 'Florida', 'Georgia', 'Kentucky', 'LSU',
        'Mississippi State', 'Missouri', 'Oklahoma', 'Ole Miss', 'South Carolina',
        'Tennessee', 'Texas', 'Texas A&M', 'Vanderbilt'
    ];

    // Hardcoded previously picked teams (to be fetched from Firestore later)
    const previouslyPicked = ['Alabama', 'LSU'];

    // Check if user is logged in
    const username = localStorage.getItem('username');
    console.log('Username on submit-pick:', username); // Debug
    if (!username) {
        console.log('No username found, redirecting to login.html');
        window.location.href = 'login.html';
        return;
    }

    // Display current week
    let currentWeekNumber = 1;
    currentWeek.textContent = `Week: ${currentWeekNumber}`;

    let selectedTeamName = null;
    let selectedLogo = null;

    // Map team names to filename-friendly versions
    const teamToFilename = {
        'Alabama': 'alabama',
        'Arkansas': 'arkansas',
        'Auburn': 'auburn',
        'Florida': 'florida',
        'Georgia': 'georgia',
        'Kentucky': 'kentucky',
        'LSU': 'lsu',
        'Mississippi State': 'mississippi_state',
        'Missouri': 'missouri',
        'Oklahoma': 'oklahoma',
        'Ole Miss': 'ole_miss',
        'South Carolina': 'south_carolina',
        'Tennessee': 'tennessee',
        'Texas': 'texas',
        'Texas A&M': 'texas_a_m',
        'Vanderbilt': 'vanderbilt'
    };

    // Populate teams
    function populateTeams() {
        secTeams.forEach(team => {
            const img = document.createElement('img');
            const filename = teamToFilename[team];
            if (!filename) {
                console.error(`No filename mapping for team: ${team}`);
                return;
            }
            const logoPath = `assets/images/team-logos/${filename}.png`;
            img.src = logoPath;
            img.alt = `${team} Logo`;
            img.classList.add('team-logo');
            img.addEventListener('click', () => selectTeam(team, img));
            img.onerror = () => console.error(`Failed to load logo for ${team}: ${logoPath}`);
            console.log(`Attempting to load logo for ${team} at: ${logoPath}`);
            if (previouslyPicked.includes(team)) {
                usedTeams.appendChild(img);
            } else {
                availableTeams.appendChild(img);
            }
        });
    }

    // Select a team
    function selectTeam(team, img) {
        if (previouslyPicked.includes(team)) return;
        if (selectedLogo) {
            selectedLogo.classList.remove('selected');
        }
        selectedTeamName = team;
        selectedLogo = img;
        img.classList.add('selected');
        selectedTeam.textContent = `Selected Team: ${team}`;
        console.log(`Selected team: ${team}`);
    }

    // Handle pick submission
    submitPickBtn.addEventListener('click', () => {
        console.log('Submit Pick button clicked'); // Debug
        if (selectedTeamName && !previouslyPicked.includes(selectedTeamName)) {
            console.log(`Pick submitted: ${selectedTeamName} for Week ${currentWeekNumber}`);
            alert(`Pick submitted: ${selectedTeamName}`);
            previouslyPicked.push(selectedTeamName);
            selectedTeam.textContent = `Selected Team: None`;
            selectedTeamName = null;
            selectedLogo.classList.remove('selected');
            selectedLogo = null;
            console.log('Redirecting to index.html'); // Debug
            window.location.href = 'index.html';
        } else {
            pickError.textContent = 'Please select an available team.';
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        console.log('Logout button clicked'); // Debug
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    });

    // Initialize
    populateTeams();
}