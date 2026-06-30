# SaaS Brasil - Comparador de Ferramentas

Um site de SEO programático para comparar SaaS e ferramentas brasileiras. Construído com Next.js 14, TypeScript e Tailwind CSS.

## Visão Geral

Site completo com 80+ ferramentas SaaS brasileiras organizadas em 10 categorias:

- CRM
- Faturamento
- Gestão de Projetos
- Recursos Humanos
- ERP
- E-commerce
- Contabilidade
- Atendimento ao Cliente
- Marketing
- Comunicação

## Funcionalidades

- Páginas de home com categorias destacadas
- Listagem por categoria com 80+ ferramentas
- Páginas individuais de cada ferramenta com detalhes completos
- Comparações lado a lado entre ferramentas
- SEO otimizado com:
  - Metadata dinâmica para cada página
  - Schema JSON-LD para produtos
  - Sitemap automático
  - Robots.txt configurado
- Sistema de afiliados com UTM parameters
- Design responsivo mobile-first
- Conteúdo 100% em português brasileiro

## Estrutura do Projeto

```
app/
├── layout.tsx              # Layout principal com header/footer
├── page.tsx               # Home page
├── categorias/
│   ├── page.tsx          # Índice de categorias
│   └── [categoria]/
│       └── page.tsx      # Páginas por categoria
├── ferramentas/
│   └── [slug]/
│       └── page.tsx      # Página individual de ferramenta
├── comparar/
│   └── [comparison]/
│       └── page.tsx      # Página de comparação (A vs B)
└── sitemap.ts            # Sitemap gerado dinamicamente

src/
├── config/
│   └── affiliates.ts     # Configuração de afiliados e UTM
├── data/
│   └── tools.json        # Database de 80+ ferramentas
└── lib/
    └── tools.ts          # Funções utilitárias para dados
```

## Getting Started

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build

```bash
npm run build
npm run start
```

## Dados das Ferramentas

As ferramentas estão armazenadas em `data/tools.json` com os seguintes campos:

- `slug` - URL-safe identifier
- `name` - Nome da ferramenta
- `category` - Categoria (crm, invoicing, etc)
- `description` - Descrição em português (2-3 sentenças)
- `pricing_model` - free | freemium | paid
- `starting_price_brl` - Preço inicial mensal em BRL
- `free_trial` - Oferece teste gratuito
- `highlights` - Array de 3-5 features principais
- `best_for` - Tipo de usuário ideal
- `affiliate_url` - Link afiliado
- `website_url` - URL oficial
- `rating` - Avaliação 1-5
- `integrations` - Array de ferramentas integradas

## Geração de Páginas Estáticas

O projeto utiliza `generateStaticParams()` para gerar todas as páginas estáticas durante build:

- ~80 páginas de ferramentas
- ~10 páginas de categorias
- ~50 páginas de comparação
- 1 página home
- 1 página índice de categorias

Total: ~140+ páginas geradas estaticamente para máxima performance.

## SEO

Cada página inclui:

1. **Meta tags dinâmicas** com `generateMetadata()`
2. **Schema JSON-LD** para produtos (Product schema)
3. **Sitemap XML** em `/sitemap.xml`
4. **Robots.txt** configurado
5. **Open Graph** para social sharing
6. **Keywords** relevantes para português

## Sistema de Afiliados

Configurado em `src/config/affiliates.ts`:

- Injeção automática de UTM parameters
- Suporte para múltiplos afiliados
- URLs customizadas por ferramenta

## Deployment

### Vercel (Recomendado)

```bash
vercel deploy
```

Configure as variáveis de ambiente:

```bash
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js 14:
- Netlify
- Railway
- AWS
- Google Cloud

## Performance

- Todas as páginas são geradas estaticamente (SSG)
- Zero JavaScript para views básicas
- Imagens otimizadas
- CSS inline com Tailwind
- Tempo de carregamento < 1s

## Customização

### Adicionar nova ferramenta

Edite `data/tools.json` e adicione um novo objeto com todos os campos necessários.

### Modificar categorias

As categorias são extraídas automaticamente de `tools.json`. Adicione novas categorias através do campo `category` nas ferramentas.

### Mudar cores/design

Edite `app/globals.css` e atualize as classes Tailwind nos componentes.

## Licença

MIT
