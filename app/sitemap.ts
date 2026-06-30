import { MetadataRoute } from 'next';
import { getAllTools, getAllCategories } from '@/lib/tools';
import { getAllGuides } from '@/data/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://compararsaas.com.br';

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/categorias`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guias`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Add guide pages (editorial depth articles)
  const guides = getAllGuides();
  guides.forEach((guide) => {
    routes.push({
      url: `${baseUrl}/guias/${guide.slug}`,
      lastModified: new Date(guide.updatedOn),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Add category pages
  const categories = getAllCategories();
  categories.forEach(categoria => {
    routes.push({
      url: `${baseUrl}/categorias/${categoria}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Add tool pages
  const tools = getAllTools();
  tools.forEach(tool => {
    routes.push({
      url: `${baseUrl}/ferramentas/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Add comparison pages
  tools.forEach((tool, i) => {
    for (let j = i + 1; j < Math.min(i + 4, tools.length); j++) {
      routes.push({
        url: `${baseUrl}/comparar/${tools[i].slug}-vs-${tools[j].slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  });

  return routes;
}
