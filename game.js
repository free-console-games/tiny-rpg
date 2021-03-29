// console version of http://jsfiddle.net/kPZaP/16/embedded/result/

function generate_map() {
}

function print_stats() {
  var s = `LVL ${you.lvl}`;
  s += ` HP ${you.hp}/${you.maxHp}`;
  s += ` EXP ${you.exp}/${you.maxExp}`;
  s += ` ATK ${you.atk}`;
  s += ` DEF ${you.def}`;
  s += ` Gold $${you.gold}`;
  s += ` Potions ${you.potions}`;
  console.log(s);
}

let done = false;

let you = {
  lvl: 1,
  hp: 100,
  maxHp: 100,
  exp: 0,
  maxExp: 10,
  atk: 10,
  def: 3,
  gold: 100,
  potions: 3,
};

let map = [];

console.log(
  "\nYou are brave knight.\nYou should defeat dragon and save princess.\n",
);
print_stats();

while (!done) {
  const inp = prompt(">");
  if (inp === "Q") {
    done = true;
  }
}
