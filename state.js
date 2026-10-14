// CareerPath AI - state.js
// App state, browser storage (localStorage), small helpers and the roadmap builder.
let S={p:{year:'1',deg:'B.Tech / B.E.',br:'Computer Science',ski:[],int:[],goal:''},c:'',done:{},pj:{},sv:[],q:null};
const ADMIN='admin@careerpath.local',esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const L=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}},W=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let U=L('cpai_cur'),AD=L('cpai_admin')||[];const key=()=>U?'cpai_u_'+U:'cpai',isAd=()=>U===ADMIN;
Object.assign(S,L(key())||{});const sv=()=>W(key(),S);
let cmp=[],F={q:'',l:'',t:''},ans=[];
const $=id=>document.getElementById(id),bar=p=>`<div class="bar" role="progressbar" aria-valuenow="${p}"><i style="width:${p}%"></i></div>`;
const tags=a=>a.map(x=>`<span class="tag">${x}</span>`).join('');
const NAV=[['home','Home'],['profile','Profile'],['careers','Careers'],['quiz','Quiz'],['roadmap','Roadmap'],['courses','Courses'],['projects','Projects'],['hackathons','Hackathons'],['jobs','Jobs'],['gap','Skill Gap'],['dashboard','Dashboard'],['placement','Placement']];
const known=()=>new Set([...S.p.ski,...Object.keys(S.done).filter(k=>S.done[k])]);
function steps(){if(!S.c)return[];const k=new Set(S.p.ski),f=S.p.year>=3?.6:1;return C[S.c][3].map((s,i)=>({s,pre:k.has(s),w:Math.max(1,Math.round(SK[s][0]*f))}))}
function prog(){const st=steps();if(!st.length)return 0;return Math.round(st.filter(x=>x.pre||S.done[x.s]).length/st.length*100)}
