// db.ts
import Dexie, { type EntityTable } from 'dexie';

interface Friend {
  id: number;
  name: string;
  age: number;
  image: Blob;
}

const db = new Dexie('FriendsDatabase') as Dexie & {
  friends: EntityTable<
    Friend,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
//   friends: '++id, name, age, image' // primary key "id" (for the runtime!)
  friends: '++id, name, age, image' // primary key "id" (for the runtime!)
});

export type { Friend };
export { db };