/* 
different div elements
-gameContainer, as the base for the game board
-scoreContainer, to keep the score
-onScreenContainers, with the navigation button for mobile screen
*/

let totalFoodAte = 0;
let totalDistanceTravelled = 0;

//-----------------Game Board pixel-----------------
const  gameContainer  =  document.getElementById("gameContainer");
const  createGameBoardPixels  = () => {
    // Populate the [#gameContainer] div with small div's representing game pixels
    for (let  i  =  1; i  <=  1600; ++i) {
        gameContainer.innerHTML  =  `${gameContainer.innerHTML} <div class="gameBoardPixel" id="pixel${i}"></div>`;
    }
};
// This variable always holds the updated array of game pixels created by createGameBoardPixels() :
const  gameBoardPixels  =  document.getElementsByClassName("gameBoardPixel");


//----------------------Food-------------------
let  currentFoodPostion  =  0; // Initially set to 0
const  createFood  = () => {
    // Remove previous food;
    gameBoardPixels[currentFoodPostion].classList.remove("food");

    // Create new food
    currentFoodPostion  =  Math.random();
    currentFoodPostion  =  Math.floor(currentFoodPostion  *  1600);
    gameBoardPixels[currentFoodPostion].classList.add("food");
};

//------------------"snake"-------------

//---------------------Direction-----------------
// Direction codes (Keyboard key codes for arrow keys):
const  LEFT_DIR  =  37;
const  UP_DIR  =  38;
const  RIGHT_DIR  =  39;
const  DOWN_DIR  =  40;

// Set snake direction initially to right
let  snakeCurrentDirection  =  RIGHT_DIR;

const  changeDirection  =  newDirectionCode  => {
    // Change the direction of the snake
    if (newDirectionCode  ==  snakeCurrentDirection) return;
    if (newDirectionCode  ==  LEFT_DIR  &&  snakeCurrentDirection  != RIGHT_DIR) {
        snakeCurrentDirection  =  newDirectionCode;
    } else  if (newDirectionCode  ==  UP_DIR  &&  snakeCurrentDirection  !=  DOWN_DIR) {
        snakeCurrentDirection  =  newDirectionCode;
    } else  if (newDirectionCode  ==  RIGHT_DIR  && snakeCurrentDirection  !=  LEFT_DIR) {
        snakeCurrentDirection  =  newDirectionCode;
    } else  if (newDirectionCode  ==  DOWN_DIR  &&  snakeCurrentDirection  !=  UP_DIR) {
        snakeCurrentDirection  =  newDirectionCode;
    }
};

//---------------------------Movement----------------------------
// Let the starting position of the snake be at the middle of game board
let  currentSnakeHeadPosition  =  799;
let  snakeLength  =  1000; // Initial length of the snake = 1000

// Move snake continously by calling this function repeatedly :
const  moveSnake  = () => {
    switch (snakeCurrentDirection) {
        case  LEFT_DIR:
            --currentSnakeHeadPosition;
            const  isSnakeHeadAtLastGameBoardPixelTowardsLeft  = currentSnakeHeadPosition  %  40  ==  39  ||  currentSnakeHeadPosition  <  0;
            if (isSnakeHeadAtLastGameBoardPixelTowardsLeft) {
                currentSnakeHeadPosition  =  currentSnakeHeadPosition  +  40;
            }
            break;

        case  UP_DIR:
            currentSnakeHeadPosition  =  currentSnakeHeadPosition  -  40;
            const  isSnakeHeadAtLastGameBoardPixelTowardsUp  = currentSnakeHeadPosition  <  0;
            if (isSnakeHeadAtLastGameBoardPixelTowardsUp) {
                currentSnakeHeadPosition  =  currentSnakeHeadPosition  +  1600;
            }
            break;

        case  RIGHT_DIR:
            ++currentSnakeHeadPosition;
            const  isSnakeHeadAtLastGameBoardPixelTowardsRight  = currentSnakeHeadPosition  %  40  ==  0;
            if (isSnakeHeadAtLastGameBoardPixelTowardsRight) {
                currentSnakeHeadPosition  =  currentSnakeHeadPosition  -  40;
            }
            break;

        case  DOWN_DIR:
            currentSnakeHeadPosition  =  currentSnakeHeadPosition  +  40;
            const  isSnakeHeadAtLastGameBoardPixelTowardsDown  = currentSnakeHeadPosition  >  1599;
            if (isSnakeHeadAtLastGameBoardPixelTowardsDown) {
                currentSnakeHeadPosition  =  currentSnakeHeadPosition  -  1600;
            }
            break;

        default:
            break;
    }
    let  nextSnakeHeadPixel  = gameBoardPixels[currentSnakeHeadPosition];

    // Kill snake if it bites itself:
    if (nextSnakeHeadPixel.classList.contains("snakeBodyPixel")) {
        // Stop moving the snake
        clearInterval(moveSnakeInterval);
        if (!alert(`You have ate ${totalFoodAte} food by travelling ${totalDistanceTravelled} blocks.`))
        window.location.reload();
    }

    // If not killed add the snake body:
    nextSnakeHeadPixel.classList.add("snakeBodyPixel");

    // This fuction removes the snake body from the end of the snake as it moves.
    // Also note that snakeLength is used as the timeout interval
    setTimeout(() => {
        nextSnakeHeadPixel.classList.remove("snakeBodyPixel");
    }, snakeLength);

    // Update total distance travelled
    totalDistanceTravelled++;
    // Update in UI:
    document.getElementById("blocksTravelled").innerHTML  = totalDistanceTravelled;

    // If snike bites the food:
    if (currentSnakeHeadPosition  ==  currentFoodPostion) {
        // Update total food ate
        totalFoodAte++;
        // Update in UI:
        document.getElementById("pointsEarned").innerHTML  =  totalFoodAte;
        // Increase Snake length:
        snakeLength  =  snakeLength  +  100;
        // Create new food:
        createFood();
    }
};

