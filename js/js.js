var results = ""
$('#cast').on('click', function(e){
  LineCast();
  results += ResultingLine;
  var click_counter = ($(this).data('click-counter') || 0) + 1;

  $('.number').append("<div class='line'></div>");

  $(this).data('click-counter', click_counter);
  if (click_counter >= 6){

    $(this).prop('disabled', true);
    $(this).fadeOut('slow');
    $('.number').fadeOut('slow');
    $('#guide').fadeOut('slow');
    $('#left').fadeIn('slow');
    $('#right').fadeIn('slow');
    $('#changing').fadeIn('slow');
    var results_left = results.replace(/x/g, "0").replace(/o/g, "1")
    var results_right = results.replace(/x/g, "1").replace(/o/g, "0")
    var no_changing_lines = false;

    if (results_right[0] != results_left[0]){
      $('#changing').append('<p>Line 1</p>')
    }
     if (results_right[1] != results_left[1]){
      $('#changing').append('<p>Line 2</p>')
    }
     if (results_right[2] != results_left[2]){
      $('#changing').append('<p>Line 3</p>')
    }
     if (results_right[3] != results_left[3]){
      $('#changing').append('<p>Line 4</p>')
    }
     if (results_right[4] != results_left[4]){
      $('#changing').append('<p>Line 5</p>')
    }
     if (results_right[5] != results_left[5]){
      $('#changing').append('<p>Line 6</p>')
    }

    // show the cast hexagram
    $('<h3>' + hexagrams[0][results_left]['hexagram'] + '</h3>').appendTo('#left');
    $('<p>' + hexagrams[0][results_left]['definition'] + '</p>').appendTo('#left');
    $('<p>' + hexagrams[0][results_left]['description'] + '</p>').appendTo('#left');
    $('<p><a target="_blank" href="https://en.wikipedia.org/wiki/List_of_hexagrams_of_the_I_Ching#Hexagram_' +
    hexagrams[0][results_left]['number'] +
    '">[wikipedia]</a>  <a target="_blank" href="http://www.jamesdekorne.com/GBCh/hex' +
    hexagrams[0][results_left]['number'] +
    '.htm">[gnostic]</a></p>').appendTo('#left');

    // check for rule 1, no lines changing
    if (results_left == results_right) {
      no_changing_lines == true;
      $('<p>No changing lines! Only the cast hexagram applies!</p>').appendTo('#changing');
    }

    var indices = [];
    for(var i=0; i<results.length;i++) {
      if (results[i] === "x" || results[i] === "o") indices.push(i);
    }

    var changing_lines = ((results.match(/o|x/g) || []).length)

    if (changing_lines === 1) {
      $('<p>There is one changing line. Consult this changing line.</p>').appendTo('#changing');
      change_text = hexagrams[0][results_left]['number'] + "_" + (indices[0]+1)
      $('<p><b>' + changing_map[0][change_text] + '</b></p>').appendTo('#changing');
    } else if (changing_lines === 2) {
      $('<p>There are two changing lines. The upper line prevails.</p>').appendTo('#changing');
      change_text = hexagrams[0][results_left]['number'] + "_" + (indices[1]+1)
      $('<p><b>' + changing_map[0][change_text] + '</b></p>').appendTo('#changing');
    } else if (changing_lines === 3) {
      $('<p>There are three changing lines. The middle line prevails.</p>').appendTo('#changing');
      change_text = hexagrams[0][results_left]['number'] + "_" + (indices[1]+1)
      $('<p><b>' + changing_map[0][change_text] + '</b></p>').appendTo('#changing');
    } else if (changing_lines === 4) {
      $('<p>There are four changing lines. The upper, non-changing line prevails.</p>').appendTo('#changing');
      change_text = hexagrams[0][results_left]['number'] + "_" + (indices[3]+1)
      $('<p><b>' + changing_map[0][change_text] + '</b></p>').appendTo('#changing');
    } else if (changing_lines === 5) {
      $('<p>There are five changing lines. The only non-changing line prevails.</p>').appendTo('#changing');
      for(var i=1;i<=6;i++) {
        if(indices.indexOf(i) == -1){missing = i}
      }
      change_text = hexagrams[0][results_left]['number'] + "_" + missing
      $('<p><b>' + changing_map[0][change_text] + '</b></p>').appendTo('#changing');
    } else if (changing_lines === 6) {
      $('<p>All changing lines! Only the transformed hexagram applies!</p>').appendTo('#changing');
    }

    // show the transformed hexagram
    $('<h3>' + hexagrams[0][results_right]['hexagram'] + '</h3>').appendTo('#right');
    $('<p>' + hexagrams[0][results_right]['definition'] + '</p>').appendTo('#right');
    $('<p>' + hexagrams[0][results_right]['description'] + '</p>').appendTo('#right');
    $('<p><a target="_blank" href="https://en.wikipedia.org/wiki/List_of_hexagrams_of_the_I_Ching#Hexagram_' +
    hexagrams[0][results_right]['number'] +
    '">[wikipedia]</a>  <a target="_blank" href="http://www.jamesdekorne.com/GBCh/hex' +
    hexagrams[0][results_right]['number'] +
    '.htm">[gnostic]</a></p>').appendTo('#right');

    $('#again').fadeIn('slow')
    };
});
