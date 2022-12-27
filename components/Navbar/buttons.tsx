import React from "react";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { auth } from "../../lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

export const LogoutBtn = (props: Props) => {
  const router = useRouter();
  const { setIsOpen } = props;

  return (
    <button onClick={() => signOut(auth).then(() => router.push("/login"))}>
      <Link
        onClick={() => setIsOpen(false)}
        href="/"
        className="flex items-center font-bold text-2xl"
      >
        Logout <FiLogOut />
      </Link>
    </button>
  );
};

export const LoginBtn = (props: Props) => {
  const { setIsOpen } = props;
  return (
    <Link
      onClick={() => setIsOpen(false)}
      href="/login"
      className="flex items-center font-bold text-2xl"
    >
      Login <FiLogIn />
    </Link>
  );
};
