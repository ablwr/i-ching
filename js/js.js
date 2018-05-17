var results = ""
var resultsLeft, resultsRight
var ResultingLine;
var cast = document.getElementById('cast')
var changing = document.getElementById('thatWhichIsCast')
var left = document.getElementById('left')
var right = document.getElementById('right')

var url = new URL(window.location.href)

if (window.location.hash) {
  results = window.location.hash.split('#')[1];
  iChing();
}

cast.addEventListener('click', function(e){
  for (i=0; i<6; i++) {
    LineCast();
    results += ResultingLine;
  }
  iChing();
});

function iChing() {
  fadeToResults();
  listLines();
  showLeft();
  getChanges();
  showRight()
  window.scrollTo(0,80);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  window.location.hash = results;

  fadeAlong(document.getElementById('again'));
};

function fadeAlong(el) {
  el.style.opacity = 0
  el.style.display = ''
  if (el.classList) {
    el.classList.add('FadeUpContent')
  } else {
    el.className += ' ' + 'FadeUpContent'
  }
  var last = new Date();
  var tick = function() {
    el.style.opacity += (new Date() - last) / 400;
    last = new Date();
    if (el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };
  tick();
}

function fadeAway(el) {
  el.style.opacity = 1;
  var last = new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() + last) / 400;
    last = new Date();
    if (el.style.opacity < 0) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };
  tick();
  el.style.display = 'none';
}

function fadeToResults(el) {
  document.getElementById('cast').setAttribute('disabled', true);
  fadeAway(cast);
  fadeAway(document.getElementById('guide'));
  document.getElementById('left').style.display = '';
  document.getElementById('right').style.display = '';
  fadeAlong(changing);
}

function buildLinks(el) {
  left_or_right = (el.id === 'left') ? left : right
  link_results = (el.id === 'left') ? resultsLeft : resultsRight

  a = document.createElement('a');
  gnostic = 'http://www.jamesdekorne.com/GBCh/hex' + hexagrams[0][link_results]['number'] + '.htm'
  a.setAttribute('href',gnostic)
  a.innerHTML = 'More information'
  a.target = "_blank"

  left_or_right.appendChild(a);
}


function listLines() {
  resultsLeft = results.replace(/x/g, "0").replace(/o/g, "1");
  resultsRight = results.replace(/x/g, "1").replace(/o/g, "0");

  for (i=0; i<resultsLeft.length; i++) {
    if (resultsRight[i] != resultsLeft[i]){
      cl = document.getElementById('changing_lines')
      cl.innerHTML += 'Line ' + (i+1)
      cl.appendChild(document.createElement('br'))
    }
  }
}

function showLeft() {
  var left_num = hexagrams[0][resultsLeft]['number'].length > 1 ? hexagrams[0][resultsLeft]['number'] : "0" + hexagrams[0][resultsLeft]['number']
  document.getElementById('left_hex').setAttribute('data',('hex.svg#' + left_num))
  document.getElementById('left_definition').innerHTML += hexagrams[0][resultsLeft]['definition']
  document.getElementById('left_description').innerHTML += hexagrams[0][resultsLeft]['description']
  buildLinks(left);
}

function showRight() {
  var right_num = hexagrams[0][resultsRight]['number'].length > 1 ? hexagrams[0][resultsRight]['number'] : "0" + hexagrams[0][resultsRight]['number']
  document.getElementById('right_hex').setAttribute('data',('hex.svg#' + right_num))
  document.getElementById('right_definition').innerHTML += hexagrams[0][resultsRight]['definition']
  document.getElementById('right_description').innerHTML += hexagrams[0][resultsRight]['description']
  buildLinks(right);
}

function getChanges() {
  let indices = [];
  for(i=0; i<results.length;i++) {
    if (results[i] === "x" || results[i] === "o") indices.push(i);
  }

  changing_lines = ((results.match(/o|x/g) || []).length)
  changing_desc = document.getElementById('changing_desc')
  changing_text = document.getElementById('changing_text')
  if (changing_lines === 0) {
    changing_desc.innerHTML += 'No changing lines! Only the cast hexagram applies!'
  } else if (changing_lines === 1) {
    changing_desc.innerHTML += 'There is one changing line. Consult this changing line.'
    change_text = hexagrams[0][resultsLeft]['number'] + "_" + (indices[0]+1)
    changing_text.innerHTML += changing_map[0][change_text]
  } else if (changing_lines === 2) {
    changing_desc.innerHTML += 'There are two changing lines. The upper line prevails.'
    change_text = hexagrams[0][resultsLeft]['number'] + "_" + (indices[1]+1)
    changing_text.innerHTML += changing_map[0][change_text]
  } else if (changing_lines === 3) {
    changing_desc.innerHTML += 'There are three changing lines. The middle line prevails.'
    change_text = hexagrams[0][resultsLeft]['number'] + "_" + (indices[1]+1)
    changing_text.innerHTML += changing_map[0][change_text]
  } else if (changing_lines === 4) {
    changing_desc.innerHTML += 'There are four changing lines. The upper, non-changing line prevails.'
    change_text = hexagrams[0][resultsLeft]['number'] + "_" + (indices[3]+1)
    changing_text.innerHTML += changing_map[0][change_text]
  } else if (changing_lines === 5) {
    changing_desc.innerHTML += 'There are five changing lines. The only non-changing line prevails.'
    for(var i=1;i<=6;i++) { if(indices.indexOf(i) == -1){missing = i} }
    change_text = hexagrams[0][resultsLeft]['number'] + "_" + missing
    changing_text.innerHTML += changing_map[0][change_text]
  } else if (changing_lines === 6) {
    changing_desc.innerHTML = 'All changing lines! Only the transformed hexagram applies!'
  }
}