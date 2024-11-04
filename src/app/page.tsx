'use client'

import { AddFriendForm } from "./_components/AddFriendForm";
import { FriendList } from "./_components/FriendList";
export default function Home() {
  return (
    <div>
      <h1>Friend list:</h1>
      <AddFriendForm defaultAge={22}/>
      <FriendList />
    </div>
  );
}