//-----------------start game-------------------------

// Create game board pixels:
createGameBoardPixels();

// Create initial food:
createFood();

// Move snake:
// The variable, "moveSnakeInterval" is used to stop the snake on snake killed.
var  moveSnakeInterval  =  setInterval(moveSnake, 80);

// Call change direction function on keyboard key-down event:
addEventListener("keydown", e  =>  changeDirection(e.keyCode));

// CONFIGURE THE ON SCREEN CONTROLLERS:
const  leftButton  =  document.getElementById("leftButton");
const  rightButton  =  document.getElementById("rightButton");
const  upButton  =  document.getElementById("upButton");
const  downButton  =  document.getElementById("downButton");

leftButton.onclick  = () =>  changeDirection(LEFT_DIR);
rightButton.onclick  = () =>  changeDirection(RIGHT_DIR);
upButton.onclick  = () =>  changeDirection(UP_DIR);
downButton.onclick  = () =>  changeDirection(DOWN_DIR);

//------------------final---------------------
// GAME_PIXEL_COUNT is the pixels on horizontal or vertical axis of the game board (SQUARE).
const GAME_PIXEL_COUNT = 40;
const SQUARE_OF_GAME_PIXEL_COUNT = Math.pow(GAME_PIXEL_COUNT, 2);

let totalFoodAte = 0;
let totalDistanceTravelled = 0;

/// THE GAME BOARD:
const gameContainer = document.getElementById("gameContainer");

