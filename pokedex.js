$(document).ready(function() {
  // Gets all of Pokemon from PokeAPI and displays it into a list
  var allPokemon = function() {
    var $loading = $('#loading');
    $loading.show();
    // API url
    var apiRoot = 'https://pokeapi.co/api/v2/pokemon?limit=900';
    // Call to API
    $.ajax(apiRoot, {
      success: function(data) {
        // DOM elements
        var $output = $('#output   tbody');
        var $count = $('#count');
        // get data from API
        var results = data.results;
        var length = results.length;
        // Display number of Pokemon
        $count.html(data.count);
        // list the Pokemon
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
  // call allPokemon function upon loading the webpage
  allPokemon();
});

function pikachuAudio() {
  var pikachuAud = new Audio();
  pikachuAud.src = "audio/pikachu.wav";
  pikachuAud.play();
}

// Get info about particular pokemon and display it in the pokedex
var getPokemon = function(pokemon) {
  $loading = $('#loading');
  $loading.show();
  // API url
  var apiRoot = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;
  // DOM elements
  var $sprite = $('#sprite');
  var $name = $('#name');
  var $sprite = $('#sprite');
  var $height = $('#height');
  var $weight = $('#weight');
  var $types = $('#type');
  var $baseExperience = $('#base_experience');
  var $abilities = $('#abilities');
  // string variables
  var types = "";
  var abilities = "";
  var name = "";
  var pokeurl = "";
  // call to PokeAPI
  $.ajax(apiRoot, {
    success: function(data) {
      // get data from API
      $height.text(data.height);
      $weight.text(data.weight);
      $baseExperience.text(data.base_experience)
      var $output = $('#output');
      var innerHTML = '<ul class="list-group">';
      var abilitiesArray = data.abilities;
      var typesArray = data.types;
      var id = data.id;
      // get proper picture
      if (id <= 9) {
        pokeurl = "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/00" + id + ".png";
      } else if (id <= 99) {
        pokeurl = "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/0" + id + ".png";
      } else if (id <= 720) {
        pokeurl = "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + id + ".png";
      } else {
        pokeurl = data.sprites.front_default;
      }
      $sprite.attr('src', pokeurl);
      // format name with pokedex number in front i.e. "#25 Pikachu"
      name += '#' + id + " " + data.name;
      // format type i.e. "ice, grass"
      for (var i = 0; i < typesArray.length; i++) {
        types += typesArray[i].type.name;
        // add comma if multiple types
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
      // play pikachu audio if pikachu
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