$(document).ready(()=>{
        var html = `
        <div class="screen screen-start" id="start">
        <header>
          <h1>Tic Tac Toe</h1>
          </br>
          <input type='text' placeholder='Name Of Player'></input></br></br>
          <a href="#" class="button">Start game</a>
        </header>
      </div>`;
      
        //On Page load, load up the start up screen.
      
 $('body').on('click','a.button',()=>{
        //Display New Game.
        $("body").html(html);

});

});