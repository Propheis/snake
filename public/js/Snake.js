var Snake = (function() {
    
    // --- Module variables ----------------------------------------------------
    var _direction = 's';
    
    // The array of vector coordinates of the body of the snake.
    // location[0] is the head of the snake.
    var _location  = [];

    // --- Models --------------------------------------------------------------

    // --- API functions -------------------------------------------------------
    
    /*
    * Initialize the snake with coordinates and a direction
    * @param {vectorPos:int[]} - The [x,y] position as an n=2 array
    * @param {direction:String} - A cardinal direction of travel. e.g. 's'
    */ 
    function initialize(vectorPos, direction) {
        if (!vectorPos || vectorPos.length != 2 || !direction)
            throw "Invalid arguments";

        _location  = [vectorPos];
        _direction = direction;
    }

    /*
    * Make the snake take a step.
    * @param {shouldGrow:bool} - If true, the snake will grow 1 unit longer when it steps.
    * @returns { [ int[] ] } = the new position of the snake
    */
    function step(shouldGrow) {
        

        // Prepend into the location array
        _location.unshift( getNextStep() );

        if (!shouldGrow) {
            // Remove last element from array
            _location.pop();
        }

        return getLocation();
    }

    /*
    * Returns the snake's head's current position as a vector
    * @return {int[]} - The [x,y] position of the snake's head
    */
    function getHeadPosition() {
        return _location[0];
    }

    /*
    * Returns the snake's location as an array of vectors
    */
    function getLocation() {
        return _location;
    }

    /*
    * Returns the current direction of the snake
    */
    function getDirection() {
        return _direction;
    }

    /*
    * Returns the length of the snake
    */
    function getLength() {
        return _location.length;
    }

    /*
    * Returns the snake's next step. Does not change the state of the snake.
    */
    function getNextStep() {
        var posX = _location[0][0],
            posY = _location[0][1];

        if (_direction === "n" || _direction === "s")
            posY = (_direction === "s") ? posY + 1 : posY - 1;
        else
            posX = (_direction === "e") ? posX + 1 : posX - 1;

        return [posX, posY];
    }

    /*
    * Set the new direction of the snake
    * @param {direction:String} = A cardinal direction of travel. e.g. 's'
    */
    function setDirection(direction) {
        _direction = direction;
    }

    /*
    * Returns true if the snake's body is overlapping itself anywhere.
    * @returns {bool} - True if snake ran into itself.
    */
    function ranIntoItself() {
        if (_location.length === 1)
            return false;

        for (var i = 0; i < _location.length / 2; i++) {
            var current = _location[i];

            for (var j = i + 1; j < _location.length; j++) {
                
                if (i == j)
                    continue;

                var other = _location[j];

                if (current[0] == other[0] && current[1] == other[1])
                    return true;
            }
        }
    }

    // --- Events --------------------------------------------------------------
    
    // --- Private functions ---------------------------------------------------
    
    // --- Expose module API ---------------------------------------------------
    return {
        // Public API
        initialize: initialize,
        step: step,
        getLocation: getLocation,
        getHeadPosition: getHeadPosition,
        getDirection: getDirection,
        getLength: getLength,
        getNextStep: getNextStep,
        setDirection: setDirection,
        ranIntoItself: ranIntoItself,
        // Expose for testing
        __internal__: {}
    };
})();