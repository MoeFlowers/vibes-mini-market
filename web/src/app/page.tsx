import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Mini-Market</h1>
      <p>Bienvenido al mini-marketplace de prueba</p>
      <Link href="/products" style={{
        display: 'inline-block',
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#0070f3',
        color: 'white',
        borderRadius: '4px',
        textDecoration: 'none'
      }}>
        Ver Productos
      </Link>
    </div>
  );
}