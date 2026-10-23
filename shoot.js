// node shoot.js — flujo 2D<->3D con fantasmas; capturas en shots/.
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();
 const pg=await b.newPage({viewport:{width:1400,height:900}});const errs=[];
 pg.on('console',m=>{if(m.type()==='error'||m.type()==='warning')errs.push(m.type()+': '+m.text())});pg.on('pageerror',e=>errs.push('pageerror: '+e.message));
 await pg.goto('file://'+path.resolve('index.html'));await pg.waitForTimeout(1500);
 await pg.evaluate(()=>{localStorage.clear()});await pg.reload();await pg.waitForTimeout(2500);
 await pg.click('[data-v="2"]');await pg.waitForTimeout(600);await pg.screenshot({path:'shots/30-lateral-fantasma.png'});
 await pg.click('[data-v="4"]');await pg.waitForTimeout(600);await pg.screenshot({path:'shots/31-planta-fantasma.png'});
 const g=await pg.evaluate(()=>canvas.getObjects().filter(o=>o.kind==='ghost').length);console.log('fantasmas en planta:',g);
 await pg.click('#mode3d');await pg.waitForTimeout(400);await pg.click('[data-preset="parrilla"]');await pg.waitForTimeout(400);
 await pg.click('[data-face="0"]');await pg.waitForTimeout(700);await pg.screenshot({path:'shots/32-parrilla-frente.png'});
 await pg.click('[data-v="2"]');await pg.waitForTimeout(600);await pg.screenshot({path:'shots/33-parrilla-lateral.png'});
 await pg.click('[data-add="frame"]');await pg.waitForTimeout(500);await pg.screenshot({path:'shots/34-lateral-marco.png'});
 const n=await pg.evaluate(()=>({real:real().length,ghost:canvas.getObjects().filter(o=>o.kind==='ghost').length,bom:document.getElementById('total').textContent}));console.log(JSON.stringify(n));
 console.log(errs.length?errs.join('\n'):'sin errores de consola');await b.close()})();
