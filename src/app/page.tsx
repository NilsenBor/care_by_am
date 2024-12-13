"use client";
import {useSession} from "next-auth/react";

export default function Home() {
  const {data:session} = useSession()

  return (
    <div>
      {session?.user?.email ? JSON.stringify(session.user) : 'null'}
    </div>
  );
}
