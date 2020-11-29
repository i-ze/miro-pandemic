class PlayerCard extends Component {
    constructor(props) {
        super(Object.assign({
            renderFn: DEFAULT_ITEM_SHAPE_RENDER_FN,
        }, props))
        let defaultStyle = {
            backgroundColor: props.color || "#a01a81",
            textColor: "#ffffff",
            shapeType: 7, /*3: rectangle, 4: circle, 7: rounded rectangle*/
        };
        this.style = Object.assign(defaultStyle, props.style);
        this.label = props.label;
    }


    get width() {
        return 120
    }

    get height() {
        return 170
    }

    get scale() {
        return 1
    }
}


class InfectionCard extends Component {
    constructor(props) {
        super(Object.assign({
            renderFn: DEFAULT_ITEM_SHAPE_RENDER_FN,
        }, props))

        this.city = props.city;
    }

    get label() {
        return this.city;
    }

    get style() {
        return {
            backgroundColor: "#3ba04a",
            textColor: "#ffffff",
            shapeType: 7, /*3: rectangle, 4: circle, 7: rounded rectangle*/
        }
    }

    get width() {
        return 170
    }

    get height() {
        return 120
    }

    get scale() {
        return 1
    }
}
