// node shoot.js — flujo galería -> modelo -> 2D/3D; capturas en shots/.
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();
 const pg=await b.newPage({viewport:{width:1400,height:900}});const errs=[];
 pg.on('console',m=>{if(m.type()==='error'||m.type()==='warning')errs.push(m.type()+': '+m.text())});pg.on('pageerror',e=>errs.push('pageerror: '+e.message));
 await pg.goto('file://'+path.resolve('index.html'));await pg.waitForTimeout(1500);
 await pg.evaluate(()=>{localStorage.clear()});await pg.reload();await pg.waitForTimeout(3500);
 await pg.screenshot({path:'shots/50-galeria.png'});
 const th=await pg.evaluate(()=>[...document.querySelectorAll('.card img')].filter(i=>i.src.startsWith('data:')).length);console.log('miniaturas renderizadas:',th);
 await pg.click('[data-tpl="porton"]');await pg.waitForTimeout(800);await pg.screenshot({path:'shots/51-porton.png'});
 await pg.click('#btnGal');await pg.waitForTimeout(300);await pg.click('[data-tpl="brasero"]');await pg.waitForTimeout(800);
 await pg.click('#mode3d');await pg.waitForTimeout(600);await pg.screenshot({path:'shots/52-brasero-3d.png'});
 await pg.click('#btnGal');await pg.waitForTimeout(300);await pg.click('[data-tpl="baranda"]');await pg.waitForTimeout(800);await pg.screenshot({path:'shots/53-baranda-3d.png'});
 const n=await pg.evaluate(()=>({parts:M.parts.length,box:[M.W,M.H,M.D],bom:document.getElementById('total').textContent,kg:document.getElementById('kg').textContent}));console.log(JSON.stringify(n));
 console.log(errs.length?errs.join('\n'):'sin errores de consola');await b.close()})();
