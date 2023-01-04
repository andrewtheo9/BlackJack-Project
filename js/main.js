const suits = ['d', 'h', 'c', 's']
const faces = ['A', 'K', 'Q', 'J', '10', '09', '08', '07', '06', '05', '04', '03', '02']
const deck = []

function generateDeck() {
    suits.forEach(suit => {
       faces.forEach(face => {
        let score
        if(face ==='K'){
            score = 10
        }
            deck.push({
                'face': suit + face
            })
       })
    })
}

function renderDeck() {
    deck.forEach(card => {
        const cardEl = document.createElement('div')
        cardEl.className = 'card ' + card.face
        document.querySelector('body').append(cardEl)
    })
}

//shuffle the deck

function shuffleDeck() {
    deck.forEach((card, index) => {
        const randomIndex = Math.floor(Math.random() * (deck.length));
        deck[index] = deck[randomIndex];
        deck[randomIndex] = card;
    })
}


generateDeck()
renderDeck()