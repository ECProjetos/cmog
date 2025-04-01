import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-8 p-24">
      <h1 className="text-4xl font-bold">Home Page CMOG</h1>
      <p className="mt-4 text-lg">Isso Virara uma home Page em breve</p>
      <div className="flex felx-col items-center space-x-4">
        <Link
          href="/login"
          className="mt-4 text-2xl text-blue-500 hover:underline"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="mt-4 text-2xl text-blue-500 hover:underline"
        >
          Cadastro
        </Link>
      </div>
    </main>
  );
}
