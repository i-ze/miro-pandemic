const START_CONFIG = [
    {}
];

const CITY_NAMES = ["Kairo", "New York", "Madrid", "Paris"];
const EVENT_CARDS = ["Légifuvar", "Csendes éj", "Kormányzati támogatás"];

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
            cards: this.createPlayerCards(3),
            faceVisible: false,
            background: 'missing url',
            x: 690,
            y: 745,
            scale: 0.7
        });
        this.playersCardsDeck.shuffle();

        this.infectionCardsDeck = new Deck({
            cards: [
                this.createInfectionCard("tokio"),
                this.createInfectionCard("new york"),
                this.createInfectionCard("atlanta"),
                this.createInfectionCard("madrid"),
                this.createInfectionCard("kairo")],
            faceVisible: false,
            background: 'missing url2',
            x: 660,
            y: 185,
            scale: 0.7
        });
        this.infectionCardsDeck.shuffle();

        this.infectionCardsDiscardDeck = new Deck({cards: [], faceVisible: true, x: 100, y: 600});
    }

    createPlayerCards(numberOfEpidemicCards) {
        let epidemicCards = numberOfEpidemicCards >= 3 && numberOfEpidemicCards <= 5 ? numberOfEpidemicCards : 3;
        console.log("GAME DIFFICULTY SET TO", epidemicCards);

        let cards = [];
        for (let i in CITY_NAMES) {
            cards.push(this.createPlayerCard(CITY_NAMES[i]))
        }

        for (let i in EVENT_CARDS) {
            cards.push(this.createPlayerCard(EVENT_CARDS[i]))
        }

        Utils.shuffle(cards);
        let piles = cards.reduce((acc, card, idx, sourceArray) => {

            let numCards = sourceArray.length;
            let targetPileIdx = Math.max(epidemicCards - Math.floor((numCards - idx) / epidemicCards) - 1, 0);
            if(typeof acc[targetPileIdx] === "undefined")
            {
                acc[targetPileIdx] = [];
            }
            acc[targetPileIdx].push(card);
            //3 - Math.floor(10/3) -
            /*
            0..10
            0..2->(10-ből 0, 10-ből 1, 10-ből 2, 10-ből 3), 10/3 =->2, 9/3, 8/
            3..5->1
            6..
             */
            // const targetPileIdx = Math.floor(idx / epidemicCards);
            return acc;
        }, []);
        piles.forEach(pile => {pile.push(this.createPlayerCard("EPIDEMIC CARD"));Utils.shuffle(pile)});
        console.log("players card deck",piles.flat());
        return piles.flat();
    }

    createPlayerCard(cardLabel) {
        return new PlayerCard({label: cardLabel})
    }


    createInfectionCard(cityName) {
        return new InfectionCard({city: cityName})
    }


    drawPlayerCard() {
        this.playersCardsDeck.drawCard().then(card => {
            Animation.linear(card, -100, 0, 0, 800)
        })
    }

    drawInfectionCard() {
        this.infectionCardsDeck.drawCard().then(card => {
            Animation.linear(card, -140, 0, 0, 800)
        })
    }
}