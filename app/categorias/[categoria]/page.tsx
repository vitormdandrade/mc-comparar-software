import { Metadata } from 'next';
import {
  getCategoryLabel,
  getToolsByCategory,
  getComparisonPairs,
} from '@/lib/tools';
import CategoriaPageClient from '@/components/CategoriaPageClient';

type Props = {
  params: Promise<{ categoria: string }>;
};

export async function generateStaticParams() {
  // Will be filled by generateStaticParams in the layout or individual pages
  const categories = ['accounting', 'erp', 'ecommerce', 'marketing', 'crm', 'project-management', 'communication', 'finance', 'hr', 'analytics'];
  return categories.map(categoria => ({
    categoria,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const label = getCategoryLabel(categoria);
  const tools = getToolsByCategory(categoria);

  return {
    title: `Melhores ${label} para Pequenas Empresas em 2026 | SaaS Brasil`,
    description: `Compare os ${tools.length} melhores ${label.toLowerCase()} brasileiros. Análises completas com preços, features e ratings. Guia para escolher a melhor ferramenta.`,
    keywords: [
      `melhor ${label.toLowerCase()}`,
      `${label.toLowerCase()} Brasil`,
      `comparador ${label.toLowerCase()}`,
      'SaaS Brasil',
    ],
    openGraph: {
      title: `Melhores ${label} para Empresas Brasileiras`,
      description: `Encontre o melhor ${label.toLowerCase()} para seu negócio. Compare ${tools.length} ferramentas com análises e preços.`,
    },
    alternates: { canonical: `/categorias/${categoria}` },
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;
  const label = getCategoryLabel(categoria);
  const tools = getToolsByCategory(categoria);
  const comparisonPairs = getComparisonPairs(categoria);

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Como escolher o melhor ${label.toLowerCase()} para minha empresa?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Considere o tamanho da sua equipe, orçamento disponível, integrações necessárias e período de teste gratuito. Compare as ${tools.length} ferramentas listadas nesta página com base em avaliações reais de usuários brasileiros.`,
        },
      },
      {
        '@type': 'Question',
        name: `Qual o melhor ${label.toLowerCase()} gratuito?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Existem opções gratuitas e freemium de ${label.toLowerCase()} disponíveis no mercado brasileiro. Ferramentas como as listadas nesta página oferecem planos gratuitos ou testes sem compromisso. Compare os recursos de cada uma antes de decidir.`,
        },
      },
      {
        '@type': 'Question',
        name: `${label} vale a pena para pequenas empresas?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Sim. Um bom ${label.toLowerCase()} pode automatizar processos, economizar tempo da equipe e melhorar resultados. Muitas ferramentas têm planos acessíveis para pequenas empresas, a partir de R$30-100/mês.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <CategoriaPageClient
        categoria={categoria}
        label={label}
        tools={tools}
        comparisonPairs={comparisonPairs}
      />
    </>
  );
}
