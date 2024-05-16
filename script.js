let buttons = document.querySelectorAll(".btn");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg__container");
let msg = document.querySelector("#message");
let turnX = true; //playerX
let playerXScore = 0;
let playerOScore = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("buttons were clicked");
    if (turnX) {
      button.textContent = "X";

      turnX = false;
    } else {
      button.textContent = "O";
      turnX = true;
    }
    button.disabled = true; //when we click again then the button will be disabled
    checkWin();
  });
});

const resetGame = () => {
  turnX = true;
  enableButtons();
  msgContainer.classList.add("hide-container"); //hide message container when someone wins
  computerPlayer = false; // Reset computer player flag
};

const showWinner = (winner) => {
  msg.innerText = `Player ${winner} wins!`;
  //msgContainer.style.display = "block"; //show message container when someone wins
  msgContainer.classList.remove("hide-container"); //show message container when someone wins
  disableButtons(); //when  someone wins then no one can play anymore so disable all buttons
};
//when  someone wins then no one can play anymore so disable all buttons
const disableButtons = () => {
  // for (let i=0;i<9;i++){
  //     buttons[i].disabled = true;
  // }
  for (let button of buttons) {
    button.disabled = true;
  }
};

const enableButtons = () => {
  for (let button of buttons) {
    button.disabled = false;
    button.innerText = "";
  }
};

// Function to update scores
const updateScores = (pos1Val) => {
  if (pos1Val === "X") {
    playerXScore++;
  } else if (pos1Val === "O") {
    playerOScore++;
  }

  // Update the score display
  document.getElementById("playerXScore").innerText = playerXScore;
  document.getElementById("playerOScore").innerText = playerOScore;
};

const checkWin = () => {
  for (let pattern of winPatterns) {
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(
    //   buttons[pattern[0]].innerText,
    //   buttons[pattern[1]].innerText,
    //   buttons[pattern[2]].innerText
    // );
    let pos1Val = buttons[pattern[0]].innerText;
    let pos2Val = buttons[pattern[1]].innerText;
    let pos3Val = buttons[pattern[2]].innerText;

    //there should be some valid value  in all positions to make a match
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      //find the winning pattern
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner", pos1Val);

        showWinner(pos1Val);

        // if (pos1Val === "X") {
        //   winner = "X";
        // } else {
        //   winner = "O";
        // }

        updateScores(pos1Val);
        
      } 
    }

  }
};

// resetBtn.addEventListener("click", () => {
//   location.reload();
// });

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
