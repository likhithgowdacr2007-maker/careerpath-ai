// CareerPath AI - auth.js
// Demo sign-up, login and logout (passwords hashed with SHA-256).
function fresh(){S={p:{year:'1',deg:'B.Tech / B.E.',br:'Computer Science',ski:[],int:[],goal:''},c:'',done:{},pj:{},sv:[],q:null}}
async function hs(x){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(x));return[...new Uint8Array(b)].map(v=>v.toString(16).padStart(2,'0')).join('')}
async function auth(login){const e=$('em').value.trim().toLowerCase(),p=$('pw').value,m=$('ae');if(!/^\S+@\S+\.\S+$/.test(e)||p.length<6){m.textContent='Enter a valid email and a password with 6 or more characters.';return}
if(!(window.crypto&&crypto.subtle)){m.textContent='This browser cannot secure passwords here. Try Chrome or Edge.';return}
const us=L('cpai_users')||{},h=await hs(e+':'+p);
if(login){if(us[e]!==h){m.textContent='Wrong email or password.';return}}else{if(us[e]){m.textContent='This email already has an account. Please log in.';return}us[e]=h;W('cpai_users',us)}
U=e;W('cpai_cur',U);fresh();Object.assign(S,L(key())||{});sv();location.hash='#dashboard';rt()}
function out(){U=null;try{localStorage.removeItem('cpai_cur')}catch(e){}fresh();Object.assign(S,L('cpai')||{});location.hash='#home';rt()}
