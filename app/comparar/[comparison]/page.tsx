import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTools, getToolBySlug, getCategoryLabel } from '@/lib/tools';
import { buildAffiliateUrl } from '@/config/affiliates';

type Props = {
  params: Promise<{ comparison: string }>;
};

// Featured hand-picked comparison pairs
export const FEATURED_COMPARISONS: string[] = [
  'monday-com-vs-trello',
  'hubspot-pt-vs-rd-station',
  'pipedrive-vs-hubspot-pt',
  'asana-vs-trello',
  'monday-com-vs-asana',
  'notion-vs-clickup',
  'zendesk-vs-freshdesk',
  'contaazul-vs-omie',
  'omie-vs-bling',
];

export async function generateStaticParams() {
  const tools = getAllTools();
  const toolSlugs = new Set(tools.map((t) => t.slug));
  const params: { comparison: string }[] = [];
  const seen = new Set<string>();

  // 1. Featured pairs first
  for (const slug of FEATURED_COMPARISONS) {
    const [a, b] = slug.split('-vs-');
    if (toolSlugs.has(a) && toolSlugs.has(b) && !seen.has(slug)) {
      seen.add(slug);
      params.push({ comparison: slug });
    }
  }

  // 2. Generate within-category comparisons
  const categories = [...new Set(tools.map((t) => t.category))];
  for (const category of categories) {
    const categoryTools = tools.filter((t) => t.category === category);
    for (let i = 0; i < categoryTools.length; i++) {
      for (let j = i + 1; j < categoryTools.length; j++) {
        const slug = `${categoryTools[i].slug}-vs-${categoryTools[j].slug}`;
        if (!seen.has(slug)) {
          seen.add(slug);
          params.push({ comparison: slug });
        }
      }
    }
  }

  // 3. Top cross-category pairs
  const topTools = [...tools].sort((a, b) => b.rating - a.rating).slice(0, 15);
  for (let i = 0; i < topTools.length; i++) {
    for (let j = i + 1; j < topTools.length; j++) {
      const slug = `${topTools[i].slug}-vs-${topTools[j].slug}`;
      if (!seen.has(slug)) {
        seen.add(slug);
        params.push({ comparison: slug });
      }
    }
  }

  return params.slice(0, 250);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { comparison } = await params;
  const [slug1, slug2] = comparison.split('-vs-');
  const tool1 = getToolBySlug(slug1);
  const tool2 = getToolBySlug(slug2);

  if (!tool1 || !tool2) {
    return { title: 'Comparación no encontrada' };
  }

  return {
    title: `${tool1.name} vs ${tool2.name} - Comparación Completa | Comparar Software`,
    description: `Compara ${tool1.name} y ${tool2.name} lado a lado. Ve diferencias de precio, funcionalidades, valoraciones y descubre cuál es mejor para ti.`,
    keywords: [
      `${tool1.name} vs ${tool2.name}`,
      `comparar ${tool1.name} ${tool2.name}`,
      'SaaS comparación',
    ],
    alternates: { canonical: `/comparar/${comparison}` },
  };
}

