import Link from "next/link";
import { redirect } from "next/navigation";

export default function LayoutEventos({ children }) {

  const logado = true;

  if (!logado) {
    redirect("/");
  }

  return (
    <>
      <div className="flex">
        <nav className="w-[180px] h-screen bg-zinc-600 flex flex-col gap-2 items-center">
          <Link href={"/eventos"}>
            Eventos
          </Link>


          <Link href={"/contatos"}>
            Contatos
          </Link>
        </nav>
        <main className="w-full p-6">
        {children}
        </main>
      </div>
    </>
  )
}