import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 text-sm text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          &copy; {new Date().getFullYear()} MinhaApp. Todos os direitos
          reservados.
        </p>
        <Link
          href="/lgpd"
          className="hover:underline hover:text-primary transition-colors"
        >
          Política de Privacidade (LGPD)
        </Link>
      </div>
    </footer>
  );
}
