# Class data file schema (one JSON file per class)

Write valid JSON (UTF-8, no comments, no trailing commas) to:
`/tmp/claude-0/-home-claude/cea75348-960f-5dce-b241-58afde369a62/scratchpad/allclass/<id>.json`

All player-facing text is bilingual: `{"en":"...","es":"..."}`. Spanish must be natural Latin-American Spanish for gamers, short and clear. Keep game skill names exactly as in the data source (EN `n`, ES `ne`). Keep sentences SHORT (this is a compact, user-friendly page). No marketing tone.

```jsonc
{
  "id": "sorcerer",                       // gladiator|templar|assassin|ranger|sorcerer|spiritmaster|cleric|chanter
  "name": {"en":"Sorcerer","es":"<Spanish in-game class name if known, else translation>"},
  "classIcon": "UT_Class_Sorcerer_Large", // questlog icon (verify https://cdn.questlog.gg/aion-2/assets/Game/UI/Resource/Texture/Icon/<x>.webp loads; for spiritmaster the internal name may be Elementalist)
  "color": "#ff7a3d",                     // accent colour for the class
  "role": {"en":"Ranged magic DPS","es":"..."},
  "weapon": {"en":"Spellbook + Guard","es":"..."},
  "difficulty": 1-3,
  "summary": {"en":"2 short sentences: what the class does and its core loop","es":"..."},
  "engine": {"en":"e.g. Firestorm → Hellfire cooldown","es":"..."},

  // EVERY active (12), passive (10) and stigma (13) skill of the class + Defiance. Copy from the questlog data (window._D), do not invent.
  "skills": [
    {
      "n":"Hellfire","ne":"Llamas del infierno","nk":"지옥의 화염",
      "ic":"ICON_SO_SKILL_006",          // icon file name
      "t":"active",                       // active|passive|stigma
      "un":14,                            // unlock character level
      "cd":45,                            // cooldown in seconds (0 = none)
      "charge":true,                      // only if charge skill
      "d":{"en":"one-line effect (<=140 chars, from data, numbers OK)","es":"..."},
      "sp":[[8,"en text","es text"], ...],// specialties exactly from data (parent level, EN, ES)
      "rank": 1,                          // build priority (1 = most important). 0 = skip / leave at 1
      "tag": {"en":"Main nuke","es":"Nuke principal"},   // 1-3 word role
      "tip": {"en":"one short practical sentence","es":"..."},
      "pickLev":[0,3,4],                  // specialty indexes (into sp) to equip while levelling, best first
      "pickEnd":[1,3,4]                   // specialty indexes for endgame (Lv45), best first
    }
  ],

  // skill-point plan for the simulator: ordered milestones [skillName, targetLevel]; skills max 10 from points.
  // Budget ~201 points total by Lv45 (cost to reach level L: 2-4:1 each, 5-7:2 each, 8-10:4 each = 21 to reach 10).
  // So ~9-10 skills can reach 10. Put actives first, then key passives. Interleave so early levels feel good.
  "points": [["Firestorm",4],["Flame Arrow",3], ... ],

  "stigma": {
    "loadouts":[
      {"id":"main","name":{"en":"PvE main","es":"..."},"skills":["s1","s2","s3","s4"],"note":{"en":"...","es":"..."}},
      {"id":"solo","name":{"en":"Solo / leveling","es":"..."},"skills":[...],"note":{...}},
      {"id":"alt","name":{"en":"<situational>","es":"..."},"skills":[...],"note":{...}}
    ],
    "levelTips": {"en":"which stigma to level first and why","es":"..."}
  },

  // Daevanion planner value weights for node base names on this class's boards
  // (skill node names exactly as in boards.json without "~ingame" suffix). 0 = never buy, 10 = top.
  // Orange/stat node values are shared and set by the app; only give class skill/passive node values here.
  "dvValues": {"Blaze":10,"Firestorm":10, "...":0},
  // Simple-mode Daevanion list: the 10-14 most important nodes in buy order, as plain advice
  "dvSimple": {"en":["Take every Firestorm, Blaze and Hellfire node first", "..."],"es":[...]},

  // In-game macro (hold one key). Slots: [key, [skills bottom→top (bottom = checked first)], "m" macro | "h" by hand]
  // Rules: up to 4 skills per slot; skill with NO cooldown must be alone or at the TOP of a stack.
  // Charge skills and emergency/defensive skills are usually "h".
  "macro": {
    "leveling": {"slots":[["1",["Blaze","Firestorm"],"m"], ...],"steps":["1","LMB","2"]},
    "endgame":  {"slots":[...],"steps":[...]},
    "notes": {"en":"1-2 sentences","es":"..."}
  },

  "rotation": {"en":["step 1","step 2", "... 4-6 steps"],"es":[...]},
  "synergy": [ {"a":"Flame Arrow","b":"Blaze","t":{"en":"Mark, then detonate","es":"..."},"s":{"en":"one sentence","es":"..."}} ], // 3-5

  "stats": {"order":[{"en":"Attack","es":"Ataque","w":100}, ...5-6 items with w 100→40],
            "notes":{"en":"manastones/enchant notes, 1-2 sentences","es":"..."}},

  // Genus Insight priorities. Use ONLY stat names from GENUS_STATS below (EN), give ES too. 3-4 items each, best first. rank 1..3.
  "genus": {
    "s15":  [["PvE Attack","Ataque PvE",1], ...],      // slots 1 & 5
    "s369": [...],                                      // slots 3,6,9
    "s278": [...],                                      // slots 2,7,8 (defense)
    "s4": {"cogni":[...],"fera":[...],"natura":[...],"varian":[...],"special":[...]},
    "notes":{"en":"class-specific 1-2 sentences","es":"..."}
  },

  "leveling": {"en":["3-5 short leveling tips"],"es":[...]},
  "kr": {"en":"1-2 sentences about what Korean players do differently / names used in KR guides","es":"..."},
  "sources": [["title","url"], ...]
}
```

