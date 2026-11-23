import {useEffect,useRef,useState,type PointerEvent} from 'react'
import {OvenShell} from '../../shared/OvenShell'
import {renderTray,type Graphics} from './graphics'
import type {Work} from './model'
import './oven.css'
export function CupOven({work:w,graphics,onDoor,onInsert,locked=false}:{work:Work;graphics:Graphics;onDoor:()=>void;onInsert:()=>void;locked?:boolean}){
 const target=useRef<HTMLDivElement>(null),canvas=useRef<HTMLCanvasElement>(null),drag=useRef<{id:number;x:number;y:number}|undefined>(undefined),[offset,setOffset]=useState<{x:number;y:number}>()
 const open=['open','inside','revealed'].includes(w.oven),baking=w.oven==='baking',inside=['inside','baking','done','revealed'].includes(w.oven)
 useEffect(()=>{const source=renderTray(graphics,w),c=canvas.current!;c.width=source.width;c.height=source.height;c.getContext('2d')!.drawImage(source,0,0)},[w,graphics])
 useEffect(()=>{drag.current=undefined;setOffset(undefined)},[w.oven])
 function down(e:PointerEvent){e.stopPropagation();if(locked||w.oven!=='open'||drag.current||e.button!==0)return;e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);drag.current={id:e.pointerId,x:e.clientX,y:e.clientY};setOffset({x:0,y:0})}
 function move(e:PointerEvent){if(drag.current?.id===e.pointerId){e.stopPropagation();setOffset({x:e.clientX-drag.current.x,y:e.clientY-drag.current.y})}}
 function up(e:PointerEvent,cancel=false){if(drag.current?.id!==e.pointerId)return;e.stopPropagation();const r=target.current!.getBoundingClientRect();if(!cancel&&e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom)onInsert();drag.current=undefined;setOffset(undefined)}
 return <div className={'ct-oven-stage cv2-oven-stage '+(inside?'is-inside':'')}>
 <div className={'cv2-tray '+(offset?'dragging':'')} role="button" tabIndex={w.oven==='open'?0:-1} aria-label="세 컵케이크 트레이를 오븐으로 끌어 넣기" aria-disabled={w.oven!=='open'} style={offset?{transform:`translateY(-50%) translate(${offset.x}px,${offset.y}px)`}:undefined} onPointerDown={down} onPointerMove={move} onPointerUp={e=>up(e)} onPointerCancel={e=>up(e,true)} onKeyDown={e=>{if(w.oven==='open'&&['Enter',' '].includes(e.key)){e.preventDefault();e.stopPropagation();onInsert()}}}><canvas ref={canvas} className="cc-food" role="img" aria-label="세 컵케이크 트레이"/></div>
 <OvenShell open={open} baking={baking} pointerActivation disabled={locked||baking||w.oven==='revealed'} target={target} onDoor={onDoor} label="컵케이크 오븐"/>
 {baking&&<div className="cv2-bake-sparks" aria-hidden="true">✦ · ✧ · ✦</div>}
 </div>
}
