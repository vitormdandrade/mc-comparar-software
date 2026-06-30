// Our editorial methodology — 5 evaluation criteria with weights.
// Displayed on the homepage and /sobre page to build credibility.

export interface Pillar {
  key: string;
  title: string;
  weight: number; // 0-100
  summary: string; // one-line
  detail: string; // paragraph for /sobre
}

export const methodology: Pillar[] = [
  {
    key: 'features',
    title: 'Funcionalidades y características',
    weight: 30,
    summary:
      'Cobertura de las necesidades reales del día a día en empresas.',
    detail:
      'Evaluamos qué recursos ofrece la herramienta realmente — no solo el marketing en la página de inicio. Priorizamos funcionalidades que resuelven necesidades de pymes: facturación electrónica, pagos integrados, gestión de clientes, soporte a múltiples usuarios. Una herramienta que solo entrega lo básico pierde puntos incluso si el precio es competitivo.',
  },
  {
    key: 'preco',
    title: 'Precio y modelo de cobro',
    weight: 25,
    summary: 'Transparencia en precios, previsibilidad, ausencia de costos ocultos.',
    detail:
      'Herramientas con precios claros, pagos mensuales y previsibilidad ganan puntos. Herramientas con estructura de pricing opaca (planes "Enterprise — contacta a ventas") o con cobros anuales obligatorios pierden puntos. Evaluamos también si hay versión gratuita real o si el "freemium" es solo una prueba disfrazada.',
  },
  {
    key: 'soporte',
    title: 'Soporte y documentación',
    weight: 20,
    summary:
      'Atención al cliente, documentación completa, equipo técnico disponible.',
    detail:
      'El soporte es el punto donde muchas herramientas fallan. Evaluamos la calidad de la documentación, la disponibilidad de soporte humano en horario comercial, y si hay equipo técnico local o si todo el contacto pasa por tickets con demora de 48h+.',
  },
  {
    key: 'integracoes',
    title: 'Integraciones con el ecosistema',
    weight: 15,
    summary:
      'Conexión con pagos, bancos, marketplaces y otras herramientas.',
    detail:
      'Una herramienta que no se conecta con pasarelas de pago, marketplaces u otras herramientas clave obligará a tu equipo a hacer trabajo manual. Puntuamos positivamente integraciones nativas. Integraciones genéricas vía Zapier cuentan, pero valen menos que conectores dedicados.',
  },
  {
    key: 'avaliacoes',
    title: 'Valoraciones de usuarios reales',
    weight: 10,
    summary:
      'Reseñas en G2, Capterra, redes sociales y foros especializados.',
    detail:
      'Agregamos reseñas públicas de G2, Capterra y otras fuentes. También leemos discusiones en grupos de redes sociales. Damos más peso a reseñas recientes (últimos 12 meses) y a patrones que se repiten — una queja puntual es ruido, diez quejas sobre lo mismo es señal.',
  },
];

export const totalWeight = methodology.reduce((sum, p) => sum + p.weight, 0);
