class GameEnvironment {
    constructor(elements) {
        this.playground = {
            element: elements.playground,
            width: parseInt(elements.playground.offsetWidth),
            height: parseInt(elements.playground.offsetHeight)
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
        return parseInt(this.snake.style.top);
    }

    snakeX() {
        return parseInt(this.snake.style.left);
    }

    snakeElement() {
        return this.snake;
    }

    queueElement() {
        return this.queue;
    }

    queueChildren() {
        return document.querySelectorAll(`#${this.queue.id} div`);
    }

    queueLastChild() {
        return document.querySelector(`#${this.queue.id} div:last-child`);
    }
}
