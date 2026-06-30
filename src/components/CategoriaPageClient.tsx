'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Tool } from '@/lib/tools';
import {
  getAllCategories,
  getCategoryLabel,
  getToolsByCategory,
  getComparisonPairs,
} from '@/lib/tools';
import { buildAffiliateUrl } from '@/config/affiliates';

type SortMode = 'default' | 'rating' | 'price';
type RatingFilter = 'all' | '4.5' | '4.0' | '3.5';

function sortTools(tools: Tool[], mode: SortMode): Tool[] {
  const sorted = [...tools];
  switch (mode) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'price':
      return sorted.sort((a, b) => (a.starting_price_brl ?? 99999) - (b.starting_price_brl ?? 99999));
    default:
      return tools;
  }
}

function filterToolsByRating(tools: Tool[], filter: RatingFilter): Tool[] {
  if (filter === 'all') return tools;
  const min = parseFloat(filter);
  return tools.filter((t) => t.rating >= min);
}

export default function CategoriaPageClient({
  categoria,
  label,
  tools: initialTools,
  comparisonPairs,
}: {
  categoria: string;
  label: string;
  tools: Tool[];
  comparisonPairs: [Tool, Tool][];
}) {
  const [sortMode, setSortMode] = useState<SortMode>('default');
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('all');
  const filtered = useMemo(() => filterToolsByRating(initialTools, ratingFilter), [initialTools, ratingFilter]);
  const sortedTools = useMemo(() => sortTools(filtered, sortMode), [filtered, sortMode]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/categorias" className="text-blue-100 hover:text-white mb-4 inline-block">
            ← Volver a Categorías
          </Link>
          <h1 className="text-4xl font-bold mb-4">
            Mejores {label} para Empresas
          </h1>
          <p className="text-lg text-blue-100">
            Compara {filtered.length} de {initialTools.length} herramientas de {label.toLowerCase()} con análisis, precios y funcionalidades.
          </p>
        </div>
      </section>

      {/* Tools Grid with Sort and Filter */}
      <section className="py-16 max-w-6xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Herramientas Disponibles</h2>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-gray-500">Filtrar:</span>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value as RatingFilter)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium bg-white hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            >
              <option value="all">Todas las notas</option>
              <option value="4.5">⭐ 4.5+</option>
              <option value="4.0">⭐ 4.0+</option>
              <option value="3.5">⭐ 3.5+</option>
            </select>
            <span className="text-sm text-gray-500">Ordenar:</span>
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium bg-white hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            >
              <option value="default">Por defecto</option>
              <option value="rating">⭐ Más Valorados</option>
              <option value="price">💰 Más Baratos</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTools.map(tool => (
            <div
              key={tool.slug}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition bg-white"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{tool.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {tool.rating >= 4.5 && (
                      <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-300">
                        🔥 Más Popular
                      </span>
                    )}
                    {tool.rating >= 4.0 && tool.rating < 4.5 && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-300">
                        ⭐ Bien Valorado
                      </span>
                    )}
                    {tool.rating >= 4.3 && tool.free_trial && (
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-purple-300">
                        🏆 Más Visitados
                      </span>
                    )}
                    {tool.free_trial && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-300">
                        ✓ Prueba Gratis
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-2xl font-bold text-yellow-400">★ {tool.rating.toFixed(1)}</div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{tool.description}</p>

              <div className="mb-4 space-y-2">
                {tool.pricing_model === 'free' && (
                  <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded">
                    Gratuito
                  </div>
                )}
                {tool.pricing_model === 'freemium' && (
                  <div className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded">
                    Freemium
                  </div>
                )}
                {tool.pricing_model === 'paid' && tool.starting_price_brl && (
                  <div className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded">
                    Desde {tool.starting_price_brl}/mes
                  </div>
                )}
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-600 font-semibold mb-2">Funcionalidades principales:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {tool.highlights.slice(0, 2).map((highlight, i) => (
                    <li key={i}>• {highlight}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Link
                  href={`/ferramentas/${tool.slug}`}
                  className="flex-1 text-center text-blue-600 font-semibold hover:text-blue-800 transition py-2"
                >
                  Ver Detalles
                </Link>
                <a
                  href={buildAffiliateUrl(tool.website_url, tool.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition py-2"
                >
                  Visitar
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      {comparisonPairs.length > 0 && (
        <section className="py-16 max-w-6xl mx-auto px-4 w-full bg-gray-50 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Comparaciones Populares</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisonPairs.map((pair, i) => (
              <Link
                key={i}
                href={`/comparar/${pair[0].slug}-vs-${pair[1].slug}`}
                className="block group"
              >
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition bg-white h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-semibold text-gray-900">{pair[0].name}</div>
                    <div className="text-gray-400">vs</div>
                    <div className="font-semibold text-gray-900">{pair[1].name}</div>
                  </div>
                  <div className="text-blue-600 font-semibold group-hover:text-blue-800 transition">
                    Comparar Detalles →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Match SaaS CTA */}
      <section className="py-16 max-w-6xl mx-auto px-4 w-full">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-lg p-8 text-center">
          <div className="text-3xl mb-3">🎯</div>
          <h2 className="text-2xl font-bold mb-3">
            ¿No sabes cuál elegir?
          </h2>
          <p className="text-emerald-100 mb-6 max-w-xl mx-auto">
            Usa nuestro matcher inteligente. Responde 5 preguntas y descubre las 3 mejores opciones para tu negocio.
          </p>
          <Link
            href="/match"
            className="inline-block bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition"
          >
            Encontrar Mi SaaS Ideal →
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 max-w-6xl mx-auto px-4 w-full">
        <div className="bg-blue-50 rounded-lg p-8 text-center border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Comienza tu prueba gratuita hoy
          </h2>
          <p className="text-gray-600 mb-6">
            Muchas herramientas ofrecen períodos de prueba. Elige una y pruébala sin compromiso.
          </p>
          <Link
            href="/categorias"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Explorar Otras Categorías
          </Link>
        </div>
      </section>
    </div>
  );
}
