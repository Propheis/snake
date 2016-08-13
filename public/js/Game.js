var Game = (function(snake, canvasGrid, mouseTrap) {
    
    // --- Module variables ----------------------------------------------------
    
    // Frames per second of the game
    var fps = 12;

    var isRunning = false;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var snakeColor = "#fff";
    
    // --- API functions -------------------------------------------------------
    
    /*
    * Entry point for application
    */
    function initialize() {
        canvasGrid.initialize(canvas, 10, 100, 75);
        snake.initialize( [50, 30], "s" );
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
        snake.initialize( [50, 30], "s" );
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
        setSnakeLocation();
        // TODO: food
        canvasGrid.draw();
    }

    /*
    * Loads snake's information into the CanvasGrid.
    */
    function setSnakeLocation() {
        var snakePos = snake.step();
        snakePos.forEach(function(position) {
            canvasGrid.setSquareColor( position, snakeColor);
        });
    }

    // --- Expose module API ---------------------------------------------------
    return {
        // Public API
        initialize: initialize,
        play: play,
        stop: stop,
        pause: pause,
        getScore: getScore,
        // Expose for testing
        __internal__: {
            
            onUpPressedEventHandler,
            onDownPressedEventHandler,
            onRightPressedEventHandler,
            onLeftPressedEventHandler,
            onSpacePressedEventHandler,

            setSnakeLocation
        }
    };
})(Snake, CanvasGrid, Mousetrap);

Game.initialize();
Game.play();