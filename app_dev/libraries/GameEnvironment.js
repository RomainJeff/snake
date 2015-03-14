class GameEnvironment {
    constructor(playground) {
        this.playground = {
            element: playground,
            width: parseInt(playground.css('width')),
            height: parseInt(playground.css('height'))
        };
    }

    playgroundElement() {
        return this.playground.element;
    }

    playgroundWidth() {
        return this.playground.width;
    }

    playgroundHeight() {
        return this.playground.height;
    }
}
