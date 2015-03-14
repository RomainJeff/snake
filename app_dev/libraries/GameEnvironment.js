class GameEnvironment {
    constructor(elements) {
        this.playground = {
            element: elements.playground,
            width: parseInt(elements.playground.css('width')),
            height: parseInt(elements.playground.css('height'))
        };
        this.menu = elements.menu;
        this.snake = elements.snake;
        this.queue = elements.queue;
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

    menuElement() {
        return this.menu;
    }

    snakeY() {
        return parseInt(this.snake.css('top'));
    }

    snakeX() {
        return parseInt(this.snake.css('left'));
    }

    snakeElement() {
        return this.snake;
    }

    queueElement() {
        return this.queue;
    }
}
