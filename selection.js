

class SelectionMonitor {
    constructor() {
        this._selection = [];
        this.listeners = [];
        this.onSelectionUpdated = this.onSelectionUpdated.bind(this);
        miro.onReady(() => {
            // subscribe on user selected widgets
            miro.addListener(miro.enums.event.SELECTION_UPDATED, this.onSelectionUpdated)
            this.onSelectionUpdated()
        })
    }

    async onSelectionUpdated() {
        // Get selected widgets
        let widgets = await miro.board.selection.get()
        this._selection = widgets;
        console.log("widgets", widgets, this);
        for(let i in this.listeners)
        {
            const listener = this.listeners[i];
            try {
                console.log("calling listener",i,  widgets);
                listener(widgets);
            } catch (e) {
                console.error("error", e);
            }
        }
    }

    addSelectionListener(listener) {
        if (typeof listener === "function" && !this.listeners.some((item) => item === listener)) {
            this.listeners.push(listener);
            return true;
        } else {
            return false;
        }
    }

    removeSelectionListener(listener) {
        if (typeof listener === "function" && this.listeners.some((item) => item === listener)) {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
                return true;
            }
            return false;
        } else {
            return false;
        }
    }

    getSelection() {
        return this._selection;
    }

}

const BoardSelection = new SelectionMonitor()
