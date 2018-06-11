//Code for game
$(document).ready(() => {
  var arrPlayer1 = [];
  var arrPlayer2 = [];
  //This array holds the possible index combinations of victory.
  var win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  //Holds whoever turn is it.
  var playerTurn = 1;

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
    $(this).addClass("box-filled-" + playerTurn);

    let index = $(this).index();
    //Variables find if the current index for the li items are within the arrays.
    let inArray1 = $.inArray(index, arrPlayer1); //$.inArray; https://api.jquery.com/jQuery.inArray/
    let inArray2 = $.inArray(index, arrPlayer2);

    //If they are not in the arrays, place index in the array of the current player.
    if (inArray1 == -1 && inArray2 == -1) {
      //Place the index of chosen box into an array of corresponding player.
      playerTurn === 1 ? arrPlayer1.push(index) : arrPlayer2.push(index);
    }
    // Remove active class from previous turn.
    $(`#player${playerTurn}`).removeClass("active");
    //Change to next player when box is chosen.
    playerTurn === 1 ? (playerTurn = 2) : (playerTurn = 1);
    //Add active class to next turn.
    $(`#player${playerTurn}`).addClass("active");

    //Disable mouseover/click event on elements that were clicked on.
    $(this).unbind("mouseover click");

    //Check if the the current user has three in a row.
    for (let i = 0; i < win.length; i++) {
      let player1Counter = 0;
      let player2Counter = 0;
      //Check through each of the combinations if the list meets one then the user is a winner.
      for (let j = 0; j < win[i].length; j++) {
        if ($.inArray(win[i][j], arrPlayer1) !== -1) {
          player1Counter++;
        } else if ($.inArray(win[i][j], arrPlayer2) !== -1) {
          player2Counter++;
        }
        if (player1Counter === 3) {
          $("body")
            .html(`<div class="screen screen-win screen-win-one" id="finish">
          <header>
            <h1>Tic Tac Toe</h1>
            <p class="message">Winner</p>
            <a id='newGame' href="#" class="button">New game</a>
          </header>
        </div>`);
        } else if (player2Counter === 3) {
          $("body")
            .html(`<div class="screen screen-win screen-win-two" id="finish">
            <header>
              <h1>Tic Tac Toe</h1>
              <p class="message">Winner</p>
              <a id='newGame'href="#" class="button">New game</a>
            </header>
          </div>`);
        }
      }
    }
  });
});
