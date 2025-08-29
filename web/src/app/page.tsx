import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      {/*Header*/}
      <header className="w-full max-w-4xl fixed top-0 bg-white border-b border-gray-200 py-4 px-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-500">MiniMarket</div>
          <nav className="hidden md:flex space-x-6">
            <button className="text-gray-600 hover:text-blue-500 transition-colors">Inicio</button>
            <button className="text-gray-600 hover:text-blue-500 transition-colors">Explorar</button>
            <button className="text-gray-600 hover:text-blue-500 transition-colors">Notificaciones</button>
          </nav>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
            Iniciar sesión
          </button>
        </div>
      </header>
      {/*Main*/}
      <main className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Mini-Market</h1>
        <p className="text-lg text-gray-600 mb-8">Holaaa!!!! Bienvenido al Mini-Marketplace de prueba</p>
        
        <Link 
          href="/products"
          className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl"
        >
          <span>Ver Productos</span>
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </main>
      {/*Footer*/}
      <footer className="w-full max-w-4xl fixed bottom-0 bg-white border-t border-gray-200 py-4 px-6">
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <span>© 2025 MiniMarket</span>
          <span>•</span>
          <a href="#" className="hover:text-blue-500 transition-colors">Privacidad</a>
          <span>•</span>
          <a href="#" className="hover:text-blue-500 transition-colors">Términos</a>
        </div>
      </footer>
    </div>
  );
}