import {createRoot} from 'react-dom/client'
import {RecipeLinks} from './games/cooking-v2/RecipeLinks'
import './home.css'
function Home(){return <main className="studio-home"><header><div className="studio-brand"><img src={import.meta.env.BASE_URL+'icons/cooking-studio-192.png'} alt=""/><div><small>요리놀이 2.0</small><h1>달콤한 요리놀이터</h1></div></div></header><h2>무엇을 만들어 볼까요?</h2><RecipeLinks ready resume={false} start={()=>location.assign(import.meta.env.BASE_URL+'prototypes/cooking-v2/kitchen/#pizza')}/></main>}
createRoot(document.getElementById('root')!).render(<Home/> )
if(import.meta.env.PROD&&'serviceWorker' in navigator)window.addEventListener('load',()=>{navigator.serviceWorker.register(import.meta.env.BASE_URL+'sw.js').catch(()=>{})})
