$(document).ready(function() {
  // Loads all the pokemon from the PokeAPI and displays them in a table
  var allPokemon = function() {
    // Loading symbol
    var $loading = $('#loading');
    $loading.show();
    // API url
    var apiRoot = 'https://pokeapi.co/api/v2/pokemon?limit=900';
    // Call to the API
    $.ajax(apiRoot, {
      success: function(data) {
        // DOM elements
        var $output = $('#output   tbody');
        var $count = $('#count');
        // Gets data from API
        var results = data.results;
        var length = results.length;
        // Displays the number of Pokemon
        $count.html(data.count);
        // Tranverses through the for loop, adding each pokemon to the list and adding an onclick method that calls the getPokemon function
        for (var i = 0; i < length; i++) {
          $output.append('<tr><td><a href="#" onclick="getPokemon(\'' + results[i].name + '\');">' + results[i].name + '</a></td></tr>');
        }
        $('#output').DataTable();
        $loading.hide();
      },
      error: function() {
        console.log('error');
        $('#output').text("An error has occured");
        $loading.hide();
      }
    });
  };
  // calls to the allPokemon function above
  allPokemon();
});

// Pikachu Sound Bit
function pikachuAudio() {
  var pikachuAud = new Audio();
  pikachuAud.src = "audio/pikachu.wav";
  pikachuAud.play();
}

// Loads the information about a particular pokemon
var getPokemon = function(pokemon) {
  $loading = $('#loading');
  $loading.show();
  // API url
  var apiRoot = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;
  // DOM Elements
  var $sprite = $('#sprite');
  var $name = $('#name');
  var $sprite = $('#sprite');
  var $height = $('#height');
  var $weight = $('#weight');
  var $types = $('#type');
  var $baseExperience = $('#base_experience');
  var $abilities = $('#abilities');
  // String variables to send into DOM elements
  var types = "";
  var abilities = "";
  var name = "";
  var pokeURL = "";
  // Call to PokeAPI
  $.ajax(apiRoot, {
    success: function(data) {
      $height.text(data.height);
      $weight.text(data.weight);
      $baseExperience.text(data.base_experience)
      var $output = $('#output');
      var innerHTML = '<ul class="list-group">';
      var abilitiesArray = data.abilities;
      var typesArray = data.types;
      var id = data.id;
      // Display picture from Pokemon website, if id is below 720
      // Need to properly format website address
      if (id <= 9) {
        pokeurl = "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/00" + id + ".png";
        $sprite.attr('src', pokeurl);
      } else if (id <= 99) {
        pokeurl = "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/0" + id + ".png";
        $sprite.attr('src', pokeurl);
      } else if (id <= 720) {
        pokeurl = "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + id + ".png";
      } else {
        pokeurl = data.sprites.front_default;
      }
      $sprite.attr('src', pokeurl);
      // format name with number in front i.e. "#25 Pikachu"
      name += '#' + id + " " + data.name;
      // format pokeman type i.e. "ice, grass"
      for (var i = 0; i < typesArray.length; i++) {
        types += typesArray[i].type.name;
        // add comma
        if (i < typesArray.length - 1) {
          types += ", ";
        }
      }
      // list abilities
      for (var i = 0; i < abilitiesArray.length; i++) {
        abilities += '<li>' + abilitiesArray[i].ability.name + '<br></li>';
      }
      $name.html(name);
      $types.html(types);
      $abilities.html(abilities);
      $('#myModal').modal('show');
      // if pikachu, play sound
      if (pokemon == "pikachu") {
        pikachuAudio();
      }
      $loading.hide();
    },
    error: function() {
      console.log('error');
      $loading.hide();
    }
  });
};