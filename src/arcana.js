/* ---------- Arcana tab: 5 cards, which random skill lines to keep, set choice ---------- */
Object.assign(U,{
 t_arcana:['Arcana','Arcanas'],
 arcP:['Five cards from Lv 45. Each card rolls random skill lines from its own pool; every line adds skill levels (up to +4 after enhancing). Keep the lines marked here, reroll the rest.','Cinco cartas desde Nv 45. Cada carta saca líneas de habilidad al azar de su propia lista; cada línea suma niveles (hasta +4 al mejorarla). Quédate con las líneas marcadas y vuelve a tirar el resto.'],
 arcSet:['Card set','Set de cartas'],arcGrade:['Card grade','Grado de carta'],
 arcLines:['lines','líneas'],arcLine:['line','línea'],arcKeep:['Keep','Quédate'],arcPool:['Also in this pool','También en esta lista'],
 arcPoolA:['Any of your 22 skills','Cualquiera de tus 22 habilidades'],arcPoolAct:['6 active skills','6 activas'],arcPoolPas:['5 passive skills','5 pasivas'],
 arcTotal:['Skill levels from a full Arcana set','Niveles de habilidad con todas las Arcanas'],
 arcTotalS:['If every kept line is enhanced to +4.','Si cada línea elegida se mejora a +4.'],
 arcSetHow:['Use 4 cards of one set for the 4-piece bonus; the 5th card can be either.','Usa 4 cartas del mismo set para el bono de 4 piezas; la 5.ª puede ser de cualquiera.'],
 arcVigorWho:['Damage first: more PvE Attack while your HP stays high.','Primero el daño: más Ataque JcE mientras tu PV esté alto.'],
 arcMagicWho:['Mana and safety: MP refill when low, PvE Defense while MP is high.','Maná y seguridad: recarga de PM cuando está bajo, Defensa JcE con PM alto.'],
 arcWhy:['Lines are ranked by this class\'s skill priority (Skills tab). Pools: questlog.gg game data.','Las líneas siguen la prioridad de habilidades de la clase (pestaña Habilidades). Listas: datos del juego de questlog.gg.'],
 grade11:['Common','Común'],grade21:['Rare','Raro'],grade31:['Epic','Épico'],grade41:['Unique','Único']
});
const RAR={11:'common',21:'green',31:'blue',41:'gold'};

/** Pool skills of a slot for the current class, best first. */
function arcRanked(slot){
  const A=SHARED.arcana,ics=(A.pools[C.id]||{})[slot.id]||[];
  const byIc={};C.skills.forEach(s=>byIc[s.ic]=s);
  const sk=ics.map(ic=>byIc[ic]).filter(Boolean);
  const score=s=>(s.rank?s.rank:99)+(slot.pool==='all'&&s.t==='passive'?50:0);
  return sk.slice().sort((a,b)=>score(a)-score(b));
}
function arcCard(slot,g){
  const A=SHARED.arcana,set=S.arcSet==='magic'?'magic':'vigor',card=slot[set],st=A.stats[card.stat],gr=A.grades.find(x=>x.g===g);
  const ranked=arcRanked(slot),keep=ranked.slice(0,gr.lines),rest=ranked.slice(gr.lines);
  const poolTxt=u(slot.pool==='all'?'arcPoolA':slot.pool==='active'?'arcPoolAct':'arcPoolPas');
  return `<article class="arc" style="--ar:var(--rar-${RAR[g]})">
   <div class="arc-art">${itm(A.iconBase+card.icon,T(card.name),RAR[g],'xl')}<span class="arc-slot">${esc(T(slot.name))}</span></div>
   <div class="arc-body">
    <h3>${esc(T(card.name))}</h3>
    <div class="arc-stat"><b>${esc(T(st.name))}</b> <span class="muted">[${esc(st.god)}]</span> <em>+${gr.stat}</em>${st.fx?`<small>${esc(T(st.fx))}</small>`:''}</div>
    <div class="kick" style="margin-top:10px">${u('arcKeep')} · ${gr.lines} ${u(gr.lines>1?'arcLines':'arcLine')}</div>
    <div class="arc-keep">${keep.map((s,i)=>`<div class="arc-line">${ico(s.n,'xs g',i+1)}<span>${lab(s.n)}</span><b>+${A.lineMax}</b></div>`).join('')}</div>
    ${rest.length?`<div class="arc-rest" title="${esc(poolTxt)}"><span class="tiny muted">${u('arcPool')}</span><div>${rest.map(s=>ico(s.n,'xs off')).join('')}</div></div>`:''}
   </div></article>`;
}
function pArcana(){
  const el=$('p-arcana');if(!el)return;
  const A=SHARED.arcana,g=S.mode==='simple'?41:(+S.arcG||41);
  if(!A.pools[C.id]){el.innerHTML=`<div class="note warn">No Arcana data for this class yet.</div>`;return}
  const totals={};
  A.slots.forEach(sl=>{const gr=A.grades.find(x=>x.g===g);arcRanked(sl).slice(0,gr.lines).forEach(s=>totals[s.n]=(totals[s.n]||0)+A.lineMax)});
  const tot=Object.entries(totals).sort((a,b)=>b[1]-a[1]);
  const setCard=k=>{const s=A.sets[k],on=(S.arcSet||'vigor')===k,c=A.slots[0][k];
    return `<button class="arcset ${on?'on':''}" data-arcset="${k}">${itm(A.iconBase+c.icon,T(s.name),'gold','sm')}<div><b>${esc(T(s.name))}</b><small>${u(k==='vigor'?'arcVigorWho':'arcMagicWho')}</small>
     <ul>${s.bonus.map(b=>`<li><span>${b.n}×</span>${esc(S.lang==='es'?b.es:b.en)}</li>`).join('')}</ul></div></button>`};
  el.innerHTML=`<div class="ph"><div><h2>${u('t_arcana')}</h2><p>${u('arcP')}</p></div>
   <div class="seg advonly flex" id="arcGrade">${A.grades.map(x=>`<button data-arcg="${x.g}" class="${x.g===g?'on':''}">${u('grade'+x.g)} · ${x.lines}</button>`).join('')}</div></div>
   <div class="kick">${u('arcSet')}</div>
   <div class="arcsets">${setCard('vigor')}${setCard('magic')}</div>
   <div class="tiny muted" style="margin:6px 0 14px">${u('arcSetHow')}</div>
   <div class="arcgrid">${A.slots.map(sl=>arcCard(sl,g)).join('')}</div>
   <div class="card arctot"><div class="kick">${u('arcTotal')}</div>
    <div class="arctot-row">${tot.map(([n,v])=>`<div class="arctot-i">${ico(n,'sm g')}<b>+${v}</b><span>${lab(n)}</span></div>`).join('')}</div>
    <div class="tiny muted">${u('arcTotalS')}</div></div>
   <div class="note">${u('arcWhy')}</div>`;
}
