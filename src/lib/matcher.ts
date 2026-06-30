import { Tool, getAllTools, getCategoryLabel } from './tools';

// ---- Types ----

export interface MatchAnswers {
  category: string;
  companySize: string;
  budget: string;
  painPoints: string[];
}

export interface ScoredTool {
  tool: Tool;
  score: number;
  reasons: string[];
}

// ---- Constants ----

const CATEGORY_LABELS: Record<string, string> = {
  crm: 'CRM',
  erp: 'ERP',
  marketing: 'Marketing',
  ecommerce: 'E-commerce',
  accounting: 'Contabilidad',
  invoicing: 'Facturación',
  'project-management': 'Gestión de Proyectos',
  hr: 'Recursos Humanos',
  support: 'Atención al Cliente',
  communication: 'Comunicación',
  design: 'Diseño',
};

const PAIN_POINT_KEYWORDS: Record<string, string[]> = {
  'automacao': ['automação', 'automatizar', 'automatización', 'automático', 'workflow', 'integración'],
  'baixo-custo': ['gratuito', 'freemium', 'bajo costo', 'accesible', 'pequeñas empresas', 'startup', 'sin costo'],
  'integracao': ['integración', 'integra', 'api', 'conectar', 'múltiples canales', 'marketplace'],
  'gestao-equipe': ['equipo', 'equipos', 'colaboración', 'colaborativo', 'task', 'asignación'],
  'vendas': ['ventas', 'pipeline', 'lead', 'conversión', 'crm', 'comercial', 'negociación'],
  'relatorios': ['informe', 'dashboard', 'analytics', 'análisis', 'métricas', 'kpi', 'forecasting'],
  'suporte-cliente': ['atención', 'soporte', 'cliente', 'ticket', 'chat', 'omnicanal'],
  'estoque': ['inventario', 'stock', 'logística', 'gestión de pedidos', 'supply chain'],
  'fiscal': ['fiscal', 'factura', 'tributario', 'contable', 'impuesto'],
  'simplicidade': ['simple', 'intuitivo', 'fácil', 'rápido', 'simplificado', 'interfaz'],
};

const BUDGET_RANGES: Record<string, { min: number; max: number }> = {
  'ate-100': { min: 0, max: 100 },
  '100-500': { min: 0, max: 500 },
  '500-2000': { min: 0, max: 2000 },
  '2000+': { min: 0, max: 999999 },
};

const COMPANY_SIZE_PRICING_PREFERENCE: Record<string, { preferPaid: boolean; preferEnterprise: boolean }> = {
  '<10': { preferPaid: false, preferEnterprise: false },
  '10-50': { preferPaid: false, preferEnterprise: false },
  '50-200': { preferPaid: true, preferEnterprise: false },
  '200+': { preferPaid: true, preferEnterprise: true },
};

// ---- Scoring Functions ----

function scoreCategory(tool: Tool, answerCategory: string): number {
  if (tool.category === answerCategory) return 100;
  const relatedCategories: Record<string, string[]> = {
    crm: ['marketing', 'support'],
    marketing: ['crm', 'ecommerce'],
    erp: ['accounting', 'invoicing', 'ecommerce', 'hr'],
    ecommerce: ['marketing', 'erp', 'invoicing'],
    accounting: ['erp', 'invoicing'],
    invoicing: ['accounting', 'erp'],
    'project-management': ['communication', 'support'],
    hr: ['erp', 'project-management'],
    support: ['crm', 'communication'],
    communication: ['project-management', 'support'],
    design: ['marketing', 'ecommerce'],
  };
  const related = relatedCategories[answerCategory] || [];
  if (related.includes(tool.category)) return 40;
  return 0;
}

function scoreBudget(tool: Tool, budget: string): number {
  const range = BUDGET_RANGES[budget];
  if (!range) return 0;

  const price = tool.starting_price_brl || 0;

  if (tool.pricing_model === 'free' || (tool.pricing_model === 'freemium' && price === 0)) {
    return 100;
  }

  if (price === 0) return 80;

  if (price <= range.max) {
    if (price <= range.max * 0.5) return 90;
    if (price <= range.max * 0.8) return 75;
    return 60;
  }

  const overshoot = (price - range.max) / range.max;
  if (overshoot <= 0.25) return 30;
  if (overshoot <= 0.5) return 15;
  return 0;
}

function scoreCompanySize(tool: Tool, companySize: string): number {
  const preference = COMPANY_SIZE_PRICING_PREFERENCE[companySize];
  if (!preference) return 50;

  if (!preference.preferPaid) {
    if (tool.pricing_model === 'free') return 100;
    if (tool.pricing_model === 'freemium') return 90;
    if (tool.starting_price_brl && tool.starting_price_brl <= 50) return 60;
    return 30;
  }

  if (preference.preferPaid && !preference.preferEnterprise) {
    if (tool.pricing_model === 'paid' && tool.starting_price_brl && tool.starting_price_brl >= 50) return 100;
    if (tool.pricing_model === 'freemium') return 70;
    if (tool.starting_price_brl && tool.starting_price_brl < 50) return 50;
    return 20;
  }

  if (preference.preferEnterprise) {
    if (tool.starting_price_brl && tool.starting_price_brl >= 200) return 100;
    if (tool.starting_price_brl && tool.starting_price_brl >= 100) return 80;
    if (tool.pricing_model === 'freemium') return 40;
    return 20;
  }

  return 50;
}

