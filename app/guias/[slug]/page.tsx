import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllGuides, getGuideBySlug } from '@/data/guides';
import { getCategoryLabel, getToolBySlug } from '@/lib/tools';
import { isVerified } from '@/data/verified-reviews';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    return { title: 'Guía no encontrada' };
  }
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    openGraph: {
      title: guide.title,
      description: guide.subtitle,
      type: 'article',
    },
    alternates: { canonical: `/guias/${slug}` },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Inicio
            </Link>
            {' / '}
            <Link href="/guias" className="hover:text-blue-600">
              Guías
            </Link>
            {' / '}
            <span className="text-gray-900 font-semibold">{guide.title}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <span className="inline-block bg-white/15 border border-white/30 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
              Guía Editorial
            </span>
            <span className="inline-block bg-white/15 border border-white/30 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
              {getCategoryLabel(guide.category)}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {guide.title}
          </h1>
          <p className="text-lg text-blue-100 max-w-3xl">{guide.subtitle}</p>
          <p className="text-sm text-blue-200 mt-6">
            Última actualización:{' '}
            {new Date(guide.updatedOn).toLocaleDateString('es')} ·{' '}
            {guide.picks.length} herramientas evaluadas
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 w-full">
        {/* Intro */}
        <div className="prose prose-lg max-w-none mb-12">
          {guide.intro.map((paragraph, i) => (
            <p
              key={i}
              className="text-gray-700 leading-relaxed mb-4 text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Criteria Box */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Criterios de este análisis
          </h2>
          <p className="text-gray-700 leading-relaxed">{guide.criteria}</p>
          <p className="text-sm text-blue-700 mt-3">
            <Link href="/sobre" className="font-semibold underline hover:text-blue-900">
              Ve nuestra metodología completa →
            </Link>
          </p>
        </div>

        {/* Picks */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Nuestras recomendaciones
          </h2>
          <div className="space-y-6">
            {guide.picks.map((pick, i) => {
              const tool = getToolBySlug(pick.slug);
              const verified = isVerified(pick.slug);
              return (
                <div
                  key={pick.slug}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition"
                >
                  <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl font-bold text-blue-600">
                        #{i + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {tool ? tool.name : pick.slug}
                        </h3>
                        <p className="text-sm text-blue-700 font-semibold">
                          {pick.verdict}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {verified && (
                        <span className="inline-flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                          ✓ VERIFICADO
                        </span>
                      )}
                      {tool && (
                        <div className="text-xl font-bold text-yellow-500">
                          ★ {tool.rating.toFixed(1)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                        Ideal para
                      </p>
                      <p className="text-sm text-gray-700">{pick.bestFor}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                        Precio
                      </p>
                      <p className="text-sm text-gray-700">{pick.price}</p>
                    </div>
                  </div>
                  {tool && (
                    <Link
                      href={`/ferramentas/${pick.slug}`}
                      className="inline-block text-blue-600 font-semibold hover:text-blue-800 transition text-sm"
                    >
                      Ver análisis completo de {tool.name} →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* When to Choose */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Cuál elegir para cada escenario
          </h2>
          <div className="space-y-4">
            {guide.whenToChoose.map((scenario, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-lg p-5"
              >
                <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                  <p className="font-bold text-gray-900">
                    {scenario.scenario}
                  </p>
                  <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    → {scenario.pick}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {scenario.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Conclusión</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {guide.conclusion}
          </p>
        </div>

        {/* Trust footer */}
        <div className="bg-green-50 border-l-4 border-green-600 rounded-r-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Sobre esta guía
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Escrita y mantenida por el equipo editorial de Comparar Software siguiendo nuestra{' '}
            <Link href="/sobre" className="text-green-700 font-semibold underline hover:text-green-900">
              metodología pública de 5 criterios
            </Link>
            . No recibimos pagos de los fabricantes por este contenido —
            solo comisiones de afiliado estándar cuando haces clic y contratas
            una herramienta. La comisión no influye en el ranking.
          </p>
        </div>

        {/* CTA Back to Guides */}
        <div className="mt-12 text-center">
          <Link
            href="/guias"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            ← Ver todas las guías
          </Link>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: guide.title,
            description: guide.metaDescription,
            datePublished: guide.updatedOn,
            dateModified: guide.updatedOn,
            author: {
              '@type': 'Organization',
              name: 'Comparar Software',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Comparar Software',
            },
          }),
        }}
      />
    </div>
  );
}
