
Container.gameEnvironment = new GameEnvironment({
    playground: $('#playground'),
    menu: $('#menu'),
    snake: $('#head'),
    queue: $('#queue')
});
Container.Food = new Food();
Container.Snake = new Snake();



/*********************/
/** EVENTS LISTENER **/
/*********************/

/**
 * Ecoute le click sur play
 */
$('#play').on('click', function () {
    Container.gameEnvironment.menuElement().fadeOut();
    Container.Snake.start();
});


/**
 * Ecoute les touches du clavier
 */
$(document).on('keydown', function (e) {
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
