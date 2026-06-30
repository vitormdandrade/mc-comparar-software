// Depth articles for categories that other comparators do not cover.
// Each guide is a hand-written editorial piece that ranks the top 3-5
// tools in a given category with explanations of trade-offs and
// recommendations by use case.

export interface GuidePick {
  slug: string; // matches a tool slug in tools.json
  verdict: string; // short verdict for this pick
  bestFor: string;
  price: string; // short price tag
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string; // matches a category in tools.json
  subtitle: string;
  intro: string[]; // 2-3 intro paragraphs
  criteria: string; // paragraph explaining the criteria for this category
  picks: GuidePick[]; // 3-5 picks in ranked order
  whenToChoose: Array<{ scenario: string; pick: string; reason: string }>;
  conclusion: string;
  updatedOn: string;
}

export const guides: Guide[] = [
  // ERP
  {
    slug: 'mejor-erp-pymes',
    title: 'Mejor ERP para PYMES en 2026',
    metaTitle:
      'Mejor ERP para PYMES 2026 — ContaAzul, Omie, Bling | Comparar Software',
    metaDescription:
      'Qué ERP elegir para pequeñas y medianas empresas en 2026. Comparamos ContaAzul, Omie y Bling en precio, facturación, inventario y soporte.',
    category: 'erp',
    subtitle:
      'Comparativa honesta entre ContaAzul, Omie y Bling para pequeñas y medianas empresas.',
    intro: [
      'ERP para pymes es un mercado con tres jugadores dominantes: ContaAzul, Omie y Bling. Los tres hacen básicamente lo mismo — facturación, finanzas, inventario, informes — pero con filosofías y enfoques diferentes.',
      'La mayor parte de los contenidos sobre el tema están sesgados por afiliación. Esta guía intenta ser lo más neutral posible: listamos lo que cada herramienta hace bien, lo que hace mal, y en qué escenario elegir cada una.',
      'Una observación importante: "ERP" aquí significa el paquete operacional integrado — no el ERP corporativo. Si eres una empresa de mediano o gran porte, esta guía no es para ti.',
    ],
    criteria:
      'Evaluamos: (a) facturación electrónica con la menor fricción posible, (b) integración con contadores, (c) gestión de inventario y ventas, (d) precios con claridad, (e) calidad del soporte humano. Puntuamos negativamente cobros opacos y paquetes "consulta con ventas".',
    picks: [
      {
        slug: 'contaazul',
        verdict: 'Mejor integración con contadores.',
        bestFor: 'Empresas que trabajan con despacho contable externo y quieren que el contador tenga acceso directo a los datos.',
        price: 'Desde 69/mes',
      },
      {
        slug: 'omie',
        verdict: 'Mejor paquete de funcionalidades y automatización.',
        bestFor: 'PYMES que quieren automatización de cobranza, conciliación bancaria y un paquete más amplio de módulos.',
        price: 'Desde 89/mes',
      },
      {
        slug: 'bling',
        verdict: 'Mejor para quien vende en marketplaces.',
        bestFor: 'Tiendas que venden en Mercado Libre, Amazon y necesitan integración nativa de inventario y pedidos.',
        price: 'Desde 40/mes',
      },
    ],
    whenToChoose: [
      {
        scenario: 'Prestador de servicios que emite < 20 facturas por mes',
        pick: 'ContaAzul (plan básico) o Bling Free/Básico',
        reason: 'Para volúmenes pequeños, vale el plan más barato. La diferencia de funcionalidades no justifica pagar más.',
      },
      {
        scenario: 'Empresa con contabilidad tercerizada',
        pick: 'ContaAzul',
        reason: 'Portal para contadores es el más consolidado. Muchos despachos ya lo usan y la integración es rápida.',
      },
      {
        scenario: 'Tienda vendiendo en 3+ marketplaces',
        pick: 'Bling',
        reason: 'Integraciones nativas con Mercado Libre, Amazon. Pedidos e inventario se sincronizan automáticamente.',
      },
      {
        scenario: 'PYME en crecimiento (30+ empleados, múltiples centros de costo)',
        pick: 'Omie',
        reason: 'Módulos más amplios y automatizaciones más maduras.',
      },
    ],
    conclusion:
      'Los tres funcionan — la decisión real es sobre tu modelo de negocio. Servicio con contador externo: ContaAzul. Comercio multicanal: Bling. PYME en crecimiento con operación compleja: Omie. Prueba el período gratuito antes de comprometerte.',
    updatedOn: '2026-04-10',
  },

  // E-COMMERCE
  {
    slug: 'mejor-plataforma-ecommerce',
    title: 'Mejor Plataforma de E-commerce para Empresas en 2026',
    metaTitle:
      'Mejor Plataforma de E-commerce 2026 — Nuvemshop y Alternativas | Comparar Software',
    metaDescription:
      'Compara las mejores plataformas de e-commerce en 2026: Nuvemshop y alternativas. Análisis detallado de precios, funcionalidades y cuál elegir.',
    category: 'ecommerce',
    subtitle:
      'Qué plataforma usar para abrir o migrar tu tienda online — comparativa honesta.',
    intro: [
      'La elección de la plataforma de e-commerce es una de las decisiones más importantes (y difíciles de revertir) para comerciantes. Migrar de plataforma después de tener miles de productos, cientos de pedidos por mes e integraciones funcionando es un proyecto de meses — así que vale pensar bien antes.',
      'El mercado está dominado por jugadores que entienden las peculiaridades fiscales, logísticas y de pago mejor que los extranjeros. Esta guía clasifica las opciones por tamaño de operación.',
      'No existe plataforma "mejor" en absoluto — existe la plataforma correcta para tu etapa de negocio.',
    ],
    criteria:
      'Evaluamos: (a) integración nativa con pagos y marketplaces, (b) soporte a facturación electrónica y obligaciones fiscales, (c) integración con transportistas, (d) costo total (mensualidad + transacción), (e) flexibilidad técnica (temas, personalización, API).',
    picks: [
      {
        slug: 'nuvemshop',
        verdict: 'Mejor para PYMES comenzando o escalando.',
        bestFor: 'Comerciantes que quieren empezar en días, tener soporte, e integración fácil con pagos y envíos.',
        price: 'Desde 49/mes',
      },
      {
        slug: 'bling',
        verdict: 'Mejor para integración multicanal.',
        bestFor: 'Tiendas que venden en múltiples canales y necesitan gestión centralizada de pedidos e inventario.',
        price: 'Desde 40/mes',
      },
    ],
    whenToChoose: [
      {
        scenario: 'Comenzando hoy sin inversión en plataforma',
        pick: 'Nuvemshop (plan básico)',
        reason: 'Permite validar producto y primeras ventas. Migrar después es trabajoso pero posible.',
      },
      {
        scenario: 'PYME facturando con presencia en múltiples canales',
        pick: 'Bling + Nuvemshop',
        reason: 'Combinación de tienda online con gestión multicanal integrada.',
      },
    ],
    conclusion:
      'La elección correcta depende de tu facturación actual y de dónde quieres llegar en 2 años. Comenzando desde cero: Nuvemshop. Ya vendes en múltiples canales: Bling. No migres por prisa — migrar plataforma de e-commerce es uno de los proyectos más dolorosos del comercio digital.',
    updatedOn: '2026-04-10',
  },

  // HELPDESK / SUPPORT
  {
    slug: 'mejor-software-helpdesk',
    title: 'Mejor Software de Helpdesk para Empresas en 2026',
    metaTitle:
      'Mejor Helpdesk y Atención al Cliente 2026 — Zendesk, Freshdesk | Comparar Software',
    metaDescription:
      'Compara los mejores softwares de helpdesk en 2026: Zendesk, Freshdesk. Precios, funcionalidades, soporte y cuál elegir.',
    category: 'support',
    subtitle:
      'Qué herramienta de atención al cliente elegir — comparativa entre Zendesk y Freshdesk.',
    intro: [
      'Atención al cliente es el punto donde las pymes más subestiman la importancia de tener una herramienta adecuada. Con el tiempo, el email genérico (contacto@empresa) se vuelve un infierno — tickets perdidos, SLAs no cumplidos, imposibilidad de medir cuánto tiempo el equipo gasta por cliente. Helpdesk existe exactamente para resolver eso.',
      'Existen dos grandes familias: los gigantes consolidados (Zendesk) con foco en volumen y los más accesibles (Freshdesk) con planes gratuitos para empezar.',
      'Esta guía compara las dos herramientas más relevantes en 2026 y clasifica cada una por su punto fuerte real.',
    ],
    criteria:
      'Evaluamos: (a) canales atendidos (email, chat, WhatsApp, redes sociales), (b) calidad del editor de automatizaciones, (c) SLA tracking e informes, (d) integración con CRM, (e) precios y transparencia.',
    picks: [
      {
        slug: 'zendesk',
        verdict: 'Mejor para empresas con operación de soporte madura.',
        bestFor: 'Empresas de mediano/gran porte con atención en múltiples idiomas y operación internacional.',
        price: 'Desde 55/agente/mes',
      },
      {
        slug: 'freshdesk',
        verdict: 'Mejor relación costo-beneficio.',
        bestFor: 'Startups y scale-ups que quieren una herramienta con plan gratuito para empezar.',
        price: 'Plan gratuito disponible. Pago desde 15/agente/mes',
      },
    ],
    whenToChoose: [
      {
        scenario: 'Startup o empresa probando helpdesk por primera vez',
        pick: 'Freshdesk (plan gratuito)',
        reason: 'Plan free es generoso, herramienta sólida, permite empezar sin riesgo financiero.',
      },
      {
        scenario: 'Empresa con atención en múltiples idiomas y operación compleja',
        pick: 'Zendesk',
        reason: 'Ecosistema maduro, integraciones vastas, escala sin problemas.',
      },
    ],
    conclusion:
      'Para la mayoría de las pymes, Freshdesk es la respuesta correcta. Zendesk solo tiene sentido cuando tu operación ya está más madura o tienes requisitos de escala más exigentes.',
    updatedOn: '2026-04-10',
  },

  // ACCOUNTING
  {
    slug: 'mejor-software-contabilidad',
    title: 'Mejor Software de Contabilidad para Empresas en 2026',
    metaTitle:
      'Mejor Software de Contabilidad 2026 — ContaAzul, Omie | Comparar Software',
    metaDescription:
      'Compara los mejores softwares de contabilidad para pymes en 2026. Precios, funcionalidades, integración fiscal y cuál elegir.',
    category: 'accounting',
    subtitle:
      'Qué software elegir para la contabilidad de tu empresa — comparativa para pymes.',
    intro: [
      'El mercado de software de contabilidad abarca desde herramientas para el empresario (ContaAzul, Omie) que integran fiscal, financiero e informes básicos, hasta herramientas para el despacho contable que cubren toda la complejidad tributaria.',
      'Esta guía cubre las herramientas para el empresario. Si eres despacho contable, es otra conversación.',
      'Importante: la contabilidad es compleja y la legislación cambia rápido. Nunca prescindas de tener un contador humano involucrado, incluso con la mejor herramienta.',
    ],
    criteria:
      'Evaluamos: (a) cobertura de obligaciones fiscales, (b) integración con el ecosistema contable (contadores, bancos), (c) calidad de las automatizaciones de conciliación, (d) precios y previsibilidad, (e) curva de aprendizaje para empresarios no contables.',
    picks: [
      {
        slug: 'contaazul',
        verdict: 'Mejor para empresarios que quieren contabilidad integrada.',
        bestFor: 'Pequeñas empresas que trabajan con contador externo y necesitan integración limpia entre finanzas, fiscal y contable.',
        price: 'Desde 69/mes',
      },
      {
        slug: 'omie',
        verdict: 'Mejor para PYMES creciendo rápido.',
        bestFor: 'Empresas que ya pasaron del porte micro y necesitan centros de costo, DRE gerencial y automatización de cobranza.',
        price: 'Desde 89/mes',
      },
    ],
    whenToChoose: [
      {
        scenario: 'Autónomo o microempresa con contador externo',
        pick: 'ContaAzul',
        reason: 'Portal del contador es maduro, integración fácil, precio razonable, soporte.',
      },
      {
        scenario: 'PYME con operación financiera compleja',
        pick: 'Omie',
        reason: 'Módulos de DRE gerencial, conciliación bancaria automática, control de centros de costo.',
      },
    ],
    conclusion:
      'Para empresas, la combinación más usada y bien resuelta es ContaAzul (u Omie) + contador externo. El software integrado cubre el día a día del empresario mientras el contador humano cuida las obligaciones complejas.',
    updatedOn: '2026-04-10',
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuides(): Guide[] {
  return guides;
}
