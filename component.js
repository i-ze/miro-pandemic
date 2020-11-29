const DEFAULT_ITEM_IMAGE_RENDER_FN = (item, props) => {
    let metadata = {};
    let override = typeof props === "object" ? props : {};
    metadata[APP_ID] = Object.assign({"is_pandemic_game_element":true}, item.metadata, props ? props.metadata: null);
    let promise = miro.board.widgets.create({
        "type": "image",
        "metadata": metadata,
        // clientVisible: item.visible || false,
        url: item.url || "https://i.pinimg.com/564x/c1/59/b4/c159b4738dae9c9d8d6417228024de8d.jpg",
        width: item.width || 60,
        // height: item.height || 85,
        scale: item.scale || 0.45,
        x: override.x || item.x || 0,
        y: override.y || item.y || 0
    });
    return promise.then(response => response[0]);
};


const DEFAULT_ITEM_SHAPE_RENDER_FN = (item, props) => {
    let metadata = {};
    let override = typeof props === "object" ? props : {};
    metadata[APP_ID] = Object.assign({"is_pandemic_game_element":true}, item.metadata, props ? props.metadata: null);
    let promise = miro.board.widgets.create({
        "type": "shape",
        "metadata": metadata,
        // clientVisible: item.visible || false,
        "text": item.label || (item.metadata && item.metadata.id ? "id:" + item.metadata.id : "UNKNOWN ITEM"),
        "style": props.style || item.style || {
            "backgroundColor": "#FF516A"
        },
        width: override.width || item.width || 100,
        height: override.height || item.height || 100,
        x: override.x || item.x || 0,
        y: override.y || item.y || 0
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

const DEFAULT_ITEM_UPDATE_FN = (item, element, x, y) => {
    return miro.board.widgets.update({id: element.id, x: x, y: y});
}

const DEFAULT_ITEM_MOVE_FN = (item, element, deltaX, deltaY, deltaRotation) => {
    return miro.board.widgets.transformDelta(element.id, deltaX, deltaY, deltaRotation);
}

class Component {
    constructor(props) {
        this.metadata = props.metadata;
        this.renderFn = typeof props.renderFn === "function" ? props.renderFn : DEFAULT_ITEM_IMAGE_RENDER_FN;
        this.removeFn = typeof props.removeFn === "function" ? props.removeFn : DEFAULT_ITEM_REMOVE_FN;
        this.showFn = typeof props.showFn === "function" ? props.showFn : DEFAULT_ITEM_SHOW_FN;
        this.hideFn = typeof props.hideFn === "function" ? props.hideFn : DEFAULT_ITEM_HIDE_FN;
        this.updateFn = typeof props.updateFn === "function" ? props.updateFn : DEFAULT_ITEM_UPDATE_FN;
        this.moveFn = typeof props.moveFn === "function" ? props.moveFn : DEFAULT_ITEM_MOVE_FN;
        this.element = null;

        this._updateElement = this._updateElement.bind(this);
    }


    create(props) {
        if (!this.element) {
            return this.renderFn(this, props).then(this._updateElement)
        } else {
            return Promise.reject("Element is already present");
        }
    }

    showLocal() {
        if (this.element) {
            return this.showFn(this, this.element).then(this._single).then(this._updateElement)
        } else {
            return Promise.reject("Element is missing");
        }
    }

    hideLocal() {
        if (this.element) {
            return this.hideFn(this, this.element).then(this._single).then(this._updateElement)
        } else {
            return Promise.reject("Element is missing");
        }
    }

    update(x, y) {
        if (this.element) {
            return this.updateFn(this, this.element, x, y).then(this._single).then(this._updateElement)
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
