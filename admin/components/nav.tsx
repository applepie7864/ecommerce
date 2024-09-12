import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/imgs/lock.png"
import { usePathname } from "next/navigation";

export default function Nav() {
    const pathname = usePathname();
    const inactive = "pl-12 py-5 flex flex-row justify-left items-center border-l-4 border-transparent text-gray-700";
    const active = "pl-12 py-5 flex flex-row justify-left items-center border-l-4 border-blue-500 text-blue-500 sb bg-sky-100";
    return (
        <nav className="fixed top-0 left-0 h-screen w-72 flex flex-col justify-top items-left border-r border-gray-300">
            <div className="p-5 text-center flex flex-row justify-center items-center gap-2 bg-blue-500">
                <div className="bg-blue-500 text-3xl sb text-slate-100">Admin</div>
                <Image className="bg-blue-500" src={ logo } alt="logo" />
            </div>
            <Link className={pathname == "/" ? active : inactive} href={'/'}>DASHBOARD</Link>
            <Link className={pathname == "/products" ? active : inactive} href={'/products'}>PRODUCTS</Link>
            <Link className={pathname == "/orders" ? active : inactive} href={'/orders'}>ORDERS</Link>
            <Link className={pathname == "/settings" ? active : inactive} href={'/settings'}>SETTINGS</Link>
        </nav>
    );
}