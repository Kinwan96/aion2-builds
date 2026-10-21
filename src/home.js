/* ---------- home screen: hero, timers, class grid, guide cards ---------- */
Object.assign(U,{
 h_kick:['Global client · Season 1','Cliente global · Temporada 1'],
 h_title:['Every class build, in one place','Todas las builds, en un solo lugar'],
 h_sub:['Skills, stigmas, Daevanion routes, macros and Genus Insight for all 8 classes. Simple gives you the answer; Advanced shows why.','Habilidades, estigmas, rutas Daevanion, macros y Genus Insight para las 8 clases. Simple te da la respuesta; Avanzado te explica el porqué.'],
 h_choose:['Choose a class','Elige una clase'],h_cont:['Continue:','Seguir con:'],
 timers:['Timers','Temporizadores'],server:['Server','Servidor'],
 rift:['Rift','Rift'],riftS:['Every 3 h · open 10 min','Cada 3 h · abierto 10 min'],
 shugo:['Shugo Festival','Shugo Festival'],shugoS:['Every hour · 3 min to enter','Cada hora · 3 min para entrar'],
 reset:['Weekly reset','Reinicio semanal'],resetS:['Once a week','Una vez por semana'],
 openNow:['Open now','Abierto'],closesIn:['closes in','cierra en'],
 localTz:['Shown in your local time.','En tu hora local.'],
 classes:['Classes','Clases'],guides:['Guides & tools','Guías y herramientas'],
 c_pve:['PvE','PvE'],c_pvp:['PvP','PvP'],c_lvl:['Leveling','Subir nivel'],
 g_genus:['Which stats to lock on each wheel, and when.','Qué stats bloquear en cada rueda, y cuándo.'],
 g_daev:['A planned route on the real boards for your crystals.','Una ruta en los tableros reales para tus cristales.'],
 g_macro:['Hotbar stacks and the in-game macro, step by step.','Pilas de la barra y el macro del juego, paso a paso.'],
 g_lvl:['What to buy with skill points at every level.','Qué comprar con puntos de habilidad en cada nivel.'],
 forCls:['for','para'],open:['Open','Abrir']
});

/* Inline glyphs (currentColor), used where no game art exists. */
const GLYPH={
 rift:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><ellipse cx="12" cy="12" rx="5" ry="9"/><path d="M12 6c2 2 2 10 0 12M8 4.5C3 8 3 16 8 19.5M16 4.5c5 3.5 5 11.5 0 15"/></svg>',
 shugo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M5 10l3-6 2 4h4l2-4 3 6"/><circle cx="12" cy="14" r="7"/><circle cx="9.5" cy="13" r="1" fill="currentColor"/><circle cx="14.5" cy="13" r="1" fill="currentColor"/><path d="M10.5 16.5q1.5 1 3 0"/></svg>',
 reset:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M14.5 14.5a2.5 2.5 0 1 1-1-2"/><path d="M13.6 11.2l.2 1.4-1.4.2"/></svg>',
 genus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.2"/><path d="M12 3v5.8M12 15.2V21M3 12h5.8M15.2 12H21M5.6 5.6l4.1 4.1M14.3 14.3l4.1 4.1M18.4 5.6l-4.1 4.1M9.7 14.3l-4.1 4.1"/></svg>',
 daevanion:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="5" height="5" rx="1.2"/><rect x="16" y="3" width="5" height="5" rx="1.2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1.2"/><rect x="3" y="16" width="5" height="5" rx="1.2"/><rect x="16" y="16" width="5" height="5" rx="1.2"/><path d="M8 5.5h8M12 8v1.5M12 14.5V18.5M8 18.5h8"/></svg>',
 macro:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M6 10h1.5M10 10h1.5M14 10h1.5M18 10h.5M7 14h10"/></svg>',
 leveling:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h4v-5h4V9h4V4h4"/><path d="M15 4h5v5"/></svg>'
};
/** Ornamental divider (diamond between two rules). */
const ORN='<div class="orn" aria-hidden="true"><svg viewBox="0 0 64 16"><path d="M32 2l6 6-6 6-6-6z" fill="none" stroke="currentColor"/><circle cx="32" cy="8" r="1.8" fill="currentColor"/><path d="M18 8l5-3v6zM46 8l-5-3v6z" fill="currentColor"/></svg></div>';

