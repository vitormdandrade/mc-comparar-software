import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides } from '@/data/guides';
import { getCategoryLabel } from '@/lib/tools';

export const metadata: Metadata = {
  title: 'Guías por Categoría | Comparar Software',
  description:
    'Guías editoriales detalladas sobre herramientas SaaS para empresas. RH, e-commerce, ERP, helpdesk, contabilidad — cada guía rankea las mejores opciones con criterios públicos.',
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-block bg-white/15 border border-white/30 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-4">
            Editorial
          </div>
          <h1 className="text-4xl font-bold mb-4">Guías por Categoría</h1>
          <p className="text-lg text-blue-100 max-w-3xl">
            Análisis detallados en las categorías que la competencia ignora.
            Cada guía es escrita manualmente por nuestro equipo editorial, sigue nuestra{' '}
            <Link href="/sobre" className="underline hover:text-white">
              metodología pública
            </Link>
            , y es revisada cada 3-6 meses.
          </p>
        </div>
      </section>

      {/* Guides List */}
      <section className="py-16 max-w-6xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guias/${guide.slug}`}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-400 hover:shadow-lg transition block"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-wide">
                  {getCategoryLabel(guide.category)}
                </span>
                <span className="text-xs text-gray-500">
                  Actualizado en{' '}
                  {new Date(guide.updatedOn).toLocaleDateString('es')}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
                {guide.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {guide.subtitle}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {guide.picks.length} herramientas evaluadas
                </span>
                <span className="text-sm text-blue-600 font-semibold">
                  Leer guía →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust note */}
        <div className="mt-12 bg-green-50 border-l-4 border-green-600 rounded-r-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Cómo escribimos estas guías
          </h3>
          <p className="text-gray-700 leading-relaxed text-sm">
            Cada guía es escrita por un editor humano que evaluó las
            herramientas siguiendo nuestros 5 criterios (funcionalidades, precio,
            soporte, integraciones, valoraciones). No usamos contenido generado
            por IA. Nuestros picks recomendados no son pagos — siempre
            elegimos la herramienta que creemos es la mejor, incluso
            cuando la comisión de afiliado es baja o nula.{' '}
            <Link
              href="/sobre"
              className="text-green-700 font-semibold underline hover:text-green-900"
            >
              Lee nuestra metodología completa.
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
