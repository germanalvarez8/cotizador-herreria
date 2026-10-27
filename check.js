// node check.js — aserciones del bloque de cálculo de index.html (objetos planos con la misma forma que los de Fabric)
const fs=require('fs');const h=fs.readFileSync(__dirname+'/index.html','utf8');
const calc=h.slice(h.indexOf('// ===== calc-begin'),h.indexOf('// ===== calc-end'));
new Function(calc+`
const A=(c,m)=>{if(!c)throw new Error(m)};
const cm=x=>x*PX;
A(Math.abs(pieces({kind:'seg',p:'tu30',width:cm(100),scaleX:1.5})[0][1]-150)<1e-9,'seg escalado');
const f=pieces({kind:'frame',p:'tu30',width:cm(150),height:cm(120)});
A(f.length===4&&f[0][1]===150&&f[2][1]===120,'frame');
A(Math.abs(pieces({kind:'arc',p:'pl12',r:10,sweep:180,scaleX:1})[0][1]-Math.PI*10)<1e-9,'arc');
const v=pieces({kind:'vol',p:'pl12',r0:1.5,r1:10,turns:1.5})[0][1];
A(Math.abs(v-Math.PI*1.5*11.5)<2,'vol '+v);
const b=pieces({kind:'bars',p:'cu12',bw:cm(150),bh:cm(120),sp:12,dir:'v'});
A(b.length===12&&b[0][1]===120,'bars v '+b.length);
const bh=pieces({kind:'bars',p:'cu12',bw:cm(150),bh:cm(120),sp:12,dir:'h'});
A(bh.length===9&&bh[0][1]===150,'bars h');
// 12 piezas de 120: 5 por barra no entra por el kerf (601.2) -> 4 por barra -> 3 barras
A(pack(Array(12).fill(120)).length===3,'pack');
A(pack([700]).length===1,'over');
const S={prices:{},catPrices:{},labor:100,cons:0};
const r=calc([{kind:'bars',p:'cu12',bw:cm(150),bh:cm(120),sp:12,dir:'v'},{kind:'cat',catId:'lanza'},{kind:'cat',catId:'lanza'}],S);
A(r.rows[0].bars===3&&Math.abs(r.rows[0].kg-14.4*1.13)<1e-6,'calc kg');
A(r.catRows[0].n===2&&r.total===(3*18500+2*1200)*2,'total');
A(Math.abs(calc([{kind:'cat',catId:'lanza'}],{prices:{},catPrices:{},labor:50,cons:10}).total-1200*1.6)<1e-9,'cons %');
A(Math.abs(calc([{kind:'cat',catId:'lanza'}],{prices:{},catPrices:{},labor:50,cons:10,extras:500}).total-(1200*1.6+500))<1e-9,'extras');
// malla: 1 m² → 1 panel, kg por kgm2
const rm=calc([{kind:'sheet',p:'malla',width:cm(100),height:cm(100)}],S).sheetRows[0];A(rm.hojas===1&&Math.abs(rm.kg-2.5)<1e-9&&rm.cost===28000,'malla');
// ya contado no suma; cantidad multiplica
A(pieces({kind:'seg',p:'tu30',width:cm(100),ref:true}).length===0,'ref');
A(pieces({kind:'seg',p:'tu30',width:cm(100),qty:4}).length===4,'qty');
// chapa: 80x50 cm x2 = 0.8 m2 -> 1 hoja; kg = 0.8*2/1000*7850
const rs=calc([{kind:'sheet',p:'ch2',width:cm(80),height:cm(50),qty:2}],S);
A(rs.sheetRows[0].hojas===1&&Math.abs(rs.sheetRows[0].kg-0.8*2/1000*7850)<1e-6&&rs.sheetRows[0].cost===47000,'sheet');
A(calc([{kind:'sheet',p:'ch2',width:cm(100),height:cm(200),ref:true}],S).sheetRows.length===0,'sheet ref');
console.log('calc ok');
`)();
