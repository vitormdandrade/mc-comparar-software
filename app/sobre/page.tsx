import type { Metadata } from 'next';
import Link from 'next/link';
import { methodology, totalWeight } from '@/data/methodology';
import { verifiedReviews } from '@/data/verified-reviews';

export const metadata: Metadata = {
  title: 'Sobre & Metodología | Comparar Software',
  description:
    'Cómo evaluamos herramientas SaaS para empresas: 5 criterios con pesos públicos, análisis editoriales verificados y política de transparencia sobre enlaces de afiliado.',
  alternates: { canonical: '/sobre' },
};

export default function SobrePage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Sobre & Metodología</h1>
          <p className="text-lg text-blue-100">
            Cómo evaluamos las herramientas, por qué puedes confiar en lo que
            lees, y cómo ganamos dinero sin comprometer el análisis.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 w-full space-y-12">
        {/* Trust blurb */}
        <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Por qué confiar en nosotros
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Nuestro contenido es escrito por profesionales que
            trabajan con tecnología y operación de empresas.
            Analizamos las herramientas desde la perspectiva de quien las usaría realmente — no
            a partir del comunicado de prensa del fabricante. Cuando no tenemos
            experiencia directa con un producto, lo decimos. Cuando consideramos una
            herramienta inferior, también lo decimos, incluso cuando nos paga
            comisión de afiliado.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Nuestros análisis verificados (marcados con{' '}
            <span className="text-green-700 font-bold">✓ Verificado</span>) son
            revisados editorialmente cada 3-6 meses y llevan la fecha de la
            última revisión. Nunca publicamos reseñas patrocinadas y nunca
            cobramos a los fabricantes por aparecer en el sitio.
          </p>
        </div>

        {/* 5 pillars detail */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestros 5 criterios de evaluación
          </h2>
          <p className="text-gray-600 mb-8">
            La nota de cada herramienta se calcula a partir de estos 5 pilares,
            con pesos públicos (sumando {totalWeight}%). La mayor parte del peso
            recae en funcionalidades, precio y soporte, porque son los ejes donde los
            usuarios más sufren en la práctica.
          </p>
          <div className="space-y-6">
            {methodology.map((pillar, i) => (
              <div
                key={pillar.key}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-3 gap-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {i + 1}. {pillar.title}
                  </h3>
                  <div className="text-3xl font-bold text-blue-600 flex-shrink-0">
                    {pillar.weight}%
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Verified tools */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Análisis verificados
          </h2>
          <p className="text-gray-600 mb-6">
            Estas son las herramientas que pasaron por análisis editorial humano
            completo. Cada una tiene una fecha de última revisión y un veredicto
            explícito de nuestro equipo.
          </p>
          <ul className="space-y-2">
            {verifiedReviews.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/ferramentas/${r.slug}`}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded p-4 hover:border-green-400 hover:shadow-sm transition"
                >
                  <div>
                    <span className="font-semibold text-gray-900">
                      {r.slug
                        .split('-')
                        .map((w) => w[0].toUpperCase() + w.slice(1))
                        .join(' ')}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      — {r.summary}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                    {new Date(r.reviewedOn).toLocaleDateString('es')}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Affiliate disclosure */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cómo ganamos dinero
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Este sitio contiene enlaces de afiliado: cuando haces clic en un enlace y
            eventualmente contratas la herramienta, recibimos una comisión del
            fabricante. Este es el único modelo de ingresos que tenemos — no
            vendemos publicidad display, no hacemos patrocinios editoriales,
            y no publicamos posts patrocinados disfrazados de análisis.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            La comisión <strong>no influye</strong> en el ranking o el
            veredicto. Varios de nuestros picks recomendados son herramientas
            con comisión baja o nula, mientras que herramientas con comisión alta
            aparecen con reservas o en último lugar cuando corresponde. Si nos
            preguntan "¿cuál es la mejor para mi caso?", damos la respuesta
            que creemos correcta, no la que paga más.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Si quieres apoyar el sitio, usar nuestros enlaces de afiliado ayuda y
            sale igual para ti — el precio no cambia. Si prefieres no
            usarlos, no hay problema: el contenido editorial está siempre disponible
            gratuitamente.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            ¿Encontraste un error o quieres contribuir?
          </h3>
          <p className="text-gray-700 mb-4">
            Si notaste información desactualizada, precio incorrecto, o quieres
            sugerir una herramienta que deberíamos cubrir, avísanos.
            Tomamos las correcciones en serio.
          </p>
          <Link
            href="/categorias"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Explorar categorías
          </Link>
        </div>
      </section>
    </div>
  );
}
