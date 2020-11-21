miro.onReady(() => {
    // subscribe on user selected widgets
    miro.addListener(miro.enums.event.SELECTION_UPDATED, getWidget)
    // getWidget()
})


async function getWidget() {
    // Get selected widgets
    let widgets = await miro.board.selection.get()
    console.log("widgets", widgets);

}

class Deck {
    /*
    props: {
    cards:
    }
     */
    constructor(props) {
        // super(props);
        this.pile = Array.isArray(props.cards) ? props.cards : [];
        console.log("Created deck from the following cards", this.pile);
        this.element = null;
        this.render();
    }

    shuffle() {
        console.log("Deck before shuffle", this.pile)
        this.pile = Utils.shuffle(this.pile);
        console.log("Deck after shuffle", this.pile)
        this.render();
    }

    addCard() {
        //TODO add card to the top of the deck
    }

    addCardToBottom() {
        //NOT IMPLEMENTED
    }


    drawCard() {
        //TODO remove card from pile & make it visible (
        if(this.pile.length>0) {
            let drawnCard = this.pile.shift();
            console.log("Húzott lap:", drawnCard);

            this.render();
            return drawnCard.create().then(card => drawnCard.show()) //TODO nem mindig kell show(); van, h pont el kellene rejteni
            // return drawnCard.show();
        } else {
            return Promise.reject("Empty deck");
        }

    }

    drawCardFromBottom() {
        //TODO remove card from pile & make it visible
        this.render();
    }

    render() {
        //csak a hatlapot kell itt renderelni, amig van kartya a pakliban (+ esetleg azt, h hany kartya van meg a deckben)
    }

}

class Utils {
    static shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

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
}