// create a pokemon class, then create a pkmn1 object and a pkmn2 from API.
// compare attack speed of pkmn1 to pkmn1, largest value goes first
// attackDealt = attackDamage - Defence
// healthRemaining = healthPoints - attackDamage

class Pokemon {
  constructor(name, hp, attack, defence, Speed) {
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defence = defence;
    this.speed = Speed;
    this.fainted = false;
  }
  attack(opponent) {
    console.log("-----Attacking-----");
  }
}

const pokemon1 = new Pokemon();
// $name,
// $healhpoints,
// $attackDamage,
// $defence,
// $attackSpeed
const pokemon2 = new Pokemon();
// $name,
// $healhpoints,
// $attackDamage,
// $defence,
// $attackSpeed

// random API generation:
// https://pokeapi.co/api/v2/pokemon/{rand(1-151)}

const randomNumber = Math.floor(Math.random() * 151) + 1;
const randomPokemon = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
// console.log(randomPokemon);

const pokemonData1 = $.get(randomPokemon, (data) => {
  $("#pkmn1-img").attr("src", data.sprites.front_default);
  $("#pkmn1-name").append(data.name);
  $("#pkmn1-hp").append(data.stats[0].base_stat);
  $("#pkmn1-attack").append(data.stats[1].base_stat);
  $("#pkmn1-defence").append(data.stats[2].base_stat);
  $("#pkmn1-speed").append(data.stats[5].base_stat);
});

const pokemonData2 = $.get(randomPokemon, (data) => {
  $("#pkmn2-img").attr("src", data.sprites.front_default);
  $("#pkmn2-name").append(data.name);
  $("#pkmn2-hp").append(data.stats[0].base_stat);
  $("#pkmn2-attack").append(data.stats[1].base_stat);
  $("#pkmn2-defence").append(data.stats[2].base_stat);
  $("#pkmn2-speed").append(data.stats[5].base_stat);
});
