import React from "react";
import { auth, db } from "../lib/firebase";
import AddNote from "../components/AddNote";
import { onSnapshot, collection } from "firebase/firestore";
import { noteToJSON } from "../lib/firebase";

const fetchNotes = async () => {
  let unsub;
  try {
    const collectionRef = collection(
      db,
      `users/${auth.currentUser?.uid}/notes`
    );
    unsub = onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map(noteToJSON);
      return data;
    });
  } catch (e: any) {
    console.error(e.message);
  }

  
};

type Props = {};

const Home = async (props: Props) => {
  const docs = await fetchNotes();
  console.log(docs);
  return (
    <div className="m-4 h-screen flex flex-col">
      <h1 className="text-bold text-black text-3xl">Add a Note</h1>
      <AddNote />
    </div>
  );
};

export default Home;
