import {food,type Images} from './composition'
import {scoopAt} from './placement'
import type {State} from './model'
/** Navigation never calls this. Actual food edits retain original decoration records
 * without rerolling paths or positions; only anchors no longer on their scoop are removed. */
export function changeFood(s:State,patch:Partial<Pick<State,'container'|'scoops'>>,images:Images):State{
 const next={...s,...patch,completed:false};if(s.container===next.container&&s.scoops.join(',')===next.scoops.join(','))return next
 if(!next.scoops.length||!s.toppings?.length)return {...next,toppings:[]}
 const f=food(next,images);return {...next,toppings:(s.toppings??[]).filter(t=>{const owner=scoopAt(f,{x:f.left+t.x*f.width,y:f.top+t.y*f.height});return owner>=0&&(t.scoop===undefined||t.scoop<next.scoops.length&&t.scoop===owner)})}
}
