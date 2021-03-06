//Code for game
$(document).ready(() => {
  let arrPlayer1 = [];
  let arrPlayer2 = [];
  //This array holds the possible index combinations of victory.
  let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let turnCounter = 0;
  //Holds whoever turn is it.
  let playerTurn = 1;
  //Empty squares/ Not yet filled
  let emptySquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  //Name of user
  let val = localStorage.getItem("bar");


  //Display who won the game
  function declareTheWinner(player, message) {
    $("body")
      .html(`<div class="screen screen-win screen-win-${player}" id="finish">
    <header>
      <h1>Tic Tac Toe</h1>
      <p class="message">${message}</p>
      <a id='newGame' href="#" class="button">New game</a>
    </header>
  </div>`);
    arrPlayer1 = [];
    arrPlayer2 = [];
    playerTurn = 1;
    turnCounter = 0;
    emptySquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }

  function turn(element, player, index) {
    //letiables find if the current index for the li items are within the arrays.
    let inArray1 = $.inArray(index, arrPlayer1); //$.inArray; https://api.jquery.com/jQuery.inArray/
    let inArray2 = $.inArray(index, arrPlayer2);
    let emptySquaresIndex = emptySquares.indexOf(index);

    if (emptySquaresIndex !== -1) {
      //Place the index of chosen box into an array of corresponding player.
      playerTurn === 1 ? arrPlayer1.push(index) : arrPlayer2.push(index);
      emptySquares.splice(emptySquaresIndex, 1);

      //   //Add box-filled css for selected box.
      element.addClass("box-filled-" + playerTurn);
      // Remove active class from previous turn.
      $(`#player${playerTurn}`).removeClass("active");

      //Change turns.
      playerTurn === 1 ? (playerTurn = 2) : (playerTurn = 1);

      //Add active class to next turn.
      $(`#player${playerTurn}`).addClass("active");
      turnCounter++;
    }
  }

  //----------------------------------------------------
  //On Dynamically created boxes, create a mouseover event for the boxes
  $("body").on("mouseover", "li.box", function() {
    //This is a boolean determining whether a box is filled or not.
    let filledBox =
      $(this).hasClass("box-filled-1") || $(this).hasClass("box-filled-2");
    //If the box is not filled place
    if (filledBox === false) {
      $("#player1").hasClass("active")
        ? $(this).css("background-image", "url(img/o.svg)")
        : $(this).css("background-image", "url(img/x.svg)");
    }
  });
  //------------------------------------------
  //Remove background-image css property when not hovering over empty box.
  $("body").on("mouseout", "li.box", function() {
    $(this).css("background-image", "");
  });

  //-------------------------------------------

  //Click event for li items
  $("body").on("click", "li.box", function() {
    //Do nothing if the box is filled.
    if (
      $(this).hasClass("box-filled-1") === true ||
      $(this).hasClass("box-filled-2") === true
    ) {
      return false;
    }

    let index = $(this).index(); //Hold's the index of selected box.
    //Player 1's Turn
    turn($(this), playerTurn, index);

    //Computer turn
    if (turnCounter !== 9) {
      //Display an X on the first available element.
      turn(
        $(`ul li:nth-child(${emptySquares[0] + 1}`),
        playerTurn,
        emptySquares[0]
      );
    }

    //Check if the the current user has three in a row.
    for (let i = 0; i < win.length; i++) {
      let player1Counter = 0;
      let player2Counter = 0;
      //Check through each of the combinations if the list meets one then the user is a winner.
      for (let j = 0; j < win[i].length; j++) {
        //Check if arrPlayer1 has one of the winning combos
        if ($.inArray(win[i][j], arrPlayer1) !== -1) {
          player1Counter++;
        }//Check if arrPlayer2 has one or more number in the current combo
        else if ($.inArray(win[i][j], arrPlayer2) !== -1) {
          player2Counter++;
        }
        // if Player 1 has 3 numbers of the current combo.
        if (player1Counter === 3) {
          //Display O as Winner
          declareTheWinner("one", `${val} is the Winner`);
        } 
         // if Player 2 has 3 numbers of the current combo.
        else if (player2Counter === 3) {
          //Display X as Winner
          declareTheWinner("two", "Computer is the Winner");
        }
      }
    }
    if (emptySquares.length === 0) {
      //Display Draw Screen
      declareTheWinner("tie", "Tie");
    }
  });
});
