const designSetup = function() {
    const cells = document.querySelectorAll(".cell");
    const gameOverMessage = document.querySelector(".outcome");
    const winGameMessage = document.querySelector(".alert-winner");
    const closeMessage = document.querySelector(".close-button");
    const nextSteps = document.querySelector(".info");
  
    const blankCells = () => {
      [...cells].forEach(cell => {
        cell.textContent = "";
        cell.addEventListener("click", handleClick);
      });
    };
  
    const stopUsedCell = () => {
      [...cells].forEach(cell => cell.removeEventListener("click", handleClick));
    };
  
    const endGame = () => {
      nextPlayerTurn("Nice!");
      stopUsedCell();
      gameResults();
    };
  
    const nextPlayerTurn = text => {
      nextSteps.textContent = text;
    };

    const updateCurrentPlayer = player => {
      nextPlayerTurn(`${player}'s turn`);
    };
  
    const gameResults = () => {
      winGameMessage.textContent = `${currentPlayer} Wins!`;
      gameOverMessage.style.display = "block";
    };
  
    const hideOutcomeMessage = () => {
      gameOverMessage.style.display = "none";
    };
  
    closeMessage.onclick = hideOutcomeMessage;
    return { blankCells, updateCurrentPlayer, endGame };
  };
  
  const userInterface = designSetup();
  const waysToWin = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
 
    [0, 4, 8],
    [6, 4, 2]
  ];
  
  let currentCells = [];
  let currentPlayer = "";
  
  function startGame() {
    currentCells = Array.from(Array(9).keys());
    currentPlayer = "X";
    userInterface.updateCurrentPlayer(currentPlayer);
    userInterface.blankCells();
  }
  
  function handleClick() {
    const cell = event.target;
    const id = cell.dataset.id;
    if (isCellValid(id)) {
      cell.textContent = currentPlayer;
      currentCells[id] = currentPlayer;
      if (checkWin()) userInterface.endGame();
      else togglePlayer();
    }
  }
  
  function isCellValid(id) {
    return currentCells[id] == id;
  }
  
  function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    userInterface.updateCurrentPlayer(currentPlayer);
  }
  
  function checkWin() {
    for (let i = 0; i < waysToWin.length; i++) {
      let pattern = waysToWin[i];
      let [a, b, c] = pattern;
      if (
        currentCells[a] === currentCells[b] &&
        currentCells[b] === currentCells[c]
      ) {
        return true;
      }
    }
    return false;
  }