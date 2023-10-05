import Link from "next/link"

export default function NavBar (){
return(
    <nav className="w-screen h-[calc((100vh*7)/100)] bg-slate-800 flex justify-center border-b-4 border-b-slate-900">
        <div className="flex items-center justify-between h-full container">
            <Link href="/"><p className="font-bold text-red-600 text-2xl">Trailflix</p></Link>
            <div className="flex mx-6">
                <Link href="/new"><p className="text-rose-400">New</p></Link>
                <Link href="/about" className="ml-6"><p className="text-rose-400">About</p></Link>
            </div>
        </div>
    </nav>
)}