/* ---------- Genus Insight tab: 9-slot wheel per genus, lock stages, picks ---------- */
Object.assign(U,{
 gWheel:['Your wheel','Tu rueda'],gStage:['Lock stage','Etapa de bloqueo'],
 gSt1:['1st · slots 1, 4 & 5','1.ª · ranuras 1, 4 y 5'],gSt2:['2nd · slots 3, 6 & 9','2.ª · ranuras 3, 6 y 9'],gSt3:['3rd · slots 2, 7 & 8','3.ª · ranuras 2, 7 y 8'],
 gStH:['Lock in this order: slots 1, 4 and 5 hold your biggest stats, so they pay off first.','Bloquea en este orden: las ranuras 1, 4 y 5 tienen tus stats más fuertes, así que rinden primero.'],
 gSlot:['Slot','Ranura'],gOpens:['opens at Insight Lv','se abre en Insight Nv'],gAlt:['or','o'],
 gPick:['Pick per slot','Elección por ranura']
});
const GCOL={cogni:'#4ea8ff',fera:'#e2536b',natura:'#5fd49a',varian:'#f0c24e',special:'#b48cff'};
const GEMB={
 cogni:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3.2"/>',
 fera:'<path d="M6 20c1-6 1-11-1-16M11 20c1-6 1-12 0-17M16 20c0-6 0-11 3-15"/>',
 natura:'<path d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15z"/><path d="M5 19l9-9"/>',
 varian:'<path d="M12 12a3 3 0 1 1 3-3 6 6 0 1 1-6 6 9 9 0 1 1 9-9"/>',
 special:'<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6L3.4 9.3l6-.7z"/>'
};
/* Which lock stage each slot belongs to, and which pick list feeds it. */
const GSLOT={1:[1,'s15'],2:[3,'s278'],3:[2,'s369'],4:[1,'s4'],5:[1,'s15'],6:[2,'s369'],7:[3,'s278'],8:[3,'s278'],9:[2,'s369']};
const GSTC={1:'var(--rar-gold)',2:'var(--rar-blue)',3:'var(--ok)'};

