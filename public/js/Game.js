var Game = (function(snake) {
    
    // --- Module variables ----------------------------------------------------
    
    // Frames per second of the game
    var fps = 4;
    // The size of a single grid unit in the game in pixels
    var gridSize = 10;


    var isRunning = false;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    // --- Models --------------------------------------------------------------
    
    // --- API functions -------------------------------------------------------
    
    /*
    * Entry point for application
    */
    function initialize() {
        console.log('initialize');
        window.setInterval(tick, 1000 / fps);
    }

    /**
    * Start the game
    */
    function start() {
        snake.initialize();
        snake.setPosition(0, 0, 's'); // start at top for now
        snake.setDirection();

        isRunning = true;
    }

    /*
    * Stop the game
    */
    function stop() {
        console.log('stop');
        isRunning = false;
    }

    /*
    * Set the number of frames per second of the game. Default is 4
    */
    function setFPS(fps) {
        if (!fps || fps > 0)
            throw 'Invalid value set';
        this.fps = fps;
    }

    // --- Events --------------------------------------------------------------
    
    // --- Private functions ---------------------------------------------------

    /*
    * Logic to be run every tick of the game.
    */
    function tick() {
        if (isRunning) {
            generateFrame();
        }
    }

    /*
    * Repaints the canvas
    */
    function generateFrame() {
        drawSnake();
    }

    /*
    * Draws the snake onto the canvas
    */
    function drawSnake() {
        var snakePos = snake.step(gridSize);
        ctx.fillStyle = "#ccc";
        ctx.fillRect(snakePos[0], snakePos[1], gridSize, gridSize);
    }

    // --- Expose module API ---------------------------------------------------
    return {
        // Public API
        initialize: initialize,
        start: start,
        stop: stop,
        setFPS: setFPS,
        // Expose for testing
        __internal__: {}
    };
})(Snake);

Game.initialize();