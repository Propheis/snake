var Game = (function(snake, canvasGrid, mouseTrap, gameState) {
    
    // --- Module variables ----------------------------------------------------
    
    //////////////////////////
    //    CONFIGURATION     //
    //////////////////////////
    var fps = 24;

    var snakeBodyColor  = "#fff";
    var snakeHeadColor  = "rgb(255,0,0)"
    var foodColor       = "#eded40";
    
    var squareSize      = 10;
    var squaresX        = 100;
    var squaresY        = 75; 

    //////////////////////////
    //  Internal Variables  //
    //////////////////////////
    var _playerChangingDirection = false;
    var _canvas = document.getElementById('canvas');

    var currentGameState = gameState.stopped;
    var _gameOverCallback;


    // --- Models --------------------------------------------------------------
    
    var Food = {
        position: null
    }

    // --- API functions -------------------------------------------------------
    
    /*
    * Entry point for application
    */
    function initialize() {
        canvasGrid.initialize(_canvas, squareSize, squaresX, squaresY);
        snake.initialize( [Math.round(squaresX / 2), Math.round(squaresY / 2)], "s" );
        setupKeyBindings();
        window.setInterval(tick, 1000 / fps);
    }

    /**
    * Start the game
    */
    function play() {
        currentGameState = gameState.playing;
    }

    /*
    * Stop the game
    */
    function stop() {
        currentGameState = gameState.stopped;
        
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
        currentGameState = gameState.paused;
    }

    /*
    * Resumes the game
    */
    function resume() {
        currentGameState = gameState.playing;
    }

    /*
    * Returns the player's current score
    */
    function getScore() {
        return snake.getLength();
    }

    /*
    * Pass in a callback when the game ends. Function is given the score as an int on game over
    *  @param {callback:int} - The finishing score of the player at the end of the game
    */
    function setGameOverCallback(callback) {
        _gameOverCallback = callback;
    }

    // --- Events --------------------------------------------------------------

    function onUpPressedEventHandler() {
        if (snake.getDirection() !== 's' && !_playerChangingDirection) {
            snake.setDirection('n');
            _playerChangingDirection = true;
        }
    }

    function onDownPressedEventHandler() {
        if (snake.getDirection() !== 'n' && !_playerChangingDirection) {
            snake.setDirection('s');
            _playerChangingDirection = true;
        }
    }

    function onLeftPressedEventHandler() {
        if (snake.getDirection() !== 'e' && !_playerChangingDirection) {
            snake.setDirection('w');
            _playerChangingDirection = true;
        }
    }

    function onRightPressedEventHandler() {
        if (snake.getDirection() !== 'w' && !_playerChangingDirection) {
            snake.setDirection('e');
            _playerChangingDirection = true;
        }
    }

    function onSpacePressedEventHandler() {
        if (currentGameState === gameState.playing)
            pause();
        else
            resume();
    }

    function onEnterPressedEventHandler() {
        if (currentGameState === gameState.playing)
            return;
        stop();
        play();
    }
    
    // --- Private functions ---------------------------------------------------

    /*
    * Logic to be run every tick of the game.
    */
    function tick() {
        if (currentGameState === gameState.playing) {
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
        _playerChangingDirection = false;
        
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
        currentGameState = GameState.stopped;
        stop();
        if (_gameOverCallback)
            _gameOverCallback( getScore() );
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
        currentGameState: currentGameState,

        setGameOverCallback: setGameOverCallback,
        // Expose for testing
        __internal__: {
            
        }
    };
})(Snake, CanvasGrid, Mousetrap, GameState);