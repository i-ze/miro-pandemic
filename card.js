const DEFAULT_CARD_RENDERER = (card) => {
    let promise = miro.board.widgets.create({
        "type": "image",
        "text": "developer card",
        //"metadata": card.metadata,
        clientVisible: false,
        // "style": {
        //     "backgroundColor": "#ff00ff"
        // },
        url: "https://i.pinimg.com/564x/c1/59/b4/c159b4738dae9c9d8d6417228024de8d.jpg",
        width: 60,
        height: 85,
        scale: 0.45
    });
    return promise.then(response => response[0]);
};

const DEFAULT_CARD_REMOVER = (card) => {
    return miro.board.widgets.deleteById([card.element.id])
}

const DEFAULT_CARD_SHOWER = (card, element) => {
    return miro.board.widgets.update({id: element.id, clientVisible: true});
}

const DEFAULT_CARD_HIDER = (card, element) => {
    return miro.board.widgets.update({id: element.id, clientVisible: false});
}

const DEFAULT_CARD_MOVER = (card, element, deltaX, deltaY, deltaRotation) => {
    return miro.board.widgets.transformDelta(element.id, deltaX, deltaY, deltaRotation);
}

class Card {
    /*
    props: {
      id: any,
      metadata:{
        lakossag: 1234,
        nev: "Atlanta"
      },
      renderer: function() {}
    }
     */
    constructor(props) {
        this.metadata = props.metadata;
        this.renderer = typeof props.renderer === "function" ? props.renderer : DEFAULT_CARD_RENDERER;
        this.remover = typeof props.remover === "function" ? props.remover : DEFAULT_CARD_REMOVER;
        this.shower = typeof props.shower === "function" ? props.remover : DEFAULT_CARD_SHOWER;
        this.hider = typeof props.hider === "function" ? props.remover : DEFAULT_CARD_HIDER;
        this.mover = typeof props.mover === "function" ? props.mover : DEFAULT_CARD_MOVER;
        this.element = null;

        this._updateElement = this._updateElement.bind(this);
    }


    create() {
        if (!this.element) {
            return this.renderer(this).then(this._updateElement)
        } else {
            return Promise.reject("Element is already present");
        }
    }

    show() {
        if (this.element) {
            return this.shower(this, this.element).then(this._single).then(this._updateElement)
        } else {
            return Promise.reject("Element is missing");
        }
    }

    hide() {
        if (this.element) {
            this.hider(this, this.element).then(this._single).then(this._updateElement)
        } else {
            return Promise.reject("Element is missing");
        }
    }

    destroy() {
        if (this.element) {
            return this.remover(this).then(() => null).then(this._updateElement)
        } else {
            return Promise.reject("Element is missing");
        }
    }

    move(deltaX, deltaY, deltaRotation) {
        if (this.element) {
            return this.mover(this, this.element, deltaX, deltaY, deltaRotation).then(this._single).then(this._updateElement)
        } else {
            return Promise.reject("Element is missing");
        }
    }

    _single(array) {
        return array[0];
    }

    _updateElement(result) {
        this.element = result;
        return this;
    }


}