export default async function ComparacaoPage({ params }: Props) {
  const { comparison } = await params;
  const [slug1, slug2] = comparison.split('-vs-');
  const tool1 = getToolBySlug(slug1);
  const tool2 = getToolBySlug(slug2);

  if (!tool1 || !tool2) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Comparación no encontrada</h1>
        <Link href="/categorias" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          Volver a Categorías
        </Link>
      </div>
    );
  }

  const affiliateUrl1 = buildAffiliateUrl(tool1.website_url, tool1.slug);
  const affiliateUrl2 = buildAffiliateUrl(tool2.website_url, tool2.slug);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/categorias" className="text-blue-100 hover:text-white mb-4 inline-block">
            ← Volver a Categorías
          </Link>
          <h1 className="text-4xl font-bold mb-4">
            {tool1.name} vs {tool2.name}
          </h1>
          <p className="text-lg text-blue-100">
            Comparación detallada entre dos herramientas populares de {getCategoryLabel(tool1.category)}.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 max-w-6xl mx-auto px-4 w-full">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <tbody>
              {/* Tools Header */}
              <tr className="border-b border-gray-200">
                <td className="px-6 py-4 font-semibold text-gray-900 w-1/3"></td>
                <td className="px-6 py-4 font-semibold text-center text-gray-900">
                  <div className="text-xl font-bold">{tool1.name}</div>
                  <div className="text-yellow-400">★ {tool1.rating.toFixed(1)}</div>
                </td>
                <td className="px-6 py-4 font-semibold text-center text-gray-900 bg-blue-50">
                  <div className="text-xl font-bold">{tool2.name}</div>
                  <div className="text-yellow-400">★ {tool2.rating.toFixed(1)}</div>
                </td>
              </tr>

              {/* Pricing */}
              <tr className="border-b border-gray-200">
                <td className="px-6 py-4 font-semibold text-gray-900">Modelo de Precio</td>
                <td className="px-6 py-4 text-center text-gray-600">
                  <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm font-semibold">
                    {tool1.pricing_model === 'free' && 'Gratuito'}
                    {tool1.pricing_model === 'freemium' && 'Freemium'}
                    {tool1.pricing_model === 'paid' && 'Pago'}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-gray-600 bg-blue-50">
                  <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm font-semibold">
                    {tool2.pricing_model === 'free' && 'Gratuito'}
                    {tool2.pricing_model === 'freemium' && 'Freemium'}
                    {tool2.pricing_model === 'paid' && 'Pago'}
                  </span>
                </td>
              </tr>

              {/* Starting Price */}
              <tr className="border-b border-gray-200">
                <td className="px-6 py-4 font-semibold text-gray-900">Precio Inicial</td>
                <td className="px-6 py-4 text-center text-gray-600">
                  {tool1.starting_price_brl ? `${tool1.starting_price_brl}/mes` : 'Gratuito'}
                </td>
                <td className="px-6 py-4 text-center text-gray-600 bg-blue-50">
                  {tool2.starting_price_brl ? `${tool2.starting_price_brl}/mes` : 'Gratuito'}
                </td>
              </tr>

              {/* Free Trial */}
              <tr className="border-b border-gray-200">
                <td className="px-6 py-4 font-semibold text-gray-900">Prueba Gratuita</td>
                <td className="px-6 py-4 text-center text-gray-600">
                  {tool1.free_trial ? (
                    <span className="text-green-600 font-semibold">✓ Sí</span>
                  ) : (
                    <span className="text-red-600 font-semibold">✗ No</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center text-gray-600 bg-blue-50">
                  {tool2.free_trial ? (
                    <span className="text-green-600 font-semibold">✓ Sí</span>
                  ) : (
                    <span className="text-red-600 font-semibold">✗ No</span>
                  )}
                </td>
              </tr>

              {/* Features */}
              <tr className="border-b border-gray-200">
                <td className="px-6 py-4 font-semibold text-gray-900">Funcionalidades Principales</td>
                <td className="px-6 py-4 text-gray-600">
                  <ul className="space-y-2 text-sm text-left">
                    {tool1.highlights.map((h, i) => (
                      <li key={i}>• {h}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 text-gray-600 bg-blue-50">
                  <ul className="space-y-2 text-sm text-left">
                    {tool2.highlights.map((h, i) => (
                      <li key={i}>• {h}</li>
                    ))}
                  </ul>
                </td>
              </tr>

              {/* Best For */}
              <tr className="border-b border-gray-200">
                <td className="px-6 py-4 font-semibold text-gray-900">Ideal Para</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{tool1.best_for}</td>
                <td className="px-6 py-4 text-gray-600 text-sm bg-blue-50">{tool2.best_for}</td>
              </tr>

              {/* CTA */}
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">Acción</td>
                <td className="px-6 py-4 text-center">
                  <a
                    href={affiliateUrl1}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition text-sm"
                  >
                    Visitar →
                  </a>
                </td>
                <td className="px-6 py-4 text-center bg-blue-50">
                  <a
                    href={affiliateUrl2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition text-sm"
                  >
                    Visitar →
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Analysis Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 w-full bg-gray-50 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Análisis Comparativo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ventajas de {tool1.name}</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <span className="text-gray-700">
                  {tool1.pricing_model === 'freemium' || tool1.pricing_model === 'free'
                    ? 'Opción gratuita disponible'
                    : 'Precio competitivo'}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <span className="text-gray-700">
                  Valoración: {tool1.rating.toFixed(1)} estrellas
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <span className="text-gray-700">
                  {tool1.integrations.length > tool2.integrations.length
                    ? 'Más integraciones disponibles'
                    : 'Integraciones bien estructuradas'}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ventajas de {tool2.name}</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <span className="text-gray-700">
                  {tool2.pricing_model === 'freemium' || tool2.pricing_model === 'free'
                    ? 'Opción gratuita disponible'
                    : 'Precio competitivo'}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <span className="text-gray-700">
                  Valoración: {tool2.rating.toFixed(1)} estrellas
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <span className="text-gray-700">
                  {tool2.integrations.length > tool1.integrations.length
                    ? 'Más integraciones disponibles'
                    : 'Integraciones bien estructuradas'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 w-full">
        <div className="bg-blue-50 rounded-lg p-8 text-center border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Cuál es la mejor opción?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            La mejor herramienta depende de tus necesidades específicas. Ambas opciones tienen pruebas
            gratuitas disponibles — ¡pruébalas antes de decidir!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={affiliateUrl1}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Probar {tool1.name}
            </a>
            <a
              href={affiliateUrl2}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Probar {tool2.name}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
