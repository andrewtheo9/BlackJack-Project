/*----- constants -----*/
const suits = ["d", "h", "c", "s"];
const faces = [
  "A",
  "K",
  "Q",
  "J",
  "10",
  "09",
  "08",
  "07",
  "06",
  "05",
  "04",
  "03",
  "02",
];
const PLAYERS = {
  1: {
    name: "Player",
  },
  "-1": {
    name: "Dealer",
  },
};

/*----- app's state (variables) -----*/
let winner, dealerHand, playerHand;
let playerScore = 0;
let dealerScore = 0;
let blackjack = 21;
let deck = [];

/*----- cached element references -----*/
const hitBtnEl = document.getElementById("hit-button");
const stayBtnEl = document.getElementById("stay-button");
const newGameBtnEl = document.getElementById("new-game-button");

/*----- event listeners -----*/
hitBtnEl.addEventListener("click", hitButtonClick);
newGameBtnEl.addEventListener("click", newGame);
stayBtnEl.addEventListener("click", stayButtonClick);

/*----- functions -----*/
function generateDeck() {
  suits.forEach((suit) => {
    faces.forEach((face) => {
      deck.push({
        face: face,
        suit: suit,
      });
    });
  });
}

function renderDeck() {
  dealerHand.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card " + card.suit + card.face;
    document.querySelector(".dealer-cards").append(cardEl);
  });
  playerHand.forEach((card) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card " + card.suit + card.face;
    document.querySelector(".player-cards").append(cardEl);
  });
}

//shuffle the deck
//https://stackoverflow.com/questions/73603123/function-for-shuffling-a-deck-of-cards-js

function shuffleDeck() {
  deck.forEach((card, index) => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    deck[index] = deck[randomIndex];
    deck[randomIndex] = card;
  });
}

// deal the cards

function dealCards() {
  const cardsToDeal = deck.splice(0, 4);
  dealerHand = [cardsToDeal[0], cardsToDeal[2]];
  playerHand = [cardsToDeal[1], cardsToDeal[3]];
  playerHand.forEach((card) => {
    //I want each face to have its own value and apply it to playerScore
    //Write the function
    playerScore = getPlayerCardScore(card, playerScore) + playerScore;
  });
  dealerHand.forEach((card) => {
    dealerScore = getDealerCardScore(card, dealerScore) + dealerScore;
  });
}

function hitButtonClick(event) {
  if (playerScore > 21) {
    return;
  }
  const cardArray = deck.splice(0, 1);
  const card = cardArray[0];
  playerHand.push(card);
  // I want to get the new card to be visible in the game
  const cardEl = document.createElement("div");
  cardEl.className = "card " + card.suit + card.face;
  document.querySelector(".player-cards").append(cardEl);
  playerScore = getPlayerCardScore(card, playerScore) + playerScore;
  if (playerScore > 21) {
    stayBtnEl.removeEventListener("click", stayButtonClick);
  }
}

function stayButtonClick(event) {
  hitBtnEl.removeEventListener("click", hitButtonClick);
  const newCardArray = deck.splice(0, 15);
  // Make dealer hit as many cards as he needs to until he gets >16
  newCardArray.forEach((card) => {
    if (dealerScore < 17) {
      dealerHand.push(card);
      const cardEl = document.createElement("div");
      cardEl.className = "card " + card.suit + card.face;
      document.querySelector(".dealer-cards").append(cardEl);
      dealerScore = getDealerCardScore(card, dealerScore) + dealerScore;
    }
  });
}

function getPlayerCardScore(card) {
  if (card.face === "K" || card.face === "J" || card.face === "Q") {
    return 10;
  } else if (card.face !== "A") {
    return parseInt(card.face);
  }
  // i want the ace to equal 1 if the playerScore is 11 or higher and 11 if the playerScore is 10 or lower
  if (card.face === "A") {
    if (playerScore > 10) {
      return 1;
    } else {
      return 11;
    }
  }
}

function getDealerCardScore(card) {
  if (card.face === "K" || card.face === "J" || card.face === "Q") {
    return 10;
  } else if (card.face !== "A") {
    return parseInt(card.face);
  }
  // i want the ace to equal 1 if the playerScore is 11 or higher and 11 if the playerScore is 10 or lower
  if (card.face === "A") {
    if (dealerScore > 10) {
      return 1;
    } else {
      return 11;
    }
  }
}

function newGame() {
  playerHand = null;
  dealerHand = null;
  winner = null;
  playerScore = 0;
  dealerScore = 0;
  deck = [];
  hitBtnEl.addEventListener("click", hitButtonClick);
  stayBtnEl.addEventListener("click", stayButtonClick);
  //remove the cards from the previous game on the table
  //clear out the .player-card div and .dealer-card div
  removeElementsByClass();
  init();
}

function init() {
  generateDeck();
  shuffleDeck();
  dealCards();
  renderDeck();
}

//https://stackoverflow.com/questions/4777077/removing-elements-by-class-name

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName("card");
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}
