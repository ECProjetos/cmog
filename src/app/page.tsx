import { Footer } from "@/components/footer";
import { Navbar } from "@/components/nav-bar";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center space-y-8 p-24">
        <h1 className="text-4xl font-bold">Home Page CMOG</h1>
        <p className="mt-4 text-lg">Isso Virara uma home Page em breve</p>
        <div className="flex felx-col items-center space-x-4">
          <Link
            href="/login"
            className={buttonVariants({
              variant: "default",
              size: "lg",
            })}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={buttonVariants({
              variant: "default",
              size: "lg",
            })}
          >
            Cadastro
          </Link>
          <Link
            href="/busca"
            className={buttonVariants({
              variant: "default",
              size: "lg",
            })}
          >
            Dashboard
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
