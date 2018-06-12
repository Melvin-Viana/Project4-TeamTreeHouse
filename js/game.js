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

  var emptySquares =[0,1,2,3,4,5,6,7,8];
  //Holds whoever turn is it.
  var playerTurn = 1;
  //Display who won the game
  function declareTheWinner(player,message,boolWinner){
    $('body').html(`<div class="screen screen-win screen-win-${player}" id="finish">
    <header>
      <h1>Tic Tac Toe</h1>
      <p class="message">${message}</p>
      <a id='newGame' href="#" class="button">New game</a>
    </header>
  </div>`);
    arrPlayer1 = [];
    arrPlayer2 = [];
    playerTurn = 1;
    emptySquares =[0,1,2,3,4,5,6,7,8];  }

  function turn(element,turn){
    element.addClass(`box-filled-${turn}`);
  }
  function aiTurn(element,square){
    
      turn($(`ul li:nth-child(${emptySquares[square]})`),2);  
      $(`ul li:nth-child(${emptySquares[square]})`).unbind('mouseover');   
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
    //Add box-filled css for selected box.
    turn($(this),1);
    
    let index = $(this).index();//Hold's the index of selected box.

    //Variables find if the current index for the li items are within the arrays.


    //If they are in emptySquares array do the turn.
    if (emptySquares.indexOf(index) !== -1 ) {
      //Place the index of chosen box into an array of corresponding player.
      playerTurn === 1 ? arrPlayer1.push(index) : arrPlayer2.push(index);
    }
    // Remove active class from previous turn.
    $(`#player${playerTurn}`).removeClass("active");

    //Computer chooses.
    
    //Add active class to next turn.
    $(`#player${playerTurn}`).addClass("active");

    //Disable mouseover event on elements that were clicked on.
    $(this).unbind("mouseover");

    //Check if the the current user has three in a row.
    for(let i=0;i<win.lnegth;i++){
      let player1Counter =0;
      let player1Counter=0;
      //Check through win combos to see if the users made these selections
      for(let j=0; j<win[i].length;j++){
          if ($.inArray(win[i][j],arrPlayer1)!==-1){
            player1Counter++;

          }   
          if ($.inArray(win[i][j],arrPlayer2)!==-1){
            player2Counter++;

          }
          if (player1Counter===3){
            declareTheWinner('one','Winner');
          }        
          else if(player2Counter===3){
            declareTheWinner('two','Winner');
          }
      }
    }

    
    emptySquares=emptySquares.filter(square=>square!==index);
    if (emptySquares.length===0) {
      //Display Draw Screen
      declareTheWinner('tie','Tie',false);
}
  });
});
