var CanvasGrid = (function() {

    // --- Module variables ----------------------------------------------------
    var canvas;
    var ctx;

    var _gridData = [];
    var _squareSize;
    var _canvasBgColor = "#333";

    // --- Models --------------------------------------------------------------

    // --- API functions -------------------------------------------------------
    
    /**
     * Sets up the canvas and grid system. Canvas size determined based upon square size and
     * grid dimensions.
     * @param {canvasElement:canvas} - The DOM canvas element to draw on
     * @param {squareSize:int} - The size of the width/height of a single grid square
     * @param {xSquares:int} - The number of grid squares in the x-direction
     * @param {ySquares:int} - The number of grid squares in the y-direction
     */
    function initialize(canvasElement, squareSize, xSquares, ySquares) {
        if (!canvasElement || !canvasElement.getContext('2d'))
            throw "Invalid DOM element provided.";
        if (!squareSize || !xSquares || !ySquares)
            throw "Missing arguments";

        canvas = canvasElement;
        ctx = canvas.getContext('2d');

        canvas.width = squareSize * xSquares;
        canvas.height = squareSize * ySquares;

        for(var i = 0; i < xSquares; i++) {
            _gridData.push([]);

            for(var j = 0; j < ySquares; j++) {
                _gridData[i].push(null);
            }
        }

        _squareSize = squareSize;
    }

    /**
     * Set the value of a square in the grid
     * @param {vector: int[]} - the [x,y] coordinate
     * @param {color:string} - A hex string for a color code to use. Defaults to canvas background color
     */
    function setSquareColor(vector, color) {
        var x = vector[0];
        var y = vector[1];

        if (x == null || x < 0 || y == null || y < 0)
            throw "Coordinate values cannot be null or less than 0";
        if (!color)
            color = _canvasBgColor;

        _gridData[x][y] = color;
    }

    /**
     * Draws the current state onto the canvas
     */
    function draw() {
        _gridData.forEach(function(col, colIndex) {
            var x = _squareSize * colIndex;

            col.forEach(function(row, rowIndex) {
                var y = _squareSize * rowIndex;
                
                if (row) {
                    ctx.fillStyle = row;
                    ctx.fillRect(x, y, _squareSize, _squareSize);
                }
            });
        });
    }

    /**
    * Clears the CanvasGrid and the canvas
    */
    function clear() {
       // Clear the canvas
       canvas.width = canvas.width;
       // Clear grid data
       for (var i = 0; i < _gridData.length; i++) {
            for (var j = 0; j < _gridData[i].length; j++) {
                _gridData[i][j] = null;
            }
       }
   }

   /**
    * Returns true if the coordinates are within the grid. Else returns false
    * @param {vector: int[]} - the [x,y] coordinate
    */
    function in_Grid(vector) {
        var x = vector[0];
        var y = vector[1];
        
        if (x > _gridData.length || y > _gridData[0].length)
            return false;
        return true;
    }

    /*
     * Returns a random position on the canvas
     * @returns {int[]} - the grid coordinates of the position
    */
    function getRandomPosition() {
        return [randomInt(0, getRows() - 1), randomInt(0, getCols() - 1)];
    }

    /*
    * Returns true if vector1's x,y coordinates exactly match vector2's x,y
    *  @param {vector1:int[]} - The first position
    *  @param {vector2:int[]} - The second position
    */
    function isSamePosition(vector1, vector2) {
        if (!Array.isArray(vector1) || !Array.isArray(vector2) || vector1.length !== 2 || vector2.length !== 2 )
            throw "Arguments are not vectors";

        return (vector1[0] == vector2[0] && vector1[1] == vector2[1]);
    }

    // --- Events --------------------------------------------------------------
    
    // --- Private functions ---------------------------------------------------
    
    /*
     * Returns a random number between min (inclusive) and max (exclusive)
     * @param {min:int} - The floor number
     * @param {max:int} - The ceiling number
    */
    function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

    /**
     * Returns the number of rows in the grid (the y dimension of the grid)
     */
    function getRows() {
        return _gridData.length;
    }

    /**
     * Returns the number of columns in the grid (the x dimension of the grid)
     */
    function getCols() {
        return _gridData[0].length;
    }

    // --- Expose module API ---------------------------------------------------
    return {
        // Public API
        initialize: initialize,
        draw: draw,
        clear: clear,
        in_Grid: in_Grid,
        setSquareColor: setSquareColor,
        getRandomPosition: getRandomPosition,
        isSamePosition: isSamePosition,
        // Expose for testing
        __internal__: {}
    };
})();