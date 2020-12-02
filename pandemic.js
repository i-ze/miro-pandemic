const CITIES = {
    red: ["Ho Shi Minh-város", "Shanghai", "Sydney", "Szöul", "Bangkok", "Manila", "Peking", "Jakarta", "Oszaka", "Taipei", "Tokió", "Hong Kong"],
    yellow: ["Bueonos Aires", "Lima", "Sao Paulo", "Bogotá", "Lagos", "Mexikóváros", "Johannesburg", "Santiago", "Miami", "Kinshasa", "Kartúm", "Los Angeles"],
    blue: ["Milánó", "Essen", "Párizs", "San Francisco", "Atlanta", "Szentpétervár", "Washington", "London", "Montréal", "Chicago", "Ney York", "Madrid"],
    black: ["Rijád", "Isztambul", "Teherán", "Mumbai", "Kalkutta", "Bagdad", "Kairó", "Csennai", "Algír", "Karacsi", "Moszkva", "Delhi"],
};

const CITY_COLORS = {
    red: {bg: "#982525", text: "#e7e7e7"},
    yellow: {bg: "#d0ba2a", text: "#1c1c1c"},
    blue: {bg: "#316cdf", text: "#e7e7e7"},
    black: {bg: "#2f2f2f", text: "#e7e7e7"}
}

const EVENT_CARDS = ["Ellenálló lakosság (❌)", "Kormányzati támogatás (🏥)", "Légifuvar (🚁)", "Előrejelzés (👀)", "Csendes éjszaka (💤)"];

const ROLES = [
    {name: "Készenléti elemző", url: "images/role1.jpg"},
    {name: "Mikrobiológus", url: "images/role2.jpg"},
    {name: "Műveleti tiszt", url: "images/role3.jpg"},
    {name: "Karanténspecialista", url: "images/role4.jpg"},
    {name: "Diszpécser", url: "images/role5.jpg"},
    {name: "Orvos", url: "images/role6.jpg"},
    {name: "Kutató", url: "images/role7.jpg"}
]

class Pandemic {

    constructor() {
    }

    newGame() {
        this.cleanupTable().then(() => this.setupBoard());
    }

    cleanupTable() {
        return miro.board.widgets.get().then((widgets) => {
            let idsToDelete = [];

            for (let i in widgets) {
                let widget = widgets[i];
                if (widget.metadata[APP_ID] && widget.metadata[APP_ID]["is_pandemic_game_element"] === true) {
                    idsToDelete.push(widget.id);
                }
            }
            console.log("WIDGETS ON BOARD", widgets);
            console.log("To remove", idsToDelete);
            miro.board.widgets.deleteById(idsToDelete)
        })
    }

    setupBoard() {
        //create board
        //list missing pieces
        function setupBoardElement(id, widgets, expectedConfig) {

        }

        //position pieces
        this.playersCardsDeck = new Deck({
            name: "Játékoskártyák (húzópakli)",
            cards: this.createPlayerCards(5),
            faceVisible: false,
            backgroundImage: 'https://i.ibb.co/4PkBRMn/player-card.png',
            x: 794,
            y: 753,
            scale: 0.34,
            metadata: {
                "info": "Játékoskártyák húzópaklijának fedlapja"
            }
        });
        this.playersCardsDeck.render();

        this.infectionCardsDeck = new Deck({
            name: "Fertőzéskártyák (húzópakli)",
            cards: this.createInfectionCards(),
            faceVisible: false,
            backgroundImage: 'https://i.ibb.co/zVznjQD/infection-card.png',
            x: 850,
            y: 158,
            scale: 0.35,
            metadata: {
                "info": "Fertőzéskártyák húzópaklijának fedlapja"
            }
        });
        this.infectionCardsDeck.shuffle();

        this.infectionCardsDiscardDeck = new Deck({
            name: "Fertőzéskártyák (dobópakli)", cards: [], faceVisible: true, x: 100, y: 600,
            metadata: {
                "info": "Fertőzéskártyák dobópaklija"
            }
        });

        this.peekCardsDeck = new Deck({
            name: "Előrejelzés segítő pakli",
            cards: [],
            faceVisible: true,
            x: 200,
            y: 200,
            metadata: {info: "Előrejelzés segítő pakli"}
        });

        this.roleCardsDeck = new Deck({
            name: "Szerepkártya pakli",
            cards: this.createRoleCards(),
            faceVisible: true,
            x: 300,
            y: 500,
            metadata: {info: "Szerepkártya pakli"}
        })

        this.roleCardsDeck.shuffle();
    }

