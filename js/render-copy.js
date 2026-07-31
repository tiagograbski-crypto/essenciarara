(function () {
    const cfg = window.ER_SITE;
    if (!cfg) return;

    function setText(selector, value, html) {
        document.querySelectorAll(selector).forEach(function (el) {
            if (html) el.innerHTML = value;
            else el.textContent = value;
        });
    }

    function setMeta(id, value) {
        var el = document.getElementById(id);
        if (el && value) el.setAttribute('content', value);
    }

    function setMetaProperty(id, value) {
        var el = document.getElementById(id);
        if (el && value) el.setAttribute('content', value);
    }

    function applySeoMeta() {
        var c = cfg.copy;
        var seo = cfg.seo || {};
        var base = (cfg.marca && cfg.marca.siteUrl) || 'https://essenciararapro.com.br';
        var ogImage = base + (seo.ogImage || '/assets/images/hero/hero-2modelos-capa.jpg');
        var desc = c.metaDescription || '';
        var title = c.title || cfg.marca.nome;

        document.title = title;
        setMeta('meta-description', desc);
        setMetaProperty('og-title', title);
        setMetaProperty('og-description', desc);
        setMetaProperty('og-url', base + '/');
        setMetaProperty('og-image', ogImage);
        setMetaProperty('og-image-alt', seo.ogImageAlt || '');
        setMeta('twitter-title', title);
        setMeta('twitter-description', desc);
        setMeta('twitter-image', ogImage);

        var canonical = document.getElementById('canonical-url');
        if (canonical) canonical.setAttribute('href', base + '/');
    }

    function syncWaLabels() {
        document.querySelectorAll('[data-wa-offer][data-wa-sync-label]').forEach(function (btn) {
            var key = btn.getAttribute('data-wa-offer');
            var oferta = cfg.ofertas && cfg.ofertas[key];
            if (!oferta || !oferta.cta) return;
            var label = btn.querySelector('[data-wa-label]');
            if (label) label.textContent = oferta.cta;
        });
    }

    function bindOfferButtons() {
        if (!window._erWaClickBound) {
            window._erWaClickBound = true;
            document.addEventListener('click', function (e) {
                var btn = e.target.closest('[data-wa-offer]');
                if (!btn) return;
                var key = btn.getAttribute('data-wa-offer');
                if (typeof openWhatsapp === 'function') {
                    openWhatsapp(key);
                }
            });
        }
        syncWaLabels();
    }

    function refreshIcons() {
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    window.ER_refreshIcons = refreshIcons;

    function renderTabela() {
        var tbody = document.getElementById('tabela-liso-body');
        if (!tbody || !cfg.tabelaLiso5D) return;

        tbody.innerHTML = cfg.tabelaLiso5D.map(function (row) {
            return (
                '<tr class="border-b border-platinum/10">' +
                '<td class="sticky-col er-table-cell py-6 px-5 font-semibold text-obsidian dark:text-boneWhite font-fashion text-left">' + row.label + '</td>' +
                '<td class="er-table-cell py-8 px-6"><span class="er-table-price font-serif-lux text-3xl text-platinum font-bold block">R$ ' + row.valor + '</span></td>' +
                '</tr>'
            );
        }).join('');
    }

    function renderCortes() {
        var grid = document.getElementById('cortes-grid');
        if (!grid || !cfg.cortes) return;

        var totalFotos = 3;
        var complemento = cfg.copy.cortesComplemento || '';
        var descricao = cfg.copy.cortesDescricao || '';
        var badge = cfg.copy.cortesBadge;
        grid.innerHTML = cfg.cortes.map(function (corte, i) {
            var img = 'assets/images/servicos/servico-0' + ((i % totalFotos) + 1) + '.jpg';
            var badgeHtml = badge
                ? '<span class="er-corte-card__badge gold-gradient text-plumDark">' + badge + '</span>'
                : '';
            return (
                '<article class="er-corte-card bg-white dark:bg-zinc-900 shadow-lg border border-gray-100 dark:border-white/5 flex flex-col relative">' +
                '<div class="er-corte-card__media relative">' +
                badgeHtml +
                '<div class="er-corte-card__photo aspect-[4/5] overflow-hidden bg-zinc-900">' +
                '<img src="' + img + '" class="w-full h-full object-cover object-center color-on-focus" alt="' + corte.nome + ' — Essência Rara" loading="lazy" decoding="async">' +
                '</div></div>' +
                '<div class="er-card-body er-corte-card__body text-center flex flex-col flex-grow">' +
                '<h3 class="er-corte-card__title font-serif-lux text-obsidian dark:text-white">' + corte.nome + '</h3>' +
                '<p class="er-corte-card__subtitle text-platinum">' + (corte.complemento || complemento) + '</p>' +
                '<p class="er-corte-card__desc text-gray-500 dark:text-gray-400">' + (corte.descricao || descricao) + '</p>' +
                '<div class="er-corte-card__footer mt-auto">' +
                '<div class="er-corte-card__de text-gray-400 line-through uppercase font-fashion">' + cfg.copy.cortesDeLabel + ' R$ ' + corte.de + '</div>' +
                '<div class="er-corte-card__price font-serif-lux text-platinum font-semibold">R$ ' + corte.por + '</div>' +
                '<button type="button" data-wa-offer="' + corte.id + '" data-wa-sync-label class="er-btn er-btn--gold w-full" aria-label="Reservar ' + corte.nome + ' pelo WhatsApp">' +
                '<i data-lucide="message-circle" class="w-4 h-4 shrink-0" aria-hidden="true"></i> <span data-wa-label>Reservar por R$ ' + corte.por + '</span></button>' +
                '<span class="er-corte-card__micro">' + corte.microcopy + '</span>' +
                '</div></div></article>'
            );
        }).join('');
        if (typeof window.ER_refreshIcons === 'function') window.ER_refreshIcons();
    }

    window.ER_renderCortes = renderCortes;

    function applyStaticCopy() {
        var c = cfg.copy;
        var camp = cfg.campanha;

        applySeoMeta();
        setText('[data-er="faixaTopo"]', camp.faixaTopo);
        setText('[data-er="tagline"]', cfg.marca.tagline);
        setText('[data-er="heroBadge"]', c.heroBadge);
        setText('[data-er="heroTitulo"]', c.heroTitulo);
        var heroAccent = document.querySelector('[data-er="heroTituloDestaque"]');
        if (heroAccent) {
            if (c.heroTituloDestaque) {
                heroAccent.textContent = c.heroTituloDestaque;
                heroAccent.hidden = false;
            } else {
                heroAccent.hidden = true;
            }
        }
        setText('[data-er="heroLead"]', c.heroLead);
        setText('[data-er="heroSubtitulo"]', c.heroSubtitulo, true);
        setText('[data-er="heroProva"]', c.heroProva);
        setText('[data-er="heroCta"]', c.heroCta);
        setText('[data-er="heroCtaSub"]', c.heroCtaSub);
        setText('[data-er="sensorialTitulo"]', c.sensorialTitulo, true);
        setText('[data-er="sensorialTexto"]', c.sensorialTexto);
        setText('[data-er="filosofiaLabel"]', c.filosofiaLabel);
        setText('[data-er="filosofiaTitulo"]', c.filosofiaTitulo, true);
        setText('[data-er="comparativoLabel"]', c.comparativoLabel);
        setText('[data-er="comparativoAntes"]', c.comparativoAntes);
        setText('[data-er="comparativoDepois"]', c.comparativoDepois);
        setText('[data-er="campanhaBadge"]', camp.badge);
        setText('[data-er="identityOfertaBadge"]', c.identityOfertaBadge);
        setText('[data-er="identityOfertaLabel"]', c.identityOfertaLabel);
        setText('[data-er="identityOfertaTitulo"]', c.identityOfertaTitulo);
        setText('[data-er="identityOfertaSub"]', c.identityOfertaSub);
        setText('[data-er="identityOfertaCta"]', c.identityOfertaCta);
        setText('[data-er="identityOfertaCtaSub"]', c.identityOfertaCtaSub);
        setText('[data-er="selo1"]', c.selo1);
        setText('[data-er="selo2"]', c.selo2);
        setText('[data-er="selo3"]', c.selo3);
        setText('[data-er="cortesColecao"]', c.cortesColecao);
        setText('[data-er="cortesTitulo"]', c.cortesTitulo, true);
        setText('[data-er="alisamentosFaixaBadge"]', c.alisamentosFaixaBadge);
        setText('[data-er="alisamentosFaixaTitulo"]', c.alisamentosFaixaTitulo, true);
        setText('[data-er="alisamentosFaixaCta"]', c.alisamentosFaixaCta);
        setText('[data-er="alisamentosTitulo"]', c.alisamentosTitulo, true);
        setText('[data-er="ofertasAlisamentoLabel"]', c.ofertasAlisamentoLabel);
        setText('[data-er="ofertasAlisamentoTitulo"]', c.ofertasAlisamentoTitulo);
        setText('[data-er="ofertasAlisamentoSub"]', c.ofertasAlisamentoSub);
        setText('[data-er="ofertaRetoqueBadge"]', c.ofertaRetoqueBadge);
        setText('[data-er="ofertaRetoqueTitulo"]', c.ofertaRetoqueTitulo);
        setText('[data-er="ofertaRetoqueDesc"]', c.ofertaRetoqueDesc);
        setText('[data-er="ofertaRetoquePreco"]', c.ofertaRetoquePreco);
        setText('[data-er="ofertaRetoqueNota"]', c.ofertaRetoqueNota);
        setText('[data-er="ofertaRetoqueCta"]', c.ofertaRetoqueCta);
        setText('[data-er="ofertaCinturaBadge"]', c.ofertaCinturaBadge);
        setText('[data-er="ofertaCinturaTitulo"]', c.ofertaCinturaTitulo);
        setText('[data-er="ofertaCinturaDesc"]', c.ofertaCinturaDesc);
        setText('[data-er="ofertaCinturaPreco"]', c.ofertaCinturaPreco);
        setText('[data-er="ofertaCinturaNota"]', c.ofertaCinturaNota);
        setText('[data-er="ofertaCinturaCta"]', c.ofertaCinturaCta);
        setText('[data-er="ofertasAgendaTitulo"]', c.ofertasAgendaTitulo);
        setText('[data-er="ofertasAgendaTexto"]', c.ofertasAgendaTexto);
        setText('[data-er="lisoMorenaLabel"]', c.lisoMorenaLabel);
        setText('[data-er="lisoMorenaTitulo"]', c.lisoMorenaTitulo, true);
        setText('[data-er="lisoBlondeLabel"]', c.lisoBlondeLabel);
        setText('[data-er="lisoBlondeTitulo"]', c.lisoBlondeTitulo, true);
        setText('[data-er="protocoloLabel"]', c.protocoloLabel);
        setText('[data-er="protocoloValor"]', c.protocoloValor);
        setText('[data-er="protocoloSub"]', c.protocoloSub);
        setText('[data-er="tabelaSub"]', c.tabelaSub);
        setText('[data-er="tabelaTitulo"]', c.tabelaTitulo);
        setText('[data-er="tabelaColComprimento"]', c.tabelaColComprimento);
        setText('[data-er="tabelaColValor"]', c.tabelaColValor);
        setText('[data-er="tabelaCtaSub"]', c.tabelaCtaSub);
        setText('[data-er="footerTagline"]', c.footerTagline);
        setText('[data-er="footerLegal"]', c.footerLegal);
        setText('[data-er="lgpdPromo"]', c.lgpdPromo);
    }

    window.ER_renderCopyReady = function () {
        applyStaticCopy();
        renderTabela();
        renderCortes();
        bindOfferButtons();
        refreshIcons();
    };
})();
