/* ---------- Build at a glance, patch changes, Gear tab ---------- */
Object.assign(U,{
 glance:['Build at a glance','La build de un vistazo'],gCore:['Core skills · point target','Habilidades clave · meta de puntos'],gStig:['Stigmas','Estigmas'],gPas:['Key passives','Pasivas clave'],gArc:['Arcana set','Set de Arcanas'],
 checkedOn:['Checked against global patches on','Revisado contra los parches globales el'],
 patches:['Patch changes','Cambios de parche'],patchNone:['No changes to this class in the global patches so far.','Esta clase no ha tenido cambios en los parches globales hasta ahora.'],
 fixB:['Bug fix · build unchanged','Arreglo · la build no cambia'],official:['Official notes','Notas oficiales'],
 gearArt:['Class weapon','Arma de la clase'],gearArtS:['Weapon type art only, not a specific item to farm.','Solo el tipo de arma, no un objeto concreto que farmear.'],
 gearSys:['Other gear systems','Otros sistemas de equipo'],
 gearArcS:['God-stats and skill lines on 5 cards.','Stats divinos y líneas de habilidad en 5 cartas.'],gearGenS:['Account-wide stats from pets.','Stats de cuenta desde las mascotas.']
});
const fmtDate=d=>new Date(d+'T12:00:00Z').toLocaleDateString(S.lang==='es'?'es':'en',{month:'short',day:'numeric',year:'numeric'});
const weaponArt=(id,cls='')=>{const p=SHARED.art.weapons[id];return p?itm(p,T(DATA[id].weapon),'gold',cls):''};

function glance(){
  const tgt={};(C.points||[]).forEach(([n,l])=>{tgt[n]=Math.max(tgt[n]||0,l)});
  const core=ranked('active').slice(0,6),pas=ranked('passive').slice(0,4),lo=C.stigma.loadouts[0];
  const A=SHARED.arcana,set=S.arcSet==='magic'?'magic':'vigor';
  const src=(C.sources||[]).slice(0,4).map(s=>`<a class="srcchip" href="${esc(s[1])}" target="_blank" rel="noopener">${esc(s[0])}</a>`).join('');
  return `<section class="glance"><div class="gl-head"><h2>${u('glance')}</h2><span class="tiny muted">${u('checkedOn')} ${fmtDate(SHARED.patches.checked)}</span></div>
   <div class="gl-grid">
    <div class="gl-blk gl-core"><div class="kick">${u('gCore')}</div><div class="gl-row">${core.map((s,i)=>`<div class="gl-sk">${ico(s.n,'g',i+1)}${tgt[s.n]?`<span class="gl-lv">${tgt[s.n]}</span>`:''}<small>${lab(s.n)}</small></div>`).join('')}</div></div>
    <div class="gl-blk"><div class="kick">${u('gStig')}</div><div class="gl-row">${lo.skills.map(n=>`<div class="gl-sk">${ico(n,'sm g')}<small>${lab(n)}</small></div>`).join('')}</div></div>
    <div class="gl-blk"><div class="kick">${u('gPas')}</div><div class="gl-row">${pas.map(s=>`<div class="gl-sk">${ico(s.n,'sm')}<small>${lab(s.n)}</small></div>`).join('')}</div></div>
    <a class="gl-blk gl-arc" href="#/${C.id}/arcana"><div class="kick">${u('gArc')}</div><div class="row">${itm(A.iconBase+A.slots[0][set].icon,T(A.sets[set].name),'gold','sm')}<b>${esc(T(A.sets[set].name))}</b></div></a>
   </div>${src?`<div class="gl-src"><span class="tiny muted">${u('sources')}:</span>${src}</div>`:''}</section>`;
}
/** Latest global patch entries that touched this class. */
function patchCard(n=2){
  const hits=SHARED.patches.list.filter(p=>p.classes[C.id]).slice(0,n);
  const body=hits.length?hits.map(p=>`<div class="pt"><div class="pt-h"><b>${fmtDate(p.date)}</b><span>${esc(T(p.title))}</span><a href="${esc(p.url)}" target="_blank" rel="noopener">${u('official')} ↗</a></div>
    ${p.classes[C.id].map(c=>`<div class="pt-c">${ico(c.skill,'xs')}<div><b>${lab(c.skill)}</b> <span class="tag ok">${u('fixB')}</span><div class="small muted">${esc(S.lang==='es'?c.es:c.en)}</div></div></div>`).join('')}</div>`).join('')
    :`<div class="small muted">${u('patchNone')}</div>`;
  return `<div class="card"><div class="kick">${u('patches')}</div>${body}</div>`;
}
function pGear(){
  const A=SHARED.arcana;
  $('p-gear').innerHTML=`<div class="ph"><div><h2>${u('t_gear')}</h2></div></div>
  <div class="gear-hero card"><div class="gear-art">${weaponArt(C.id,'xl')}</div><div><div class="kick">${u('gearArt')}</div><h3 class="gear-w">${esc(T(C.weapon))}</h3><div class="tiny muted">${u('gearArtS')}</div>
    <div class="kick" style="margin-top:12px">${u('stats')}</div>${statBars()}</div></div>
  <div class="grid g2" style="margin-top:12px"><div class="card"><div class="kick">${u('gearN')}</div><div class="small" style="color:#d6d9e6">${esc(T(C.stats.notes))}</div><div class="kick" style="margin-top:14px">${u('krN')}</div><div class="small muted">${esc(T(C.kr))}</div></div>
   <div class="card"><div class="kick">${u('gearSys')}</div><div class="list">
    <a class="li lnk" href="#/${C.id}/arcana">${itm(A.iconBase+A.slots[0].vigor.icon,'Arcana','gold','sm')}<div class="t"><b>${u('t_arcana')}</b><span>${u('gearArcS')}</span></div><span class="r">→</span></a>
    <a class="li lnk" href="#/${C.id}/genus"><div class="ico sm" style="display:grid;place-items:center;color:var(--gold2)">${GLYPH.genus}</div><div class="t"><b>${u('t_genus')}</b><span>${u('gearGenS')}</span></div><span class="r">→</span></a>
   </div></div></div>`;
}
