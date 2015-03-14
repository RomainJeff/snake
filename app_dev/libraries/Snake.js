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
        this.interval = setInterval(this.moveInterval, 70);
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
        var top = parseInt($('#queue div:last-child').css('top'));
        var left = parseInt($('#queue div:last-child').css('left'));
        var element = $(`<div style='top: ${top}px; left: ${left}px'></div>`);

        this.queue.push(top +"_"+ left);
        this.gameEnvironment.queueElement().append(element);

        // Changement de niveau
        // switch(this.queue.length) {
        //     case 20:
        //         changeSpeed(50);
        //         break;
        //     case 40:
        //         changeSpeed(40);
        //         break;
        //     case 50:
        //         changeSpeed(30);
        //         break;
        //     case 300:
        //         win();
        //         break;
        // }
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

        // Prochains etats de la queue
        this.gameEnvironment.queueElement().children().each(function (i) {
            tmpTop = parseInt($(this).css('top'));
            tmpLeft = parseInt($(this).css('left'));
            that.queue[i] = pTop +"_"+ pLeft;

            $(this).css({
                left: `${pLeft}px`,
                top: `${pTop}px`
            });

            pTop = tmpTop;
            pLeft = tmpLeft;
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
}
