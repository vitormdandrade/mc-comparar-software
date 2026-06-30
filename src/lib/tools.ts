import toolsData from '@/data/tools.json';

export interface Tool {
  slug: string;
  name: string;
  category: string;
  description: string;
  pricing_model: 'free' | 'freemium' | 'paid';
  starting_price_brl: number | null;
  free_trial: boolean;
  highlights: string[];
  best_for: string;
  affiliate_url: string;
  website_url: string;
  rating: number;
  integrations: string[];
}

export function getAllTools(): Tool[] {
  return (toolsData.tools as Tool[]);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return (toolsData.tools as Tool[]).find(tool => tool.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return (toolsData.tools as Tool[]).filter(tool => tool.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set((toolsData.tools as Tool[]).map(tool => tool.category));
  return Array.from(categories).sort();
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    crm: 'CRM',
    invoicing: 'Facturación',
    'project-management': 'Gestión de Proyectos',
    hr: 'Recursos Humanos',
    erp: 'ERP',
    ecommerce: 'E-commerce',
    accounting: 'Contabilidad',
    support: 'Atención al Cliente',
    marketing: 'Marketing',
    communication: 'Comunicación'
  };
  return labels[category] || category;
}

export function getTopTools(category?: string, limit: number = 5): Tool[] {
  let tools = category
    ? getToolsByCategory(category)
    : getAllTools();

  return tools
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getComparisonPairs(category: string): Array<[Tool, Tool]> {
  const tools = getToolsByCategory(category);
  const pairs: Array<[Tool, Tool]> = [];

  for (let i = 0; i < Math.min(tools.length, 5); i++) {
    for (let j = i + 1; j < Math.min(tools.length, 5); j++) {
      pairs.push([tools[i], tools[j]]);
    }
  }

  return pairs.slice(0, 3); // Return top 3 comparison pairs
}

export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase();
  return (toolsData.tools as Tool[]).filter(tool =>
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.highlights.some(h => h.toLowerCase().includes(lowerQuery))
  );
}
