'use client';

import Link from 'next/link';
import { getAllCategories, getCategoryLabel, getTopTools } from '@/lib/tools';
import { isVerified, getReviewBySlug } from '@/data/verified-reviews';
import { methodology } from '@/data/methodology';
import { getAllGuides } from '@/data/guides';

export default function Home() {
  const categories = getAllCategories();
  const featuredGuides = getAllGuides().slice(0, 5);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Comparador de Software SaaS
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-6">
            Encuentra la mejor herramienta para tu empresa. Compara precios,
            funcionalidades y evaluaciones de los mejores SaaS para
            empresas de habla hispana.
          </p>
          <div className="flex gap-3 justify-center flex-wrap mb-8 text-sm">
            <span className="bg-white/15 border border-white/30 text-white px-3 py-1.5 rounded-full font-semibold">
              ✓ Metodología pública
            </span>
            <span className="bg-white/15 border border-white/30 text-white px-3 py-1.5 rounded-full font-semibold">
              ✓ Análisis editoriales verificados
            </span>
            <span className="bg-white/15 border border-white/30 text-white px-3 py-1.5 rounded-full font-semibold">
              ✓ Precios claros y actualizados
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categorias"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-block"
            >
              Explorar Todas las Categorías
            </Link>
            <Link
              href="/sobre"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition inline-block"
            >
              Nuestra Metodología
            </Link>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
              Cómo evaluamos
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestra Metodología
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Evaluamos cada herramienta en 5 criterios, con pesos públicos. La
              nota final es ponderada — no es una estrella aleatoria. Toda herramienta con el
              sello <strong className="text-green-700">✓ Verificado</strong>{' '}
              pasó por un análisis editorial humano siguiendo estos mismos
              criterios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {methodology.map((pillar) => (
              <div
                key={pillar.key}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
              >
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {pillar.weight}%
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2 leading-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {pillar.summary}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/sobre"
              className="text-blue-600 font-semibold hover:text-blue-800 transition"
            >
              Ver metodología completa y por qué confiar en nosotros →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 w-full">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          Categorías Populares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const topTools = getTopTools(category, 3);
            return (
              <div
                key={category}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  <Link
                    href={`/categorias/${category}`}
                    className="hover:text-blue-600 transition"
                  >
                    {getCategoryLabel(category)}
                  </Link>
                </h3>
                <ul className="space-y-2 mb-6">
                  {topTools.map((tool) => (
                    <li key={tool.slug} className="flex items-center gap-2">
                      <Link
                        href={`/ferramentas/${tool.slug}`}
                        className="text-gray-600 hover:text-blue-600 text-sm transition"
                      >
                        {tool.name}
                      </Link>
                      {isVerified(tool.slug) && (
                        <span
                          title="Análisis verificado por nuestro equipo"
                          className="text-green-600 text-xs font-bold"
                        >
                          ✓
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/categorias/${category}`}
                  className="inline-block text-blue-600 font-semibold hover:text-blue-800 transition"
                >
                  Ver Todos →
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Depth Guides Section */}
      <section className="bg-blue-50 py-16 border-t border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
              Guías Editoriales
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Guías por Categoría
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Análisis profundos en categorías que la competencia ignora.
              Cada guía es escrita manualmente, sin contenido generado por IA.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guias/${guide.slug}`}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition block"
              >
                <div className="text-xs font-semibold text-blue-600 uppercase mb-2">
                  {getCategoryLabel(guide.category)}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{guide.subtitle}</p>
                <span className="text-sm text-blue-600 font-semibold">
                  Leer guía completa →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured (Verified) Tools Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Herramientas Verificadas por Nuestro Equipo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estas herramientas fueron probadas y analizadas por nuestro equipo
              editorial, no solo listadas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getTopTools(undefined, 12)
              .filter((t) => isVerified(t.slug))
              .slice(0, 6)
              .map((tool) => {
                const review = getReviewBySlug(tool.slug);
                return (
                  <div
                    key={tool.slug}
                    className="bg-white border-2 border-green-200 rounded-lg p-6 hover:shadow-lg transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        {tool.name}
                      </h3>
                      <div className="text-2xl font-bold text-yellow-400">
                        ★ {tool.rating.toFixed(1)}
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded mb-3">
                      ✓ VERIFICADO
                    </div>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {review?.summary || tool.description}
                    </p>
                    <div className="mb-4">
                      {tool.pricing_model === 'free' && (
                        <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded">
                          Gratuito
                        </span>
                      )}
                      {tool.pricing_model === 'freemium' && (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded">
                          Freemium
                        </span>
                      )}
                      {tool.pricing_model === 'paid' && tool.starting_price_brl && (
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded">
                          Desde {tool.starting_price_brl}/mes
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/ferramentas/${tool.slug}`}
                      className="text-blue-600 font-semibold hover:text-blue-800 transition text-sm"
                    >
                      Leer análisis completo →
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Guías y comparativas en tu email
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Un resumen quincenal con nuevos análisis, cambios de precio y
            alertas sobre herramientas — sin spam, sin enlaces
            de afiliado en el cuerpo del email.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Tu email"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition whitespace-nowrap"
              disabled
              title="Inscripciones próximamente"
            >
              Suscribirse (próximamente)
            </button>
          </form>
          <p className="text-xs text-blue-200 mt-4">
            Inscripciones próximamente — estamos preparando el primer envío.
          </p>
        </div>
      </section>

      {/* Match SaaS CTA */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold mb-4">
            Encuentra el SaaS Perfecto en 2 Minutos
          </h2>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Responde 5 preguntas rápidas y recibe un análisis personalizado con las 3 mejores
            herramientas para tu empresa. Gratuito y sin compromiso.
          </p>
          <Link
            href="/match"
            className="inline-block bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition"
          >
            Hacer Análisis Personalizado →
          </Link>
          <p className="text-sm text-emerald-200 mt-4">
            Más de 15 herramientas analizadas • Resultado instantáneo
          </p>
        </div>
      </section>

      {/* Explore All CTA */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿No encontraste lo que buscas?
          </h2>
          <p className="text-gray-600 mb-6">
            Explora todas las herramientas en nuestras categorías — compara lado a
            lado con una única URL.
          </p>
          <Link
            href="/categorias"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
          >
            Explorar Todas las Herramientas
          </Link>
        </div>
      </section>
    </div>
  );
}
