// create a pokemon class, then create a pkmn1 object and a pkmn2 from API.
// compare attack speed of pkmn1 to pkmn1, largest value goes first
// attackDealt = attackDamage - Defence
// healthRemaining = healthPoints - attackDamage

class Pokemon {
  constructor(name, healthPoints, attackDamage, defence, attackSpeed) {
    this.name = name;
    this.healthPoints = healthPoints;
    this.attackDamage = attackDamage;
    this.defence = defence;
    this.attackSpeed = attackSpeed;
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

const pokemonData = $.get("https://pokeapi.co/api/v2/pokemon/1", (data) => {
  console.log(data);
  console.log(data.sprites.front_default);
  console.log(data.name);
  console.log(data.stats[0].base_stat);
});