/* ---------- timers ---------- */
const HOUR=36e5;
/** Next start of an "every N hours from offset" event; open = minutes it stays open. */
function cycleState(ev,now){
  const every=ev.every*HOUR,off=ev.offset*HOUR;
  const last=Math.floor((now-off)/every)*every+off;
  const openMs=(ev.open||0)*6e4;
  return now<last+openMs?{open:true,at:last+openMs}:{open:false,at:last+every};
}
/** Next weekly reset (dow 0=Sun, hour in UTC). */
function weeklyNext(ev,now){
  const d=new Date(now);
  const t=Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate(),ev.hour);
  let at=t+((ev.dow-d.getUTCDay()+7)%7)*24*HOUR;
  if(at<=now)at+=7*24*HOUR;
  return {open:false,at};
}
const p2=n=>String(n).padStart(2,'0');
function countdown(ms){
  const s=Math.max(0,Math.floor(ms/1e3)),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60);
  return `${d?`<b>${d}</b><small>d</small>`:''}<b>${p2(h)}</b><small>h</small><b>${p2(m)}</b><small>m</small><b>${p2(s%60)}</b><small>s</small>`;
}
function timerRows(){
  const R=SHARED.timers.regions[S.region]||SHARED.timers.regions.global,now=Date.now();
  const loc=S.lang==='es'?'es':'en';
  const fmt=t=>new Date(t).toLocaleString(loc,{weekday:'short',hour:'2-digit',minute:'2-digit'});
  return [['rift',cycleState(R.rift,now)],['shugo',cycleState(R.shugo,now)],['reset',weeklyNext(R.reset,now)]].map(([k,st])=>
   `<div class="tmr ${st.open?'live':''}" style="--tc:var(--t-${k})"><div class="tg">${GLYPH[k]}</div>
     <div class="tt"><b>${u(k)}</b><span>${u(k+'S')}</span><small>${st.open?`<em>${u('openNow')}</em> · ${u('closesIn')}`:esc(fmt(st.at))}</small></div>
     <div class="tc" aria-live="off">${countdown(st.at-now)}</div></div>`).join('');
}
let tmIv=0;
function startTimers(){if(!tmIv)tmIv=setInterval(()=>{const el=$('tmRows');if(el)el.innerHTML=timerRows();else stopTimers()},1000)}
function stopTimers(){if(tmIv){clearInterval(tmIv);tmIv=0}}

/* ---------- home ---------- */
function classCard(id){
  const d=DATA[id],chips=[['pve',true],['pvp',!!d.pvp],['lvl',true]];
  return `<a class="ccard" href="#/${id}" style="--cc:${d.color||'#e3b766'}">
   <img class="cbg" src="${CI}${d.classIcon}.webp" alt="" aria-hidden="true" onerror="FB(this)">
   <div class="ctop"><div class="cem"><img src="${CI}${d.classIcon}.webp" alt="" onerror="FB(this)"></div>
    <div><h3>${esc(T(d.name))}</h3><div class="crole">${esc(T(d.role))}</div></div></div>
   <p>${esc(T(d.summary))}</p>
   <div class="cfoot"><span class="cw">${esc(T(d.weapon))}</span><span class="diff">${[1,2,3].map(i=>`<i class="${i<=(d.difficulty||2)?'on':''}"></i>`).join('')}</span></div>
   <div class="cchips">${chips.map(([k,on])=>`<span class="${on?'on':''}">${u('c_'+k)}</span>`).join('')}</div>
  </a>`;
}
function guideCard(tab,glyph,desc){
  return `<a class="gcard2" href="#/${S.cls}/${tab}"><div class="gg">${GLYPH[glyph]}</div>
   <div><h3>${u('t_'+tab)}</h3><p>${u(desc)}</p><span class="gfor">${u('forCls')} ${esc(T(C.name))} →</span></div></a>`;
}
function pHome(){
  const regs=SHARED.timers.regions;
  $('vHome').innerHTML=`<div class="wrap">
  <section class="hhero">
   <div class="hh-txt"><div class="kick">${u('h_kick')}</div><h1>${u('h_title')}</h1><p>${u('h_sub')}</p>
    <div class="hh-cta"><button class="btn pri" id="goClasses">${u('h_choose')}</button><a class="btn" href="#/${S.cls}/${S.tab}">${u('h_cont')} ${esc(T(C.name))} →</a></div></div>
   <aside class="tmcard"><div class="tmhead"><div class="kick">${u('timers')}</div>
     <label class="tmsel"><span class="sr">${u('server')}</span><select id="tmReg">${Object.entries(regs).map(([k,r])=>`<option value="${k}" ${k===S.region?'selected':''}>${esc(T(r.label))}</option>`).join('')}</select></label></div>
    <div id="tmRows">${timerRows()}</div><div class="tiny muted">${u('localTz')}</div></aside>
  </section>
  ${ORN}
  <h2 class="hsec" id="classes">${u('classes')}</h2>
  <div class="cgrid">${ORDER.map(classCard).join('')}</div>
  ${ORN}
  <h2 class="hsec">${u('guides')}</h2>
  <div class="ggrid">${guideCard('genus','genus','g_genus')}${guideCard('daevanion','daevanion','g_daev')}${guideCard('macro','macro','g_macro')}${guideCard('leveling','leveling','g_lvl')}</div>
  </div>`;
  startTimers();
}
