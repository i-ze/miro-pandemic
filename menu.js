const newGameBtn = document.getElementById('button-new-game')
const createCardBtn = document.getElementById('create-card')
const showCardBtn = document.getElementById('show-card')
const hideCardBtn = document.getElementById('hide-card')
const removeCardBtn = document.getElementById('remove-card')
const moveCardBtn = document.getElementById('move-card')
const drawPlayerCardBtn = document.getElementById('draw-player-card')
const drawInfectionCardBtn = document.getElementById('draw-infection-card')
const drawBottomInfectionCardBtn = document.getElementById('draw-bottom-infection-card')
const mergeInfectionCardsBtn = document.getElementById('merge-infection-cards')

let card = null;
let pandemicGame = new Pandemic();
miro.onReady(() => {
    newGameBtn.onclick = (e) => {
        pandemicGame.newGame();
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

    drawPlayerCardBtn.onclick = (e) => {
        console.log("Játékoskártya húzás a pandemicGame.playerDeck-ből");
        pandemicGame.drawPlayerCard();
    }
    drawInfectionCardBtn.onclick = (e) => {
        console.log("[TODO] Fertőzéskártya húzás a pandemicGame.infectionDeck-ből");
        pandemicGame.drawInfectionCard();
    }
    drawBottomInfectionCardBtn.onclick = (e) => {
        console.log("[TODO] Fertőzéskártya húzás a pandemicGame.infectionDeck aljáról");
    }
    mergeInfectionCardsBtn.onclick = (e) => {
        console.log("[TODO] A kihúzott fertőzéskártyák megkeverése és visszahelyezése a fertőzéspakli tetejére");
    }

    //TODO fertőzéskártya kidobás a kihúzott fertőzéskártya deckből (véglegesen)
    //TODO következő 6 fertőzéskártya megtekintése, sorrendbe állítása, visszahelyezése

    pandemicGame.newGame();
})
