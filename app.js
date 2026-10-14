// CareerPath AI - app.js
// Router: reads the URL hash, draws the menu and the page. Starts the app.
function rt(){const h=(location.hash||'#home').slice(1),p=pages[h]?h:'home',y=scrollY;$('nav').innerHTML='<b>CareerPath AI</b>'+[...NAV,['account',U?'Account':'Login'],...(isAd()?[['admin','Admin']]:[])].map(n=>`<a href="#${n[0]}" class="${n[0]==p?'on':''}">${n[1]}</a>`).join('');$('app').innerHTML=pages[p]();scrollTo(0,y)}
addEventListener('hashchange',()=>{rt();scrollTo(0,0)});rt();
