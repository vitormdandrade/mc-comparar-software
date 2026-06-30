import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Comparador de SaaS - Encuentra la Mejor Herramienta para tu Empresa',
  description:
    'Compara los mejores SaaS y herramientas para empresas. CRM, ERP, Gestión de Proyectos, E-commerce y más. Guía completa con análisis, precios y comparaciones.',
  keywords: [
    'SaaS',
    'herramientas SaaS',
    'CRM',
    'ERP',
    'gestión de proyectos',
    'comparador SaaS',
    'software empresarial',
    'comparar software',
  ],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://compararsoftware.com',
    siteName: 'Comparar Software',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://compararsoftware.com'),
  verification: {
    google: 'PkrxFNca71z16_WTlKpLhHk32lKLlsJXoGOKG3p9_YE',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Comparar Software',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://compararsoftware.com',
              description:
                'Compara los mejores SaaS y herramientas para empresas. CRM, ERP, Gestión de Proyectos, E-commerce y más. Análisis verificados, precios actualizados.',
              foundingDate: '2025',
              sameAs: [
                'https://oraculodomei.com.br',
                'https://calculaseguro.com.br',
              ],
            }),
          }}
        />
        <header className="border-b border-gray-200 sticky top-0 bg-white z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <img src="/logo.svg" alt="Comparar Software" className="h-8 w-auto" />
              </Link>
              <p className="text-xs text-gray-600">Comparador de Herramientas</p>
            </div>
            <nav className="hidden sm:flex gap-6 items-center">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                Inicio
              </Link>
              <Link href="/match" className="text-gray-700 hover:text-blue-600 transition">
                Match SaaS
              </Link>
              <Link href="/categorias" className="text-gray-700 hover:text-blue-600 transition">
                Categorías
              </Link>
              <Link href="/guias" className="text-gray-700 hover:text-blue-600 transition">
                Guías
              </Link>
              <Link href="/sobre" className="text-gray-700 hover:text-blue-600 transition">
                Metodología
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-gray-200 bg-gray-50 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Por qué confiar en nosotros</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Evaluamos herramientas en 5 criterios con pesos públicos.
                  Análisis editoriales verificados, revisados cada 3-6 meses.
                  Nunca aceptamos pagos para escribir reseñas.
                </p>
                <Link
                  href="/sobre"
                  className="text-sm text-blue-600 font-semibold hover:text-blue-800 transition"
                >
                  Ver metodología completa →
                </Link>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Categorías</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li><Link href="/categorias/crm" className="hover:text-blue-600 transition">CRM</Link></li>
                  <li><Link href="/categorias/project-management" className="hover:text-blue-600 transition">Gestión de Proyectos</Link></li>
                  <li><Link href="/categorias/ecommerce" className="hover:text-blue-600 transition">E-commerce</Link></li>
                  <li><Link href="/categorias/marketing" className="hover:text-blue-600 transition">Marketing</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Editorial</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li><Link href="/sobre" className="hover:text-blue-600 transition">Metodología</Link></li>
                  <li><Link href="/guias" className="hover:text-blue-600 transition">Guías por categoría</Link></li>
                  <li><Link href="/categorias" className="hover:text-blue-600 transition">Todas las herramientas</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Afiliados</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Este sitio contiene enlaces de afiliado. Ganamos comisiones cuando
                  contratas — sin costo adicional para ti. La comisión{' '}
                  <strong>no influye</strong> en nuestro ranking o veredicto.
                </p>
                <Link
                  href="/sobre"
                  className="text-sm text-blue-600 font-semibold hover:text-blue-800 transition mt-2 inline-block"
                >
                  Política editorial →
                </Link>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-8 text-sm text-gray-600">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 mb-4">
                <span className="font-semibold text-gray-700">
                  Recursos asociados:
                </span>
                <a
                  href="https://oraculodomei.com.br"
                  rel="noopener"
                  className="hover:text-blue-600"
                >
                  Oráculo do MEI (calculadoras)
                </a>
                <a
                  href="https://calculaseguro.com.br"
                  rel="noopener"
                  className="hover:text-blue-600"
                >
                  Calcula Seguro (simuladores)
                </a>
              </div>
              <p className="text-center">
                &copy; 2026 Comparar Software. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
