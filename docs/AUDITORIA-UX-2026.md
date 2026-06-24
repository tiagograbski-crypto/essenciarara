# Essência Rara — Auditoria Multidisciplinar UX/UI
**Data:** Junho 2026 · **Escopo:** Mobile · Tablet · Desktop · Conversão · Acessibilidade

---

## Resumo executivo

Site com identidade visual forte (plum + gold), arquitetura SPA por abas e funil WhatsApp bem estruturado. Os principais gaps para padrão internacional estão em **tipografia responsiva agressiva demais**, **acessibilidade (foco/teclado)**, **breakpoints tablet subutilizados** e **consistência de tokens entre seções**.

---

## Mobile (≤639px)

| Área | Diagnóstico | Prioridade |
|------|-------------|------------|
| Tipografia | `section-title-lg/xl` escalam até 9–10rem — ilegível e quebra layout | Crítica |
| Bottom nav | Altura excessiva (py-5 + ícones 24px) — reduz viewport útil | Alta |
| Hero | Proporção adequada; CTA bem dimensionado | OK |
| Topbar | Texto longo pode truncar em 320px | Média |
| Tabela Liso 5D | Sticky col funcional; padding ok | OK |
| Comparativo | Handle 40px — limite mínimo touch (44px recomendado) | Alta |
| Reveal grid | Stack vertical correto (slider → oferta) | OK |
| Footer | Padding inferior compete com bottom nav | Média |

## Tablet (640px–1023px)

| Área | Diagnóstico | Prioridade |
|------|-------------|------------|
| Cortes grid | Salto 1 col → 2 col em md, mas cards ainda com padding desktop-lite | Média |
| Alisamentos faixa | Título `uppercase` + `text-4xl` pesado demais | Alta |
| Identidade reveal | Grid 2 col só em lg — tablet fica “mobile esticado” | Alta |
| Header | Nav desktop só em lg — tablet depende do bottom nav | OK (intencional) |
| Ofertas | 1 coluna até lg — aceitável, cards bem proporcionados | OK |
| Vera Dias block | `text-5xl` ok; imagem 256px equilibrada | OK |

## Desktop (≥1024px)

| Área | Diagnóstico | Prioridade |
|------|-------------|------------|
| Identidade reveal | Grid 2 col implementado — bom par prova/conversão | OK |
| Cortes | 3 colunas; stagger no card 2 — editorial forte | OK |
| Liso 5D cards | Duplicação visual protocolo — tipografia 6xl repetitiva | Média |
| Container | Mix `max-w-6xl` / `max-w-[1700px]` — falta hierarquia clara | Média |
| Header | Translúcido, compacto, logo integrado | OK |
| Footer | 4 colunas; links funcionais | OK |

## Conversão & Copy

| Item | Status |
|------|--------|
| Funil ofertas segunda–quinta | Claro |
| Voucher R$ 40 removido | OK |
| Topbar inteligente (8s / scroll / cooldown) | OK |
| WhatsApp estruturado | OK — fallback de campanha desatualizado |
| CTAs por contexto | OK |

## Acessibilidade & Performance

| Item | Status |
|------|--------|
| Skip link | Ausente |
| `:focus-visible` | Ausente |
| `prefers-reduced-motion` | Ausente |
| `aria-current` na nav | Ausente |
| Modal ESC | Ausente |
| Meta description / SEO | Ausente |
| Imagens lazy below-fold | Parcial |
| Observer duplicado ao trocar aba | Bug leve |

---

## 30 refinamentos aplicados (mapeamento)

1. Meta description + title sync  
2. Skip to content  
3. `:focus-visible` global  
4. `prefers-reduced-motion`  
5. Tipografia section-title-xl/lg clamp internacional  
6. Vera Dias headline clamp  
7. Bottom nav compacto + safe-area  
8. Comparativo touch target 44px mobile  
9. Reveal grid tablet (md: 2 col parcial / melhor gap)  
10. Alisamentos faixa título refinado (sem uppercase total lg)  
11. scroll-margin-top anchors (#ofertas, #tabela)  
12. Imagens lazy + hero fetchpriority  
13. Footer padding mobile nav  
14. Modal fecha com ESC  
15. aria-current na navegação  
16. WhatsApp fallback campanha corrigido  
17. initObserver sem duplicar listeners  
18. Topbar truncate mobile  
19. m-nav font-weight equilibrado  
20. Protocol cards tipografia responsiva  
21. site-brand acessível (tab + aria)  
22. Sticky table dark mode fix  
23. comparison touch-action  
24. identity-quote title tablet scale  
25. er-oferta cards min-height equal lg  
26. btn min-height 44px touch  
27. content-max token unificado  
28. preloader reduced-motion skip anim  
29. lgpd focus trap básico  
30. Cortes grid gap tablet otimizado  
