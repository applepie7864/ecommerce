"use client";
import Nav from "@/components/nav";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  if (!session) {
    return (
      <div>
        home
        <button onClick={() => signIn('google')}>Login with Google!</button>
      </div>
    )
  }

  // dashboard
  return (
    <>
      <Nav />
      <div className="h-screen p-8 ml-72 ">Hello, {session?.user?.name}</div>
    </>
  )
}
