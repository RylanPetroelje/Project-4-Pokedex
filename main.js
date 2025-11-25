const readline = require('readline');

function prompt(cb) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("", (answer) => {
    cb(answer);   // call the callback with user's input
    rl.close();   // allow Node to exit cleanly
  });
}

async function searchPoke(name) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

    const response = await fetch(url);
    const data = await response.json();

    printPoke(data);
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
}

// helper to capitalize names
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function showMenu() {
    console.log("             Menu Options               ");
    console.log("----------------------------------------");
    console.log("       1 - Search for a Pokemon");
    console.log("       2 - Search for an Item");
    console.log("       3 - Search for a Move\n");
    console.log("  Type 1, 2, or 3 to select an option...\n");
}

function run() {
  showMenu();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Your Selection: ", (answer) => {
    if(answer == "1") {

    } else if (answer == "2") {

    } else if (answer == "3") {
      
    } else {
      console
    }
    rl.close();   // allow Node to exit cleanly
  });


}
