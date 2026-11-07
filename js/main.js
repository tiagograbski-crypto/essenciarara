// ==========================================
        // ENGINE SENSORIAL (HAPTIC FEEDBACK INVISÍVEL)
        // ==========================================
        let hapticEnabled = false;

        function triggerHaptic(pattern) {
            if(hapticEnabled && typeof window.navigator.vibrate === 'function') {
                try {
                    window.navigator.vibrate(pattern);
                } catch (e) {
                    // Ignora silenciosamente se o navegador bloquear
                }
            }
        }

        // Adiciona vibração suave em todos os botões e links principais
        document.addEventListener('click', (e) => {
            if (!hapticEnabled) hapticEnabled = true;
            if(e.target.closest('button') || e.target.closest('.nav-anchor')) {
                triggerHaptic(15);
            }
        });

        // WhatsApp — mensagem estruturada para triagem rápida na recepção
        function openWhatsapp(offerKey) {
            const cfg = window.ER_SITE || {};
            const oferta = cfg.ofertas && cfg.ofertas[offerKey];
            const campanha = (oferta && oferta.campanha) || (cfg.campanha && cfg.campanha.label) || 'Segunda a quinta';
            const servico = (oferta && oferta.servico) || offerKey;
            const beneficio = (oferta && oferta.beneficio) || '';
            const numero = (cfg.marca && cfg.marca.whatsapp) || '5554984149875';

            const text = [
                'Olá, Equipe Essência Rara! Vi o site e quero garantir minha vaga:',
                '',
                '• Campanha: ' + campanha,
                '• Serviço: ' + servico,
                '• Benefício: ' + beneficio,
                '',
                'Ainda há horário disponível esta semana?'
            ].join('\n');

            window.open('https://wa.me/' + numero + '?text=' + encodeURIComponent(text), '_blank');
        }
        window.openWhatsapp = openWhatsapp;

        /* THEME — sempre modo plum (escuro) */
        function applyBrandTheme() {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            var meta = document.getElementById('meta-theme-color');
            if (meta) meta.setAttribute('content', '#3D143D');
        }
        applyBrandTheme();

        /* NAVIGATION & SMART ROUTING */
        function markNav(pId) {
            var btn = document.getElementById('nav-' + pId);
            if (btn) {
                btn.classList.add('active');
                btn.setAttribute('aria-current', 'page');
            }
            var mBtn = document.getElementById('m-nav-' + pId);
            if (mBtn) {
                mBtn.classList.add('active-mobile');
                mBtn.setAttribute('aria-current', 'page');
            }
        }

        function settlePage() {
            initObserver();
            if (typeof window.ER_refreshIcons === 'function') window.ER_refreshIcons();
        }

        function navigateTo(pId, updateHash = true) {
            const aliases = { 'alisamento': 'alisamentos', 'vome': 'home', 'inicio': 'home', 'cor': 'cortes', 'corte': 'cortes' };
            pId = aliases[pId] || pId;
            
            document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.nav-anchor').forEach(a => {
                a.classList.remove('active');
                a.removeAttribute('aria-current');
            });
            document.querySelectorAll('.m-nav-btn').forEach(b => {
                b.classList.remove('active-mobile');
                b.removeAttribute('aria-current');
            });
            
            const target = document.getElementById('page-' + pId);
            const pageId = target ? pId : 'home';
            (target || document.getElementById('page-home')).classList.add('active');
            markNav(pageId);

            if (pageId === 'cortes' && typeof window.ER_renderCortes === 'function') {
                window.ER_renderCortes();
            }

            window.scrollTo({ top: 0, behavior: 'auto' });

            if (target) {
                if (updateHash) history.pushState(null, null, '#' + pageId);
            } else if (updateHash) {
                history.pushState(null, null, '#home');
            } else if ((window.location.hash || '') && window.location.hash !== '#home') {
                history.replaceState(null, null, '#home');
            }

            settlePage();
        }

        let revealObserver = null;
        let colorObserver = null;

        /* OBSERVERS ENGINE COM TECNOLOGIA SENSORIAL */
        function revealInViewport(elements) {
            elements.forEach(function (el) {
                var rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
                    el.classList.add('animate-ready');
                }
            });
        }

        function initObserver() {
            if (revealObserver) revealObserver.disconnect();
            if (colorObserver) colorObserver.disconnect();

            revealObserver = new IntersectionObserver(function (ents) {
                ents.forEach(function (ent) {
                    if (ent.isIntersecting) ent.target.classList.add('animate-ready');
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

            document.querySelectorAll('.page-content:not(.active) .reveal').forEach(function (el) {
                el.classList.remove('animate-ready');
            });

            var activeReveals = document.querySelectorAll('.page-content.active .reveal');
            activeReveals.forEach(function (el) {
                revealObserver.observe(el);
            });

            /* Troca de aba: elementos já visíveis não disparam IO após display:none */
            requestAnimationFrame(function () {
                revealInViewport(activeReveals);
            });

            colorObserver = new IntersectionObserver(function (ents) {
                ents.forEach(function (ent) {
                    ent.target.classList.toggle('active-color', ent.isIntersecting);
                });
            }, { rootMargin: '-20% 0px -20% 0px', threshold: 0.2 });
            document.querySelectorAll('.color-on-focus').forEach(function (img) {
                colorObserver.observe(img);
            });

            document.querySelectorAll('.sensory-text').forEach(function (el) {
                if (el.hasAttribute('data-sensory-bound')) return;
                el.setAttribute('data-sensory-bound', '1');
                sensoryObs.observe(el);
            });
        }

        var sensoryObs = new IntersectionObserver(function (ents) {
            ents.forEach(function (ent) {
                if (ent.isIntersecting) {
                    ent.target.classList.add('sensory-active');
                    if (!ent.target.hasAttribute('data-vibrated')) {
                        var patternStr = ent.target.getAttribute('data-haptic') || '30';
                        triggerHaptic(patternStr.split(',').map(Number));
                        ent.target.setAttribute('data-vibrated', 'true');
                    }
                } else {
                    ent.target.classList.remove('sensory-active');
                    ent.target.removeAttribute('data-vibrated');
                }
            });
        }, { threshold: 0.65 });

        /* MODAIS DE POLÍTICA (LGPD) */
        var lastModalFocus = null;
        var PAGE_ROOTS = ['main-header', 'conteudo', 'site-footer', 'mobile-bottom-nav'];

        function setPageInert(on) {
            PAGE_ROOTS.forEach(function (id) {
                var el = document.getElementById(id);
                if (!el) return;
                if (on) el.setAttribute('inert', '');
                else el.removeAttribute('inert');
            });
        }

        function modalFocusable(modal) {
            return Array.prototype.slice.call(modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(function (el) {
                return !el.disabled && el.offsetParent !== null;
            });
        }

        function openModal(id) {
            var modal = document.getElementById(id);
            if (!modal) return;
            var box = document.getElementById('lgpd-box');
            lastModalFocus = document.activeElement;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
            setPageInert(true);
            setTimeout(function () {
                modal.classList.remove('opacity-0');
                if (box) {
                    box.classList.remove('scale-95');
                    box.classList.add('scale-100');
                }
                var closeBtn = modal.querySelector('[data-modal-close]');
                if (closeBtn) closeBtn.focus();
            }, 10);
        }

        function closeModal(id) {
            var modal = document.getElementById(id);
            if (!modal || modal.classList.contains('hidden')) return;
            var box = document.getElementById('lgpd-box');
            modal.classList.add('opacity-0');
            if (box) {
                box.classList.remove('scale-100');
                box.classList.add('scale-95');
            }
            setTimeout(function () {
                modal.classList.remove('flex');
                modal.classList.add('hidden');
                modal.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('modal-open');
                setPageInert(false);
                if (lastModalFocus && typeof lastModalFocus.focus === 'function') lastModalFocus.focus();
                lastModalFocus = null;
            }, 300);
        }

        document.addEventListener('keydown', function (e) {
            var modal = document.getElementById('lgpd-modal');
            var open = modal && !modal.classList.contains('hidden');
            if (e.key === 'Escape' && open) {
                closeModal('lgpd-modal');
                return;
            }
            if (e.key !== 'Tab' || !open) return;
            var items = modalFocusable(modal);
            if (!items.length) return;
            var first = items[0];
            var last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        });

        document.addEventListener('click', function (e) {
            var modal = document.getElementById('lgpd-modal');
            if (!modal || modal.classList.contains('hidden')) return;
            if (e.target === modal) closeModal('lgpd-modal');
        });

        /* INITIALIZE APPLICATION */
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof window.ER_renderCopyReady === 'function') {
                window.ER_renderCopyReady();
            } else if (typeof window.ER_refreshIcons === 'function') {
                window.ER_refreshIcons();
            }

            window.addEventListener('load', function () {
                if (typeof window.ER_refreshIcons === 'function') window.ER_refreshIcons();
            });
            
            applyBrandTheme();
            initObserver();
            
            document.querySelectorAll('.auto-carousel').forEach(car => {
                const imgs = car.querySelectorAll('.product-image-item');
                let idx = 0;
                if(imgs.length > 1) {
                    setInterval(() => { 
                        imgs[idx].classList.remove('active'); 
                        idx = (idx + 1) % imgs.length; 
                        imgs[idx].classList.add('active'); 
                    }, 4500);
                }
            });

            let initialHash = window.location.hash.replace('#', '');
            navigateTo(initialHash || 'home', false);
        });

        window.addEventListener('hashchange', () => navigateTo(window.location.hash.replace('#', '') || 'home', false));

        /* ==========================================
           TOPBAR DE OFERTAS — timing inteligente
        ========================================== */
        (function initOfferTopbar() {
            var topbar = document.getElementById('offer-topbar');
            var closeBtn = document.getElementById('offer-topbar-close');
            if (!topbar) return;

            var CFG = {
                initialDelay: 8000,
                visibleMs: 6500,
                cooldownMs: 90000,
                scrollThreshold: 320,
                maxShows: 4
            };

            var showCount = 0;
            var hideTimer = null;
            var cooldownUntil = 0;
            var isVisible = false;
            var dismissed = sessionStorage.getItem('er-topbar-dismissed') === '1';

            function canShow() {
                if (dismissed || isVisible || showCount >= CFG.maxShows) return false;
                return Date.now() >= cooldownUntil;
            }

            function setVisible(show) {
                isVisible = show;
                topbar.classList.toggle('is-visible', show);
                topbar.setAttribute('aria-hidden', show ? 'false' : 'true');
                if (show) topbar.removeAttribute('inert');
                else topbar.setAttribute('inert', '');
                document.body.classList.toggle('offer-topbar-visible', show);
                if (show && typeof lucide !== 'undefined') lucide.createIcons();
            }

            function hideTopbar() {
                if (!isVisible) return;
                clearTimeout(hideTimer);
                setVisible(false);
                cooldownUntil = Date.now() + CFG.cooldownMs;
                setTimeout(function () {
                    if (canShow() && window.scrollY >= CFG.scrollThreshold) {
                        showTopbar();
                    }
                }, CFG.cooldownMs + 200);
            }

            function showTopbar() {
                if (!canShow()) return;
                showCount += 1;
                setVisible(true);
                clearTimeout(hideTimer);
                hideTimer = setTimeout(hideTopbar, CFG.visibleMs);
            }

            function onScroll() {
                if (dismissed) return;
                if (window.scrollY >= CFG.scrollThreshold && canShow()) {
                    showTopbar();
                }
            }

            if (closeBtn) {
                closeBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    dismissed = true;
                    sessionStorage.setItem('er-topbar-dismissed', '1');
                    hideTopbar();
                });
            }

            var openBtn = document.getElementById('offer-topbar-open');
            if (openBtn) {
                openBtn.addEventListener('click', function () {
                    navigateTo('alisamentos');
                    hideTopbar();
                });
            }

            if (!dismissed) {
                setTimeout(function () {
                    if (canShow()) showTopbar();
                }, CFG.initialDelay);
            }

            window.addEventListener('scroll', onScroll, { passive: true });
        })();

        /* Rastreadores prontos, sem aviso: Analytics e Meta ainda não estão ligados. */
        (function initConsent() {
            var loaded = false;

            function loadTrackers() {
                if (loaded) return;
                loaded = true;

                window.dataLayer = window.dataLayer || [];
                window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
                window.gtag('js', new Date());
                window.gtag('config', 'G-YM0GRZT53S');
                var ga = document.createElement('script');
                ga.async = true;
                ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-YM0GRZT53S';
                document.head.appendChild(ga);

                if (window.fbq) return;
                var fbq = window.fbq = function () {
                    fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
                };
                if (!window._fbq) window._fbq = fbq;
                fbq.push = fbq;
                fbq.loaded = true;
                fbq.version = '2.0';
                fbq.queue = [];
                var pixel = document.createElement('script');
                pixel.async = true;
                pixel.src = 'https://connect.facebook.net/en_US/fbevents.js';
                var first = document.getElementsByTagName('script')[0];
                first.parentNode.insertBefore(pixel, first);
                fbq('init', '1774324669888258');
                fbq('track', 'PageView');
            }

            window.ER_loadTrackers = loadTrackers;
        })();
