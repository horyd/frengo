//------INITIAL STATE------//

var cards = [{
  "picture": "images/dog.jpg",
  "englishWord": "Dog",
  "frenchWord": "Chien"
}, {
  "picture": "images/cat.jpg",
  "englishWord": "Cat",
  "frenchWord": "Chat"
}, {
  "picture": "images/cow.jpg",
  "englishWord": "Cow",
  "frenchWord": "Vache"
}, {
  "picture": "images/horse.jpg",
  "englishWord": "Horse",
  "frenchWord": "Cheval"
}, {
  "picture": "images/book.jpg",
  "englishWord": "Book",
  "frenchWord": "Livre"
}, {
  "picture": "images/mountain.jpg",
  "englishWord": "Mountain",
  "frenchWord": "Montagne"
}, {
  "picture": "images/butterfly.jpg",
  "englishWord": "Butterfly",
  "frenchWord": "Papilion"
}, {
  "picture": "images/tree.jpg",
  "englishWord": "Tree",
  "frenchWord": "Arbre"
}, {
  "picture": "images/newspaper.jpg",
  "englishWord": "Newspaper",
  "frenchWord": "Journal"
}, {
  "picture": "images/house.jpg",
  "englishWord": "House",
  "frenchWord": "Maison"
}];

var attemptNumber = 0;
var correctAnswers = 0;
var review = false;

//------DOM MANIPULATIONS-------//

function updateEnglishWord() {
  $('#englishWord').text(cards[attemptNumber].englishWord);
}
function updateFrenchWord() {
  $('#frenchWord').text(cards[attemptNumber].frenchWord);
}
function updatePicture() {
  $('img').attr('src', cards[attemptNumber].picture);
}
function updateAttemptNumber() {
  $('#attempt').text(attemptNumber + 1);
}
function updatePercentCorrect() {  
  $('#percent').text(Math.round((correctAnswers/(attemptNumber+1)) * 100 || 0));
}
function colourInput(colour) {
  $('#answer').css({backgroundColor: colour});
}
function showFrenchWord() {
  $('#frenchWord').show();
}
function hideFrenchWord() {
  $('#frenchWord').hide();
}
function changeButtonText(text) {
  $('.enter').attr('value', text);
}
function updateResultText(text) {
  $('#resultText').text(text);
}

//------GAME LOGIC------//

function incrementAttempt() {
  attemptNumber++;
}

function newAttempt() {
  updatePicture();
  updateAttemptNumber();
  updateEnglishWord();
  updateFrenchWord();
  changeButtonText('Submit');
  colourInput('white');
  review = false;
  hideFrenchWord();
}
function resetGame() {
  attemptNumber = 0;
  correctAnswers = 0;
  newAttempt();
  updatePercentCorrect();
  $('#results').hide();
  $('#game').show();
}
function endGame() {
  var result = (correctAnswers/(attemptNumber + 1)) * 100;
  if (0<=result && result<=40) {
    updateResultText('Oh no! You only got '+result+'% Correct! You need to practice… :(');
    $('.resultGif').attr('src', 'images/resultpoor.gif');
  } else if (40<result && result<=60) {
    updateResultText('Not bad, you got '+result+'% Correct!');
    $('.resultGif').attr('src', 'images/resultgoodenough.gif');
  } else if (60<result && result<=90) {
    updateResultText('Congratulations, you got '+result+'% Correct! :D');
    $('.resultGif').attr('src', 'images/resultverygood.gif');
  } else if (90<result && result<=100) {
    updateResultText('Wow! You got ' +result+'% Correct! Are you sure you’re not French? :D');
    $('.resultGif').attr('src', 'images/resultlevelfrench.gif');
  }
  $('#game').hide();
  $('#results').css({display: 'flex'});
}

function reviewAttempt(answer) {
  if (answer.toLowerCase() === cards[attemptNumber].frenchWord.toLowerCase()) {
    colourInput('green');
    correctAnswers++;
  } else {
    colourInput('red');
  }
  if (attemptNumber === (cards.length - 1)) {
    changeButtonText('Finish');
  } else {
    changeButtonText('Next');
  }
  review = true;
  showFrenchWord();
  updatePercentCorrect();
}

// ----- EVENTS -----//
$('#playAgain').click(resetGame);
$('.fbShareResults').click(function (){
  FB.ui({
  method: 'feed',
  link: 'http://frengo.bitballoon.com/',
  description: 'I just scored ' + Math.round((correctAnswers/(attemptNumber + 1)) * 100) + '% on FRENGO!',
}, function(response){});
});
$('.reset').click(resetGame);
$('form').submit(function(event) {
  event.preventDefault();
  if (review === false) {
    reviewAttempt(this.answer.value);
  } else if (attemptNumber === cards.length - 1) {
    endGame();
    this.answer.value= '';
  } else {
    incrementAttempt();
    newAttempt();
    this.answer.value= '';
  }
});

// ----- RUN GAME -----//

newAttempt();
updatePercentCorrect();
