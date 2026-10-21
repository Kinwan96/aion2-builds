const ORDER=['gladiator','templar','assassin','ranger','sorcerer','spiritmaster','cleric','chanter'];
const KBR='https://cdn.questlog.gg/aion-2/assets/Game/UI/Resource/Texture/Skill/';
const CIR='https://cdn.questlog.gg/aion-2/assets/Game/UI/Resource/Texture/Icon/';
const TEXR='https://cdn.questlog.gg/aion-2/assets/Game/UI/Resource/Texture/';
const KB='img/skill/',CI='img/class/',TX='img/tex/';
/* Broken local image -> remote copy -> hidden. img/tex/<path> mirrors questlog Texture/<path>. */
window.FB=el=>{if(!el.dataset.r){el.dataset.r=1;el.src=el.src.replace(/^.*img\/skill\//,KBR).replace(/^.*img\/class\//,CIR).replace(/^.*img\/tex\//,TEXR)}else el.style.visibility='hidden'};
/** Item/texture art in a rarity frame. path = questlog Texture path without extension. */
const itm=(path,name,rar='gold',cls='')=>`<div class="itm r-${rar} ${cls}" title="${esc(name)}"><img loading="lazy" src="${TX}${path}.webp" alt="${esc(name)}" onerror="FB(this)"></div>`;
const WK='https://img.wikily.gg/unsafe/w:96/';
const SPRR={1:WK+'aHR0cHM6Ly9tZWRpYS53aWtpbHkuZ2cvZDllZjllMmItY2RiZi00M2NiLWE0MjMtMjk0N2U2OWQ1MzhkLzIwMjYtMDktMzAvM2I4OGY2MDMtOTczOC00OGY2LWI5OTgtMzRkOWM5ZGIyOGE0LXV0X2Z3aW5kb3dfZGFldmFuaW9uX25vZGVfY29tbW9uX3Nwcml0ZS5wbmc',
 2:WK+'aHR0cHM6Ly9tZWRpYS53aWtpbHkuZ2cvZDllZjllMmItY2RiZi00M2NiLWE0MjMtMjk0N2U2OWQ1MzhkLzIwMjYtMDktMzAvYTY5NDlhNWMtMGY5YS00M2VjLTg3MjMtMzYwMDRiZDQ2NzRiLXV0X2Z3aW5kb3dfZGFldmFuaW9uX25vZGVfcmFyZV9zcHJpdGUucG5n',
 3:WK+'aHR0cHM6Ly9tZWRpYS53aWtpbHkuZ2cvZDllZjllMmItY2RiZi00M2NiLWE0MjMtMjk0N2U2OWQ1MzhkLzIwMjYtMDktMzAvMjRmNjhmZmQtZDIyNi00MjBkLTg0OTEtYTQ5ZmRiZmQwNGFhLXV0X2Z3aW5kb3dfZGFldmFuaW9uX25vZGVfbGVnZW5kX3Nwcml0ZS5wbmc',
 4:WK+'aHR0cHM6Ly9tZWRpYS53aWtpbHkuZ2cvZDllZjllMmItY2RiZi00M2NiLWE0MjMtMjk0N2U2OWQ1MzhkLzIwMjYtMDktMzAvNzA4ZWViMzMtYjFmZi00ZmQ3LTkxYjAtODM2MGU2ZGYxMjBiLXV0X2Z3aW5kb3dfZGFldmFuaW9uX25vZGVfdW5pcXVlX3Nwcml0ZS5wbmc',
 0:WK+'aHR0cHM6Ly9tZWRpYS53aWtpbHkuZ2cvZDllZjllMmItY2RiZi00M2NiLWE0MjMtMjk0N2U2OWQ1MzhkLzIwMjYtMDktMzAvZDg0ZDY2YmMtMjRlMC00ODYyLWFkY2YtMzNmNzJmMDVhYjM5LXV0X2Z3aW5kb3dfZGFldmFuaW9uX25vZGVfc3RhcnRfc3ByaXRlLnBuZw'};

const SPR={};[0,1,2,3,4].forEach(k=>SPR[k]=`${SPRR[k]}'),url('img/board/${k}.png`);
/* ---------- UI strings ---------- */
const U={
 title:['Class Builds','Builds por clase'],simple:['Simple','Simple'],adv:['Advanced','Avanzado'],engine:['Core engine','Motor de la clase'],
 role:['Role','Rol'],weapon:['Weapon','Arma'],diff:['Difficulty','Dificultad'],
 t_overview:['Overview','Resumen'],t_pro:['Pro build ★','Build pro ★'],t_skills:['Skills','Habilidades'],t_stigmas:['Stigmas','Estigmas'],t_daevanion:['Daevanion','Daevanion'],t_macro:['Macro','Macro'],t_rotation:['Rotation','Rotación'],t_leveling:['Leveling','Subir nivel'],t_genus:['Genus Insight','Genus Insight'],t_gear:['Stats & gear','Stats y equipo'],
 lv:['Level','Nivel'],cr:['Crystals','Cristales'],auto:['auto','auto'],
 quick:['Quick build','Build rápida'],topSkills:['Top skills','Habilidades clave'],mainStig:['Main Stigmas','Estigmas principales'],synergy:['How the class works','Cómo funciona la clase'],
 rank:['Priority','Prioridad'],equipNow:['equip','equipar'],locked:['locked','bloqueado'],level:['Level','Nivel'],points:['points','puntos'],boards:['boards','tableros'],slots:['Specialty slots','Ranuras de especialidad'],
 skillsP:['Skills in priority order. Gold rows are the Specialties to equip.','Habilidades por prioridad. Las filas doradas son las Especialidades a equipar.'],
 skillsA:['Orange bar = level from skill points at your level. Striped = extra levels from your Daevanion route. Specialties unlock at skill level 8, 12 and 16.','Barra naranja = nivel con puntos de habilidad a tu nivel. Rayada = niveles extra de tu ruta Daevanion. Las Especialidades se desbloquean a nivel 8, 12 y 16.'],
 lev45:['Before Lv 45 the picks favour sustain; at 45 reset (free) and switch to the endgame picks.','Antes del nivel 45 se prioriza sustento; al 45 reinicia (gratis) y cambia a las elecciones de endgame.'],
 skip:['Leave at low level','Déjalas en nivel bajo'],passives:['Passives','Pasivas'],krnames:['Korean ↔ global names','Nombres coreanos ↔ globales'],
 stigP:['4 slots, opening at Lv 22, 27, 32 and 37 (after the Ascension quest).','4 ranuras que se abren a nivel 22, 27, 32 y 37 (tras la misión de Ascensión).'],slot:['Slot','Ranura'],allStig:['All Stigmas','Todos los estigmas'],
 dvP:['Real board layouts, drawn with the game\'s node art. Numbers = buy order. Lit nodes = buy them.','Diseño real de los tableros con el arte del juego. Números = orden de compra. Nodos iluminados = cómpralos.'],
 dvPA:['Move Level and Crystals in the bar above; the route recalculates for every board.','Mueve Nivel y Cristales en la barra de arriba; la ruta se recalcula en cada tablero.'],
 preset1:['Leveling','Subiendo'],preset1s:['Lv 30 · ~85 crystals','Nv 30 · ~85 cristales'],preset2:['Fresh Lv 45','Nivel 45'],preset2s:['~136 crystals','~136 cristales'],preset3:['After side content','Tras contenido extra'],preset3s:['~316 crystals','~316 cristales'],preset4:['Fully built','Completo'],preset4s:['~570 crystals','~570 cristales'],
 where:['Where the crystals go','A dónde van los cristales'],order:['Buy order (payoff nodes)','Orden de compra (nodos clave)'],unspent:['unspent','sin gastar'],opens:['opens Lv','abre Nv'],
 dvSkip:['Skipped on purpose: defensive corners and skills this build doesn\'t use. Azphel (PvP) uses its own crystals.','Omitidos a propósito: esquinas defensivas y habilidades que esta build no usa. Azphel (JcJ) usa sus propios cristales.'],
 nodes:['nodes','nodos'],lgStat:['stat','stat'],lgPas:['passive','pasiva'],lgSk:['skill','habilidad'],
 howDv:['Simple rules','Reglas simples'],
 macroP:['Hold one Macro key. In each slot the bottom skill is checked first; anything on cooldown is skipped; up to 4 skills per slot.','Mantén una tecla de Macro. En cada ranura se revisa primero la habilidad de abajo; lo que esté en enfriamiento se salta; hasta 4 por ranura.'],
 levelingM:['Leveling','Subiendo nivel'],endgameM:['Endgame (Lv 22+)','Endgame (Nv 22+)'],hotbar:['Hotbar','Barra de habilidades'],macroStep:['macro step','paso'],byHand:['by hand','a mano'],first:['↓ checked first','↓ se revisa primero'],delay:['Delay','Retardo'],loop:['↻ Loops back to step 1 while you hold the key','↻ Vuelve al paso 1 mientras mantienes la tecla'],basic:['basic attack','ataque básico'],
 setup:['Setup','Configuración'],copy:['Copy macro cheat sheet','Copiar resumen del macro'],copied:['Copied.','Copiado.'],
 setupSteps:[['<b>Bind the Macro key:</b> Settings → Key Settings → General → Gameplay → Macro.','<b>Build the stacks</b> in the Skills window (K) exactly as shown, bottom skill first.','<b>Add one macro step</b> per row, in order (Skills window → Macro → Add Macro).','<b>Delay 10 ms</b> per step; 20 ms if keys drop; 40–50 ms at 80–100 ms ping.','<b>Test 30 s on a training scarecrow</b>. Repeat the setup on every skill preset.'],['<b>Asigna la tecla Macro:</b> Ajustes → Teclas → General → Juego → Macro.','<b>Arma las pilas</b> en la ventana de habilidades (K) tal como se ve, primero la de abajo.','<b>Agrega un paso</b> por fila, en orden (Habilidades → Macro → Agregar macro).','<b>Retardo de 10 ms</b> por paso; 20 ms si se pierden teclas; 40–50 ms con 80–100 ms de ping.','<b>Prueba 30 s en un espantapájaros</b>. Repite en cada preset de habilidades.']],
 macroWarn:['Only the in-game macro is used here. Mouse-driver/AutoHotkey macros are a ban risk.','Aquí solo se usa el macro del juego. Macros externos (ratón/AutoHotkey) pueden causar baneo.'],
 rotP:['Boss opener, then hold the macro.','Apertura contra jefes y luego mantén el macro.'],
 levP:['What to buy with skill points at each level (approximate income).','Qué comprar con puntos de habilidad en cada nivel (ingreso aproximado).'],
 you:['YOU','TÚ'],lvW:['LEVEL','NIVEL'],newS:['New','Nueva'],saved:['saved','guardados'],full:['Show the full 1–45 plan','Ver el plan completo 1–45'],tips:['Tips','Consejos'],milestones:['Key milestones','Hitos clave'],
 ms:[[[12,'Nezekan Daevanion board opens.'],[20,'Zikel board opens.'],[22,'Stigma slot 1 (Ascension quest).'],[27,'Stigma slot 2.'],[30,'Vaizel board opens.'],[32,'Stigma slot 3.'],[37,'Stigma slot 4.'],[40,'Triniel board opens.'],[45,'Reset skills (free) → endgame Specialties. Ariel/Azphel open.']],[[12,'Se abre el tablero Nezekan.'],[20,'Se abre Zikel.'],[22,'Ranura de estigma 1 (misión de Ascensión).'],[27,'Ranura de estigma 2.'],[30,'Se abre Vaizel.'],[32,'Ranura de estigma 3.'],[37,'Ranura de estigma 4.'],[40,'Se abre Triniel.'],[45,'Reinicia habilidades (gratis) → Especialidades de endgame. Se abren Ariel/Azphel.']]],
 genP:['Every genus has the same 9 slot types; only slot 4 changes. Values are Heroic ranges.','Cada género tiene los mismos 9 tipos de ranura; solo cambia la ranura 4. Valores en rango Heroico.'],
 s4:['Slot 4 (big %, per genus)','Ranura 4 (gran %, por género)'],s15:['Slots 1 & 5 · Attack','Ranuras 1 y 5 · Ataque'],s369:['Slots 3, 6, 9 · Crit / Smite','Ranuras 3, 6, 9 · Crítico / Smite'],s278:['Slots 2, 7, 8 · Defense','Ranuras 2, 7, 8 · Defensa'],
 aim:['Aim for','Busca'],lockW:['When to lock','Cuándo bloquear'],lockTxt:['Each analyzed slot gives 100 Insight EXP. Analyze with no locks to level up; lock only Unique/Heroic rolls of #1–#2 stats, mostly from Lv 7+.','Cada ranura analizada da 100 EXP de Insight. Analiza sin bloqueos para subir; bloquea solo tiradas Únicas/Heroicas de stats #1–#2, sobre todo desde Nv 7+.'],
 grades:['Common,Rare,Epic,Unique,Heroic','Común,Raro,Épico,Único,Heroico'],smiteN:['"Power Shard Damage Bonus" may be Smite (chance for double damage). Hover it in game: if it says double damage, it is your #1 lock.','"Power Shard Damage Bonus" podría ser Smite (prob. de daño doble). Revisa el tooltip: si dice daño doble, es tu bloqueo #1.'],
 genusNames:['Cogni,Fera,Natura,Varian,Special','Cogni,Fera,Natura,Varian,Especial'],
 stats:['Stat priority','Prioridad de stats'],gearN:['Gear notes','Notas de equipo'],sources:['Sources','Fuentes'],
 krN:['Korea vs Global','Corea vs Global'],
 foot:['Skill data, Specialties and EN/ES/KO names: questlog.gg (global client). Daevanion layouts and node art: Wikily. Builds: Korean Inven/Vortex guides + global guides, adapted to global skill text. All game art © NCSOFT. Exact skill-point income and crystal counts are approximate.','Datos de habilidades, Especialidades y nombres EN/ES/KO: questlog.gg (cliente global). Tableros Daevanion y arte: Wikily. Builds: guías coreanas (Inven/Vortex) + guías globales, adaptadas al texto global. Arte © NCSOFT. Ingresos de puntos y cristales son aproximados.'],
 noBoard:['No board open yet (Nezekan opens at Lv 12).','Aún no hay tablero (Nezekan abre a Nv 12).'],
 cdNone:['no cooldown','sin enfriamiento'],unlock:['unlocks Lv','se desbloquea Nv'],charge:['charge','carga'],
 skipWhy:['Low priority for this build.','Baja prioridad para esta build.']
};
let S={view:'home',cls:'sorcerer',lang:'en',mode:'simple',tab:'overview',lv:45,cr:136,auto:true,board:'nezekan',load:0,preset:1,macro:'endgame',region:'global',arcSet:'vigor',arcG:41,genW:'cogni',content:'pve',done:{}};
try{Object.assign(S,JSON.parse(localStorage.getItem('a2builds')||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem('a2builds',JSON.stringify(S))}catch(e){}};
const L=()=>S.lang==='es'?1:0;
const u=k=>U[k][L()];
const T=o=>o==null?'':typeof o==='string'?o:(o[S.lang]||o.en||'');
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
let C,SK,P,SIM;
const nm=s=>s?(S.lang==='es'&&s.ne?s.ne:s.n):'';
const sk=n=>SK[n];
const ico=(n,cls='',rk)=>{const s=SK[n];return `<div class="ico ${cls}" title="${esc(s?nm(s):n)}${s&&S.lang==='es'?' ('+esc(s.n)+')':''}">${s?`<img loading="lazy" src="${KB}${s.ic}.webp" alt="" onerror="FB(this)">`:''}${rk?`<span class="rk">${rk}</span>`:''}</div>`};
const lab=n=>{const s=SK[n];return s?esc(nm(s)):esc(n)};

/* ---------- simulator ---------- */
const COST=[0,0,1,1,1,2,2,2,4,4,4];
const inc=L=>L<4?0:L===4?1:L<=7?2:L<=10?3:L<=15?4:L<=30?5:6;
function simulate(){
  const lv={};C.skills.forEach(s=>{if(s.t!=='stigma')lv[s.n]=0});
  const out=[];let pts=0;
  for(let L=1;L<=45;L++){
    pts+=inc(L);const nu=[],buys={};
    Object.keys(lv).forEach(n=>{if((SK[n].un||1)===L){lv[n]=1;nu.push(n)}});
    for(let g=0;g<300;g++){
      let did=false,block=false;
      for(const [n,tg] of C.points){
        if(!(n in lv)||lv[n]===0||lv[n]>=tg)continue;
        const nx=lv[n]+1;if((SK[n].un||1)+Math.max(0,3*(nx-2))>L)continue;
        if(COST[nx]>pts){block=true;break}
        pts-=COST[nx];lv[n]=nx;buys[n]=nx;did=true;break;
      }
      if(!did||block)break;
    }
    out.push({L,g:inc(L),nu,buys:Object.entries(buys),left:pts,snap:{...lv}});
  }
  return out;
}

/* ---------- daevanion planner ---------- */
const OPEN={nezekan:12,zikel:20,vaizel:30,triniel:40};
const BASEW={dps:{'Damage Boost':14,'Critical Damage Boost':12,'Combat Speed':12,'Cooldown Reduction':10,'Multi-hit Chance':9,'Attack Bonus':0.9,'Critical Hit':0.7,'MP':0.45},
 tank:{'Damage Tolerance':13,'Critical Damage Tolerance':10,'Multi-hit Resist':8,'Cooldown Reduction':9,'Combat Speed':8,'Damage Boost':7,'HP':0.9,'Defense Bonus':0.8,'Critical Hit Resist':0.6,'Attack Bonus':0.5},
 heal:{'Cooldown Reduction':13,'Combat Speed':12,'Damage Boost':9,'Critical Damage Boost':7,'Multi-hit Chance':6,'Damage Tolerance':6,'MP':0.8,'HP':0.6,'Attack Bonus':0.6,'Critical Hit':0.5}};
const ROLEW={templar:'tank',cleric:'heal',chanter:'heal'};
const STAT_ES={'Attack Bonus':'Bono de ataque','Critical Hit':'Golpe crítico','Critical Hit Resist':'Resist. a crítico','MP':'PM','HP':'PV','Defense Bonus':'Bono de defensa','Combat Speed':'Velocidad de combate','Cooldown Reduction':'Reducción de enfriamiento','Damage Boost':'Amplificación de daño','Damage Tolerance':'Tolerancia al daño','Critical Damage Boost':'Amplif. de daño crítico','Critical Damage Tolerance':'Tolerancia a daño crítico','Multi-hit Chance':'Prob. de multigolpe','Multi-hit Resist':'Resist. a multigolpe'};
let BD={};
function buildBoards(){
  BD={};
  for(const b of Object.keys(LAYOUT)){
    const names=BOARDS[S.cls][b];let i=0;const nodes={};let start;
    LAYOUT[b].forEach(([x,y,c,stat])=>{const k=x+','+y;
      if(c===0){start=k;nodes[k]={x,y,c,base:'START',nm:'START'};return}
      if(c===2||c===3){const raw=names[i++];const [base,ig]=raw.split('~');nodes[k]={x,y,c,base,ig,nm:base+' +1'};}
      else{const base=stat.replace(/ \+[\d.]+%?$/,'');nodes[k]={x,y,c,base,nm:stat};}});
    BD[b]={nodes,start,n:Math.max(...Object.values(nodes).map(o=>o.x))+1};
  }
}
const W=()=>Object.assign({},BASEW[ROLEW[C.id]||'dps'],C.dvValues);
function nb(B,k){const [x,y]=k.split(',').map(Number);return [[1,0],[-1,0],[0,1],[0,-1]].map(([a,b])=>(x+a)+','+(y+b)).filter(q=>B.nodes[q])}
function plan(budget,lvl){
  const w=W(),val=b=>w[b]??0.1;
  const open=Object.keys(BD).filter(b=>lvl>=OPEN[b]);
  const st={};Object.keys(BD).forEach(b=>st[b]={owned:new Set([BD[b].start]),order:[],par:{},spent:0});
  let left=budget;const global=[];
  for(let guard=0;guard<500;guard++){
    let best=null;
    for(const b of open){const B=BD[b],O=st[b].owned;const dist={},prev={},done=new Set(),pq=[];
      O.forEach(o=>nb(B,o).forEach(q=>{if(O.has(q))return;const c=B.nodes[q].c;if(dist[q]===undefined||c<dist[q]){dist[q]=c;prev[q]=o;pq.push([c,q])}}));
      while(pq.length){pq.sort((a,b)=>a[0]-b[0]);const [d,p]=pq.shift();if(done.has(p))continue;done.add(p);nb(B,p).forEach(q=>{if(O.has(q))return;const nd=d+B.nodes[q].c;if(dist[q]===undefined||nd<dist[q]){dist[q]=nd;prev[q]=p;pq.push([nd,q])}})}
      done.forEach(t=>{const path=[];let p=t;while(!O.has(p)){path.push(p);p=prev[p]}const cost=path.reduce((s,k)=>s+B.nodes[k].c,0);if(cost>left)return;const v=path.reduce((s,k)=>s+val(B.nodes[k].base),0);const r=v/cost;if(!best||r>best.r)best={r,b,path:path.reverse()}});}
    if(!best||best.r<0.35)break;
    const {b,path}=best,B=BD[b],X=st[b];
    path.forEach(k=>{const p=nb(B,k).find(q=>X.owned.has(q));X.par[k]=p;X.owned.add(k);X.order.push(k);X.spent+=B.nodes[k].c;left-=B.nodes[k].c;if(B.nodes[k].c>1)global.push({b,k,local:X.order.length})});
  }
  const bonus={};Object.keys(st).forEach(b=>st[b].order.forEach(k=>{const o=BD[b].nodes[k];if(o.c===2||o.c===3)bonus[o.base]=(bonus[o.base]||0)+1}));
  return {st,global,bonus,left,open};
}
const crAt=l=>l<12?0:Math.round((l-11)/34*136);
const PRESETS=[[30,85],[45,136],[45,316],[45,570]];
function curPlan(){
  if(S.mode==='simple'){const [l,c]=PRESETS[S.preset];return plan(c,l)}
  return plan(S.auto?crAt(S.lv):S.cr,S.lv);
}
const effLv=()=>S.mode==='simple'?45:S.lv;

/* ---------- renderers ---------- */
function header(){
  document.documentElement.lang=S.lang;
  document.documentElement.style.setProperty('--acc',C.color||'#e3b766');
  $('tTitle').textContent=u('title');
  $('pickBtn').innerHTML=`<img src="${CI}${C.classIcon}.webp" alt="" onerror="FB(this)"><b>${esc(T(C.name))}</b><span class="car">▾</span>`;
  $('pop').innerHTML=ORDER.map(id=>{const d=DATA[id];return `<button data-c="${id}" class="${id===S.cls?'on':''}"><img src="${CI}${d.classIcon}.webp" alt="" onerror="FB(this)">${esc(T(d.name))}</button>`}).join('');
  $('modeSeg').innerHTML=`<button data-m="simple" class="${S.mode==='simple'?'on':''}">${u('simple')}</button><button data-m="adv" class="${S.mode==='adv'?'on':''}">${u('adv')}</button>`;
  $('langSw').className='lang'+(S.lang==='es'?' es':'');$('langSw').children[0].className=S.lang==='en'?'on':'';$('langSw').children[2].className=S.lang==='es'?'on':'';
  document.body.classList.toggle('adv',S.mode==='adv');
  $('hIcon').src=CI+C.classIcon+'.webp';
  $('hName').innerHTML=`${esc(T(C.name))} <em>${esc(T(C.role))}</em>`;
  $('hSum').textContent=T(C.summary);
  $('hChips').innerHTML=`<span class="chip"><b>${u('weapon')}</b>${esc(T(C.weapon))}</span><span class="chip" style="display:flex;gap:6px;align-items:center"><b>${u('diff')}</b><span class="diff">${[1,2,3].map(i=>`<i class="${i<=(C.difficulty||2)?'on':''}"></i>`).join('')}</span></span>`;
  $('tEngine').textContent=u('engine');$('hEngine').textContent=T(C.engine);
  document.body.classList.toggle('home',S.view==='home');
  $('contSeg').innerHTML=contentSeg();$('modeNote').innerHTML=modeNote();
  $('tabs').innerHTML=tabsFor(C).map(t=>`<button class="tab ${t===S.tab?'on':''}" data-t="${t}">${u('t_'+t)}</button>`).join('');
  {const w=$('tabs'),on=w.querySelector('.tab.on');if(on)w.scrollLeft=on.offsetLeft-(w.clientWidth-on.clientWidth)/2}
  document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('on',p.id==='p-'+S.tab));
  $('ctlbar').classList.toggle('show',['skills','daevanion','macro','leveling'].includes(S.tab));
  $('tLv').textContent=u('lv');$('tCr').textContent=u('cr');
  $('lvR').value=S.lv;$('lvO').textContent=S.lv;const cr=S.auto?crAt(S.lv):S.cr;$('crR').value=cr;$('crO').textContent=cr;
  $('crSeg').innerHTML=[136,316,365,570].map(v=>`<button data-c="${v}" class="${!S.auto&&S.cr===v?'on':''}">${v}</button>`).join('')+`<button data-c="auto" class="${S.auto?'on':''}">${u('auto')}</button>`;
  $('foot').innerHTML=S.view==='home'?`<p>${u('foot')}</p>`:`<b style="color:var(--gold2)">${u('sources')}</b> · ${(C.sources||[]).map(s=>`<a href="${esc(s[1])}" target="_blank" rel="noopener">${esc(s[0])}</a>`).join(' · ')}<p>${u('foot')}</p>`;
}
/** Tabs shown for a class, in order (Leveling mode puts the checklist first). The router accepts only these. */
function tabsFor(c,content=S.content){
  const base=['overview',...(c.pro?['pro']:[]),'skills','stigmas','arcana','daevanion','macro','rotation','leveling','genus','gear'];
  return content==='lvl'?['checklist','leveling',...base.filter(t=>t!=='leveling')]:[...base,'checklist'];
}
const ranked=t=>C.skills.filter(s=>s.t===t&&s.rank>0).sort((a,b)=>a.rank-b.rank);
function eqSpecs(s,eff,end){const slots=eff>=16?3:eff>=12?2:eff>=8?1:0;const rk=(end?s.pickEnd:s.pickLev)||[];return {eq:rk.filter(i=>s.sp[i]&&eff>=s.sp[i][0]).slice(0,slots),slots}}
function specRows(s,eff,end,onlyEq){const {eq}=eqSpecs(s,eff,end);return s.sp.map((sp,i)=>{const on=eq.includes(i),lock=eff<sp[0];if(onlyEq&&!on)return '';return `<div class="spec ${on?'eq':''} ${lock?'lock':''}"><span class="lv">${sp[0]}</span><span>${esc(S.lang==='es'&&sp[2]?sp[2]:sp[1])}</span><span class="st">${on?u('equipNow'):lock?u('locked'):''}</span></div>`}).join('')}

function pOverview(){
  const top=ranked('active').slice(0,6),pas=ranked('passive').slice(0,3),lo=C.stigma.loadouts[0];
  $('p-overview').innerHTML=`${glance()}
  <div class="grid g3">
   <div class="card hl"><div class="kick">${u('topSkills')}</div><div class="list">${top.map((s,i)=>`<div class="li">${ico(s.n,'sm g',i+1)}<div class="t"><b>${lab(s.n)}</b><span>${esc(T(s.tag))}</span></div></div>`).join('')}</div></div>
   <div class="card"><div class="kick">${u('mainStig')} · ${esc(T(lo.name))}</div><div class="list">${lo.skills.map((n,i)=>`<div class="li">${ico(n,'sm g')}<div class="t"><b>${lab(n)}</b><span>${u('slot')} ${i+1} · Lv ${[22,27,32,37][i]}</span></div></div>`).join('')}</div>
     <div class="kick" style="margin-top:12px">${u('passives')}</div><div class="pillrow">${pas.map(s=>`<span class="pill">${ico(s.n,'xs')}${lab(s.n)}</span>`).join('')}</div></div>
   <div class="card"><div class="kick">${u('synergy')}</div><div class="list">${(C.synergy||[]).slice(0,4).map(f=>`<div class="flow">${ico(f.a,'xs g')}<span class="arr">→</span>${ico(f.b,'xs g')}<div class="txt"><b>${esc(T(f.t))}</b>${esc(T(f.s))}</div></div>`).join('')}</div></div>
  </div>
  <div class="grid g2" style="margin-top:12px">
   <div class="card"><div class="kick">${u('t_rotation')}</div><ol class="simple small">${(C.rotation[S.lang]||C.rotation.en).slice(0,5).map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>
   <div class="card"><div class="kick">${u('stats')}</div>${statBars(5)}</div>
  </div>
  <div style="margin-top:12px">${patchCard()}</div>`;
}
function statBars(n){return (C.stats.order||[]).slice(0,n||9).map(s=>`<div class="statbar"><div class="lvlab"><span style="color:var(--text)">${esc(T(s))}</span></div><div class="lvbar"><i class="p" style="width:${s.w}%"></i></div></div>`).join('')}

function pSkills(){
  const end=effLv()>=45,snap=SIM[effLv()-1].snap;
  const actives=ranked('active');const skips=C.skills.filter(s=>(s.t==='active'||s.t==='passive')&&!s.rank);
  const simple=`<div class="grid g2">${actives.map((s,i)=>{const eff=16;return `<div class="card"><div class="row">${ico(s.n,'g',i+1)}<div style="flex:1"><h3>${lab(s.n)}</h3><span class="tag a">${esc(T(s.tag))}</span><span class="tag">${s.cd?s.cd+' s':u('cdNone')}</span></div></div><div class="small muted" style="margin-top:6px">${esc(T(s.tip))}</div><div class="specs">${specRows(s,eff,true,true)}</div></div>`}).join('')}</div>`;
  const card=s=>{const pl=snap[s.n]||0,bo=(s.un||1)<=effLv()?(P.bonus[s.n]||0):0,eff=pl+bo,{slots}=eqSpecs(s,eff,end),un=(s.un||1)<=effLv();
    return `<div class="card"><div class="row">${ico(s.n,'lg '+(un?'g':'off'),s.rank)}<div style="flex:1"><div class="tiny muted">${esc(T(s.tag))} · ${s.cd?s.cd+' s':u('cdNone')}${s.charge?' · '+u('charge'):''}</div><h3>${lab(s.n)}</h3>${un?'':`<span class="tag">${u('unlock')} ${s.un}</span>`}</div></div>
     <div class="lvbar"><i class="p" style="width:${pl/16*100}%"></i><i class="b" style="width:${bo/16*100}%"></i>${[8,12].map(m=>`<span class="mk" style="left:${m/16*100}%"></span>`).join('')}</div>
     <div class="lvlab"><span>${u('level')} <b style="color:#fff">${eff}</b> (${pl} ${u('points')}${bo?' + '+bo+' '+u('boards'):''})</span><span>${slots} / 3</span></div>
     <div class="small muted" style="margin-top:6px">${esc(T(s.d))}</div><div class="specs">${specRows(s,eff,end,false)}</div></div>`};
  const pas=ranked('passive');
  const adv=`<div class="grid g3">${actives.map(card).join('')}</div>
   <h2 style="margin:22px 0 10px;font-size:17px">${u('passives')}</h2><div class="grid g4">${pas.map(s=>{const pl=snap[s.n]||0,bo=(P.bonus[s.n]||0);return `<div class="card"><div class="row">${ico(s.n,'sm '+((s.un||1)<=effLv()?'g':'off'),s.rank)}<div><h3>${lab(s.n)}</h3><div class="tiny muted">${u('level')} ${pl+bo} (${pl}${bo?' + '+bo:''})</div></div></div><div class="small muted" style="margin-top:6px">${esc(T(s.d))}</div></div>`}).join('')}</div>
   <details><summary>${u('krnames')}</summary><div class="scroll" style="margin-top:10px"><table class="tbl"><tr><th>EN</th><th>ES</th><th>KO</th></tr>${C.skills.filter(s=>s.t!=='stigma').map(s=>`<tr><td><div class="row">${ico(s.n,'xs')}${esc(s.n)}</div></td><td>${esc(s.ne)}</td><td>${esc(s.nk)}</td></tr>`).join('')}</table></div><div class="note">${esc(T(C.kr))}</div></details>`;
  $('p-skills').innerHTML=`<div class="ph"><div><h2>${u('t_skills')}</h2><p>${S.mode==='simple'?u('skillsP'):u('skillsA')}</p></div></div>
   ${S.mode==='simple'?simple:adv}
   <div class="note">${u('lev45')}</div>
   <div class="kick" style="margin-top:14px">${u('skip')}</div><div class="pillrow">${skips.map(s=>`<span class="pill" title="${esc(T(s.tip))}">${ico(s.n,'xs')}${lab(s.n)}</span>`).join('')}</div>`;
}
function pStigmas(){
  const los=C.stigma.loadouts,lo=los[Math.min(S.load,los.length-1)],lvv=effLv();
  const slots=lo.skills.map((n,i)=>{const s=SK[n]||{},lk=S.mode==='adv'&&lvv<[22,27,32,37][i];return `<div class="card"><div class="stg ${lk?'locked':''}"><div class="lv"><small>Lv</small>${[22,27,32,37][i]}</div>${ico(n,'lg '+(lk?'off':'g'))}<div style="flex:1"><span class="tag a">${u('slot')} ${i+1}</span>${s.cd?`<span class="tag">${s.cd} s</span>`:''}<h3>${lab(n)}</h3><div class="small muted">${esc(T(s.d))}</div>${S.mode==='adv'&&s.sp?`<div class="specs">${s.sp.map(sp=>`<div class="spec"><span class="lv">${sp[0]}</span><span>${esc(S.lang==='es'&&sp[2]?sp[2]:sp[1])}</span></div>`).join('')}</div>`:''}</div></div></div>`}).join('');
  $('p-stigmas').innerHTML=`<div class="ph"><div><h2>${u('t_stigmas')}</h2><p>${u('stigP')}</p></div><div class="seg" id="loadSeg">${los.map((l,i)=>`<button data-l="${i}" class="${l===lo?'on':''}">${esc(T(l.name))}</button>`).join('')}</div></div>
  <div class="grid g2">${slots}</div><div class="note">${esc(T(lo.note))}</div>
  <div class="note advonly">${esc(T(C.stigma.levelTips))}</div>
  <details class="advonly"><summary>${u('allStig')}</summary><div class="list" style="margin-top:10px">${C.skills.filter(s=>s.t==='stigma').map(s=>`<div class="li">${ico(s.n,'sm')}<div class="t"><b>${lab(s.n)}</b><span>${esc(T(s.d))}</span></div><div class="r">${s.cd?s.cd+' s':''}</div></div>`).join('')}</div></details>`;
}
function pDaev(){
  const B=BD[S.board],X=P.st[S.board],n=B.n,idx={};X.order.forEach((k,i)=>idx[k]=i+1);
  const half=Math.ceil(X.order.length/2),pc=i=>i<=half?'#5fd0ff':'#ffc163',sz=100/n,pad=.09;
  let svg=`<svg viewBox="0 0 ${n} ${n}" preserveAspectRatio="none">`;
  X.order.forEach(k=>{const a=B.nodes[X.par[k]],b=B.nodes[k],c=pc(idx[k]);svg+=`<line x1="${a.x+.5}" y1="${a.y+.5}" x2="${b.x+.5}" y2="${b.y+.5}" stroke="${c}" stroke-width=".22" stroke-linecap="round" opacity=".35"/><line x1="${a.x+.5}" y1="${a.y+.5}" x2="${b.x+.5}" y2="${b.y+.5}" stroke="${c}" stroke-width=".09" stroke-linecap="round"/>`});
  svg+='</svg>';
  const nodes=Object.entries(B.nodes).map(([k,o])=>{const on=idx[k]||o.c===0,skill=SK[o.base]&&(o.c===2||o.c===3);return `<div class="node c${o.c||1} ${on?'on':''} ${o.c===0?'start':''}" data-k="${k}" style="left:${o.x*sz+sz*pad}%;top:${o.y*sz+sz*pad}%;width:${sz*(1-2*pad)}%;height:${sz*(1-2*pad)}%"><div class="bg" style="background-image:url('${SPR[o.c]}')"></div>${o.c?'<div class="fb"></div>':''}${skill?`<div class="sic"><img src="${KB}${SK[o.base].ic}.webp" alt="" style="width:100%;height:100%" onerror="FB(this)"></div>`:''}${idx[k]?`<span class="num" style="--pc:${pc(idx[k])}">${idx[k]}</span>`:''}</div>`}).join('');
  const cols={nezekan:'#ff8a3d',zikel:'#4aa3ff',vaizel:'#b48cff',triniel:'#5fd49a'},tot=Object.values(P.st).reduce((a,x)=>a+x.spent,0)+P.left||1;
  const bn={nezekan:'NEZ',zikel:'ZIK',vaizel:'VAI',triniel:'TRI'};
  const nodeName=o=>SK[o.base]?nm(SK[o.base])+' +1':(S.lang==='es'&&STAT_ES[o.base]?o.nm.replace(o.base,STAT_ES[o.base]):o.nm);
  const pays=P.global.map(g=>{const o=BD[g.b].nodes[g.k],lo=P.st[g.b].order.length,c=g.local<=Math.ceil(lo/2)?'#5fd0ff':'#ffc163';return `<div class="pay">${SK[o.base]?ico(o.base,'xs'):`<div class="ico xs" style="display:grid;place-items:center;font:800 10px Inter;color:#ff8a3d">%</div>`}<span class="n" style="--pc:${c}">${g.local}</span><span>${esc(nodeName(o))}</span><span class="bd">${bn[g.b]} · ${o.c}✦</span></div>`}).join('');
  const presets=PRESETS.map((p,i)=>`<button data-p="${i}" class="${S.preset===i?'on':''}"><b>${u('preset'+(i+1))}</b><small>${u('preset'+(i+1)+'s')}</small></button>`).join('');
  $('p-daevanion').innerHTML=`<div class="ph"><div><h2>${u('t_daevanion')}</h2><p>${u('dvP')} ${S.mode==='adv'?u('dvPA'):''}</p></div></div>
  <div class="presets simpleonly" id="presets">${presets}</div>
  <div class="dvtabs" id="dvTabs">${Object.keys(BD).map(b=>{const op=P.open.includes(b);return `<button data-b="${b}" class="${b===S.board?'on':''} ${op?'':'closed'}"><b>${b[0].toUpperCase()+b.slice(1)}</b><small>${op?P.st[b].spent+' ✦ · '+P.st[b].order.length+' '+u('nodes'):u('opens')+' '+OPEN[b]}</small></button>`}).join('')}</div>
  <div class="dvwrap"><div class="boardbox"><div class="board" id="board">${svg}${nodes}</div>
   <div class="leg" style="margin-top:8px"><span><i style="background:#8d93a6"></i>1 ✦ ${u('lgStat')}</span><span><i style="background:#3fcf86"></i>2 ✦ ${u('lgPas')}</span><span><i style="background:#4aa3ff"></i>3 ✦ ${u('lgSk')}</span><span><i style="background:#ff8a3d"></i>4 ✦ %</span></div></div>
   <div><div class="card simpleonly"><div class="kick">${u('howDv')}</div><ol class="simple small">${(C.dvSimple[S.lang]||C.dvSimple.en).map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>
   <div class="card" style="margin-top:10px"><div class="kick">${u('where')}</div><div class="crbar">${Object.keys(BD).map(b=>`<i style="width:${P.st[b].spent/tot*100}%;background:${cols[b]}"></i>`).join('')}<i style="width:${P.left/tot*100}%;background:#323a56"></i></div><div class="tiny">${Object.keys(BD).map(b=>`<span style="color:${cols[b]}">■</span> ${b[0].toUpperCase()+b.slice(1)} ${P.st[b].spent}`).join(' · ')} · <span class="muted">${u('unspent')} ${P.left}</span></div></div>
   <div class="card advonly" style="margin-top:10px"><div class="kick">${u('order')}</div><div class="paylist">${pays||`<div class="small muted">${u('noBoard')}</div>`}</div></div></div></div>
  <div class="note warn">${u('dvSkip')}</div>`;
  const tb=$('tipbox'),bd=$('board');
  bd.onmousemove=e=>{const nd=e.target.closest('.node');if(!nd){tb.style.display='none';return}const o=B.nodes[nd.dataset.k],i=X.order.indexOf(nd.dataset.k);tb.innerHTML=o.c===0?'<b>Start</b>':`<b>${esc(nodeName(o))}</b>${o.ig?`<br><span class="muted">In game: "${esc(o.ig)}"</span>`:''}<br>${o.c} ✦ · ${i>=0?`<span style="color:var(--gold2)">#${i+1}</span>`:'<span class="muted">—</span>'}`;tb.style.display='block';tb.style.left=Math.min(e.clientX+14,innerWidth-250)+'px';tb.style.top=(e.clientY+14)+'px'};
  bd.onmouseleave=()=>tb.style.display='none';
  bd.onclick=e=>{const nd=e.target.closest('.node');if(!nd)return;const r=nd.getBoundingClientRect();bd.onmousemove({target:nd,clientX:r.right,clientY:r.top})};
}
function pMacro(){
  const m=C.macro[S.macro]||C.macro.endgame,snap=SIM[effLv()-1].snap;
  const LIVE={};m.slots.forEach(s=>LIVE[s[0]]=s);
  const stepNo=k=>m.steps.indexOf(k);
  const cell=(n,k)=>`<div class="hcell">${SK[n]?`<img src="${KB}${SK[n].ic}.webp" alt="" onerror="FB(this)">`:''}${k?`<span class="k">${esc(k)}</span>`:''}<span class="l">${SK[n]&&SK[n].t==='stigma'?'Stg':'Lv. '+((snap[n]||1)+(P.bonus[n]||0))}</span></div>`;
  const hb=m.slots.map(([k,arr,ty])=>{const sn=stepNo(k);return `<div class="hslot"><div class="hstack">${arr.map((n,i)=>cell(n,i===0?k:'')).join('')}</div><div class="cap ${ty==='m'?'m':'h'}">${ty==='m'&&sn>=0?u('macroStep')+' '+(sn+1):u('byHand')}</div><div class="cap">${arr.length>1?u('first'):lab(arr[0])}</div></div>`}).join('');
  const mw=m.steps.map((k,i)=>{const s=LIVE[k];if(!s)return '';const arr=s[1];return `<div class="mstep"><div class="no">${i+1}</div><div class="mid"><div class="icos">${arr.slice().reverse().map(n=>`<div class="hcell mini">${SK[n]?`<img src="${KB}${SK[n].ic}.webp" alt="" onerror="FB(this)">`:''}</div>`).join('')}</div><div class="nm">${k==='LMB'?lab(arr[0])+' ('+u('basic')+')':u('hotbar')+' '+esc(k)}</div><div class="sub">${arr.map(lab).join(' → ')}</div></div><div class="tr">🗑</div></div>${i<m.steps.length-1?`<div class="mdelay">${u('delay')} <span class="box">10</span> ms</div>`:''}`}).join('');
  window._macro=m.steps.map((k,i)=>`${i+1}. ${k==='LMB'?'LMB':'Hotbar '+k}: ${(LIVE[k]||[0,[]])[1].map(n=>nm(SK[n]||{n})).join(' > ')}`).join('\n');
  $('p-macro').innerHTML=`<div class="ph"><div><h2>${u('t_macro')}</h2><p>${u('macroP')}</p></div><div class="seg" id="macSeg"><button data-x="leveling" class="${S.macro==='leveling'?'on':''}">${u('levelingM')}</button><button data-x="endgame" class="${S.macro==='endgame'?'on':''}">${u('endgameM')}</button></div></div>
  <div class="grid g2 mgrid"><div class="gameui"><div class="hb">${hb}</div></div><div><div class="macrowin">${mw}</div><div class="mloop">${u('loop')}</div></div></div>
  <div class="note">${esc(T(C.macro.notes))}</div>
  <div class="advonly"><h2 style="margin:18px 0 10px;font-size:17px">${u('setup')}</h2><ol class="steps">${U.setupSteps[L()].map(x=>`<li><div>${x}</div></li>`).join('')}</ol>
  <div class="note warn">${u('macroWarn')}</div><button class="btn" id="copyBtn">${u('copy')}</button> <span class="small muted" id="copyMsg"></span></div>`;
}
function pRotation(){
  $('p-rotation').innerHTML=`<div class="ph"><div><h2>${u('t_rotation')}</h2><p>${u('rotP')}</p></div></div>
  <div class="grid g2"><ol class="steps">${(C.rotation[S.lang]||C.rotation.en).map(x=>`<li><div>${esc(x)}</div></li>`).join('')}</ol>
  <div><div class="kick">${u('synergy')}</div><div class="list">${(C.synergy||[]).map(f=>`<div class="flow">${ico(f.a,'sm g')}<span class="arr">→</span>${ico(f.b,'sm g')}<div class="txt"><b>${esc(T(f.t))}</b>${esc(T(f.s))}</div></div>`).join('')}</div></div></div>`;
}
function pLeveling(){
  const tips=(C.leveling[S.lang]||C.leveling.en),ms=U.ms[L()];
  const row=(r,cls,cur)=>`<div class="lvrow ${cls}"><div class="L">${r.L}<small>${cur?u('you'):u('lvW')}</small></div><div><div class="tiny muted">+${r.g} ${u('points')}${r.left?' · '+r.left+' '+u('saved'):''}</div>${r.nu.length?`<div class="buys">${r.nu.filter(n=>SK[n]).map(n=>`<div class="buy">${ico(n,'xs')}<span><b>${u('newS')}:</b> ${lab(n)}</span></div>`).join('')}</div>`:''}${r.buys.length?`<div class="buys">${r.buys.map(([n,l])=>`<div class="buy">${ico(n,'xs')}<span>${lab(n)} → <b>${l}</b></span></div>`).join('')}</div>`:''}${(ms.find(x=>x[0]===r.L)||[])[1]?`<div class="small" style="margin-top:4px;color:var(--gold2)">${ms.find(x=>x[0]===r.L)[1]}</div>`:''}</div></div>`;
  const cur=SIM[S.lv-1],nx=SIM.slice(S.lv,S.lv+3);
  $('p-leveling').innerHTML=`<div class="ph"><div><h2>${u('t_leveling')}</h2><p>${S.mode==='adv'?u('levP'):''}</p></div></div>
  <div class="grid g2 simpleonly"><div class="card"><div class="kick">${u('tips')}</div><ol class="simple small">${tips.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div><div class="card"><div class="kick">${u('milestones')}</div><div class="list">${ms.map(([l,t])=>`<div class="li"><b style="font:700 16px Cinzel;color:var(--acc);min-width:30px">${l}</b><div class="t"><span style="color:var(--text)">${t}</span></div></div>`).join('')}</div></div></div>
  <div class="advonly"><div class="list">${row(cur,'cur',true)}${nx.map(r=>row(r,'',false)).join('')}</div>
  <details><summary>${u('full')}</summary><div class="list" style="margin-top:10px">${SIM.filter(r=>r.buys.length||r.nu.length||ms.some(x=>x[0]===r.L)).map(r=>row(r,r.L<S.lv?'done':r.L===S.lv?'cur':'',r.L===S.lv)).join('')}</div></details>
  <div class="card" style="margin-top:12px"><div class="kick">${u('tips')}</div><ol class="simple small">${tips.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div></div>`;
}
function pPro(){
  const el=$('p-pro');if(!C.pro){el.innerHTML='';return}
  const p=C.pro,oe=window.FB?'FB(this)':"this.style.visibility='hidden'",es=S.lang==='es';
  const tx=(en,s)=>es?s:en;
  const cell=(n,k)=>`<div class="hcell">${SK[n]?`<img src="${KB}${SK[n].ic}.webp" alt="" onerror="${oe}">`:''}${k?`<span class="k">${esc(k)}</span>`:''}</div>`;
  const mx=Math.max(...p.dps.map(d=>d[1]));
  const dps=p.dps.map(([l,v,c],i)=>`<div class="pdps"><div class="pdl"><b>${esc(T(l))}</b><span style="color:${c}">${v.toFixed(1)}K</span></div><div class="pdb"><i style="width:${v/mx*100}%;background:${c}"></i></div></div>`).join('');
  const prio=p.prio.map((n,i)=>`<div class="pp">${ico(n,'g',i+1)}<span>${lab(n)}</span></div>`).join('<span class="arr">›</span>');
  const specs=p.specs.map(([n,ix])=>{const s=SK[n];if(!s)return '';return `<div class="card pspec"><div class="row">${ico(n,'sm g')}<h3>${lab(n)}</h3></div><div class="specs">${s.sp.map((sp,i)=>`<div class="spec ${ix.includes(i)?'eq':'dim'}"><span class="lv">${sp[0]}</span><span>${esc(es&&sp[2]?sp[2]:sp[1])}</span><span class="st">${ix.includes(i)?'✔':''}</span></div>`).join('')}</div></div>`}).join('');
  const tyc={s:'#ffb340',h:'#ff5a4e',c:'#5fd0ff',f:'#9aa3b8'};
  const stack=p.stack.map(s=>`<div class="hslot"><div class="hstack">${s.sk.map((n,i)=>cell(n,i===0?s.k:'')).join('')}</div><div class="cap" style="color:${tyc[s.ty]};font-weight:700">${esc(T(s.l))}</div>${s.sk.length>1?`<div class="cap">${u('first')}</div>`:''}</div>`).join('');
  const seq=p.seq.map(([n,k],i)=>`<div class="sq ${n==='Hellfire'?'hf':''}"><div class="sqn">${i+1}</div>${ico(n,'sm g')}<div class="sqk">${esc(k)}</div><div class="sqt">${lab(n)}</div></div>`).join('');
  const mw=`<div class="pmac">${p.macro.map((n,i)=>`<div class="pmi"><span class="no">${i+1}</span><div class="hcell mini">${SK[n]?`<img src="${KB}${SK[n].ic}.webp" alt="" onerror="${oe}">`:''}</div><div><b>${lab(n)}</b><small>${u('delay')} 10 ms</small></div></div>`).join('')}</div>`;
  el.innerHTML=`<div class="ph"><div><h2>${u('t_pro')}</h2><p>${esc(T(p.intro))}</p></div><a class="btn" href="${esc(p.src[1])}" target="_blank" rel="noopener">▶ ${tx('Watch the video','Ver el video')}</a></div>
  <div class="grid g2">
   <div class="card hl"><div class="kick">${tx('Boss DPS test','Prueba de DPS a jefe')}</div>${dps}<div class="small muted" style="margin-top:8px">${esc(T(p.dpsNote))}</div></div>
   <div class="card"><div class="kick">${tx('Skill priority','Prioridad de habilidades')}</div><div class="pprio">${prio}</div>
    <div class="kick" style="margin-top:12px">${tx('Skip','Evita')}</div>${p.skip.map(([n,w])=>`<div class="li">${ico(n,'xs off')}<div class="t"><b>${lab(n)}</b><span>${esc(T(w))}</span></div></div>`).join('')}</div>
  </div>
  <h2 class="psec">① ${tx('Stack setup — one key per stack','Stacks — una tecla por stack')} <span class="tag a">${tx('highest DPS','máximo DPS')}</span></h2>
  <div class="grid g2 mgrid"><div class="gameui"><div class="hb">${stack}</div><div class="small muted" style="margin-top:10px">${esc(T(p.stackNote))}</div></div>
   <div class="card"><div class="kick">${tx('Press order','Orden de pulsado')}</div><div class="sqrow">${seq}</div><div class="small" style="margin-top:8px;color:#d6d9e6">${esc(T(p.seqNote))}</div></div></div>
  <div class="note">⏳ ${esc(T(p.wish))}</div>
  <h2 class="psec">② ${tx('Optimized macro — convenience','Macro optimizada — comodidad')} <span class="tag">${tx('−9% vs stack','−9 % vs stack')}</span></h2>
  <div class="grid g2 mgrid"><div class="gameui">${mw}</div>
   <div><div class="note warn">🔥 ${esc(T(p.hf))}</div><div class="note">${esc(T(p.macroNote))}</div></div></div>
  <h2 class="psec">③ ${tx('Specialties','Especialidades')}</h2>
  <div class="grid g4">${specs}</div><div class="note">${esc(T(p.specNote))}</div>
  <h2 class="psec">④ ${tx('Stigmas, passives & Daevanion','Estigmas, pasivas y Daevanion')}</h2>
  <div class="grid g3">
   <div class="card"><div class="kick">${tx('Stigmas','Estigmas')}</div><div class="list">${p.stig.map((n,i)=>`<div class="li">${ico(n,'sm g')}<div class="t"><b>${lab(n)}</b><span>${u('slot')} ${i+1}</span></div></div>`).join('')}</div>
    <div class="kick" style="margin-top:12px">${tx('Flex swaps','Cambios flexibles')}</div>${p.flex.map(([a,b,w])=>`<div class="flow">${ico(a,'xs off')}<span class="arr">→</span>${ico(b,'xs g')}<div class="txt"><b>${lab(b)}</b>${esc(T(w))}</div></div>`).join('')}</div>
   <div class="card"><div class="kick">${tx('Passives to max','Pasivas a maximizar')}</div><div class="list">${p.passives.map((n,i)=>`<div class="li">${ico(n,'sm '+(i<4?'g':''),i+1)}<div class="t"><b>${lab(n)}</b></div></div>`).join('')}</div></div>
   <div class="card"><div class="kick">Daevanion</div><ol class="simple small">${(p.dv[S.lang]||p.dv.en).map(x=>`<li>${esc(x)}</li>`).join('')}</ol><div class="small muted" style="margin-top:8px">${esc(T(p.global))}</div></div>
  </div>`;
}
function renderAll(){
  if(!DATA[S.cls])S.cls=ORDER[0];
  C=DATA[S.cls];SK={};C.skills.forEach(s=>SK[s.n]=s);
  if(!C.stigma.loadouts[S.load])S.load=0;
  buildBoards();SIM=simulate();P=curPlan();
  if(!tabsFor(C).includes(S.tab))S.tab='overview';
  header();
  if(S.view==='home'){pHome()}
  else{stopTimers();pOverview();pPro();pSkills();pStigmas();pArcana();pDaev();pMacro();pRotation();pLeveling();pGenus();pGear();pChecklist()}
  syncHash(false);save();
}
