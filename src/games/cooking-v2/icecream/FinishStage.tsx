import {FinishActions} from '../shared/FinishActions'
import {Steps,previousStep} from './Steps'
import {ResetDialog} from '../shared/ResetDialog'
import {useEffect,useMemo,useRef,useState} from 'react'
import {finishImage,pngBlob} from './finish-image'
import type {Images} from './composition'
import {fresh,type State} from './model'

export function FinishStage({s,images,update,saved}:{s:State;images:Images;update:(s:State)=>void;saved:boolean}){
 const picture=useMemo(()=>finishImage(s,images),[s.container,s.scoops,s.toppings,images])
 const [exportImage,setExportImage]=useState<{url:string;blob:Blob}>(),[ready,setReady]=useState(false)
 const saveLock=useRef(false);
 const [reset,setReset]=useState(false),[busy,setBusy]=useState(false),[message,setMessage]=useState('')
 useEffect(()=>{let active=true,url='';setReady(false);setExportImage(undefined);pngBlob(picture).then(blob=>{if(!active)return;url=URL.createObjectURL(blob);setExportImage({url,blob})}).catch(()=>{if(active)setMessage('그림을 준비하지 못했어요. 새로고침 후 다시 눌러 주세요.')});return()=>{active=false;if(url)setTimeout(()=>URL.revokeObjectURL(url),1000)}},[picture])
 function cancel(){setReset(false)}
 function save(){if(!exportImage||!ready||saveLock.current)return;saveLock.current=true;setBusy(true);setMessage('');try{
  const link=document.createElement('a')
  link.href=exportImage.url;link.download='달콤한-아이스크림.png';link.click()
  setMessage('그림을 저장했어요! 다운로드 목록을 확인해요.')
 }catch{setMessage('저장하지 못했어요. 다시 눌러 주세요.')}finally{setTimeout(()=>{saveLock.current=false;setBusy(false)},500)}}
 return <main className="ic-app ic-finish"><header><a href={import.meta.env.BASE_URL}>← 요리 선택</a><h1><small>요리놀이 2.0</small>달콤한 아이스크림 가게</h1><button aria-pressed={!s.sound} onClick={()=>update({...s,sound:!s.sound})}>소리 {s.sound?'켬':'끔'}</button></header>
 <Steps state={s} onSelect={step=>update(previousStep(s,step))}/>
 <section className="ic-shop"><div className="ic-awning"/><h2 className="ic-guide">나만의 아이스크림 완성!</h2><div className="ic-scene">{!ready&&<p style={{position:'absolute'}} role="status">{message||'완성 그림을 준비해요…'}</p>}{exportImage&&<img className="ic-finish-image" style={{visibility:ready?'visible':'hidden'}} src={exportImage?.url} onLoad={()=>setReady(true)} onError={()=>setMessage('그림을 불러오지 못했어요. 새로고침 후 다시 눌러 주세요.')} role="img" alt={`${s.container==='cup'?'컵':'콘'} ${s.scoops.length}스쿱 완성 아이스크림`}/>}<div className="ic-sparkles" aria-hidden="true">{[0,1,2,3,4,5].map(i=><span key={i} style={{left:`${20+i*12}%`,top:`${15+(i%3)*23}%`,animationDelay:`${i*.08}s`}}>✦</span>)}</div></div></section>
 <footer><FinishActions onSave={save} onHome={()=>location.assign(import.meta.env.BASE_URL)} onReset={()=>setReset(true)} busy={busy} disabled={!ready}/><p className="ic-save-message" role="status">{!saved?'이 기기에 진행 상태를 저장할 수 없어요.':message}</p></footer>
 {reset&&<ResetDialog description="지금 만든 아이스크림이 없어져요." onCancel={cancel} onConfirm={()=>{update({...fresh(),sound:s.sound});setReset(false)}}/>}</main>
}
