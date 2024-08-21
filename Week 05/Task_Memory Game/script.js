// Function to shuffle the array elements
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}

// Modal functionality
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

// Function to toggle the visibility of the modal
function toggleModal() {
  modal.classList.toggle("show-modal");
}

// Function to close the modal when clicking outside of it
function windowOnClick(event) {
  if (event.target === modal) {
      toggleModal();
  }
}

// Event listeners for modal
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

// Variables for game state
let cardTest = [];  // To store the current open cards
let cards = ["diamond", "diamond", "plane", "plane", "anchor", "anchor", "bolt", "bolt", "leaf", "leaf"
  , "bicycle", "bicycle", "cube", "cube", "bomb", "bomb"];

// Shuffle the cards
let shuffledCards = shuffle(cards);

// Function to create card elements in the DOM
function createCards() {
  for (let card of shuffledCards) {
      const li = document.createElement("LI");
      li.classList.toggle("card");
      const i = document.createElement("i");
      i.classList.toggle("fa");
      if (card === "plane") {
          i.classList.toggle("fa-paper-plane-o");
      } else {
          i.classList.toggle("fa-" + card);
      }
      const deck = document.querySelector('.deck');
      li.appendChild(i);
      deck.appendChild(li);
  }
}

const ul = document.querySelector('.deck');
let moves = document.querySelector(".moves");
let movesCounter = 0;
let match = 0;
let isfirstClick = true;
let timerID;
let isRestart = false;

// Function to initialize the game
function initGame() {
  createCards();
  const card = document.querySelectorAll('.card');
  for (let i = 0; i < card.length; i++) {
      card[i].addEventListener("click", function (event) {
          if (card[i] !== event.target) return;
          if (event.target.classList.contains("show")) return;
          if (isfirstClick) {
              timerID = setInterval(timer, 1000);  // Start timer
              isfirstClick = false;
          }
          showCard(event.target);
          setTimeout(addCard, 550, shuffledCards[i], event.target, cardTest, i);
      }, false);
  }
}

// Function to show the clicked card
function showCard(card) {
  card.classList.add('show');
}

// Function to add a card to the list for comparison
function addCard(card, cardHTML, testList, pos) {
  if (isRestart) {
      testList.length = 0; // Clear the list if restarting
      isRestart = false;
  }
  testList.push(card);
  testList.push(cardHTML)
  testList.push(pos);
  if (testList.length === 6) { // When two pairs are open
      updateMoveCounter(); // Update move counter
      testCards(testList[0], testList[1], testList[2], testList[3], testList[4], testList[5]); // Test for match
      testList.length = 0; // Reset test list
  }
}

// Function to compare two cards
function testCards(card1, html1, x1, card2, html2, x2) {
  if (card1 === card2 && x1 != x2) {
      cardsMatch(html1, html2); // Cards match
  } else {
      cardsDontMatch(html1, html2); // Cards don't match
  }
}

// Function for matched cards
function cardsMatch(card1, card2) {
  card1.classList.add('match');
  card2.classList.add('match');
  match++;
  if (match === 8) { // All matches found
      win(); // Player wins
  }
}

// Function for non-matched cards
function cardsDontMatch(card1, card2) {
  card1.classList.toggle('no-match');
  card2.classList.toggle('no-match');
  setTimeout(function () {
      card1.classList.toggle('no-match');
      card2.classList.toggle('no-match');
      card1.classList.toggle('show');
      card2.classList.toggle('show');
  }, 300);
}

// Function to handle winning the game
function win() {
  clearInterval(timerID);
  toggleModal();
  const stats = document.querySelector(".stats");
  if (s % 60 < 10) {
      stats.textContent = "You won in " + movesCounter + " moves with time: " + m + ":0" + s % 60;
  } else {
      stats.textContent = "You won in " + movesCounter + " moves with time: " + m + ":" + s % 60;
  }
}

// Function to update the move counter
function updateMoveCounter() {
  movesCounter++;
  moves.textContent = "Moves: " + movesCounter;
}

// Timer variables
let s = 0; 
let m = 0; 

// Timer function
function timer() {
  ++s;
  m = Math.floor(s / 60);
  let timer = document.querySelector(".timer");
  if (s % 60 < 10) {
      timer.textContent = "Elapsed Time: " + m + ":0" + s % 60;
  } else {
      timer.textContent = "Elapsed Time: " + m + ":" + s % 60;
  }
}

// Restart game functionality
let restart = document.querySelector(".restart");
restart.addEventListener("click", restartGame, false);

// Function to restart the game
function restartGame() {
  clearInterval(timerID);
  movesCounter = 0;
  match = 0;
  s = 0;
  m = 0;
  isfirstClick = true;
  isRestart = true;
  const deck = document.querySelector('.deck');
  var elements = deck.getElementsByClassName("card");

  // Remove all card elements from the deck
  while (elements[0]) {
      elements[0].parentNode.removeChild(elements[0]);
  }
  
  shuffledCards = shuffle(cards); // Shuffle cards for a new game
  let timer = document.querySelector(".timer");
  timer.textContent = "Elapsed Time: 0:00";
  moves.textContent = "Moves: " + movesCounter;

  initGame(); // Initialize new game
}

// New game button functionality
const newGameButton = document.querySelector(".new-game");
newGameButton.addEventListener("click", newGame);

// Function to start a new game
function newGame() {
  toggleModal();
  restartGame();
}

// Initialize the game on page load
initGame();
