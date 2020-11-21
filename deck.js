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
    this.pile = ["card_2", "card_3", "card_5", "card_1", "card_4"];


  }

  shuffle() {
    console.log("Deck before shuffle", this.pile)
    this.pile = Utils.shuffle(this.pile);
    console.log("Deck after shuffle", this.pile)
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