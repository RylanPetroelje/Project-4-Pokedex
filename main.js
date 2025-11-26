
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(cb) {

  rl.question("", (answer) => {
    cb(answer) // call the callback with user's input
  });
};

function showMenu() {
    console.log("             Menu Options               ");
    console.log("----------------------------------------");
    console.log("       1 - Search for a Pokemon");
    console.log("       2 - Search for an Item");
    console.log("       3 - Search for a Move");
    console.log("       4 - Exit Pokedex\n");
    
    console.log("  Type 1, 2, 3, or 4 to select an option...\n");
}

function run() {
  showMenu();

  rl.question("Your Selection: ", (answer) => {
    if(answer == "1") {
      console.log("Type in a pokemon name...");
      prompt(searchPoke);
    } else if (answer == "2") {
      console.log("Type in an item name...");
      prompt(searchItem);
    } else if (answer == "3") {
      console.log("Type in a move name...");
      prompt(searchMove);
    } else if(answer == "4") {
      rl.close()
    } else {
      console.log("Not a valid option!\n");
      run();
    }
  });
}

async function searchPoke(name) {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

    const response = await fetch(url);
    const data = await response.json();

    printPoke(data);
  } catch (error) {
    console.log(`\nInvalid Pokemon: ${name}!\n`)
    console.log("Type in a pokemon name...");
    prompt(searchMove);
  }
}

function printPoke(p) {
  console.log("========================================");
  console.log(`Name:       ${capitalize(p.name)}`);
  console.log(`ID:         ${p.id}`);
  console.log("----------------------------------------");

  const types = p.types.map(t => capitalize(t.type.name)).join(", ");
  console.log(`Types:      ${types}`);

  const abilities = p.abilities
    .map(a => capitalize(a.ability.name))
    .join(", ");
  console.log(`Abilities:  ${abilities}`);

  console.log("Stats:");
  p.stats.forEach(s => {
    console.log(`  - ${capitalize(s.stat.name)}: ${s.base_stat}`);
  });

  console.log("----------------------------------------");
  console.log(`Height:     ${p.height}`);
  console.log(`Weight:     ${p.weight}`);
  console.log("========================================\n");

  run();
}

async function searchMove(name) {
  try {
    const url = `https://pokeapi.co/api/v2/move/${name}`;

    const response = await fetch(url);
    const data = await response.json();

    printMove(data);
  } catch (error) {
    console.log(`\nInvalid Move: ${name}!\n`)
    console.log("Type in a move name...");
    prompt(searchMove);
  }
}

function printMove(move) {
  console.log("========================================");
  console.log(`Name:        ${capitalize(move.name)}`);

  if (move.type && move.type.name) {
    console.log(`Type:        ${capitalize(move.type.name)}`);
  }

  if (move.damage_class && move.damage_class.name) {
    console.log(`Category:    ${capitalize(move.damage_class.name)}`);
  }

  if (move.power !== null && move.power !== undefined) {
    console.log(`Power:       ${move.power}`);
  } else {
    console.log(`Power:       N/A`);
  }

  console.log(`Accuracy:    ${move.accuracy !== null ? move.accuracy : "N/A"}`);
  console.log(`PP:          ${move.pp !== null ? move.pp : "N/A"}`);
  console.log(`Priority:    ${move.priority !== null ? move.priority : 0}`);

  if (move.effect_entries && move.effect_entries.length > 0) {
    const effect = move.effect_entries.find(e => e.language.name === "en");
    if (effect) {
      console.log(`Effect:       ${effect.effect}`);
      console.log(`Short Effect: ${effect.short_effect}`);
    }
  }

  console.log("========================================\n");

  run();
}

async function searchItem(name) {
  try {
    const url = `https://pokeapi.co/api/v2/item/${name}`;

    const response = await fetch(url);
    const data = await response.json();

    printItem(data);
  } catch (error) {
    console.log(`\nInvalid Item: ${name}!\n`)
    console.log("Type in an item name...");
    prompt(searchMove);
  }
}

function printItem(item) {
  console.log("========================================");
  console.log(`Name:        ${capitalize(item.name)}`);
  console.log(`Cost:        ${item.cost}`);
  console.log("----------------------------------------");

  if (item.effect) {
    console.log(`Effect:      ${item.effect}`);
  }

  if (item.short_effect) {
    console.log(`Short Effect: ${item.short_effect}`);
  }

  if (item.fling_power) {
    console.log(`Fling Power: ${item.fling_power}`);
  }
  if (item.fling_effect) {
    console.log(`Fling Effect: ${item.fling_effect}`);
  }

  console.log("========================================\n");

  run();
}

// Helper function to capitalize names
function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

run();