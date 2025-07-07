// Sample SEC games data (to be replaced with API later)
const games = [
    { team1: 'Alabama', score1: 14, team2: 'Auburn', score2: 7, status: '3rd Qtr' },
    { team1: 'LSU', score1: 21, team2: 'Ole Miss', score2: 10, status: 'Final' },
    { team1: 'Georgia', score1: 28, team2: 'Florida', score2: 17, status: '4th Qtr' },
    { team1: 'Tennessee', score1: 10, team2: 'Kentucky', score2: 3, status: '2nd Qtr' }
];

// DOM element
const ticker = document.getElementById('game-ticker');

// Populate ticker
function populateTicker() {
    let tickerContent = '';
    games.forEach(game => {
        tickerContent += `<span><span class="team">${game.team1}</span> <span class="score">${game.score1}</span> - <span class="score">${game.score2}</span> <span class="team">${game.team2}</span> | <span class="status">${game.status}</span></span>`;
    });
    // Duplicate content to ensure seamless scrolling
    ticker.innerHTML = tickerContent + tickerContent;
}

// Initialize
populateTicker();