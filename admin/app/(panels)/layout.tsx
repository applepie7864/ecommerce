"use client"
import Nav from "@/components/nav";
import { useSession, signIn, signOut } from "next-auth/react"

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const { data: session } = useSession()
    if (!session) {
        return (
        <div>
            home
            <button onClick={() => signIn('google')}>Login with Google</button>
        </div>
        )
    }

    return (
        <div>
            <Nav />
            {children}
        </div>
    );
}
