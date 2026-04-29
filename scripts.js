const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;


  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * cards.length);
      card.style.order = randomPos;
    });
  }
  
  shuffle(); // run once on page load

  function resetGame() {
    lockBoard = true;
  
    resetBoard();
  
    cards.forEach(card => {
      card.classList.remove('flip');
      card.addEventListener('click', flipCard);
    });
  
    shuffle();
  
    lockBoard = false;
  }
  


cards.forEach(card => card.addEventListener('click', flipCard));

document.getElementById('reset-btn')
  .addEventListener('click', resetGame);
