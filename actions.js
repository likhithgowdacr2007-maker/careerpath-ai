// CareerPath AI - actions.js
// Small actions: save profile, pick career, compare, tick skills, project status, save items.
function saveP(){const g=n=>[...document.querySelectorAll(`input[name=${n}]:checked`)].map(x=>x.value);S.p={deg:$('deg').value,br:$('br').value,year:$('yr').value,int:g('int'),ski:g('ski'),goal:''};if($('goal').value)S.c=$('goal').value;sv();$('ok').textContent=' Saved ✓'}
function pick(k){S.c=k;sv();location.hash='#roadmap'}
function cp(k){cmp=cmp.includes(k)?cmp.filter(x=>x!=k):[...cmp,k].slice(-3);rt()}
function tog(s){S.done[s]=!S.done[s];sv();rt()}
function pj(id,v){S.pj[id]=v;sv();rt()}
function svo(id,t){S.sv=S.sv.some(x=>x[0]==id)?S.sv.filter(x=>x[0]!=id):[...S.sv,[id,esc(t)]];sv();rt()}
