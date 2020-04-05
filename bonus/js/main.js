$(document).ready(
  function() {

      //creo ed inietto in .table_container i div.square che diventeranno le caselle del mio campo minato
      var squares = []; //crea variabile squares che conterrà l'array di div.square

      for (var k  = 0; k < 256; k++) {
        squares[k] = $("<div class='square'></div>");   //ad ogni iterazione (256) inserisci un nuovo div dotato di classe square all'interno della variabile squares
      }

      $('.table_container').append(squares);      //inietta l'array all'interno di .table_container giò presente in html



      //assegno classi .red e .green in modo dinamico
      function randomValues (min, max) {                                //definisci funzione random
        return Math.floor(Math.random() * (max - min) ) + min;
      }

      for (var k = 0, r = randomValues(1, 256); k < 60; r = randomValues(1, 256)){       //il ciclo lavora su due valori: k conta le iterazioni, r assegnata randomicamente accede ad un qualsisasi div nell'array squares
        if (! ( squares[r].hasClass('red') ) ) {                  //questo controllo evita che venga riassegnato .red allo stesso div
          squares[r].addClass('red');                            //assegnazione di .red al div random
          k++;                                                  //incrementa k ogni volta che vine effettuata un'assegnazione; assegnati 60 .red il ciclo si interrompe
        }
      }

      for (var k = 0; k < squares.length; k++){
        if ( ! ( squares[k].hasClass('red') ) ) {   //a qualunque div non sia stata assegnata la classe .red
          squares[k].addClass('green');             //viene assegnata la classe .green
        }
      }


      //calcolo il numero di "mine" da inserire nelle caselle verdi
      for (var k = 0; k < squares.length; k++){    //percorrendo tutta la lunghezza di squares
        var minesAroundSquaresK = 0;                  //questa variabile registra il numero di caselle rosse (ovvero mine) intorno a squares[k]

        if (squares[k].hasClass('green')){   //se squares[k] è una casella verde
          var onRightBorder = ( (k + 1) % 16 == 0) ? true : false;       //controllo se squares[k] si trova sul bordo destro
          var onLeftBorder = (k % 16 == 0) ? true : false;              //controllo se squares[k] si trova sul bordo sinistro

            /* I prossimi tre cicli servono a controllare ciò che si trova nelle caselle intorno a squares[k] attraverso il seguente schema:
            squares[k - 16 - 1] | squares[k - 16] |  squares[k - 16 + 1]
            squares[k - 1]      | squares[k]      |  squares[k + 1]
            squares[k + 16 - 1] | squares[k + 16] |  squares[k + 16 + 1]
            mappo le posizioni dell'array a cui il ciclo deve accedere utilizzando una variabile K grande per ogni livello del controllo.
            */

            for (var K = k - 16 - 1, iterations = 1; K <= k - 16 + 1; K++, iterations++){
              if (squares[K] === undefined){             //accessi al di fuori dell'array non verranno valutati: necessario su prima e ultima "riga" di squares
                continue;
              }
              if (onLeftBorder && iterations == 1){            //se square[k] si trova sul bordo sinistro salta la prima iterazione: così facendo evito di sommare l'ultimo square della riga precedente
                continue;
              }
              if (squares[K].hasClass('red')){      //se la casella è rossa incrementa il valore di minesAroundSquaresK
                minesAroundSquaresK++;
              }
              if (onRightBorder && iterations == 2) {       //se square[k] si trova sul bordo destro salta l'ultima iterazione: così facendo evito di sommare il primo square della riga successiva
                break;
              }
            }
            for (var K = k - 1, iterations = 1; K <= k + 1; K++, iterations++){
              if (squares[K] === undefined){             //accessi al di fuori dell'array non verranno valutati: necessario su prima e ultima "riga" di squares
                continue;
              }
              if (onLeftBorder && iterations == 1){               //se square[k] si trova sul bordo sinistro salta la prima iterazione: così facendo evito di sommare l'ultimo square della riga precedente
                continue;
              }
              if (squares[K].hasClass('red')){       //se la casella è rossa incrementa il valore di minesAroundSquaresK
                minesAroundSquaresK++;
              }
              if (onRightBorder && iterations == 2) {         //se square[k] si trova sul bordo destro salta l'ultima iterazione: così facendo evito di sommare il primo square della riga successiva
                break;
              }
            }
            for (var K = k + 16 - 1, iterations = 1; K <= k + 16 + 1; K++, iterations++){
              if (squares[K] === undefined){            //accessi al di fuori dell'array non verranno valutati: necessario su prima e ultima "riga" di squares
                continue;
              }
              if (onLeftBorder && iterations == 1){             //se square[k] si trova sul bordo sinistro salta la prima iterazione
                continue;
              }
              if (squares[K].hasClass('red')){     //se la casella è rossa incrementa il valore di minesAroundSquaresK
                minesAroundSquaresK++;
              }
              if (onRightBorder && iterations == 2) {        //se square[k] si trova sul bordo destro salta l'ultima iterazione: così facendo evito di sommare il primo square della riga successiva
                break;
              }
            }
              squares[k].html(minesAroundSquaresK);      //riporta nelle caselle solo valori diversi da 0
          }
        }

      //questo blocco di codice gestisce il click sulle caselle e il flusso di gioco
      var greenActiveSquares = 0;   //questa variabile registra il numero di caselle verdi che sono state cliccate
      var firstClick = true;       //questa ci dice in che momento di gioco ci troviamo: se non c'è ancora stato un click si troverà su true, viceversa su false
      $('.square').click(   //ogni volta che un elemento dotato di classe .square (ovverosia una delle caselle) viene cliccato
        function (){
          if ( $(this).hasClass('red') ) {              //SE ha classe .red
            $(this).children("div.flagged").remove();      //rimuovi qualunque eventuale div figlio con classe .flagged (ovverosia, nel dubbio sflaggalo)
            $(this).addClass('active');                   //assegnagli classe .active
            $('.table_container').append("<h1 class='you_'>YOU LOSE!</div>");     //inietta un nuovo h1 all'interno di .table_container che ti comunica che hai perso e interrompe il gioco
          }
          else if ( $(this).hasClass('green') && ! ( $(this).hasClass('active') ) ) {   //SE invece ha classe .green ma non .active (è cioè una casella verde mai cliccata prima)
                if (firstClick) {      //se è il primo click in assoluto del gioco
                  for (var k = $(this).index(), iterations = 0; iterations < 12; iterations++, k++){   //ciclo che lavora su due valori: k, che è l'index dello square cliccato all'interno del suo array, e iterations, che determina il numero massimo di cicli (12)
                    if (squares[k].hasClass('green') && squares[k].text() > 0){    //se la casella individuata da k addizionato è verde e non è una casella con 0 mine intorno a se
                      squares[k].addClass('active');                              //allora rivelala
                      greenActiveSquares++;                                      //aumenta lo score: cioè registra il numero di caselle verdi rivelate
                        if (iterations == 4){k = k + 16;}                       //quando arrivi all'iterazione numero 4 incrementa k di 16, in modo di non rivelare solo caselle sulla stessa "riga"
                    }
                  }
                  firstClick = false;                                        //il primo click del gioco si è concretizzato, sposta firstClick su false
                } else {        //una volta che firstClick è false, verrà eseguito soltanto questo ramo della funzione
                $(this).children("div.flagged").remove();                  //rimuovi qualunque eventuale div figlio con classe .flagged (ovverosia, nel dubbio sflaggalo)
                $(this).addClass('active');                               //assegno classe .active (e quindi il quadrato si colora di verde, inoltre a nuovo click sullo stesso quadrato non accadrebbe nulla)
                greenActiveSquares++;                                    //aumenta lo score: cioè registra il numero di caselle verdi rivelate
                }
                $('.score > span').html(greenActiveSquares);           //alla fine di qualunque esecuzione dell'else if a riga 97 inietta lo score in html
              }
          else if ($(this).hasClass('green') && greenActiveSquares == 195){  //SE invece ha classe .green e lo score ha valore 195 (stai quindi cliccando l'ultima casella verde del gioco)
            $('.table_container').append("<h1 class='you_'>YOU WIN!</div>");  //inietta un nuovo h1 all'interno di .table_container che ti comunica che hai vinto e interrompe il gioco
          }
        }
      );

      //questo blocco di codice impedisce al menu di contesto di aprirsi al click destro del mouse se su elemento .square
      $('.square').contextmenu(
        function() {
          return false;
        }
      );

      //questo blocco di codice permette all'utente di flaggare le caselle sospette
      $('.square').mousedown(       //al click del mouse su una .square qualsiasi
        function (keyEvent) {
          if (keyEvent.button == 2){    //se è un click col tasto destro
            if ( ! ( $(this).children().is('div.flagged') ) && ! ( $(this).hasClass('active') ) && !firstClick ) {   //e se lo square cliccato: 1)non ha un figlio div.flagged (ovverosia non è già flaggato), 2)non è già stato cliccato, 3)non siamo al primo click del gioco
               $(this).append("<div class='flagged'></div>");        //inietta un div.flagged all'interno dello .square cliccato (ovverosia flagga la casella cliccata col tasto destro del mouse)
            } else {
               $(this).children("div.flagged").remove(); //in qualunque altro caso al click destro del mouse su questo .square rimuovi (se esiste) un suo div figlio che abbia la classe flagged (ovverosia sflaggalo)
            }
        }
      }
    );

  }
);
