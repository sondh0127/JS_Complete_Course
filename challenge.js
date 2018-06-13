
var scores, roundScore, activePlayer, gamePlaying, previousDice, winScore;

init();

document.querySelector('.btn-roll').addEventListener("click", function () {
    if (gamePlaying) {
        // 1. Random number
        // Math.floor(Math.random() * (max - min + 1)) + min;
        var dice = Math.floor(Math.random() * 6) + 1;
        console.log(dice);
        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Update the round score IF the rolled number was NOT as 1
        if (dice !== 1) {
            // Add score
            if (dice === 6 && previousDice === 6) {
                scores[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = '0';
                nextPlayer();
            } else {
                previousDice = dice;
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= winScore) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            // Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    winScore = document.getElementById('win_score').value;
    console.log('Win Score: '+ winScore);
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    // Next player
    previousDice = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // activePlayer = !activePlayer;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // remove and adding class on HTML
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
}

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector(`#current-${activePlayer}`).textContent = dice;
// document.querySelector(`#current-${activePlayer}`).innerHTML = '<em>' + dice + '</em>';










