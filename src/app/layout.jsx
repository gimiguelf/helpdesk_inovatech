
import './globals.scss';
export const metadata = { title: 'SGM - Help Desk' };
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <main className="app-shell">
          {children}
        </main>
      </body>
    </html>
  )
}
