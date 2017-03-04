var results = ""
$('#cast').on('click', function(e){
  LineCast();
  results += ResultingLine;
  var click_counter = ($(this).data('click-counter') || 0) + 1;
  $('#number').append("⌭");
  $(this).data('click-counter', click_counter);
  if (click_counter >= 6){
    $(this).prop('disabled', true);
    $(this).fadeOut('slow');
    $('#number').fadeOut('slow');
    $('#guide').fadeOut('slow');
    $('#left').fadeIn('slow');
    $('#right').fadeIn('slow');
    var results_left = results.replace(/x/g, "0").replace(/o/g, "1")
    var results_right = results.replace(/x/g, "1").replace(/o/g, "0")
    var no_changing_lines = false;
    $('<h3>' + hexagrams[0][results_left]['hexagram'] + '</h3>').appendTo('#left');
    $('<p>' + hexagrams[0][results_left]['definition'] + '</p>').appendTo('#left');
    $('<p><a target="_blank" href="https://en.wikipedia.org/wiki/List_of_hexagrams_of_the_I_Ching#Hexagram_' +
    hexagrams[0][results_left]['number'] +
    '">[wikipedia]</a>  <a target="_blank" href="http://www.jamesdekorne.com/GBCh/hex' +
    hexagrams[0][results_left]['number'] +
    '.htm">[gnostic]</a></p>').appendTo('#left');
    if (results_left == results_right) {
      no_changing_lines == true;
      $('<p>No changing lines! Only the cast hexagram applies!</p>').appendTo('#right');
    } else {
      $('<h3>' + hexagrams[0][results_right]['hexagram'] + '</h3>').appendTo('#right');
      $('<p>' + hexagrams[0][results_right]['definition'] + '</p>').appendTo('#right');
      $('<p><a target="_blank" href="https://en.wikipedia.org/wiki/List_of_hexagrams_of_the_I_Ching#Hexagram_' +
      hexagrams[0][results_right]['number'] +
      '">[wikipedia]</a>  <a target="_blank" href="http://www.jamesdekorne.com/GBCh/hex' +
      hexagrams[0][results_right]['number'] +
      '.htm">[gnostic]</a></p>').appendTo('#right');
    };
    $('#again').show()
    };
});
