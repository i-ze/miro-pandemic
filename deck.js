/*
* [0.....N] cards
* N: bottom of the deck,
* 0: top of the deck:
* draw: return card at 0 positions
* draw from bottom: return card at Nth position
* add card: inject (splice) at pos 0
* add card to bottom:  push (to N+1th pos)
* */

class Deck extends Component {
    /*
    props: {
    cards:
    }
     */
    constructor(props) {
        super(Object.assign({renderFn: DEFAULT_ITEM_IMAGE_RENDER_FN}, props));

        this.pile = Array.isArray(props.cards) ? props.cards : [];
        this.url = props.backgroundImage || null;
        this.faceVisible = props.faceVisible || false;
        this.x = props.x;
        this.y = props.y;
        this.name = props.name;
        this.scale = props.scale;
    }

    shuffle() {
        this.pile = Utils.shuffle(this.pile);
        console.log(this.name, "deck after shuffle", this.pile)
        //TODO update pile elements' "z-index" (order)
        this.render(); //TODO element is still creating
    }

    addCard(card) {
        this.pile.splice(0, 0, card);
        console.log("adding card ", card, " to", this);
        this.render();
    }

    addCardToBottom(card) {
        console.log("adding card ", card, " to the bottom of the deck", this);
        this.pile.push(card);
        this.render();
    }


    drawCard() {
        if (this.pile.length > 0) {
            let drawnCard = this.pile.shift();
            console.log("Húzott lap:", drawnCard.label);
            const thisDeck = this;
            this.render();
            return drawnCard.create({x: this.x, y: this.y})
                .then(card => drawnCard.update(thisDeck.x, thisDeck.y))
        } else {
            return Promise.reject("Empty deck");
        }

    }

    removeAll() {
         const ret = this.pile;
         this.pile = [];
         return ret;
    }

    drawCardFromBottom() {
        if (this.pile.length > 0) {
            let drawnCard = this.pile.pop();
            console.log("Alulról húzott lap:", drawnCard.label);
            const thisDeck = this;
            this.render();
            return drawnCard.create({x: this.x, y: this.y})
                .then(card => drawnCard.update(thisDeck.x, thisDeck.y))
        } else {
            return Promise.reject("Empty deck");
        }
    }

    render() {
        //csak a hatlapot kell itt renderelni, amig van kartya a pakliban (+ esetleg azt, h hany kartya van meg a deckben)
        if (this.element === null && !this.faceVisible) {
            console.log("creating element for this", this.name , " el:", this.element, "faceVisible:", this.faceVisible);
            return this.create();
        } else {
            return Promise.resolve(this);
        }
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