## GENUS_STATS (exact EN names available per slot, identical for all genera except slot 4)
- Slots 1 & 5: Attack Bonus, Max Attack, Penetration, Critical Attack, Front Attack, Back Attack, PvE Attack, Boss Attack, HP, MP
- Slots 2 & 8: HP increase, Defense Bonus, Critical Damage Defense, Front Defense, Back Defense, Critical Hit Resist, Front Attack Critical Hit Resist, Back Attack Critical Hit Resist, PvE Defense, Boss Defense, HP, MP
- Slots 3, 6, 9: Accuracy Bonus, Block, Evasion Bonus, Critical Hit, Front Attack Critical Hit, Back Attack Critical Hit, PvE Accuracy, Power Shard Damage Bonus (possibly "Smite" = chance for double damage; unconfirmed), HP, MP
- Slot 7: Critical Damage Tolerance, Damage Tolerance, Endurance, Regeneration, PvE Damage Tolerance, <Genus> Damage Tolerance, Status Effect Resist, Defense Bonus, Accuracy Bonus, Evasion Bonus, Block, Critical Hit, HP, MP
- Slot 4 Cogni: Critical Damage Boost, Damage Boost, Endurance Penetration, Regeneration Penetration, PvE Damage Boost, Cogni Damage Boost, Status Effect Chance, Attack Bonus, Accuracy Bonus, Evasion Bonus, Block, Critical Hit, HP, MP
- Slot 4 Fera: Weapon Damage Boost, Damage Boost, Endurance Penetration, Regeneration Penetration, PvE Damage Boost, Fera Damage Boost, Status Effect Chance, + same flat ones
- Slot 4 Natura: Multi-hit Chance, Perfect Chance, Endurance Penetration, Regeneration Penetration, PvE Damage Boost, Natura Damage Boost, Status Effect Chance, + flat
- Slot 4 Varian: Front Attack Damage Boost, Back Attack Damage Boost, Endurance Penetration, Regeneration Penetration, PvE Damage Boost, Varian Damage Boost, Status Effect Chance, + flat
- Slot 4 Special: Double Chance, Damage Boost, Critical Damage Boost, Front Attack Damage Boost, Back Attack Damage Boost, Endurance Penetration, Status Effect Chance, + flat
Heroic values: % boosts 1.5–3% (PvE Damage Boost 2–4%, genus boost 2.4–4.8%); flat attacks 10–20; Attack Bonus 8–16; Critical Hit 15–30; PvE Accuracy 25–50.
Damage-calc notes (MMO Herald): Smite best per point; Damage Boost / PvE Damage Boost share one additive bucket; Weapon Damage Boost and Crit Damage Boost are separate multipliers. Healers/tanks: rank for their role (heal/tank) but note DPS alternatives.
