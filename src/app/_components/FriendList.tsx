'use client'
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../db";

export function FriendList() {
   const friends = useLiveQuery(() => db.friends.toArray());
 
   return (
     <ul>
       {friends?.map((friend) => { 
         console.log('friend', friend)
         const imageUrl = URL.createObjectURL(friend.image);
         console.log('imageUrl', imageUrl);
         return (
            <li key={friend.id}>
               <div className="inline-block">{friend.name}, {friend.age}</div>
               <img src={imageUrl} alt="" className="w-[50px] inline-block" />
            </li>
         )
       })}
     </ul>
   );
 }