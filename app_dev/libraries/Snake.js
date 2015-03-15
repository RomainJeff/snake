class Snake {
    /**
     * Constructeur
     * @param Queue queue
     *
     */
    constructor() {
        this.gameEnvironment = Container.gameEnvironment;

        this.position = {
            top: this.gameEnvironment.snakeY(),
            left: this.gameEnvironment.snakeX()
        };
        this.direction = "right";
        this.size = 8;
        this.speed = 80;
        this.queue = [];
        this.interval = null;
    }

    /**
     * Definie la direction du snake
     * @param string newDir
     *
     */
    setDirection(newDir) {
        this.direction = newDir;
    }

    /**
     * Retourne la direction
     * @return string
     *
     */
    getDirection() {
        return this.direction;
    }

    /**
     * Demare le jeu
     *
     */
    start() {
        this.interval = setInterval(this.moveInterval, this.speed);
    }

    /**
     * Interface l'object courant et l'interval
     * @return object
     *
     */
    moveInterval() {
        return Container.Snake.move(Container.Snake);
    }

    /**
     * Deplace le snake
     * @param object that
     *
     */
    move(that) {
        var top = that.position.top;
        var left = that.position.left;

        // Calcul la prochaine position du snake
        switch (that.getDirection()) {
            case 'bottom':
                top += that.size;
                break;
            case 'top':
                top -= that.size;
                break;
            case 'right':
                left += that.size;
                break;
            case 'left':
                left -= that.size;
                break;
            default:
                break;
        }

        // Quand le joueur sors de la zone de jeu
        if ((top > (that.gameEnvironment.playgroundHeight() - (that.size / 2)) || top < 0) || (left > that.gameEnvironment.playgroundWidth() || left < 0)) {
            var outOfRange = that.outOfRange(top, left);
            top = outOfRange[0];
            left = outOfRange[1];
        }

        // Quand la nourriture est mangee
        if (((top + that.size) >= Container.Food.getY() && top <= (Container.Food.getY() + that.size)) && ((left + that.size) >= Container.Food.getX() && left <= (Container.Food.getX() + that.size))) {
            Container.Food.delete();
            Container.Food = new Food();
            that.addQueue(2);
        }

        // Quand il se mord la queue il perd
        if (that.queue.indexOf((top +"_"+ left)) != -1) {
            this.loose();
            return false;
        }

        // Fait avancer le snake
        that.updateQueue(top, left);
    }

    /**
     * Ajoute le nombre de queue indique
     * @param int count
     *
     */
    addQueue(count) {
        for (var i = 0; i < count; i++) {
            this.addToQueue();
        }
    }

    /**
     * Ajoute un element a la queue
     *
     */
    addToQueue() {
        var lastChild = this.gameEnvironment.queueLastChild();

        var top = (lastChild == null) ? this.gameEnvironment.snakeElement().css('top') : parseInt(lastChild.style.top);
        var left = (lastChild == null) ? this.gameEnvironment.snakeElement().css('left') : parseInt(lastChild.style.left);
        var element = document.createElement(`div`);
            element.style.left = `${left}px`;
            element.style.top = `${top}px`;

        this.queue.push(top +"_"+ left);
        this.gameEnvironment.queueElement().appendChild(element);

        // Changement de niveau
        switch(this.queue.length) {
            case 20:
                this.speed(70);
                break;
            case 40:
                this.speed(60);
                break;
            case 50:
                this.speed(50);
                break;
            case 60:
                this.speed(40);
                break;
            case 70:
                this.speed(30);
                break;
            case 300:
                this.win();
                break;
        }
    }

    /**
     * Fait avancer la queue
     * @param int top
     * @param int left
     *
     */
    updateQueue(top, left) {
        var tmpTop = 0;
        var tmpLeft = 0;
        var pTop = top;
        var pLeft = left;
        var that = this;

        // Avancement de la tête
        this.position.top = top;
        this.position.left = left;

        this.gameEnvironment.snakeElement().css({
            top: `${this.position.top}px`,
            left: `${this.position.left}px`
        });

        var i = 0;

        // Prochains etats de la queue
        [].forEach.call(this.gameEnvironment.queueChildren(), function (el) {
            tmpTop = parseInt(el.style.top);
            tmpLeft = parseInt(el.style.left);
            that.queue[i] = pTop +"_"+ pLeft;

            el.style.left = `${pLeft}px`;
            el.style.top = `${pTop}px`;

            pTop = tmpTop;
            pLeft = tmpLeft;

            i++;
        });
    }

    /**
     * Permet la suppression des limites de la box
     * @param int top
     * @param int left
     * @return array
     *
     */
    outOfRange(top, left) {
        switch (this.direction) {
            case 'bottom':
                top = 0;
                break;
            case 'top':
                top = this.gameEnvironment.playgroundHeight() - 8;
                break;
            case 'left':
                left = this.gameEnvironment.playgroundWidth() - 8;
                break;
            case 'right':
                left = 0;
                break;
        }

        return [top, left];
    }

    /**
     * Definie la vitesse de deplacement
     * @param int speed
     *
     */
    setSpeed(speed) {
        this.speed = speed
    }

    /**
     * Reinitialise la queue
     *
     */
    resetQueue() {
        this.queue = [];
        this.gameEnvironment.queueElement().innerHTML = '';
    }

    /**
     * Reinitialise la tete
     *
     */
    resetHead() {
        clearInterval(this.interval);

        this.speed = 80;
        this.position = {top: 0, left: 0};
        this.gameEnvironment.snakeElement().css(this.position);
    }

    /**
     * Lorsque le joueur gagne
     *
     */
    win() {
        this.gameEnvironment.menuElement().children('h1').html('You win');
        this.gameEnvironment.menuElement().children('#play').html('play again');
        this.gameEnvironment.menuElement().fadeIn();

        this.resetHead();
        this.resetQueue();
    }

    /**
     * Lorsque le joueur perd
     *
     */
    loose() {
        this.gameEnvironment.menuElement().children('h1').html('You loose');
        this.gameEnvironment.menuElement().children('#play').html('try again');
        this.gameEnvironment.menuElement().fadeIn();

        this.resetHead();
        this.resetQueue();
    }
}
