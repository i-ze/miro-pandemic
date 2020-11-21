const START_CONFIG = [
    {}
];

class Pandemic {

    constructor() {
    }

    newGame() {
        this.cleanupTable().then(() => this.setupBoard());
    }

    cleanupTable() {
        return miro.board.widgets.get().then((widgets) => {
            console.log("WIDGETS ON BOARD", widgets);
        })
    }

    setupBoard() {
        //create board
        //list missing pieces
        function setupBoardElement(id, widgets, expectedConfig) {

        }

        //position pieces
        console.log("new game");
        this.playersCardsDeck = new Deck({
            cards: [
                this.createPlayerCard("tokio"),
                this.createPlayerCard("new york"),
                this.createPlayerCard("atlanta"),
                this.createPlayerCard("madrid"),
                this.createPlayerCard("kairo")
            ],
            faceVisible: false,
            background: 'missing url',
            x: 200,
            y: 200,
            scale: 0.7
        });
        this.playersCardsDeck.shuffle();


        this.infectionCardsDeck = new Deck({
            cards: [
                this.createInfectionCard("tokio2"),
                this.createInfectionCard("new york2"),
                this.createInfectionCard("atlanta2"),
                this.createInfectionCard("madrid2"),
                this.createInfectionCard("kairo2")],
            faceVisible: false,
            background: 'missing url2',
            x: 300,
            y: 600,
            scale: 0.7
        });
        this.infectionCardsDeck.shuffle();

        this.infectionCardsDiscardDeck = new Deck({cards: [], faceVisible: true, x: 100, y: 600});
    }

    createPlayerCard(cityName) {
        return new PlayerCard({city: cityName})
    }


    createInfectionCard(cityName) {
        return new InfectionCard({city: cityName})
    }


    drawPlayerCard() {
        this.playersCardsDeck.drawCard().then(card => {
            Animation.linear(card, -200, 0, 0, 800)
        })
    }

    drawInfectionCard() {
        this.infectionCardsDeck.drawCard().then(card => {
            Animation.linear(card, -200, 0, 0, 800)
        })
    }
}