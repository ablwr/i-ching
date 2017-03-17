let results = ""
let results_left, results_right
let click_counter = 0;
const cast = document.getElementById('cast')
const number_text = document.getElementById('number')
let changing = document.getElementById('changing')
let left = document.getElementById('left')
let right = document.getElementById('right')


cast.addEventListener('click', function(e){
  LineCast();
  results += ResultingLine;
  results_left = results.replace(/x/g, "0").replace(/o/g, "1")
  results_right = results.replace(/x/g, "1").replace(/o/g, "0")

  line = document.createElement('div')
  line.classList.add('line')
  number_text.appendChild(line);
  click_counter += 1

  if (click_counter >= 6){

    document.getElementById('cast').setAttribute('disabled', true);
    fadeAway(cast);
    fadeAway(number_text);
    fadeAway(document.getElementById('guide'));
    document.getElementById('left').style.display = ''
    document.getElementById('right').style.display = ''
    changing.style.display = ''

    // list the changing lines
    for (i=0; i<results_left.length; i++) {
      if (results_right[i] != results_left[i]){
        cl = document.getElementById('changing_lines')
        cl.innerHTML += 'Line ' + (i+1)
        cl.appendChild(document.createElement('br'))
      }
    }

    // show the cast hexagram
    document.getElementById('left_hex').innerHTML += hexagrams[0][results_left]['hexagram']
    document.getElementById('left_definition').innerHTML += hexagrams[0][results_left]['definition']
    document.getElementById('left_description').innerHTML += hexagrams[0][results_left]['description']
    buildLinks(left);

    // check for rule 1, no lines changing
    if (results_left == results_right) {
      p = document.createElement('p')
      p.innerHTML = 'No changing lines! Only the cast hexagram applies!'
      changing.appendChild(p)
    }

    let indices = [];
    for(i=0; i<results.length;i++) {
      if (results[i] === "x" || results[i] === "o") indices.push(i);
    }

    changing_lines = ((results.match(/o|x/g) || []).length)
    changing_desc = document.getElementById('changing_desc')
    changing_text = document.getElementById('changing_text')
    if (changing_lines === 1) {
      changing_desc.innerHTML += 'There is one changing line. Consult this changing line.'
      change_text = hexagrams[0][results_left]['number'] + "_" + (indices[0]+1)
      changing_text.innerHTML += changing_map[0][change_text]
    } else if (changing_lines === 2) {
      changing_desc.innerHTML += 'There are two changing lines. The upper line prevails..'
      change_text = hexagrams[0][results_left]['number'] + "_" + (indices[1]+1)
      changing_text.innerHTML += changing_map[0][change_text]
    } else if (changing_lines === 3) {
      changing_desc.innerHTML += 'There are three changing lines. The middle line prevails.'
      change_text = hexagrams[0][results_left]['number'] + "_" + (indices[1]+1)
      changing_text.innerHTML += changing_map[0][change_text]
    } else if (changing_lines === 4) {
      changing_desc.innerHTML += 'There are four changing lines. The upper, non-changing line prevails.'
      change_text = hexagrams[0][results_left]['number'] + "_" + (indices[3]+1)
      changing_text.innerHTML += changing_map[0][change_text]
    } else if (changing_lines === 5) {
      changing_desc.innerHTML += 'There are five changing lines. The only non-changing line prevails.'
      for(var i=1;i<=6;i++) { if(indices.indexOf(i) == -1){missing = i} }
      change_text = hexagrams[0][results_left]['number'] + "_" + missing
      changing_text.innerHTML += changing_map[0][change_text]
    } else if (changing_lines === 6) {
      changing_desc.innerHTML = 'All changing lines! Only the transformed hexagram applies!'
    }

    // show the transformed hexagram
    document.getElementById('right_hex').innerHTML += hexagrams[0][results_right]['hexagram']
    document.getElementById('right_definition').innerHTML += hexagrams[0][results_right]['definition']
    document.getElementById('right_description').innerHTML += hexagrams[0][results_right]['description']
    buildLinks(right);

    fadeAlong(document.getElementById('again'))
    };
});

function fadeAlong(el) {
  el.style.opacity = 0;
  el.style.display = '';
  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date();
    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };
  tick();
}

function fadeAway(el) {
  el.style.opacity = 1;
  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() + last) / 400;
    last = +new Date();
    if (+el.style.opacity < 0) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };
  tick();
  el.style.display = 'none';
}

function buildLinks(el) {
  left_or_right = (el.id === 'left') ? left : right
  link_results = (el.id === 'left') ? results_left : results_right
  a = document.createElement('a');
  wiki = 'https://en.wikipedia.org/wiki/List_of_hexagrams_of_the_I_Ching#Hexagram_' + hexagrams[0][link_results]['number']
  a.setAttribute('href', wiki);
  a.innerHTML = '[wikipedia] '
  a.target = "_blank"

  a2 = document.createElement('a');
  gnostic = 'http://www.jamesdekorne.com/GBCh/hex' + hexagrams[0][link_results]['number'] + '.htm'
  a2.setAttribute('href',gnostic)
  a2.innerHTML = ' [gnostic]'
  a2.target = "_blank"

  left_or_right.appendChild(a);
  left_or_right.appendChild(a2);
}
