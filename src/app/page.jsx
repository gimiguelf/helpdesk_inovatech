
import Link from 'next/link';
export default function Home(){
  return (
    <div>
      <header className="header">
        <h1>SGM - Help Desk (InovaTech)</h1>
        <nav>
          <Link href="/login">Login</Link>
        </nav>
      </header>
      <section className="card">
        <h2>Sobre o projeto</h2>
        <p>Este MVP oferece abertura de tickets, dashboards por perfil e controle de acesso.</p>
      </section>
    </div>
  )
}
