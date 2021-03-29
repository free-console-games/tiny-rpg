(function (elid, wi, he, exp, pot, gld, hp, lvl, cur_e, e_sz, lap, a, d) {
  var gen = function () {
    evs = [];
    for (var i = 0; i < e_sz - 1; i++) {
      evs.push(e_tp[Math.floor(Math.random() * Math.min(8, lap + 2))].slice(0));
    }
    evs.push(e_tp[8].slice(0));
    evs[Math.random() > 0.7 ? e_sz - 3 : e_sz - 2] = e_tp[0].slice(0);
    for (var i = 0; i < e_sz; i++) {
      if (evs[i].length > 8) {
        for (var j = 8; j < 12; j++) {
          evs[i][j] = Math.floor(evs[i][j] * (lap + 1) / 2);
        }
      }
    }
  };
  var hit = function () {
    evs[cur_e][8] -= lvl * 5 + a;
    if (evs[cur_e][8] <= 0) {
      alert(
        "Monster is defeated and you got " + evs[cur_e][10] + "EXP and $" +
          evs[cur_e][11],
      );
      exp += evs[cur_e][10];
      gld += evs[cur_e][11];
      while (exp >= lvl * 10) {
        exp -= lvl * 10;
        lvl++;
        alert("Level Up!");
      }
      cur_e++;
      if (cur_e == e_sz) {
        alert("Victory! You have killed dragon!");
        if (lap < 7) alert("But your princess in another castle");
        else if (lap == 7) {
          alert("You saved the princess! Thank you!");
          alert("But you can continue your journey and kill more dragons");
        } else alert("What about one more dragon?");
        cur_e = 0;
        lap++;
        gen();
      }
    } else {
      hp -= Math.max(0, evs[cur_e][9] - lvl * 2 - d);
      if (hp <= 0) alert("Game Over!");
    }
  };
  var use = function () {
    if (pot > 0) {
      pot--;
      hp += 10;
      if (hp > 100) hp = 100;
    }
  };
  var nxt = function () {
    cur_e++;
  };
  var battle = ["Attack", "Use Potion +10HP", "Skip Battle", hit, use, nxt];
  var evs = [],
    e_tp = [
      [
        "Shop",
        "Wizard provides his services",
        "Buy Potion $20",
        "Full Heal $100",
        "Leave",
        function () {
          if (gld >= 20) {
            gld -= 20;
            pot++;
          }
        },
        function () {
          if (gld >= 100) {
            gld -= 100;
            hp = 100;
          }
        },
        nxt,
      ],
      ["Slime", "What the strange jelly monster?"].concat(battle, 20, 6, 7, 20),
      ["Goblin", "Green goblin wants to get your money"].concat(
        battle,
        50,
        10,
        15,
        35,
      ),
      ["Skeleton", "A terrible skeleton on your way"].concat(
        battle,
        70,
        13,
        25,
        50,
      ),
      [
        "Arena",
        "You can train your skills here",
        "Train $100->50EXP",
        "Leave",
        "-",
        function () {
          if (gld >= 100) {
            gld -= 100;
            exp += 50;
            while (exp >= lvl * 10) {
              exp -= lvl * 10;
              lvl++;
              alert("Level Up!");
            }
          }
        },
        nxt,
      ],
      ["Werewolf", "Werewolf attacked you in the woods at night"].concat(
        battle,
        100,
        16,
        30,
        70,
      ),
      [
        "Forge",
        "Blacksmith can ungrade your stuff",
        "Upgrade sword $50",
        "Upgrade armor $50",
        "Leave",
        function () {
          if (gld >= 50) {
            gld -= 50;
            a++;
          }
        },
        function () {
          if (gld >= 50) {
            gld -= 50;
            d++;
          }
        },
        nxt,
      ],
      ["Ogre", "Hungry two-headed ogre wants to eat you"].concat(
        battle,
        120,
        18,
        35,
        90,
      ),
      [
        "Castle",
        "Omg! It is evil Dragon!",
        "Attack",
        "Use Potion +10HP",
        "-",
        hit,
        use,
        ,
        200,
        20,
        50,
        120,
      ],
    ];
  gen();
  
  function draw() {
    console.log('TinyRPG in 4Kb of JavaScript by psqq (original by ripatti)');
    if (lap > 1) console.log("Dragons killed " + (lap - 1));
    console.log("World " + lap + "-" + (cur_e + 1));
    console.log(
      "LVL " + lvl + "  HP " + hp + "/100  EXP " + exp + "/" + lvl * 10 +
        "  ATK " + (lvl * 5 + a) +
        "  DEF " + (lvl * 2 + d) + "  Gold $" + gld + "  Potions " + pot,
    );
    const pad_sz = Math.max.apply(Math, e_tp.map(x => x[0].length)) + 1;
    console.log('@'.padStart(pad_sz * (1 + cur_e)));
    let mapOut = '';
    for (var i = 0; i < e_sz; i++) {
      const mapCellOut = (i == e_sz - 1 || i <= cur_e) ? evs[i][0] : "??";
      mapOut += mapCellOut.padStart(pad_sz);
    }
    console.log(mapOut);
    console.log(evs[cur_e][1]);
    if (evs[cur_e].length > 8) {
      console.log(
        "Enemy HP " + evs[cur_e][8] + "  ATK " + evs[cur_e][9],
      );
    }
    for (var i = 0; i < 3; i++) {
      console.log('  ' + (i+1) + '. ' + evs[cur_e][i + 2]);
    }
  }
  
  alert("You are brave knight. You should defeat dragon and save princess.");
  
  while (true) {
    draw();
  	let inp = prompt('>');
  	if (inp === 'Q') break;
  	if (inp && inp.startsWith('MONEY')) {
  	  gld += parseInt(inp.split(/\s+/)[1]);
  	}
	  let i = parseInt(inp);
	  let act = evs[cur_e][i - 1 + 5];
	  if (act) act();
  }
})("#canvas", 400, 150, 0, 3, 100, 100, 1, 0, 7, 1, 5, 1);
