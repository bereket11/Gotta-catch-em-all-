$(document).ready(function() {
  // create Pokemon quiz upon loading the webpage
  pokemonQuiz();
});

// global variables
var answer;
var count = 0;
var maxPokemon = 150;

// initializes and displays the score
function initScore() {
  // DOM element
  var score = $('#score');
  score.html(count);
}

//initialize score
initScore();

// Pokemon Quiz, user guesses which Pokemon is being displayed 
function pokemonQuiz() {
  // DOM Elements
  var $sprite = $('#sprite');
  // doesn't work for chrome, blacksout image
  $sprite.html('style.filter = "brightness(0%)"');
  var $loading = $('#loading');
  var $left = $('#left');
  var $right = $('#right');

  $loading.show();
  // API url
  var apiRoot = 'https://pokeapi.co/api/v2/pokemon?limit=900';
  // call to PokeAPI
  $.ajax(apiRoot, {
    success: function(data) {
      // gets data from API
      var results = data.results;
      var length = results.length;
      // index of the random pokemon to be displayed/guessed
      var i = getRandomInt(1, maxPokemon);
      // random pokemon to be displayed/guessed
      answer = results[i].name;
      // get name and picture about the pokemon to be displayed
      getRandomPokemon(answer);
      // an array of pokemon names to guess from
      var choiceArr = [];
      // number of pokemon names to guess from
      var numchoices = 10;
      // include answer in the array of choices
      choiceArr[0] = answer;
      // will store the index of the random pokemon
      var index;
      // fills the array with random pokemon to guess from
      for (t = 1; t < numchoices;) {
        // gets a random number
        index = getRandomInt(1, maxPokemon);
        // makes sure the answer isn't repeated
        if (index != i) {
          choiceArr.push(results[index].name);
          t++;
        }
      }
      // display answers in a random order

      // a random index number of the choice to be displayed
      var randindex;
      // stores the name of a random pokemon to be displayed as a choice
      var choice;
      // string containing the html code for the two columns of radio buttons
      var leftchoicelabel = "";
      var rightchoicelabel = "";
      // an array that stores the index of the remaining choices to be displayed
      var unique = [];
      // stores the index number of the random number within the unique array
      var indexof;

      // initializes the array with permutated numbers in order to keep track of the remaining choices
      if (0 === unique.length) {
        for (g = 0; g < numchoices; g++) {
          unique.push(g);
        }
      }

      // displays the choices into radio buttons
      for (var n = 0; n < numchoices;) {
        // get a random number to display a random answer
        randindex = getRandomInt(0, 9);
        // test if random index number has been displayed already
        for (var m = 0; m < unique.length; m++) {
          // if the random index has not been displayed already, display the choice, otherwise try again.
          if (randindex == unique[m]) {
            choice = choiceArr[randindex];
            n++;
            // divides the choices into two sections
            if (0 == (randindex % 2)) {
              leftchoicelabel += '<label><input name="choices" type="radio" id = choice"' + n + '" value="' + choice + '">' + choice + "</label><br>";
              // remove the choice from possible options
              indexof = unique.indexOf(randindex);
              unique.splice(indexof, 1);
            } else {
              rightchoicelabel += '<label><input name="choices" type="radio" id = choice"' + n + '" value="' + choice + '">' + choice + "</label><br>";
              // remove the choice from possible options
              indexof = unique.indexOf(randindex);
              unique.splice(indexof, 1);
            }
          }
        }
      }
      // displays choices into two columns
      $left.html(leftchoicelabel);
      $right.html(rightchoicelabel);
      $loading.hide();
    },
    error: function() {
      $('#output').text("An error has occured");
      $loading.hide();
    }
  });
};
pokemonQuiz();

// button to finalize answer
var btnAnswer = $("#myAnswer").click(function() {
  checkAnswer();
});

// button to get a new pokemon
var btnNext = $("#next").click(function() {
  pokemonQuiz();
});

// displays whether answer was right or wrong, updates score accordingly
function checkAnswer() {
  var myanswer = $('input[name="choices"]:checked').val();
  // reveals the pokemon's image
  reveal();
  // correct answer
  if (myanswer == answer) {
    alert("Correct! It's " + answer + "!");
    // plus one point to score
    updateScore();
  }
  // wrong answer
  else {
    alert("Wrong! It's " + answer + "!");
    // reset the scoreboard
    resetScore();
  }
}

function resetScore() {
  count = 0;
  initScore();
}

function updateScore() {
  count++;
  initScore();
}

// reveal the pokemon
function reveal() {
  $("#sprite").html('style.filter = "brightness(100%)"');
}

// returns a random integer between a min and max number
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// sets the difficulty by generation
function difficulty(gen) {
  if (gen.id == "gen1") {
    maxPokemon = 151;
  } else if (gen.id == "gen2") {
    maxPokemon = 251;
  } else if (gen.id == "gen3") {
    maxPokemon = 386;
  } else if (gen.id == "gen4") {
    maxPokemon = 493;
  } else if (gen.id == "gen5") {
    maxPokemon = 649;
  } else {
    maxPokemon = 720;
  }
  // gets a new quiz with updated difficulty
  pokemonQuiz();
}

// Get Pokemon info
function getRandomPokemon(pokemon) {
  // API url
  var apiRoot = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;
  // call to the API
  $.ajax(apiRoot, {
    success: function(data) {
      // DOM element
      var $sprite = $('#sprite');
      // Data from PokeAPI
      var id = data.id;
      var pokeurl;
      // Proper picture
      if (id <= 9) {
        pokeurl = "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/00" + id + ".png";
      } else if (id <= 99) {
        pokeurl = "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/0" + id + ".png";
      } else {
        pokeurl = "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + id + ".png";
      }
      $sprite.attr('src', pokeurl);
    },
    error: function() {
      console.log("error");
    }
  });
}