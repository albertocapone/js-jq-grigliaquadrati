$(document).ready(
  function() {

    var squares = []; //creo variabile squares che conterrà array di div

    for (var k  = 0; k < 64; k++) {
      squares[k] = $("<div class='square'></div>")   //ad ogni iterazione (64) inserisco un nuovo div dotato di classe square all'interno della variabile squares
    }

    $('.table_container').append(squares);      //inietto l'array all'interno di .table_container giò presente in html

    //assegno classi .red e .green in modo dinamico
    function randomValues (min, max) {                                //definisco funzione random
      return Math.floor(Math.random() * (max - min) ) + min;
    }

    for (var k = 0, r = randomValues(1, 64); k < 15; r = randomValues(1, 64)){       //il ciclo lavora su due valori: k conta le iterazioni, r assegnata randomicamente accede ad un qualsisasi div nell'array squares
      if (! ( squares[r].hasClass('red') ) ) {                  //questo controllo evita che venga riassegnato .red allo stesso div
        squares[r].addClass('red');                            //assegnazione di .red al div random
        k++;                                                  //incremento k ogni volta che vine effettuata un'assegnazione; assegnati 15 .red il ciclo si interrompe
      }
    }

    for (var k = 0; k < squares.length; k++){
      if ( ! ( squares[k].hasClass('red') ) ) {   //a qualunque div non sia stata assegnata la classe .red...
        squares[k].addClass('green');             //...viene assegnata la classe .green
      }
    }


    var redPoints = 0;
    var greenPoints = 0;

    $('.square').click(                      //ogni volta che uno dei quadrati viene cliccato...
      function (){
        if ( $(this).hasClass('red') && ! ( $(this).hasClass('active') ) ) {  //...se ha classe .red e non .active
          $(this).addClass('active');                                         //...assegno classe .active
          $('.red_score').html(++redPoints);                                  //...aggionro il punteggio (con operatore di precremento per restituire il nuovo valore)
        }
        else if ( $(this).hasClass('green') && ! ( $(this).hasClass('active') ) ) {   //...se ha classe .green e non .active
          $(this).addClass('active');                                                 //...assegno classe .active
          $('.green_score').html(++greenPoints);                                       //...aggiorno il punteggio (con operatore di precremento per restituire il nuovo valore)
        }
      }
    );
    

  }
);
