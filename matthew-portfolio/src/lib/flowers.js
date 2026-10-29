// Hero artwork is laid out in a 1440x700 "design space" and scaled to fit (like SVG preserveAspectRatio="slice").
export const W0 = 1440, H0 = 700
export function heroMap(w, h, align = 'xMid') {
  const s = Math.max(w / W0, h / H0)
  return { s, ox: align === 'xMax' ? w - W0 * s : (w - W0 * s) / 2, oy: h - H0 * s }
}

/* Procedural spider lilies: returns { dots, blooms } for the hero, in the 1440x700 design space. */
export function buildFlowers(){let sd=23;const R=()=>(sd=(sd*16807)%2147483647)/2147483647,f=n=>n.toFixed(1),D=Math.PI/180;
/* one tepal: narrow ribbon, crinkled margin, curled back */
function T(L,th,curl,dark){const N=14,W=.16,ph=R()*6,p2=R()*6,am=.05+R()*.05;let up="",dn="",sp="";
for(let i=0;i<=N;i++){const t=i/N,x=L*t,yc=curl*L*t*t+am*L*Math.sin(t*8+ph)*t*Math.sign(curl),w=W*L*Math.pow(Math.sin(Math.PI*Math.pow(t,.8)),.9)*(1+.32*Math.sin(t*15+p2));
up+=(i?"L":"M")+f(x)+" "+f(yc-w);dn="L"+f(x)+" "+f(yc+w)+dn;sp+=(i?"L":"M")+f(x)+" "+f(yc)}
return `<g transform="rotate(${f(th)})"><path d="${up}${dn}Z" fill="url(#${dark?"pd":"pg"})" stroke="#ff9a86" stroke-opacity=".5" stroke-width=".5"/><path d="${sp}" fill="none" stroke="#ffc9bc" stroke-opacity=".45" stroke-width=".6"/></g>`}
/* stamen: thin filament sweeping out and up, tiny anther */
function St(l,th,s){const b=(R()-.5)*l*.25,ex=l,ey=-s*(l*.5+b);
return `<g transform="rotate(${f(th)})"><path d="M0 0C${f(l*.3)} ${f(-s*l*.12)} ${f(l*.8)} ${f(-s*(l*.42+b))} ${f(ex)} ${f(ey)}" fill="none" stroke="#c8372d" stroke-width=".9" stroke-linecap="round"/><ellipse cx="${f(ex)}" cy="${f(ey)}" rx="2.8" ry="1.3" transform="rotate(${f(-s*55)} ${f(ex)} ${f(ey)})" fill="#e9b44c"/></g>`}
function floret(x,y,phi,r,dark){let g="";
for(let j=0;j<6;j++){const th=phi+(j-2.5)*27+(R()-.5)*12,s=Math.cos(th*D)>=0?1:-1;g+=T(r*(1.25+R()*.35),th,-s*(.3+R()*.45),dark)}
for(let j=0;j<6;j++){const th=phi+(j-2.5)*16+(R()-.5)*10,s=Math.cos(th*D)>=0?1:-1;g+=St(r*(1.9+R()*.6),th,s)}
return `<g transform="translate(${f(x)} ${f(y)})"${dark?' opacity=".88"':""}>${g}</g>`}
function umbel(r){const n=8;let fl=[],ped="";
for(let k=0;k<n;k++){const phi=-190+k*(210/(n-1))+(R()-.5)*14,d=r*.38*(.8+R()*.4),x=Math.cos(phi*D)*d,y=Math.sin(phi*D)*d*.9;
fl.push({x,y,phi,z:R()});ped+=`<path d="M0 0L${f(x)} ${f(y)}" stroke="#8f3a2a" stroke-width="1.7" stroke-linecap="round"/>`}
fl.sort((a,b)=>a.z-b.z);return ped+fl.map((o,i)=>floret(o.x,o.y,o.phi,r*.5,i<3)).join("")}
const FL=[[1130,235,92,{b:1105,bf:1}],[905,405,84,{b:960}],[1345,310,78,{b:1385}],[1215,525,72,{b:1195}],[1020,585,62,{b:1060}],[660,610,52],[460,625,46],[275,595,48],[95,545,56]];
// Each bloom is its own small SVG document. FlowerField rasterises each one to a bitmap once, then animates the bitmaps with
// plain CSS transforms (GPU), so sway / theme changes / scrolling never re-draw the vector petals.
// Gradients live inside each document because they are separate documents.
const GR=`<linearGradient id="pg" x1="0" x2="1"><stop offset="0" stop-color="#8a1510"/><stop offset=".4" stop-color="#c9302a"/><stop offset="1" stop-color="#ef5c49"/></linearGradient>
<linearGradient id="pd" x1="0" x2="1"><stop offset="0" stop-color="#5e0d0b"/><stop offset=".4" stop-color="#a02420"/><stop offset="1" stop-color="#cc4034"/></linearGradient>
<linearGradient id="st" gradientUnits="userSpaceOnUse" x1="0" y1="720" x2="0" y2="200"><stop offset="0" stop-color="#4c5c24"/><stop offset=".6" stop-color="#6f8036"/><stop offset="1" stop-color="#93a04e"/></linearGradient>`;
const dots=[]
for(let i=0;i<14;i++)dots.push({x:+f(500+R()*900),y:+f(60+R()*520),r:+f(2+R()*6),o:+f(.06+R()*.1)});
const blooms=[]
FL.slice().sort((a,b)=>a[2]-b[2]).forEach(([x,y,r,o])=>{
  const big=!!(o&&o.b),bs=big?o.b:x,bend=(R()-.5)*50,back=r<50,w=big?f(8.5+R()*2.5):f(2.4+r/26);
  const d=`M${f(bs)} 740C${f(bs+(x-bs)*.15)} ${f(740-(740-y)*.35)} ${f(x-(x-bs)*.1+bend)} ${f(y+(740-y)*.35)} ${x} ${y}`;
  const dur=+f(7+R()*4),del=+f(R()*8),rot=f((R()-.5)*20);          // same random order as before, so the layout is unchanged
  const inner=`<path d="${d}" fill="none" stroke="url(#st)" stroke-width="${w}" stroke-linecap="round"/>${big?`<path d="${d}" transform="translate(-${f(w/4)} 0)" fill="none" stroke="#b3bf6a" stroke-opacity=".4" stroke-width="${f(w/5)}" stroke-linecap="round"/>`:""}<g transform="translate(${x} ${y}) rotate(${rot})">${umbel(r)}</g>`;
  const m=r*2.3,x0=Math.min(bs,x)-m,y0=y-m,W=Math.max(bs,x)+m-x0,H=745-y0;       // bounding box of this bloom, in design space
  const doc=`<svg xmlns="http://www.w3.org/2000/svg" width="${f(W)}" height="${f(H)}" viewBox="${f(x0)} ${f(y0)} ${f(W)} ${f(H)}"><defs>${GR}</defs>${inner}</svg>`;
  blooms.push({x,y,r,bs,bf:!!(o&&o.bf),back,dur,del,x0:+f(x0),y0:+f(y0),W:+f(W),H:+f(H),src:`data:image/svg+xml;charset=utf-8,${encodeURIComponent(doc)}`})});
return {dots,blooms}}
