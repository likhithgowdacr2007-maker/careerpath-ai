// CareerPath AI - quiz.js
// Career quiz result page and scoring.
function qres(){const r=S.q;return`<h2>Your top careers</h2><p class="note">Scores come from adding points for each answer you chose.</p>${r.map(x=>`<div class="card" style="margin-bottom:12px"><h3>${C[x[0]][1]} ${C[x[0]][0]} · ${x[1]}%</h3>${bar(x[1])}<p><b>Why:</b> ${x[2].length?x[2].join('; ')+'.':'It matched some of your answers.'}</p><button class="btn sm" onclick="pick('${x[0]}')">Choose this career</button></div>`).join('')}<button class="btn s" onclick="ans=[];S.q=null;sv();rt()">Retake quiz</button>`}
function qsub(){const f=$('qf'),a=Q.map((q,i)=>{const v=f.querySelector(`input[name=q${i}]:checked`);return v?+v.value:-1});if(a.includes(-1)){$('qe').textContent=' Please answer all questions.';return}
const sc={},why={};a.forEach((j,i)=>{const o=Q[i][1][j];o[1].split(',').filter(Boolean).forEach(t=>{const[k,n]=t.split(':');sc[k]=(sc[k]||0)+ +n;(why[k]=why[k]||[]).push('You chose "'+o[0].toLowerCase()+'"')})});
const mx=Math.max(1,...Object.values(sc));S.q=Object.entries(sc).sort((x,y)=>y[1]-x[1]).slice(0,3).map(([k,n])=>[k,Math.round(n/mx*100),why[k].slice(0,2)]);ans=[];sv();rt()}
