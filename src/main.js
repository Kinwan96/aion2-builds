/* ---------- router: #/ = home, #/<class>/<tab> = class view ---------- */
function readHash(){
  const [path,query]=location.hash.replace(/^#\/?/,'').split('?');
  const parts=path.split('/').filter(Boolean);
  if(!parts.length||!DATA[parts[0]])return {view:'home'};
  const c=new URLSearchParams(query||'').get('c');
  const content=CONTENT.includes(c)?c:'pve';
  const valid=tabsFor(DATA[parts[0]],content);
  const tab=valid.includes(parts[1])?parts[1]:valid[0];
  return {view:'class',cls:parts[0],tab,content};
}
const hashOf=()=>S.view==='home'?'#/':`#/${S.cls}/${S.tab}${S.content!=='pve'?'?c='+S.content:''}`;
/** Write the current view into the URL. push=true adds a history entry (back button works). */
function syncHash(push){const h=hashOf();if(location.hash!==h)history[push?'pushState':'replaceState'](null,'',h)}
function scrollToTabs(){
  const tb=document.querySelector('.tabs');if(!tb)return;
  const y=tb.getBoundingClientRect().top+scrollY-(innerWidth>640?58:0);
  if(scrollY>y)window.scrollTo({top:y,behavior:'smooth'});
}
function applyRoute(){
  const r=readHash();
  if(r.view==='class'&&S.view==='class'&&r.cls===S.cls&&r.content===S.content){
    if(r.tab!==S.tab){S.tab=r.tab;header();save()}
    return;
  }
  const changedCls=r.cls&&r.cls!==S.cls;
  Object.assign(S,r);if(changedCls)S.load=0;
  renderAll();window.scrollTo(0,0);
}
window.addEventListener('hashchange',applyRoute);

/* ---------- events ---------- */
document.addEventListener('click',e=>{
  const t=e.target.closest('button,.lang');if(!t){$('pop').classList.remove('on');return}
  if(t.id==='pickBtn'){$('pop').classList.toggle('on');return}
  if(t.dataset.c&&t.closest('#pop')){S.cls=t.dataset.c;S.load=0;S.view='class';$('pop').classList.remove('on');syncHash(true);renderAll();window.scrollTo(0,0);return}
  $('pop').classList.remove('on');
  if(t.id==='goClasses'){$('classes').scrollIntoView({behavior:'smooth',block:'start'});return}
  if(t.dataset.m){S.mode=t.dataset.m;renderAll();return}
  if(t.id==='langSw'){S.lang=S.lang==='en'?'es':'en';renderAll();return}
  if(t.dataset.t){S.tab=t.dataset.t;syncHash(true);header();scrollToTabs();save();return}
  if(t.closest('#crSeg')){if(t.dataset.c==='auto')S.auto=true;else{S.cr=+t.dataset.c;S.auto=false}renderAll();return}
  if(t.closest('#loadSeg')){S.load=+t.dataset.l;pStigmas();save();return}
  if(t.closest('#dvTabs')){S.board=t.dataset.b;pDaev();save();return}
  if(t.closest('#presets')){S.preset=+t.dataset.p;renderAll();return}
  if(t.dataset.content){S.content=t.dataset.content;if(S.content==='lvl')S.tab='checklist';syncHash(true);renderAll();return}
  if(t.id==='ckClear'){S.done={...(S.done||{}),[S.cls]:[]};pChecklist();save();return}
  if(t.dataset.genw){S.genW=t.dataset.genw;pGenus();save();return}
  if(t.dataset.arcset){S.arcSet=t.dataset.arcset;pArcana();save();return}
  if(t.dataset.arcg){S.arcG=+t.dataset.arcg;pArcana();save();return}
  if(t.closest('#macSeg')){S.macro=t.dataset.x;pMacro();save();return}
  if(t.id==='copyBtn'){navigator.clipboard.writeText(`AION 2 ${T(C.name)} macro\n${window._macro}`).then(()=>$('copyMsg').textContent=u('copied')).catch(()=>{});return}
});
document.addEventListener('change',e=>{
  if(e.target.id==='tmReg'){S.region=e.target.value;$('tmRows').innerHTML=timerRows();save()}
  if(e.target.dataset.ck){toggleCheck(e.target.dataset.ck,e.target.checked)}
});
$('lvR').oninput=e=>{S.lv=+e.target.value;renderAll()};
$('crR').oninput=e=>{S.cr=+e.target.value;S.auto=false;renderAll()};

/* ---------- boot: the URL decides the view (no hash = home) ---------- */
Object.assign(S,readHash());
renderAll();
