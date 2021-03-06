
Container.gameEnvironment = new GameEnvironment({
    playground: document.querySelector('#playground'),
    menu: document.querySelector('#menu'),
    snake: document.querySelector('#head'),
    queue: document.querySelector('#queue')
});
Container.Food = new Food();
Container.Snake = new Snake();



/*********************/
/** EVENTS LISTENER **/
/*********************/

/**
 * Ecoute le click sur play
 */
document.querySelector('#play').addEventListener('click', function () {
    Container.gameEnvironment.hideMenu();
    Container.Snake.start();
});


/**
 * Ecoute les touches du clavier
 */
document.addEventListener('keydown', function (e) {
    var direction = Container.Snake.getDirection();

    switch (e.keyCode) {
        case 40:
            direction = (direction != 'top') ? 'bottom' : direction;
            break;
        case 38:
            direction = (direction != 'bottom') ? 'top' : direction;
            break;
        case 37:
            direction = (direction != 'right') ? 'left' : direction;
            break;
        case 39:
            direction = (direction != 'left') ? 'right' : direction;
            break;
        default:
            break;
    }

    Container.Snake.setDirection(direction);
});
