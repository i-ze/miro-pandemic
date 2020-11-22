const newGameBtn = document.getElementById('button-new-game')
const drawPlayerCardBtn = document.getElementById('draw-player-card')
const drawInfectionCardBtn = document.getElementById('draw-infection-card')
const drawBottomInfectionCardBtn = document.getElementById('draw-bottom-infection-card')
const mergeInfectionCardsBtn = document.getElementById('merge-infection-cards')

let pandemicGame = new Pandemic();
miro.onReady(() => {
    newGameBtn.onclick = (e) => {
        pandemicGame.newGame();
    }

    drawPlayerCardBtn.onclick = (e) => {
        console.log("Játékoskártya húzás a pandemicGame.playerDeck-ből");
        pandemicGame.drawPlayerCard();
    }
    drawInfectionCardBtn.onclick = (e) => {
        console.log("Fertőzéskártya húzás a pandemicGame.infectionDeck-ből");
        pandemicGame.drawInfectionCard();
    }
    drawBottomInfectionCardBtn.onclick = (e) => {
        console.log("Fertőzéskártya húzás a pandemicGame.infectionDeck aljáról");
        pandemicGame.drawBottomInfectionCard();
    }
    mergeInfectionCardsBtn.onclick = (e) => {
        console.log("[TODO] A kihúzott fertőzéskártyák megkeverése és visszahelyezése a fertőzéspakli tetejére");
        pandemicGame.mergeInfectionCards();
    }

    //TODO fertőzéskártya kidobás a kihúzott fertőzéskártya deckből (véglegesen)
    //TODO következő 6 fertőzéskártya megtekintése, sorrendbe állítása, visszahelyezése

    pandemicGame.newGame();
})
