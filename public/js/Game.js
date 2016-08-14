var Game = (function(snake, canvasGrid, mouseTrap) {
    
    // --- Module variables ----------------------------------------------------
    
    // Frames per second of the game

    var isRunning = false;
    var playerChangingDirection = false;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var _timerId;

    /////////////////////////
    //    CONFIGURATION    //
    /////////////////////////
    var fps = 24;

    var snakeBodyColor  = "#fff";
    var snakeHeadColor  = "rgb(255,0,0)"
    var foodColor       = "#eded40";
    
    var squareSize      = 10;
    var squaresX        = 100;
    var squaresY        = 75; 


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
        setupKeyBindings();
    }

    /**
    * Start the game
    */
    function play() {
        isRunning = true;
        _timerId = window.setInterval(tick, 1000 / fps);
    }

    /*
    * Stop the game
    */
    function stop() {
        window.clearInterval(_timerId);

        isRunning = false;
        
        // Resets snake to initial state
        snake.initialize( [Math.round(squaresX / 2), Math.round(squaresY / 2)], "s" );
        // Reset food
        Food.position = null;
        

        canvasGrid.clear();
    }

    /*
    * Pauses the game
    */
    function pause() {
        isRunning = false;
    }

    /*
    * Resumes the game
    */
    function resume() {
        isRunning = true;
    }

    /*
    * Returns the player's current score
    */
    function getScore() {
        return snake.getLength();
    }

    // --- Events --------------------------------------------------------------

    function onUpPressedEventHandler() {
        if (snake.getDirection() !== 's' && !playerChangingDirection) {
            snake.setDirection('n');
            playerChangingDirection = true;
        }
    }

    function onDownPressedEventHandler() {
        if (snake.getDirection() !== 'n' && !playerChangingDirection) {
            snake.setDirection('s');
            playerChangingDirection = true;
        }
    }

    function onLeftPressedEventHandler() {
        if (snake.getDirection() !== 'e' && !playerChangingDirection) {
            snake.setDirection('w');
            playerChangingDirection = true;
        }
    }

    function onRightPressedEventHandler() {
        if (snake.getDirection() !== 'w' && !playerChangingDirection) {
            snake.setDirection('e');
            playerChangingDirection = true;
        }
    }

    function onSpacePressedEventHandler() {
        if (isRunning)
            pause();
        else
            resume();
    }

    function onEnterPressedEventHandler() {
        if (isRunning)
            return;
        stop();
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
        if ( isGameOver() ) {
            endGame();
            return;
        }

        // Fix to make sure player doesn't change direction twice in one frame
        playerChangingDirection = false;
        
        drawFood();

        drawSnake();

        canvasGrid.draw();
    }

    /*
    * Sets the snake's next location in the game
    */
    function drawSnake() {
        // If snake "ate" the food, make it grow
        if (canvasGrid.isSamePosition( Food.position, snake.getHeadPosition())) {
            Food.position = null;
            snake.step(true);
        }
        else
            snake.step();

        snake.getLocation().forEach(function(position, index) {
            if (index === 0)
                canvasGrid.setSquareColor(position, snakeHeadColor);
            else
                canvasGrid.setSquareColor(position, snakeBodyColor);
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

    /*
    * Returns true if the snake's next step will be outside the boundaries of the game
    */
    function snakeWillGoOutOfBounds() {
        return !canvasGrid.isInGrid( snake.getNextStep() );
    }

    /*
    * Returns true if the user lost the game
    */
    function isGameOver() {
        return snake.ranIntoItself() || snakeWillGoOutOfBounds();
    }

    function endGame() {
        console.log("Game over");
        stop();
    }

    /*
    * Set up keybindings for playing the game
    */
    function setupKeyBindings() {
        mouseTrap.bind('up', onUpPressedEventHandler);
        mouseTrap.bind('down', onDownPressedEventHandler);
        mouseTrap.bind('left', onLeftPressedEventHandler);
        mouseTrap.bind('right', onRightPressedEventHandler);
        mouseTrap.bind('space', onSpacePressedEventHandler);
        mouseTrap.bind('enter', onEnterPressedEventHandler);
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
            
        }
    };
})(Snake, CanvasGrid, Mousetrap);

Game.initialize();