const newGameBtn = document.getElementById('button-new-game')
const createCardBtn = document.getElementById('create-card')
const showCardBtn = document.getElementById('show-card')
const hideCardBtn = document.getElementById('hide-card')
const removeCardBtn = document.getElementById('remove-card')
const moveCardBtn = document.getElementById('move-card')

let card = null;
miro.onReady(() => {


    newGameBtn.onclick = (e) => {
        console.log("new game");
        let deck = new Deck();
        deck.shuffle();
    }

    createCardBtn.onclick = (e) => {
        console.log("new card");
        if (card == null) {
            console.log("card create");
            card = new Card({id: "card_demo1", metadata: {population: 1234}});
            card.create().then(c => {console.log("ret card", c, card); card.show()});
        }
    }

    showCardBtn.onclick = (e) => {
        if (card != null) {
            console.log("show card");
            card.show();
        }
    }

    hideCardBtn.onclick = (e) => {
        if (card != null) {
            console.log("hide card");
            card.hide();
        }
    }

    removeCardBtn.onclick = (e) => {
        if (card != null) {
            console.log("remove card");
            card.destroy();
            card = null;
        }
    }
    moveCardBtn.onclick = (e) => {
        if (card != null) {
            console.log("move card");
            // let res = card.move(20, 20, 30);
            Animation.linear(card, 100, 40, 360, 800);
        }
    }
})
