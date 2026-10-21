/* ---------- content mode (PvE / PvP / Leveling) + progress checklist ---------- */
Object.assign(U,{
 c_mode:['Content','Contenido'],t_checklist:['Checklist','Lista'],
 pvpNone:['No verified global PvP build for this class yet. Everything below is the PvE build; for PvP, favour survival, crowd control and the Magic Armor set.','Aún no hay una build PvP global verificada para esta clase. Todo lo de abajo es la build PvE; en PvP prioriza supervivencia, control y el set Armadura mágica.'],
 pvpHas:['PvP build','Build PvP'],
 lvlNote:['Leveling mode: checklist first, then the skill-point plan.','Modo subir nivel: primero la lista, luego el plan de puntos.'],
 clLev:['Leveling milestones','Hitos al subir'],clEnd:['After level 45','Después del nivel 45'],
 clReset:['Progress is saved in this browser, per class.','El progreso se guarda en este navegador, por clase.'],
 clClear:['Clear ticks','Borrar marcas'],clReach:['Reach Lv','Llega a Nv'],clGo:['Open','Abrir'],
 a1:['Reset skills (free at 45) and switch to the endgame Specialties.','Reinicia habilidades (gratis al 45) y cambia a las Especialidades de endgame.'],
 a2:['Equip the stigma loadout:','Equipa el set de estigmas:'],
 a3:['Set up the endgame hotbar and macro.','Configura la barra y el macro de endgame.'],
 a4:['Spend Daevanion crystals along the planned route.','Gasta cristales Daevanion siguiendo la ruta.'],
 a5:['Collect Arcana cards and keep the marked skill lines.','Junta cartas Arcana y quédate con las líneas marcadas.'],
 a6:['Level your pets, then Genus Insight; lock slots 1, 4 and 5 first.','Sube tus mascotas, luego Genus Insight; bloquea primero las ranuras 1, 4 y 5.']
});
const CONTENT=['pve','pvp','lvl'];
const CGLYPH={
 pve:'<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
 pvp:'<path d="M4 20l9-9M13 11l2-2 5-5v4l-5 5-2-2M20 20l-9-9M11 11L9 9 4 4v4l5 5"/>',
 lvl:'<path d="M4 19h4v-5h4V9h4V4h4"/>'
};
function contentSeg(){
  return `<div class="cseg" role="tablist" aria-label="${u('c_mode')}">${CONTENT.map(k=>`<button role="tab" aria-selected="${S.content===k}" data-content="${k}" class="${S.content===k?'on':''}"><svg viewBox="0 0 24 24">${CGLYPH[k]}</svg>${u('c_'+k)}</button>`).join('')}</div>`;
}
/** Banner under the tabs for the current content mode (empty for PvE). */
function modeNote(){
  if(S.content==='pvp'){
    if(C.pvp)return `<div class="note"><b>${u('pvpHas')}:</b> ${esc(T(C.pvp.note))}</div>`;
    return `<div class="note warn">${u('pvpNone')}</div>`;
  }
  if(S.content==='lvl')return `<div class="note">${u('lvlNote')}</div>`;
  return '';
}

/* ---------- checklist ---------- */
function checkItems(){
  const lev=U.ms[L()].map(([lv,t])=>({id:'m'+lv,lv,t,tab:lv>=22&&lv<=37?'stigmas':lv%10===0||lv===12?'daevanion':'leveling'}));
  const lo=C.stigma.loadouts[0];
  const end=[['a1','skills'],['a2','stigmas',T(lo.name)],['a3','macro'],['a4','daevanion'],['a5','arcana'],['a6','genus']]
    .map(([id,tab,extra])=>({id,t:u(id)+(extra?' '+extra:''),tab}));
  return {lev,end};
}
const doneSet=()=>new Set((S.done&&S.done[S.cls])||[]);
function ring(p){
  const r=16,c=2*Math.PI*r;
  return `<svg class="pring" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="${r}" class="bg"/><circle cx="20" cy="20" r="${r}" class="fg" stroke-dasharray="${(p*c).toFixed(1)} ${c.toFixed(1)}"/></svg><span class="pnum">${Math.round(p*100)}%</span>`;
}
function checkGroup(title,items,done){
  const n=items.filter(i=>done.has(i.id)).length;
  return `<section class="ckg"><header>${ring(items.length?n/items.length:0)}<div><h3>${title}</h3><span class="tiny muted">${n} / ${items.length}</span></div></header>
   <ul class="ck">${items.map(i=>`<li class="${done.has(i.id)?'done':''}"><label><input type="checkbox" data-ck="${i.id}" ${done.has(i.id)?'checked':''}><span class="box" aria-hidden="true"></span>
    ${i.lv?`<b class="cklv">${i.lv}</b>`:''}<span class="ckt">${esc(i.t)}</span></label><a class="ckgo" href="#/${S.cls}/${i.tab}${S.content!=='pve'?'?c='+S.content:''}">${u('clGo')} →</a></li>`).join('')}</ul></section>`;
}
function pChecklist(){
  const el=$('p-checklist');if(!el)return;
  const {lev,end}=checkItems(),done=doneSet();
  const groups=S.content==='lvl'?[[u('clLev'),lev],[u('clEnd'),end]]:[[u('clEnd'),end],[u('clLev'),lev]];
  el.innerHTML=`<div class="ph"><div><h2>${u('t_checklist')}</h2><p>${u('clReset')}</p></div><button class="btn" id="ckClear">${u('clClear')}</button></div>
   <div class="ckwrap">${groups.map(([t,it])=>checkGroup(t,it,done)).join('')}</div>`;
}
function toggleCheck(id,on){
  const cur=doneSet();if(on)cur.add(id);else cur.delete(id);
  S.done={...(S.done||{}),[S.cls]:[...cur]};
  pChecklist();save();
}
