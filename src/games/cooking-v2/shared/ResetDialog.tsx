import {useEffect,useId,useRef} from 'react'
import './controls.css'

/** Native modal supplies focus containment and makes the scene behind it inert. */
export function ResetDialog({description,onCancel,onConfirm}:{description:string;onCancel:()=>void;onConfirm:()=>void}){
 const ref=useRef<HTMLDialogElement>(null),id=useId()
 useEffect(()=>{const previous=document.activeElement as HTMLElement|null,dialog=ref.current!;dialog.showModal();return()=>{dialog.close();if(previous?.isConnected)previous.focus({preventScroll:true})}},[])
 return <dialog ref={ref} className="cooking-reset" aria-labelledby={id+'-title'} aria-describedby={id+'-description'} onCancel={e=>{e.preventDefault();onCancel()}} onKeyDown={e=>{if(e.key!=='Tab')return;const buttons=[...e.currentTarget.querySelectorAll('button')],index=buttons.indexOf(document.activeElement as HTMLButtonElement);if(e.shiftKey&&index<=0){e.preventDefault();buttons.at(-1)?.focus()}else if(!e.shiftKey&&index===buttons.length-1){e.preventDefault();buttons[0].focus()}}}><h2 id={id+'-title'}>처음부터 만들까요?</h2><p id={id+'-description'}>{description}</p><div className="cooking-reset-actions"><button autoFocus onClick={onCancel}>계속 만들기</button><button className="cooking-destructive" onClick={onConfirm}>처음부터 만들기</button></div></dialog>
}