function scorePainPoints(tool: Tool, painPoints: string[]): { score: number; matchedPoints: string[] } {
  if (painPoints.length === 0) return { score: 50, matchedPoints: [] };

  const matchedPoints: string[] = [];
  let totalScore = 0;

  const searchText = [
    tool.description.toLowerCase(),
    tool.best_for.toLowerCase(),
    ...tool.highlights.map(h => h.toLowerCase()),
    ...tool.integrations.map(i => i.toLowerCase()),
  ].join(' ');

  for (const painPoint of painPoints) {
    const keywords = PAIN_POINT_KEYWORDS[painPoint] || [];
    if (keywords.length === 0) continue;

    const matched = keywords.some(kw => searchText.includes(kw));
    if (matched) {
      matchedPoints.push(painPoint);
      totalScore += 100 / painPoints.length;
    }
  }

  return {
    score: painPoints.length > 0 ? Math.round(totalScore) : 50,
    matchedPoints,
  };
}

// ---- Main Matching Function ----

export function matchTools(answers: MatchAnswers, limit: number = 3): ScoredTool[] {
  const tools = getAllTools();

  const scored: ScoredTool[] = tools.map(tool => {
    const categoryScore = scoreCategory(tool, answers.category);
    const budgetScore = scoreBudget(tool, answers.budget);
    const sizeScore = scoreCompanySize(tool, answers.companySize);
    const painScoreResult = scorePainPoints(tool, answers.painPoints);

    const finalScore = Math.round(
      categoryScore * 0.35 +
      budgetScore * 0.25 +
      sizeScore * 0.15 +
      painScoreResult.score * 0.25
    );

    const reasons: string[] = [];

    if (categoryScore >= 100) {
      reasons.push(`Categoría ideal: ${getCategoryLabel(tool.category)}`);
    } else if (categoryScore >= 40) {
      reasons.push(`Categoría relacionada: ${getCategoryLabel(tool.category)}`);
    }

    if (budgetScore >= 80) {
      if (tool.pricing_model === 'free') {
        reasons.push('Herramienta gratuita — se ajusta a cualquier presupuesto');
      } else if (tool.pricing_model === 'freemium') {
        reasons.push('Modelo freemium — comienza gratis y escala según necesites');
      } else if (tool.starting_price_brl && tool.starting_price_brl > 0) {
        reasons.push(`Desde ${tool.starting_price_brl}/mes — dentro de tu presupuesto`);
      }
    } else if (budgetScore >= 60 && tool.starting_price_brl) {
      reasons.push(`Desde ${tool.starting_price_brl}/mes — se ajusta a tu presupuesto`);
    } else if (tool.starting_price_brl && budgetScore > 0) {
      reasons.push(`Precio desde ${tool.starting_price_brl}/mes`);
    }

    if (sizeScore >= 80) {
      reasons.push('Ideal para empresas de tu tamaño');
    }

    if (painScoreResult.matchedPoints.length > 0) {
      const painLabels: Record<string, string> = {
        'automacao': 'automatización de procesos',
        'baixo-custo': 'bajo costo',
        'integracao': 'integraciones',
        'gestao-equipe': 'gestión de equipo',
        'vendas': 'ventas y pipeline',
        'relatorios': 'informes y dashboards',
        'suporte-cliente': 'atención al cliente',
        'estoque': 'gestión de inventario',
        'fiscal': 'cuestiones fiscales',
        'simplicidade': 'simplicidad de uso',
      };
      const matchedLabels = painScoreResult.matchedPoints
        .map(p => painLabels[p] || p)
        .join(', ');
      reasons.push(`Atiende tus necesidades de: ${matchedLabels}`);
    }

    if (tool.rating >= 4.5) {
      reasons.push(`Altamente valorado (★ ${tool.rating.toFixed(1)})`);
    }

    if (tool.free_trial) {
      reasons.push('Ofrece prueba gratuita — pruébalo sin compromiso');
    }

    return {
      tool,
      score: finalScore,
      reasons,
    };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// ---- Helper: get question options ----

export function getCategoryOptions() {
  const cats = new Set<string>(getAllTools().map(t => t.category));
  return Array.from(cats).sort().map(cat => ({
    value: cat,
    label: CATEGORY_LABELS[cat] || cat,
  }));
}

export function getPainPointOptions() {
  return [
    { value: 'automacao', label: 'Automatización de procesos' },
    { value: 'baixo-custo', label: 'Bajo costo / Gratuito' },
    { value: 'integracao', label: 'Integración con otras herramientas' },
    { value: 'gestao-equipe', label: 'Gestión de equipo y colaboración' },
    { value: 'vendas', label: 'Ventas y pipeline comercial' },
    { value: 'relatorios', label: 'Informes y dashboards' },
    { value: 'suporte-cliente', label: 'Atención al cliente' },
    { value: 'estoque', label: 'Gestión de inventario y logística' },
    { value: 'fiscal', label: 'Gestión fiscal y facturación' },
    { value: 'simplicidade', label: 'Simplicidad y facilidad de uso' },
  ];
}
