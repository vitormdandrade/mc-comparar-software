// Hand-written verified reviews for top-rated tools.
// Each entry is keyed by tool slug and contains a ~1-paragraph
// editorial review that looks at the tool through our methodology.
// The presence of a review here triggers the "✓ Verificado" badge
// on both the homepage and the tool detail page.

export interface VerifiedReview {
  slug: string;
  reviewedOn: string; // ISO date when our editor last looked at the tool
  verdict: 'recommended' | 'cautious' | 'niche';
  summary: string; // 1-2 sentences for cards and homepage
  review: string; // full paragraph for tool detail page
  bestFor: string; // one sentence, overrides tool.best_for in the review context
  watchOut?: string; // optional: real caveat worth mentioning
}

export const verifiedReviews: VerifiedReview[] = [
  {
    slug: 'rd-station',
    reviewedOn: '2026-04-07',
    verdict: 'recommended',
    summary:
      'Mejor automatización de marketing — soporte en español y conocimiento profundo del funnel B2B local.',
    review:
      'RD Station entiende el funnel de marketing B2B mejor que muchos competidores. Plantillas listas para campañas, integración nativa con CRMs, y soporte humano. El pricing es honesto y escala suavemente. El punto débil es que la plataforma muestra edad en términos de UX — algunas pantallas parecen de ciclos anteriores — pero la funcionalidad lo compensa.',
    bestFor:
      'Empresas B2B con equipo de marketing dedicado y foco en generación de leads.',
    watchOut:
      'UX envejeciendo en algunas pantallas. Si priorizas interfaz pulida, evalúa HubSpot.',
  },
  {
    slug: 'hubspot-pt',
    reviewedOn: '2026-04-07',
    verdict: 'recommended',
    summary:
      'Mejor CRM freemium para startups — el Free Forever entrega valor real sin fecha de caducidad.',
    review:
      'HubSpot tiene el mejor "free forever" del mercado: CRM ilimitado, hasta 1 millón de contactos, email marketing básico, pipelines, y automatizaciones simples. Para una startup en validación, puedes operar por meses sin pagar nada. La trampa aparece cuando necesitas los Hubs pagos (Marketing, Sales, Service) — el salto de precio es agresivo.',
    bestFor:
      'Startups en fase de validación y equipos comerciales pequeños que quieren un CRM de calidad sin compromiso inicial.',
    watchOut: 'El salto del Free al Starter puede ser un choque en el presupuesto.',
  },
  {
    slug: 'asaas',
    reviewedOn: '2026-04-09',
    verdict: 'recommended',
    summary:
      'Mejor plataforma de cobranza recurrente para pymes — múltiples medios de pago en un solo lugar.',
    review:
      'Asaas resuelve el problema #1 de pymes: cobrar clientes de forma recurrente con múltiples métodos de pago sin complicarse con gateways. Interfaz accesible, soporte humano, documentación para no técnicos. El modelo de cobro por transacción es justo para quien está empezando. La plataforma también emite facturas y tiene API sólida para integraciones. Punto de atención: el onboarding puede demorar algunos días por compliance.',
    bestFor:
      'PYMES que necesitan cobrar clientes de forma recurrente — escuelas, gimnasios, SaaS, prestadores de servicio.',
    watchOut: 'Onboarding de ~3-5 días por compliance. No lo dejes para último momento.',
  },
  {
    slug: 'contaazul',
    reviewedOn: '2026-04-09',
    verdict: 'recommended',
    summary:
      'Mejor ERP para micro y pequeñas empresas — integra contabilidad, ventas, inventario y facturación.',
    review:
      'ContaAzul es la opción más madura para autónomos y pequeñas empresas que quieren una plataforma integrada: facturación, control financiero, inventario básico, e integración directa con contadores vía portal. Todo en español, precios claros, soporte humano. El punto fuerte es la integración con el ecosistema local y la relación directa con contadores. Para operaciones muy pequeñas, el precio puede parecer alto; para quien ya está emitiendo 50+ facturas por mes, rápidamente se paga.',
    bestFor:
      'Pequeñas empresas que necesitan integrar fiscal, financiero y contabilidad.',
    watchOut:
      'Para autónomos muy pequeños (< 10 facturas/mes), puede ser excesivo. Comienza con herramientas más simples.',
  },
];

export function getReviewBySlug(slug: string): VerifiedReview | undefined {
  return verifiedReviews.find((r) => r.slug === slug);
}

export function isVerified(slug: string): boolean {
  return verifiedReviews.some((r) => r.slug === slug);
}

export function getAllVerifiedSlugs(): string[] {
  return verifiedReviews.map((r) => r.slug);
}
