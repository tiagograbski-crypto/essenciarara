# Essência Rara PRO

Site institucional e comercial da **Essência Rara** — salão em Caxias do Sul (RS). SPA estática com três abas: Identidade, Cortes e Alisamentos (Liso 5D).

**Produção:** [essenciararapro.com.br](https://essenciararapro.com.br)

---

## Estrutura do projeto

```
├── index.html              # Entrada da SPA (Identidade · Cortes · Alisamentos)
├── CNAME                   # Domínio customizado (GitHub Pages)
├── assets/
│   ├── images/             # Imagens por categoria
│   │   ├── branding/       # Logo, favicon
│   │   ├── hero/           # Capa da Identidade
│   │   ├── comparacao/     # Antes / depois Liso 5D
│   │   ├── servicos/       # Cards de cortes
│   │   ├── equipe/         # Vera Dias & equipe
│   │   └── produtos/       # Protocolos Liso 5D
│   └── _source/            # Arquivos-fonte (não usados em runtime)
├── css/
│   ├── style.css           # Design system, layout, componentes
│   ├── tailwind.css        # Tailwind compilado (gerado)
│   └── tailwind.input.css  # Entrada do build Tailwind
├── js/
│   ├── site-config.js      # Copy, preços, ofertas, WhatsApp
│   ├── main.js             # Navegação, preloader, observers
│   └── render-copy.js      # Render dinâmico (cortes, tabela, SEO)
├── docs/                   # Documentação interna
├── package.json            # Scripts de build CSS
└── tailwind.config.cjs     # Tokens Tailwind alinhados à marca
```

---

## Desenvolvimento local

Servir a pasta raiz com qualquer servidor estático (porta sugerida: **8300**):

```bash
npx --yes serve . -l 8300
```

Abrir: `http://localhost:8300/#home`

### Atualizar Tailwind

```bash
npm install
npm run build:css
```

---

## Conteúdo e campanhas

Edite **`js/site-config.js`** para alterar textos, preços, badges e mensagens de WhatsApp sem mexer no HTML.

| Área | O que atualizar |
|------|-----------------|
| Campanha ativa | `campanha`, `copy.heroBadge`, ofertas |
| Cortes | `cortes[]`, `ofertas['corte-*']` |
| Alisamentos | `copy.oferta*`, `tabelaLiso5D` |
| SEO / OG | `seo`, `copy.metaDescription` |

---

## Deploy (GitHub Pages)

1. Push na branch `main`
2. GitHub → **Settings → Pages** → Source: **Deploy from branch** → `main` / `/ (root)`
3. O arquivo `CNAME` aponta para `essenciararapro.com.br`

DNS do domínio: registro **CNAME** `@` ou `www` → `tiagograbski-crypto.github.io` (conforme configuração do repositório).

---

## Stack

- HTML5 + CSS3 (design system próprio + Tailwind 3)
- JavaScript vanilla (sem framework)
- [Lucide](https://lucide.dev) (ícones)
- Google Analytics + Meta Pixel

---

© Essência Rara · CNPJ 31.456.983/0001-07
