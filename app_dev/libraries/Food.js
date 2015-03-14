class Food {
    /**
     * Constructeur
     * @param GameEnvironment gameEnvironment
     *
     */
    constructor(gameEnvironment) {
        this.gameEnvironment = gameEnvironment;

        this.x = this.generateX();
        this.y = this.generateY();
        this.element = null;

        this.add();
    }

    /**
     * Ajoute de la nourriture
     *
     */
    add() {
        this.element = this.createElement();
    }

    /**
     * Retourne la position X de la nourriture
     * @return int
     *
     */
    getX() {
        return this.x;
    }

    /**
     * Retourne la position Y de la nourriture
     * @return int
     *
     */
    getY() {
        return this.y;
    }

    /**
     * Genere la position Y de la nourriture
     * @return int
     *
     */
    generateY() {
        var y = 0;
        var playHeight = this.gameEnvironment.playgroundHeight();

        do {
            y = Math.ceil(Math.random() * 300) + 0;
        } while (y <= 0 || y >= playHeight);

        return y;
    }

    /**
     * Genere la position X de la nourriture
     * @return int
     *
     */
    generateX() {
        var x = 0;
        var playWidth = this.gameEnvironment.playgroundWidth();

        do {
            x = Math.ceil(Math.random() * 500) + 0;
        } while (x <= 0 || x >= playWidth);

        return x;
    }

    /**
     * Ajoute la nourriture dans le DOM
     * @return object
     *
     */
    createElement() {
        var element = $(`<div id='jewel' style='top: ${this.getY()}px; left: ${this.getX()}px;'></div>`);

        this.gameEnvironment.playgroundElement().append(element);

        return $('#jewel');
    }

    /**
     * Retourne si de la nourriture est presente
     * @return boolean
     *
     */
    exist() {
        var jewels = $('#jewel');

        if (jewels.length > 0) {
            return true;
        }

        return false;
    }

    /**
     * Supprime la nourriture
     *
     */
    delete() {
        this.element.remove();
    }
}
