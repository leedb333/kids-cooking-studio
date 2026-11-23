import {OvenShell} from '../shared/OvenShell'
import {useRef,useState,type PointerEvent} from 'react'
import type {Images} from '../assets'
import {BAKE_MS,type Session} from './session'
import {PizzaCanvas} from './PizzaCanvas'
export function Oven({session,images,onChange}:{session:Session;images:Images;onChange:(s:Session)=>void}){
 const {phase,elapsed}=session.oven,open=phase==='open'||phase==='inside',baking=phase==='baking',inside=phase==='inside'||baking
 const target=useRef<HTMLDivElement>(null),drag=useRef<{id:number;x:number;y:number}|null>(null),[offset,setOffset]=useState<{x:number;y:number}|null>(null)
 function down(e:PointerEvent){if(phase!=='open'||drag.current||e.button!==0)return;e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);drag.current={id:e.pointerId,x:e.clientX,y:e.clientY};setOffset({x:0,y:0})}
 function move(e:PointerEvent){if(drag.current?.id===e.pointerId)setOffset({x:e.clientX-drag.current.x,y:e.clientY-drag.current.y})}
 function up(e:PointerEvent,cancel=false){if(drag.current?.id!==e.pointerId)return;const b=target.current!.getBoundingClientRect();if(!cancel&&e.clientX>=b.left&&e.clientX<=b.right&&e.clientY>=b.top&&e.clientY<=b.bottom)onChange({...session,oven:{phase:'inside',elapsed:0}});drag.current=null;setOffset(null)}
 return <div className={'cv2-oven-stage '+(inside?'is-inside':'')}>
  <div className={'cv2-tray '+(offset?'dragging':'')} role="button" tabIndex={phase==='open'?0:-1} aria-label="피자 트레이를 오븐으로 끌어 넣기" aria-disabled={phase!=='open'} style={offset?{transform:`translate(${offset.x}px,${offset.y}px)`}:undefined} onPointerDown={down} onPointerMove={move} onPointerUp={e=>up(e)} onPointerCancel={e=>up(e,true)} onKeyDown={e=>{if(phase==='open'&&(e.key==='Enter'||e.key===' ')){e.preventDefault();onChange({...session,oven:{phase:'inside',elapsed:0}})}}}><div className="cv2-metal-tray"/><PizzaCanvas state={session.work} images={images} bake={elapsed/BAKE_MS}/></div>
  <OvenShell open={open} baking={baking} disabled={baking||phase==='closed'&&inside} target={target} onDoor={()=>{if(phase==='closed')onChange({...session,oven:{phase:'open',elapsed:0}});else if(phase==='open')onChange({...session,oven:{phase:'closed',elapsed:0}});else if(phase==='inside')onChange({...session,oven:{phase:'baking',elapsed:0}})}}/>{baking&&<div className="cv2-bake-sparks" aria-hidden="true">✦ · ✧ · ✦</div>}
 </div>
}