const createGameBoardPixels = () => {
  // Populate the [#gameContainer] div with small div's representing game pixels
  for (let i = 1; i <= SQUARE_OF_GAME_PIXEL_COUNT; ++i) {
    gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="gameBoardPixel" id="pixel${i}"></div>`;
  }
};

// This variable always holds the updated array of game pixels created by createGameBoardPixels() :
const gameBoardPixels = document.getElementsByClassName("gameBoardPixel");

/// THE FOOD:
let currentFoodPostion = 0;
const createFood = () => {
  // Remove previous food;
  gameBoardPixels[currentFoodPostion].classList.remove("food");

  // Create new food
  currentFoodPostion = Math.random();
  currentFoodPostion = Math.floor(
    currentFoodPostion * SQUARE_OF_GAME_PIXEL_COUNT
  );
  gameBoardPixels[currentFoodPostion].classList.add("food");
};

/// THE SNAKE:

// Direction codes (Keyboard key codes for arrow keys):
const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;

// Set snake direction initially to right
let snakeCurrentDirection = RIGHT_DIR;

const changeDirection = newDirectionCode => {
  // Change the direction of the snake
  if (newDirectionCode == snakeCurrentDirection) return;

  if (newDirectionCode == LEFT_DIR && snakeCurrentDirection != RIGHT_DIR) {
    snakeCurrentDirection = newDirectionCode;
  } else if (newDirectionCode == UP_DIR && snakeCurrentDirection != DOWN_DIR) {
    snakeCurrentDirection = newDirectionCode;
  } else if (
    newDirectionCode == RIGHT_DIR &&
    snakeCurrentDirection != LEFT_DIR
  ) {
    snakeCurrentDirection = newDirectionCode;
  } else if (newDirectionCode == DOWN_DIR && snakeCurrentDirection != UP_DIR) {
    snakeCurrentDirection = newDirectionCode;
  }
};

// Let the starting position of the snake be at the middle of game board
let currentSnakeHeadPosition = SQUARE_OF_GAME_PIXEL_COUNT / 2;

// Initial snake length
let snakeLength = 1000;

// Move snake continously by calling this function repeatedly :
const moveSnake = () => {
  switch (snakeCurrentDirection) {
    case LEFT_DIR:
      --currentSnakeHeadPosition;
      const isSnakeHeadAtLastGameBoardPixelTowardsLeft =
        currentSnakeHeadPosition % GAME_PIXEL_COUNT == GAME_PIXEL_COUNT - 1 ||
        currentSnakeHeadPosition < 0;
      if (isSnakeHeadAtLastGameBoardPixelTowardsLeft) {
        currentSnakeHeadPosition = currentSnakeHeadPosition + GAME_PIXEL_COUNT;
      }
      break;
    case UP_DIR:
      currentSnakeHeadPosition = currentSnakeHeadPosition - GAME_PIXEL_COUNT;
      const isSnakeHeadAtLastGameBoardPixelTowardsUp =
        currentSnakeHeadPosition < 0;
      if (isSnakeHeadAtLastGameBoardPixelTowardsUp) {
        currentSnakeHeadPosition =
          currentSnakeHeadPosition + SQUARE_OF_GAME_PIXEL_COUNT;
      }
      break;
    case RIGHT_DIR:
      ++currentSnakeHeadPosition;
      const isSnakeHeadAtLastGameBoardPixelTowardsRight =
        currentSnakeHeadPosition % GAME_PIXEL_COUNT == 0;
      if (isSnakeHeadAtLastGameBoardPixelTowardsRight) {
        currentSnakeHeadPosition = currentSnakeHeadPosition - GAME_PIXEL_COUNT;
      }
      break;
    case DOWN_DIR:
      currentSnakeHeadPosition = currentSnakeHeadPosition + GAME_PIXEL_COUNT;
      const isSnakeHeadAtLastGameBoardPixelTowardsDown =
        currentSnakeHeadPosition > SQUARE_OF_GAME_PIXEL_COUNT - 1;
      if (isSnakeHeadAtLastGameBoardPixelTowardsDown) {
        currentSnakeHeadPosition =
          currentSnakeHeadPosition - SQUARE_OF_GAME_PIXEL_COUNT;
      }
      break;
    default:
      break;
  }

  let nextSnakeHeadPixel = gameBoardPixels[currentSnakeHeadPosition];

  // Kill snake if it bites itself:
  if (nextSnakeHeadPixel.classList.contains("snakeBodyPixel")) {
    // Stop moving the snake
    clearInterval(moveSnakeInterval);
    if (
      !alert(
        `You have ate ${totalFoodAte} food by travelling ${totalDistanceTravelled} blocks.`
      )
    )
      window.location.reload();
  }

  nextSnakeHeadPixel.classList.add("snakeBodyPixel");

  setTimeout(() => {
    nextSnakeHeadPixel.classList.remove("snakeBodyPixel");
  }, snakeLength);

  // Update total distance travelled
  totalDistanceTravelled++;
  // Update in UI:
  document.getElementById("blocksTravelled").innerHTML = totalDistanceTravelled;

  if (currentSnakeHeadPosition == currentFoodPostion) {
    // Update total food ate
    totalFoodAte++;
    // Update in UI:
    document.getElementById("pointsEarned").innerHTML = totalFoodAte;

    // Increase Snake length:
    snakeLength = snakeLength + 100;
    createFood();
  }
};

/// CALL THE FOLLOWING FUNCTIONS TO RUN THE GAME:

// Create game board pixels:
createGameBoardPixels();

// Create initial food:
createFood();

// Move snake:
var moveSnakeInterval = setInterval(moveSnake, 80);

// Call change direction function on keyboard key-down event:
addEventListener("keydown", e => changeDirection(e.keyCode));

// ON SCREEN CONTROLLERS:
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
const upButton = document.getElementById("upButton");
const downButton = document.getElementById("downButton");

leftButton.onclick = () => changeDirection(LEFT_DIR);
rightButton.onclick = () => changeDirection(RIGHT_DIR);
upButton.onclick = () => changeDirection(UP_DIR);
downButton.onclick = () => changeDirection(DOWN_DIR);
