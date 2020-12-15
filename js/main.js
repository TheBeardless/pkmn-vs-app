class Pokemon {
  constructor(id, image, name, hp, attack, defence, Speed) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defence = defence;
    this.speed = Speed;
    this.fainted = false;
    this.accuracy = 10;
    this.level = 100;
    this.currentHP = this.hp;
  }
}

function randPokemonNum() {
  return Math.floor(Math.random() * 151) + 1;
}

function newPokemon(i) {
  $.get(`${baseURL}${randPokemonNum()}`, (data) => {
    pokemon[i] = new Pokemon(
      i + 1,
      data.sprites.front_default,
      data.name,
      data.stats[0].base_stat,
      data.stats[1].base_stat,
      data.stats[2].base_stat,
      data.stats[5].base_stat
    );

    updatePokemonDom(pokemon[i]);
  });
}

function updatePokemonDom(pokemon) {
  const id = pokemon.id;
  $(`#pkmn${id}-img`).attr("src", pokemon.image);
  $(`#pkmn${id}-name`).append(pokemon.name);
  $(`#pkmn${id}-hp`).append(`${pokemon.hp}/${pokemon.currentHP}`);
  $(`#pkmn${id}-hp-bar`).append(pokemon.currentHP);
  $(`#pkmn${id}-attack`).append(pokemon.attack);
  $(`#pkmn${id}-defence`).append(pokemon.defence);
  $(`#pkmn${id}-speed`).append(pokemon.speed);
}

function attack() {
  const critChance = Math.floor(Math.random() * 10) + 1;
  const damage =
    (((2 * attackingPokemon.level) / 5 + 2) *
      attackingPokemon.attack *
      (attackingPokemon.attack / defendingPokemon.defence)) /
      50 +
    2;

  $("eventLogArea").append(`${attackingPokemon.name} did ${damage} damage`);

  defendingPokemon.currentHP = defendingPokemon.currentHP - damage;

  if (defendingPokemon.currentHP >= 0) {
    defendingPokemon.fainted = true;
    $("eventLogArea").append(`${defendingPokemon.name} has fainted, you win!`);
  }
}

// function takeTurn () {
//     if ((currentPokemon = pokemon1Id)) {
//         pokemon2Id.currentHP = pokemon2Id.currentHP - pokemon1Id.attackDamage;
//         //updateHealthBarLogic;
//         currentPokemon = pokemon2Id;
//         $("eventLogArea").append(
//             `${pokemon1Id.name} did ${pokemon1Id.attackDamage} damage`
//         );
//         if (pokemon1Id.currentHP <= 0) {
//             $("eventLogArea").append(`${pokemon1Id.name} has fainted, you win!`);
//         }
//     } else {
//         pokemon1Id.currentHP = pokemon1Id.currentHP - pokemon2Id.attackDamage;
//         //updateHealthBarLogic;
//         currentPokemon = pokemon1Id;
//         $("eventLogArea").append(
//             `${pokemon1Id.name} did ${pokemon1Id.attackDamage} damage`
//         );
//         if (pokemon1Id.currentHP <= 0) {
//             $("eventLogArea").append(`${pokemon1Id.name} has fainted, you win!`);
//         }
//     }
// }

function setInitialTurn() {
  console.log("setting initial turn");
  const pokemon1test = pokemon1;
  const pokemon2test = pokemon2;
  const attackingId = pokemon2
    ? pokemon[pokemon2].speed > pokemon[pokemon1].speed
    : pokemon1;
  this.attackingPokemon = pokemon[attackingId];
  this.defendingPokemon =
    pokemon[pokemon2 ? attackingId === pokemon1 : pokemon1];
}

function nextTurn() {
  const tmpPokemon = attackingPokemon;
  attackingPokemon = defendingPokemon;
  defendingPokemon = tmpPokemon;
}

function battle() {
  console.log("BATTLE");
  attack();
  nextTurn();
}
// function battle() {
//     if ((currentPokemon = pokemon1Id)) {
//         pokemon2Id.currentHP = pokemon2Id.currentHP - pokemon1Id.attackDamage;
//         //updateHealthBarLogic;
//         currentPokemon = pokemon2Id;
//         $("eventLogArea").append(
//             `${pokemon1Id.name} did ${pokemon1Id.attackDamage} damage`
//         );
//         if (pokemon1Id.currentHP <= 0) {
//             $("eventLogArea").append(`${pokemon1Id.name} has fainted, you win!`);
//         }
//     } else {
//         pokemon1Id.currentHP = pokemon1Id.currentHP - pokemon2Id.attackDamage;
//         //updateHealthBarLogic;
//         currentPokemon = pokemon1Id;
//         $("eventLogArea").append(
//             `${pokemon1Id.name} did ${pokemon1Id.attackDamage} damage`
//         );
//         if (pokemon1Id.currentHP <= 0) {
//             $("eventLogArea").append(`${pokemon1Id.name} has fainted, you win!`);
//         }
//     }
// }

function battleLoop() {}

const baseURL = `https://pokeapi.co/api/v2/pokemon/`;

var pokemon = [null, null];

var pokemon1 = 0;
var pokemon2 = 1;

// Probably not the best way but having these global will make this so easy
var attackingPokemon;
var defendingPokemon;

newPokemon(pokemon1);
newPokemon(pokemon2);

setInitialTurn();

///// TODO - Update log.
console.log("testing");
// console.log(pokemon2);
$("eventLogArea").append(`<p>This is a test</p>`);

//// TODO - Each button press creates a new pokemon entry.
$("#btn-swap-1").on("click", () => {
  newPokemon(pokemon1);
  console.log("swap1 button clicked");
});

$("#btn-swap-2").on("click", () => {
  newPokemon(pokemon2);
  console.log("swap2 button clicked");
});

//////////
//// Main Function
//////////

// $("battle-button").on("click", battle);
$(".start-button").on("click", battle);
