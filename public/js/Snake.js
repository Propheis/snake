var Snake = (function() {
    
    // --- Module variables ----------------------------------------------------
    var direction,
        posX,
        posY;

    // --- Models --------------------------------------------------------------

    // --- API functions -------------------------------------------------------
    
    /*
    * Initialize the snake with coordinates and a direction
    * @param {xPos} - The x - coordinate of the head of the snake
    * @param {yPos} - The y - coordinate of the head of the snake
    * @param {direction:String} - A cardinal direction of travel. e.g. 's'
    */ 
    function initialize(xPos, yPos, direction) {
        posX = xPos;
        posY = yPos;
        direction = direction;
    }

    /*
    * Make the snake take a step.
    * @param {stepSize:int} - The distance to step
    * @returns {int[]} = the new position of the snake
    */
    function step(stepSize) {
        if (!stepSize)
            throw "Missing argument";

        if (direction === "n" || "s")
            posY = (direction === "s") ? posY + stepSize : posY - stepSize;
        else
            posX = (direction === "e") ? posX + stepSize : posX - stepSize;

        return getPosition();
    }

    /*
    * Returns this snake's current position as a vector
    * @return {int[]} - The x,y position of the snake's head
    */
    function getPosition() {
        return [posX, posY];
    }

    /*
    * Set the position of the snake's head
    * @param {x:int} - the x position of the snake's head
    * @param {y:int} - the y position of the snake's head
    */
    function setPosition(x, y) {
        posX = x;
        posY = y;
    }

    /*
    * Set the new direction of the snake
    * @param {direction:String} = A cardinal direction of travel. e.g. 's'
    */
    function setDirection(direction) {
        direction = direction;
    }

    // --- Events --------------------------------------------------------------
    
    // --- Private functions ---------------------------------------------------
    
    // --- Expose module API ---------------------------------------------------
    return {
        // Public API
        initialize: initialize,
        step: step,
        setPosition: setPosition,
        getPosition: getPosition,
        setDirection: setDirection,
        // Expose for testing
        __internal__: {}
    };
})();