'use client';

import Link from 'next/link';
import { getAllCategories, getCategoryLabel, getToolsByCategory } from '@/lib/tools';

export default function CategoriasPage() {
  const categories = getAllCategories();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gray-50 py-12 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Todas las Categorías de SaaS
          </h1>
          <p className="text-gray-600">
            Navega por categoría y encuentra la herramienta ideal para tu empresa.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 max-w-6xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => {
            const tools = getToolsByCategory(category);
            return (
              <Link
                key={category}
                href={`/categorias/${category}`}
                className="block group"
              >
                <div className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition bg-white h-full">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {getCategoryLabel(category)}
                  </h2>
                  <p className="text-gray-600 text-sm mb-6">
                    {tools.length} herramienta{tools.length !== 1 ? 's' : ''} disponible{tools.length !== 1 ? 's' : ''}
                  </p>
                  <div className="text-blue-600 font-semibold group-hover:text-blue-800 transition">
                    Explorar →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-blue-50 py-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Cómo Usar Este Comparador?
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li>1. Selecciona una categoría que interese a tu empresa</li>
            <li>2. Mira las herramientas disponibles con valoraciones y precios</li>
            <li>3. Haz clic en una herramienta para ver detalles completos</li>
            <li>4. Usa las comparaciones lado a lado para tomar tu decisión</li>
            <li>5. Accede a través de los enlaces de afiliado para registrarte</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
