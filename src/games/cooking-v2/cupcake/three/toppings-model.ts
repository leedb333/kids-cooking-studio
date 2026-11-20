import {edit,layout,type Work,type Session} from '../model'
export type ExtraKind='candy'|'cookie'
export type ExtraPiece={id:string;kind:ExtraKind;u:number;v:number;size:number;rotation:number;variant:number}
export const limits={candy:4,cookie:1}
export const colors=['#f481af','#8dd8ed','#ffe17a','#ba93dc','#83ce9d']
export const pieces=(w:Work):ExtraPiece[]=>w.toppings??[]
export function sanitize(w:Work):Work{if(!w||typeof w!=='object')return w;const seen=new Set<string>(),count={candy:0,cookie:0};const toppings=(Array.isArray(w.toppings)?w.toppings:[]).filter(p=>{if(!p||!['candy','cookie'].includes(p.kind)||typeof p.id!=='string'||!/^extra-\d+$/.test(p.id)||seen.has(p.id)||!Number.isSafeInteger(Number(p.id.slice(6)))||![p.u,p.v,p.size,p.rotation,p.variant].every(Number.isFinite)||p.u<0||p.u>1||p.v<0||p.v>1||(p.kind==='candy'?(p.size<.075||p.size>.15):(p.size<.38||p.size>.6))||Math.abs(p.rotation)>15||!Number.isInteger(p.variant)||p.variant<0||p.variant>=colors.length||count[p.kind]>=limits[p.kind])return false;seen.add(p.id);count[p.kind]++;return true});return {...w,toppings}}
export function validToppings(w:Work){return w.toppings===undefined||(Array.isArray(w.toppings)&&sanitize(w).toppings!.length===w.toppings.length)}
type Mask=(u:number,v:number)=>boolean
function fits(p:ExtraPiece,mask:Mask){if(!mask(p.u,p.v))return false;if(p.kind==='cookie')return p.v>.25&&[-.055,0,.055].every(dx=>[-.025,0,.025].every(dy=>mask(p.u+dx,p.v+dy)));const radius=p.size*.55;for(let i=0;i<12;i++){const a=i*Math.PI/6;if(!mask(p.u+Math.cos(a)*radius,p.v+Math.sin(a)*radius))return false}return true}
export function add(s:Session,kind:ExtraKind,u:number,v:number,mask:Mask):Session{if(s.work.piping<=0||s.work.step!=='decorate'||!mask(u,v))return s;const all=pieces(s.work);if(all.filter(p=>p.kind===kind).length>=limits[kind])return s;const id=1+all.reduce((n,p)=>Math.max(n,Number(p.id.slice(6))||0),0),base:ExtraPiece={id:`extra-${id}`,kind,u,v,size:kind==='candy'?Math.max(.075,24/layout(s.work).cream.w):Math.max(.38,110/layout(s.work).cream.w),rotation:kind==='cookie'?-7:(id*7)%25-12,variant:(id-1)%colors.length};
 // Search only within 6% of the cream width. A full area cancels instead of teleporting.
 for(const radius of [0,.025,.045,.06])for(let i=0;i<(radius?12:1);i++){const a=i*Math.PI/6,p={...base,u:u+Math.cos(a)*radius,v:v+Math.sin(a)*radius};if(fits(p,mask)&&all.every(q=>Math.hypot(p.u-q.u,p.v-q.v)>(p.kind==='cookie'||q.kind==='cookie'?.16:.09)))return edit(s,{toppings:[...all,p]})}return s}
export function removeExtra(s:Session,id:string){return pieces(s.work).some(p=>p.id===id)?edit(s,{toppings:pieces(s.work).filter(p=>p.id!==id)}):s}
