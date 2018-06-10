//Code for game
$(document).ready(() => {
  var arrPlayer1 = [];
  var arrPlayer2 = [];
  //Holds whoever turn is it.
  var playerTurn = 1;

  //On Dynamically created boxes, create a mouseover event for the boxes
  $("body").on("mouseover", "li.box", function() {
    let filledBox = $(this).hasClass('box-filled1')||$(this).hasClass('box-filled2')
    if(!filledBox){$(this).css("background-image", "url(img/o.svg)");}
    
  });
  $("body").on("mouseout", "li.box", function() {
    $(this).css("background-image", "");
  });

  $("body").on("click", "li.box", function() {
    $(this).addClass("box-filled-" + playerTurn);
    //Place the index of chosen box into an array of corresponding player.
    playerTurn === 1
      ? arrPlayer1.push($(this).index())
      : arrPlayer2.push($(this).index());

    // Remove active class from previous turn.
    $(`#player${playerTurn}`).removeClass('active');
    //Change to next player when box is chosen.
    playerTurn === 1 ? (playerTurn = 2) : (playerTurn = 1);
    //Add active class to next turn.
    $(`#player${playerTurn}`).addClass('active');

    console.log(($(this).index()));
     $(this).unbind("mouseover mouseout");
      });
  console.log($("#player1").hasClass("active"));
});