function gPicks(key,list){const g=C.genus,arr=list==='s4'?g.s4[key]:g[list];return (arr||[]).map(([en,es])=>S.lang==='es'&&es?es:en)}
/** SVG wheel: 9 ring segments (slot number + top pick colour), genus emblem in the middle. */
function genusWheel(key,name){
  const cx=110,cy=110,ri=52,ro=104,seg=40,gap=1.6,rad=d=>(d-90)*Math.PI/180;
  const pt=(r,a)=>`${(cx+r*Math.cos(rad(a))).toFixed(2)},${(cy+r*Math.sin(rad(a))).toFixed(2)}`;
  const segs=[1,2,3,4,5,6,7,8,9].map((s,i)=>{
    const a0=i*seg-seg/2+gap,a1=(i+1)*seg-seg/2-gap,am=(a0+a1)/2,[st,list]=GSLOT[s],pick=gPicks(key,list)[0]||'';
    const d=`M${pt(ri,a0)} L${pt(ro,a0)} A${ro},${ro} 0 0 1 ${pt(ro,a1)} L${pt(ri,a1)} A${ri},${ri} 0 0 0 ${pt(ri,a0)}Z`;
    const [lx,ly]=pt((ri+ro)/2,am).split(',');
    return `<g class="gseg st${st}" style="--sc:${GSTC[st]}"><title>${u('gSlot')} ${s} · ${esc(pick)} (${u('gOpens')} ${s})</title><path d="${d}"/>
     <text x="${lx}" y="${+ly-4}" class="gn">${s}</text><text x="${lx}" y="${+ly+10}" class="gst">${st===1?'Ⅰ':st===2?'Ⅱ':'Ⅲ'}</text></g>`}).join('');
  return `<svg class="gwheel" viewBox="0 0 220 220" role="img" aria-label="${esc(name)}" style="--gc:${GCOL[key]}">
   <defs><radialGradient id="gw-${key}"><stop offset="0" stop-color="${GCOL[key]}" stop-opacity=".45"/><stop offset="1" stop-color="${GCOL[key]}" stop-opacity="0"/></radialGradient></defs>
   <circle cx="110" cy="110" r="108" class="gring"/>${segs}
   <circle cx="110" cy="110" r="46" fill="url(#gw-${key})"/><circle cx="110" cy="110" r="38" class="gcore"/>
   <g transform="translate(96 84) scale(1.17)" class="gemb">${GEMB[key]}</g>
   <text x="110" y="136" class="gname">${esc(name)}</text></svg>`;
}
function pGenus(){
  const g=C.genus,gn=U.genusNames[L()].split(','),keys=Object.keys(GCOL),grades=U.grades[L()].split(','),gc=['#b6bcc6','#7bd36f','#4ea8ff','#f0c24e','#ff8b3d'];
  const cur=keys.includes(S.genW)?S.genW:'cogni',ci=keys.indexOf(cur);
  const items=(arr,n)=>(arr||[]).slice(0,n).map(([en,es,r])=>`<div class="it"><span class="rkd r${Math.min(r||1,3)}">${r||1}</span>${esc(S.lang==='es'&&es?es:en)}</div>`).join('');
  const N=S.mode==='simple'?2:4;
  const stages=[1,2,3].map(st=>{const slots=Object.entries(GSLOT).filter(([,v])=>v[0]===st);
    return `<div class="gstage" style="--sc:${GSTC[st]}"><div class="gsh">${u('gSt'+st)}</div>${slots.map(([s,[,list]])=>{const p=gPicks(cur,list);
      return `<div class="gpick"><span class="gsn">${s}</span><b>${esc(p[0]||'—')}</b>${S.mode==='adv'&&p[1]?`<span class="muted small"> ${u('gAlt')} ${esc(p[1])}</span>`:''}</div>`}).join('')}</div>`}).join('');
  const s4=keys.map((k,i)=>`<div class="card gcard gen" style="--gc:${GCOL[k]}"><h3>${gn[i]}</h3>${items(g.s4[k],N)}</div>`).join('');
  const bars=[[4,[50,45,5,0,0]],[7,[35,34,30,1,0]],[9,[25,25,39,10,1]],[10,[20,30,30,15,5]]];
  $('p-genus').innerHTML=`<div class="ph"><div><h2>${u('t_genus')}</h2><p>${u('genP')}</p></div></div>
  <div class="gtabs" role="tablist">${keys.map((k,i)=>`<button role="tab" aria-selected="${k===cur}" data-genw="${k}" class="${k===cur?'on':''}" style="--gc:${GCOL[k]}"><svg viewBox="0 0 24 24">${GEMB[k]}</svg>${gn[i]}</button>`).join('')}</div>
  <div class="gwrap"><div class="gwbox">${genusWheel(cur,gn[ci])}</div>
   <div><div class="kick">${u('gPick')}</div>${stages}<div class="tiny muted" style="margin-top:6px">${u('gStH')}</div></div></div>
  <div class="advonly"><div class="kick" style="margin-top:18px">${u('s4')}</div><div class="grid g5">${s4}</div>
  <div class="grid g3" style="margin-top:12px">
   <div class="card gen"><h3>${u('s15')}</h3>${items(g.s15,N)}</div>
   <div class="card gen"><h3>${u('s369')}</h3>${items(g.s369,N)}</div>
   <div class="card gen"><h3>${u('s278')}</h3>${items(g.s278,N)}</div></div></div>
  <div class="note">${esc(T(g.notes))}</div>
  <div class="grid g2 advonly" style="margin-top:4px"><div class="card"><div class="kick">${u('lockW')}</div>${bars.map(([lv,a])=>`<div class="tiny muted">Lv ${lv}</div><div class="grbar">${a.map((p,i)=>`<i style="width:${p}%;background:${gc[i]}"></i>`).join('')}</div>`).join('')}<div class="leg">${grades.map((x,i)=>`<span><i style="background:${gc[i]}"></i>${x}</span>`).join('')}</div></div>
   <div class="card"><div class="small" style="color:#d6d9e6">${u('lockTxt')}</div><div class="note">${u('smiteN')}</div></div></div>
  <div class="note simpleonly">${u('lockTxt')}</div>`;
}
