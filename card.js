const DEFAULT_ITEM_IMAGE_RENDER_FN = (card) => {
    let metadata = {};
    metadata[APP_ID] = typeof card.metadata === "object" ? card.metadata : {};
    let promise = miro.board.widgets.create({
        "type": "image",
        "text": "developer card",
        "metadata": metadata,
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


const DEFAULT_ITEM_SHAPE_RENDER_FN = (item) => {
    let metadata = {};
    console.log("shape render fn", item);
    metadata[APP_ID] = typeof item.metadata === "object" ? item.metadata : {};
    let promise = miro.board.widgets.create({
        "type": "shape",
        "metadata": metadata,
        clientVisible: item.visible || false,
        "text": item.label || (item.metadata && item.metadata.id ? "id:" + item.metadata.id : "UNKNOWN ITEM"),
        "style": item.style || {
            "backgroundColor": "#FF516A"
        },
        width: item.width || 100,
        height: item.height || 100
    });
    return promise.then(response => response[0]);
};

const DEFAULT_ITEM_REMOVE_FN = (item, element) => {
    return miro.board.widgets.deleteById([element.id])
}

const DEFAULT_ITEM_SHOW_FN = (item, element) => {
    return miro.board.widgets.update({id: element.id, clientVisible: true});
}

const DEFAULT_ITEM_HIDE_FN = (item, element) => {
    return miro.board.widgets.update({id: element.id, clientVisible: false});
}

const DEFAULT_ITEM_MOVE_FN = (item, element, deltaX, deltaY, deltaRotation) => {
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
        this.renderFn = typeof props.renderFn === "function" ? props.renderFn : DEFAULT_ITEM_IMAGE_RENDER_FN;
        this.removeFn = typeof props.removeFn === "function" ? props.removeFn : DEFAULT_ITEM_REMOVE_FN;
        this.showFn = typeof props.showFn === "function" ? props.showFn : DEFAULT_ITEM_SHOW_FN;
        this.hideFn = typeof props.hideFn === "function" ? props.hideFn : DEFAULT_ITEM_HIDE_FN;
        this.moveFn = typeof props.moveFn === "function" ? props.moveFn : DEFAULT_ITEM_MOVE_FN;
        this.element = null;

        this._updateElement = this._updateElement.bind(this);
    }


    create() {
        if (!this.element) {
            return this.renderFn(this).then(this._updateElement)
        } else {
            return Promise.reject("Element is already present");
        }
    }

    show() {
        if (this.element) {
            return this.showFn(this, this.element).then(this._single).then(this._updateElement)
        } else {
            return Promise.reject("Element is missing");
        }
    }

    hide() {
        if (this.element) {
            this.hideFn(this, this.element).then(this._single).then(this._updateElement)
        } else {
            return Promise.reject("Element is missing");
        }
    }

    destroy() {
        if (this.element) {
            return this.removeFn(this, this.element).then(() => null).then(this._updateElement)
        } else {
            return Promise.reject("Element is missing");
        }
    }

    move(deltaX, deltaY, deltaRotation) {
        if (this.element) {
            return this.moveFn(this, this.element, deltaX, deltaY, deltaRotation).then(this._single).then(this._updateElement)
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

class PlayerCard extends Card {
    constructor(props) {
        super(Object.assign(props, {
            renderFn: DEFAULT_ITEM_SHAPE_RENDER_FN,
        }))

        this.city = props.city;
    }

    get label() {
        return this.city;
    }

    get visible() {
        return true;
    }

    get style() {
        return {
            backgroundColor: "#385BA0",
            textColor: "#ffffff",
            shapeType: 7, /*3: rectangle, 4: circle, 7: rounded rectangle*/
        }
    }

    get width() {
        return 82
    }

    get height() {
        return 112
    }

    get scale() {
        return 1
    }
}


class InfectionCard extends Card {
    constructor(props) {
        super(Object.assign(props, {
            renderFn: DEFAULT_ITEM_SHAPE_RENDER_FN,
        }))

        this.city = props.city;
    }

    get label() {
        return this.city;
    }

    get visible() {
        return true;
    }

    get style() {
        return {
            backgroundColor: "#3ba04a",
            textColor: "#ffffff",
            shapeType: 7, /*3: rectangle, 4: circle, 7: rounded rectangle*/
        }
    }

    get width() {
        return 112
    }

    get height() {
        return 82
    }

    get scale() {
        return 1
    }
}
