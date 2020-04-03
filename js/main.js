$(document).ready(
  function() {

    var squares = []; //creo variabile squares che conterrà array di div

    for (var k  = 0; k < 64; k++) {
      squares[k] = $("<div class='square'></div>")   //ad ogni iterazione (64) inserisco un nuovo div dotato di classe square all'interno della variabile squares
    }

    $('.table_container').append(squares);      //inietto l'array all'interno di .table_container giò presente in html










  }
);