    createPlayerCards(numberOfEpidemicCards) {
        let epidemicCards = numberOfEpidemicCards >= 3 && numberOfEpidemicCards <= 6 ? numberOfEpidemicCards : 3;
        console.log("GAME DIFFICULTY SET TO", epidemicCards);

        let cards = [];
        for (let color in CITIES) {
            let cityNames = CITIES[color];
            for (let i in cityNames) {
                cards.push(this.createPlayerCard(cityNames[i], {
                    backgroundColor: CITY_COLORS[color].bg,
                    textColor: CITY_COLORS[color].text
                }))
            }
        }

        for (let i in EVENT_CARDS) {
            cards.push(this.createPlayerCard(EVENT_CARDS[i], {backgroundColor: "#ffcf4d", textColor: "#1c1c1c"}))
        }

        Utils.shuffle(cards);
        let piles = cards.reduce((acc, card, idx, sourceArray) => {

            let numCards = sourceArray.length;
            let targetPileIdx = Math.max(epidemicCards - Math.floor((numCards - idx) / epidemicCards) - 1, 0);
            if (typeof acc[targetPileIdx] === "undefined") {
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
        piles.forEach(pile => {
            pile.push(this.createPlayerCard("JÁRVÁNY", {backgroundColor: "#2a8c36", textColor: "#1c1c1c"}));
            Utils.shuffle(pile)
        });
        // console.log("players card deck",piles.flat());
        return piles.flat();
    }

    createPlayerCard(cardLabel, style) {
        return new PlayerCard({label: cardLabel, style})
    }


    createInfectionCard(cityName, style) {
        return new InfectionCard({city: cityName, style})
    }

    createRoleCard(roleName, url) {
        return new RoleCard({roleName, url})
    }


    drawPlayerCard() {
        this.playersCardsDeck.drawCard().then(card => {
            Animation.linear(card, -410 /* + this.playersCardsDeck.getSize()*10* kellene ide vmi counter, ami szamolja, hany van meg helyben*/, -100, 0, 800)
        })
    }

    drawInfectionCard() {
        this.infectionCardsDeck.drawCard().then(card => {
            this.infectionCardsDiscardDeck.addCard(card);
            return card
        }).then(card => {
            Animation.linear(card, -197 /*+ this.infectionCardsDiscardDeck.getSize()*10*/, 0, 0, 800)
        })
    }

    drawBottomInfectionCard() {
        this.infectionCardsDeck.drawCardFromBottom().then(card => {
            this.infectionCardsDiscardDeck.addCard(card);
            return card
        }).then(card => {
            Animation.linear(card, -197 /*+ this.infectionCardsDiscardDeck.getSize()*10*/, 0, 0, 800)
        })
    }

    mergeInfectionCards() {
        const cards = this.infectionCardsDiscardDeck.removeAll();
        let promises = [];
        for (let i in cards) {
            let card = cards[i];
            promises.push(card.destroy());
        }
        return Promise.all(promises).then((results) => {
            let newOrder = Utils.shuffle(cards);
            for (let i in newOrder) {
                let card = newOrder[i];
                this.infectionCardsDeck.addCard(card);
            }
            console.log("CARDS IN INFECTION DECK", this.infectionCardsDeck);
            return true;
        }).catch(reason => {
            console.log("Error", reason);
            return false;
        })
    }

    peekCards() {
        let peekFn = () => this.infectionCardsDeck.drawCard({
            style: {
                backgroundColor: "#922ad6",
                textColor: "#FFFFFF"
            }
        }).then(card => {
            this.peekCardsDeck.addCard(card);
            return card
        }).then(card => Animation.linear(card, -840 + this.peekCardsDeck.getSize() * 50, 0, 0, 800));

        let promise = Promise.resolve();
        for (let i = 0; i < 6; i++) {
            promise = promise.then((res) => {
                console.log("calling next peek, prev res", res);
                return peekFn()
            });
        }
        return promise;
    }

    returnSelectedPeekedCard() {
        const sel = BoardSelection.getSelection();
        if (sel.length == 1) {

            let card = this.peekCardsDeck.pile.find(card => {
                return card.element.id === sel[0].id
            })
            const thisRef = this;
            if (card != null) {
                const cardIdxInPile = this.peekCardsDeck.pile.indexOf(card);
                console.log("Found card:", card, cardIdxInPile);
                this.peekCardsDeck.drawCardAtIndex(cardIdxInPile).catch(reason => {
                    console.log("Can't create the card, right?", reason, "No worries, this is normal then.");
                    return "foo";
                }).then(() => {
                    console.log("animating", card, thisRef);
                    return Animation.linear(card, thisRef.infectionCardsDeck.x - card.element.x, 0, 0, 800)
                }).then(() => {
                    return thisRef.infectionCardsDeck.addCard(card);
                }).then(() => {
                    card.destroy();
                });
            }
        } else {
            return Promise.reject("Select (only) 1 card");
        }
    }

    removeSelectedInfectionCardFromGame() {
        const sel = BoardSelection.getSelection();
        if (sel.length == 1) {
            console.log("find", sel[0], this.infectionCardsDiscardDeck);
            let card = this.infectionCardsDiscardDeck.pile.find(card => {
                return card.element.id === sel[0].id
            })

            if (card != null) {
                const cardIdxInPile = this.infectionCardsDiscardDeck.pile.indexOf(card);
                console.log("Found card:", card, cardIdxInPile);
                this.infectionCardsDiscardDeck.drawCardAtIndex(cardIdxInPile).catch(reason => {
                    console.log("Can't create the card, right?", reason, "No worries, this is normal then.");
                    return "foo";
                }).then(() => {
                    card.destroy();
                });
            }
        }
    }

    drawRoleCard() {
        this.roleCardsDeck.drawCard().then(card => {
            Animation.linear(card, -160 + this.roleCardsDeck.getSize() * 30, 0, 0, 800)
        })
    }

    createInfectionCards() {
        let cards = [];
        for (let color in CITIES) {
            let cityNames = CITIES[color];
            for (let i in cityNames) {
                cards.push(
                    this.createInfectionCard(cityNames[i]))
            }
        }
        return cards;
    }

    createRoleCards() {
        let cards = [];
        for (let i in ROLES) {
            let roleConfig = ROLES[i];
            cards.push(this.createRoleCard(roleConfig.name, RESOURCES_HOST + roleConfig.url));
        }
        console.log("Roles cards", cards);
        return cards;

    }
}