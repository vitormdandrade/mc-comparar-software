import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTools, getToolBySlug, getCategoryLabel } from '@/lib/tools';
import { buildAffiliateUrl } from '@/config/affiliates';
import { getReviewBySlug } from '@/data/verified-reviews';
import { AffiliateCta } from '@/components/AffiliateCta';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map(tool => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Herramienta no encontrada',
    };
  }

  return {
    title: `${tool.name} - Análisis Completo, Precios y Funcionalidades | Comparar Software`,
    description: `Análisis detallado de ${tool.name}. Precios, funcionalidades, valoraciones, integraciones y todo lo que necesitas saber antes de elegir.`,
    keywords: [
      tool.name,
      `${tool.name} análisis`,
      `${tool.name} precio`,
      `${tool.name} review`,
      getCategoryLabel(tool.category),
    ],
    openGraph: {
      title: `${tool.name} - Análisis y Comparación`,
      description: tool.description,
    },
    alternates: { canonical: `/ferramentas/${slug}` },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Herramienta no encontrada</h1>
        <Link href="/categorias" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          Volver a Categorías
        </Link>
      </div>
    );
  }

  const affiliateUrl = buildAffiliateUrl(tool.website_url, tool.slug);
  const review = getReviewBySlug(tool.slug);

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="text-sm text-gray-600">
            <Link href="/categorias" className="hover:text-blue-600">
              Categorías
            </Link>
            {' / '}
            <Link href={`/categorias/${tool.category}`} className="hover:text-blue-600">
              {getCategoryLabel(tool.category)}
            </Link>
            {' / '}
            <span className="text-gray-900 font-semibold">{tool.name}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{tool.name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-lg text-blue-100">{getCategoryLabel(tool.category)}</p>
                {review && (
                  <span className="inline-flex items-center gap-1.5 bg-green-500/20 border border-green-300 text-green-50 px-3 py-1 rounded-full text-sm font-semibold">
                    ✓ Verificado por nuestro equipo
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-yellow-300 mb-2">★ {tool.rating.toFixed(1)}</div>
              <div className="text-blue-100">Valoración</div>
            </div>
          </div>
          <p className="text-lg text-blue-100 mb-8">{tool.description}</p>
          <AffiliateCta
            href={affiliateUrl}
            partner={slug}
            page="ferramentas"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-block"
          >
            Visitar Website →
          </AffiliateCta>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-6xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Editor Review (only when verified) */}
            {review && (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4 gap-4 flex-wrap">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2">
                      ✓ ANÁLISIS VERIFICADO POR NUESTRO EQUIPO
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Análisis: {tool.name}
                    </h2>
                  </div>
                  <div className="text-right text-xs text-gray-600">
                    <p>Última revisión editorial:</p>
                    <p className="font-semibold">{new Date(review.reviewedOn).toLocaleDateString('es')}</p>
                  </div>
                </div>
                <p className="text-gray-800 leading-relaxed mb-4">{review.review}</p>
                <div className="bg-white border border-green-200 rounded p-4 text-sm">
                  <p className="mb-2">
                    <strong className="text-green-800">Ideal para:</strong>{' '}
                    <span className="text-gray-700">{review.bestFor}</span>
                  </p>
                  {review.watchOut && (
                    <p>
                      <strong className="text-amber-700">⚠ Punto de atención:</strong>{' '}
                      <span className="text-gray-700">{review.watchOut}</span>
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Este análisis sigue la{' '}
                  <Link href="/sobre" className="text-green-700 underline hover:text-green-900">
                    nuestra metodología editorial
                  </Link>
                  . No recibimos pago del fabricante por esta reseña — solo comisiones de afiliado estándar por clics.
                </p>
              </div>
            )}

            {/* Overview */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Visión General</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Ideal Para:</h3>
                  <p className="text-gray-600">{tool.best_for}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Modelo de Precio:</h3>
                  <p className="text-gray-600 capitalize">
                    {tool.pricing_model === 'free' ? 'Gratuito' : tool.pricing_model === 'freemium' ? 'Freemium' : 'Pago'}
                  </p>
                </div>
                {tool.free_trial && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Período de Prueba:</h3>
                    <p className="text-green-600">Prueba gratuita disponible</p>
                  </div>
                )}
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Funcionalidades Principales</h2>
              <ul className="space-y-3">
                {tool.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-lg flex-shrink-0">✓</span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Integrations */}
            {tool.integrations.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Integraciones</h2>
                <div className="flex flex-wrap gap-2">
                  {tool.integrations.map(integration => (
                    <span
                      key={integration}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Precio</h3>
              {tool.pricing_model === 'free' && (
                <div>
                  <div className="text-4xl font-bold text-green-600 mb-2">Gratuito</div>
                  <p className="text-gray-600 text-sm">Sin costo de uso</p>
                </div>
              )}
              {tool.pricing_model === 'freemium' && (
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">Freemium</div>
                  <p className="text-gray-600 text-sm">Comienza gratis, planes pagos disponibles</p>
                </div>
              )}
              {tool.pricing_model === 'paid' && tool.starting_price_brl && (
                <div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {tool.starting_price_brl}
                  </div>
                  <p className="text-gray-600 text-sm">Precio inicial (por mes)</p>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 text-white text-center px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-4"
              >
                Iniciar Prueba Gratuita
              </a>
              <a
                href={tool.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full border border-blue-600 text-blue-600 text-center px-4 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Visitar Website
              </a>
            </div>

            {/* Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Información</h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>Categoría:</strong> {getCategoryLabel(tool.category)}
                </p>
                <p>
                  <strong>Valoración:</strong> {tool.rating.toFixed(1)}/5
                </p>
                <p>
                  <strong>Prueba Gratuita:</strong> {tool.free_trial ? 'Sí' : 'No'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: tool.name,
            description: tool.description,
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://compararsoftware.com'}/ferramentas/${tool.slug}`,
            category: getCategoryLabel(tool.category),
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: tool.rating.toString(),
              bestRating: '5',
              worstRating: '1',
            },
            offers: {
              '@type': 'Offer',
              url: tool.website_url,
              ...(tool.starting_price_brl && { price: tool.starting_price_brl.toString() }),
            },
          }),
        }}
      />
    </div>
  );
}
