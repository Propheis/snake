var Game = (function(snake, canvasGrid, mouseTrap) {
    
    // --- Module variables ----------------------------------------------------
    
    // Frames per second of the game

    var isRunning = false;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // For debugging
    var _growSnake = false;

    /////////////////////////
    //    CONFIGURATION    //
    /////////////////////////
    var fps = 24;

    var snakeColor = "#fff";
    var foodColor  = "#eded40";
    
    var squareSize = 10;
    var squaresX   = 100;
    var squaresY   = 75; 


    // --- Models --------------------------------------------------------------
    
    var Food = {
        position: null
    }

    // --- API functions -------------------------------------------------------
    
    /*
    * Entry point for application
    */
    function initialize() {
        canvasGrid.initialize(canvas, squareSize, squaresX, squaresY);
        snake.initialize( [Math.round(squaresX / 2), Math.round(squaresY / 2)], "s" );
        window.setInterval(tick, 1000 / fps);
    }

    /**
    * Start the game
    */
    function play() {
        isRunning = true;
    }

    /*
    * Stop the game
    */
    function stop() {
        canvasGrid.clear();
        // Resets snake to initial state
        snake.initialize( [Math.round(squaresX / 2), Math.round(squaresY / 2)], "s" );
        isRunning = false;
    }

    /*
    * Pauses the game
    */
    function pause() {
        isRunning = false;
    }

    /*
    * Returns the player's current score
    */
    function getScore() {
        return snake.getLength();
    }

    // For debugging
    function growSnake() {
        _growSnake = true;
    }

    // --- Events --------------------------------------------------------------

    mouseTrap.bind('up', onUpPressedEventHandler);

    mouseTrap.bind('down', onDownPressedEventHandler);

    mouseTrap.bind('left', onLeftPressedEventHandler);

    mouseTrap.bind('right', onRightPressedEventHandler);

    mouseTrap.bind('space', onSpacePressedEventHandler);

    function onUpPressedEventHandler() {
        if (snake.getDirection() !== 's')
            snake.setDirection('n');
    }

    function onDownPressedEventHandler() {
        if (snake.getDirection() !== 'n')
            snake.setDirection('s');
    }

    function onLeftPressedEventHandler() {
        if (snake.getDirection() !== 'e')
            snake.setDirection('w');
    }

    function onRightPressedEventHandler() {
        if (snake.getDirection() !== 'w')
            snake.setDirection('e');
    }

    function onSpacePressedEventHandler() {
        if (isRunning)
            pause();
        else
            play();
    }
    
    // --- Private functions ---------------------------------------------------

    /*
    * Logic to be run every tick of the game.
    */
    function tick() {
        if (isRunning) {
            canvasGrid.clear();
            generateFrame();
        }
    }

    /*
    * Repaints the canvas
    */
    function generateFrame() {
        
        drawFood();

        drawSnake();

        canvasGrid.draw();
    }

    /*
    * Sets the snake's next location in the game
    */
    function drawSnake() {
        // If snake "ate" the food, make it grow
        if (canvasGrid.isSamePosition( Food.position, snake.getHeadPosition()) || _growSnake) {
            _growSnake = false;

            Food.position = null;
            snake.step(true);
        }
        else
            snake.step();

        snake.getLocation().forEach(function(position) {
            canvasGrid.setSquareColor( position, snakeColor);
        });
    }

    /*
    * Loads the food's location info into the CanvasGrid.
    */
    function drawFood() {
        if ( Food.position === null )
            Food.position = canvasGrid.getRandomPosition();

        canvasGrid.setSquareColor(Food.position, foodColor);
    }

    // --- Expose module API ---------------------------------------------------
    return {
        // Public API
        initialize: initialize,
        play: play,
        stop: stop,
        pause: pause,
        getScore: getScore,
        growSnake: growSnake,
        // Expose for testing
        __internal__: {
            
            onUpPressedEventHandler,
            onDownPressedEventHandler,
            onRightPressedEventHandler,
            onLeftPressedEventHandler,
            onSpacePressedEventHandler,
        }
    };
})(Snake, CanvasGrid, Mousetrap);

Game.initialize();
Game.play();