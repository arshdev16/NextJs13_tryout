"use client";
import React from "react";
import { auth, db } from "../../lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  indexedDBLocalPersistence
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

type Props = {};

const LoginAndSignup = (props: Props) => {
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const LoginWithGoogle = () => {
    setPersistence(auth, indexedDBLocalPersistence).then(async () => {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const user = result.user;
          const userRef = doc(db, `users/${user.uid}`);
          const userData = {
            name: user.displayName,
            userId: user.uid,
            email: user.email,
          };
          await setDoc(userRef, userData);
          return router.push("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(
            "error code =",
            errorCode,
            "\n error message = ",
            errorMessage
          );
        });
    });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <button
        onClick={LoginWithGoogle}
        className="bg-blue-400 rounded-2xl p-5 text-white"
      >
        Login with google
      </button>
    </div>
  );
};

export default LoginAndSignup;
