const newGameBtn = document.getElementById('button-new-game')
const drawPlayerCardBtn = document.getElementById('draw-player-card')
const drawInfectionCardBtn = document.getElementById('draw-infection-card')
const drawBottomInfectionCardBtn = document.getElementById('draw-bottom-infection-card')
const mergeInfectionCardsBtn = document.getElementById('merge-infection-cards')
const removeCardBtn = document.getElementById('remove-card-from-game')
const peekCardsBtn = document.getElementById('peek-next-cards')
const returnPeekCardBtn = document.getElementById('return-peeked-card')
const drawRoleCardBtn = document.getElementById('draw-role-card')

let pandemicGame = new Pandemic();
miro.onReady(() => {
    newGameBtn.onclick = (e) => {
        pandemicGame.newGame();
    }

    drawPlayerCardBtn.onclick = (e) => {
        console.log("Játékoskártya húzás a playerDeck-ből");
        pandemicGame.drawPlayerCard();
    }
    drawInfectionCardBtn.onclick = (e) => {
        console.log("Fertőzéskártya húzás a infectionDeck-ből");
        pandemicGame.drawInfectionCard();
    }
    drawBottomInfectionCardBtn.onclick = (e) => {
        console.log("Fertőzéskártya húzás a infectionDeck aljáról");
        pandemicGame.drawBottomInfectionCard();
    }
    mergeInfectionCardsBtn.onclick = (e) => {
        console.log("A kihúzott fertőzéskártyák megkeverése és visszahelyezése a fertőzéspakli tetejére");
        pandemicGame.mergeInfectionCards();
    }

    removeCardBtn.onclick = (e) => {
        console.log("Kártya kidobása a fertőzés dobópakliból");
        pandemicGame.removeSelectedInfectionCardFromGame();
    }

    peekCardsBtn.onclick = (e) => {
        console.log("Előrejelzés + 6 kártya sorrendbe tétele");
        pandemicGame.peekCards();
    }
    returnPeekCardBtn.onclick = (e) => {
        console.log("Előrejelzés: kártya visszatétele a fertőzéspakliba");
        pandemicGame.returnSelectedPeekedCard();
    }

    drawRoleCardBtn.onclick = (e) => {
        console.log("Szerepkártya húzás");
        pandemicGame.drawRoleCard();
    }

    //TODO fertőzéskártya kidobás a kihúzott fertőzéskártya deckből (véglegesen)
    //TODO következő 6 fertőzéskártya megtekintése, sorrendbe állítása, visszahelyezése

    console.log("Environment:", IS_DEV_ENV ? "DEV" : "PROD");
    if (IS_DEV_ENV) {
        pandemicGame.newGame();
    }

})
