class Pokemon {
  constructor(image, name, hp, attack, defence, Speed) {
    this.image = image;
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defence = defence;
    this.speed = Speed;
    this.fainted = false;
    this.accuracy = 10;
    this.level = 100;
    this.attackPower = this.attack;
    this.currentHP = this.hp;
  }
  attack(opponent) {
    console.log("-----Attacking-----");
    critChance = Math.floor(Math.random() * 10) + 1;
    attackDamage =
      (((2 * this.level) / 5 + 2) *
        this.attackPower *
        (this.attack / opponent.defence)) /
        50 +
      2;
    console.log("attackDamage:", attackDamage);
  }
  takeDamage(opponent) {
    console.log("current HP = ", this.currentHP);
    if (hp >= 0) {
      this.currentHP = this.currentHP - opponent.attackDamage;
      console.log("HP after damage = ", this.currentHP);
    } else {
      this.fainted = true;
      console.log(this.name, " has fainted");
    }
  }
}

// Random pokemon generator and api
const randomNumber1 = Math.floor(Math.random() * 151) + 1;
const randomNumber2 = Math.floor(Math.random() * 151) + 1;
const randomPokemon1 = `https://pokeapi.co/api/v2/pokemon/${randomNumber1}`;
const randomPokemon2 = `https://pokeapi.co/api/v2/pokemon/${randomNumber2}`;

const pokemonData1 = $.get(randomPokemon1, (data) => {
  const pokemon1 = new Pokemon(
    data.sprites.front_default,
    data.name,
    data.stats[0].base_stat,
    data.stats[1].base_stat,
    data.stats[2].base_stat,
    data.stats[5].base_stat
  );

  $("#pkmn1-img").attr("src", pokemon1.image);
  $("#pkmn1-name").append(pokemon1.name);
  $("#pkmn1-hp").append(`${pokemon1.hp}/${pokemon1.currentHP}`);
  $("#pkmn1-hp-bar").append(pokemon1.currentHP);
  $("#pkmn1-attack").append(pokemon1.attack);
  $("#pkmn1-defence").append(pokemon1.defence);
  $("#pkmn1-speed").append(pokemon1.speed);
});

const pokemonData2 = $.get(randomPokemon2, (data) => {
  const pokemon2 = new Pokemon(
    data.sprites.front_default,
    data.name,
    data.stats[0].base_stat,
    data.stats[1].base_stat,
    data.stats[2].base_stat,
    data.stats[5].base_stat
  );

  $("#pkmn2-img").attr("src", pokemon2.image);
  $("#pkmn2-name").append(pokemon2.name);
  $("#pkmn2-hp").append(`${pokemon2.hp}/${pokemon2.currentHP}`);
  $("#pkmn2-hp-bar").append(pokemon2.currentHP);
  $("#pkmn2-attack").append(pokemon2.attack);
  $("#pkmn2-defence").append(pokemon2.defence);
  $("#pkmn2-speed").append(pokemon2.speed);
});

///// TODO - Update log.
console.log("testing");
// console.log(pokemon2);
$("eventLogArea").append(`<p>This is a test</p>`);

//// TODO - Each button press creates a new pokemon entry.
$("#btn-swap-1").on("click", () => {
  console.log("swap1 button clicked");
});

$("#btn-swap-2").on("click", () => {
  console.log("swap2 button clicked");
  pokemonData2;
});

//////////
//// Main Function
//////////

$("battle-button").on("click", battle);

// who goes first - hardcoded for now
let currentPokemon = pokemon1;

function battle() {
  if ((currentPokemon = pokemon1)) {
    pokemon2.currentHP = pokemon2.currentHP - pokemon1.attackDamage;
    //updateHealthBarLogic;
    currentPokemon = pokemon2;
    $("eventLogArea").append(
      `${pokemon1.name} did ${pokemon1.attackDamage} damage`
    );
    if (pokemon1.currentHP <= 0) {
      $("eventLogArea").append(`${pokemon1.name} has fainted, you win!`);
    }
  } else {
    pokemon1.currentHP = pokemon1.currentHP - pokemon2.attackDamage;
    //updateHealthBarLogic;
    currentPokemon = pokemon1;
    $("eventLogArea").append(
      `${pokemon1.name} did ${pokemon1.attackDamage} damage`
    );
    if (pokemon1.currentHP <= 0) {
      $("eventLogArea").append(`${pokemon1.name} has fainted, you win!`);
    }
  }
}
