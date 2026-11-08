/* Conecta las pantallas de Stitch como prototipo clicable.
   Se inyecta dentro de cada pantalla y habla con el marco (index.html) por postMessage.
   El estado compartido (cita reservada, horarios bloqueados, precios) vive en el marco. */
(function () {
  const meta = (n) => (document.querySelector('meta[name="' + n + '"]') || {}).content;
  const screen = meta('demo-screen'), mode = meta('demo-mode');
  const send = (m) => parent.postMessage(Object.assign({ demo: true }, m), '*');
  const go = (to) => send({ go: to });

  /* ---------- Estado compartido y avisos ---------- */
  let tEl;
  function toast(msg) {
    if (!tEl) {
      tEl = document.createElement('div');
      tEl.style.cssText = 'position:fixed;left:50%;bottom:92px;transform:translate(-50%,20px);opacity:0;z-index:99999;background:rgba(31,20,24,.94);color:#fff;font:600 13px "Plus Jakarta Sans",system-ui,sans-serif;padding:11px 18px;border-radius:999px;box-shadow:0 12px 30px rgba(0,0,0,.25);transition:.3s;max-width:88vw;text-align:center;pointer-events:none';
      document.body.appendChild(tEl);
    }
    tEl.textContent = msg; tEl.style.opacity = 1; tEl.style.transform = 'translate(-50%,0)';
    clearTimeout(toast.t); toast.t = setTimeout(() => { tEl.style.opacity = 0; tEl.style.transform = 'translate(-50%,20px)'; }, 2400);
  }
  const DEMO = (window.DEMO = { state: {}, toast, go, set: (patch) => send({ set: patch }) });

  addEventListener('message', (e) => {
    if (e.source !== parent || !e.data || !e.data.demoState) return;
    DEMO.state = e.data.demoState;
    if (mode === 'cliente') applyPrices();
    dispatchEvent(new Event('demo-state'));
  });

  /* ---------- Rutas ---------- */
  const PATHS = {
    inicio: 'inicio', disenos: 'disenos', reservar: 'reserva', tienda: 'tienda', perfil: 'perfil',
    agenda: 'agenda', servicios: 'servicios', boutique: 'pedidos', finanzas: 'reportes', ajustes: 'whatsapp',
  };

  /* ---------- Clienta: reglas por texto del botón ---------- */
  function bump() {
    document.querySelectorAll('button, a').forEach((b) => {
      if (/shopping_bag/.test(b.textContent)) {
        const n = [...b.querySelectorAll('span')].find((s) => /^\d+$/.test(s.textContent.trim()));
        if (n) n.textContent = +n.textContent + 1;
      }
    });
  }
  const RULES = [
    [/Pagar dep[oó]sito/i, () => {
      DEMO.set({ booking: { name: 'Sofía Restrepo', service: 'Manicure Semipermanente + Rosa Pétalo Chrome', time: '11:30', staff: 'val', total: (DEMO.state.prices && DEMO.state.prices.semi ? DEMO.state.prices.semi : 60000) + 25000 }, arrived: {} });
      go('confirmacion');
    }],
    [/Ver Mis Citas|Mis Citas/i, () => go('citas')],
    [/Reservar ahora|Reservar dise|Tomar turno|Agendar mi momento|Reprogramar|Elegir/i, () => go('reserva')],
    [/Ver dise|Ver cat[aá]logo/i, () => go('disenos')],
    [/Ver Bolsa/i, () => toast('Tu bolsa: 2 productos')],
    [/Comprar Tarjeta/i, () => toast('Tarjeta de regalo añadida a la bolsa')],
    [/A[ñn]adir|^\s*add\s*$|Bolsa\s*add/i, () => { bump(); toast('Añadido a tu bolsa'); }],
    [/Abrir en WhatsApp|^\s*chat\s*WhatsApp/i, () => toast('Se abriría WhatsApp (simulado)')],
    [/Calendar|Al Calendario/i, () => toast('Cita añadida al calendario (simulado)')],
    [/Confirmar Cancelaci/i, () => toast('Cita cancelada (simulado)')],
    [/Conservar mi cita/i, () => toast('Tu cita sigue confirmada')],
    [/Dejar rese/i, () => toast('Gracias por tu reseña (simulado)')],
    [/Repetir esta cita/i, () => go('reserva')],
    [/Cerrar Sesi/i, () => toast('Sesión cerrada (simulado)')],
    [/Canjear/i, () => toast('Saldo de gift card aplicado (simulado)')],
    [/Servicios$|^\s*spa\s*Servicios/i, () => go('inicio')],
    [/Tienda/i, () => go('tienda')],
  ];

  document.addEventListener('click', (e) => {
    const el = e.target.closest('a, button');
    if (!el) return;
    const dp = el.getAttribute('data-path');
    if (dp) {
      e.preventDefault();
      if (PATHS[dp]) return go(PATHS[dp]);
      return toast('Disponible en la versión completa de la app');
    }
    if (mode !== 'cliente') return; // el panel de la dueña usa los scripts propios de cada pantalla
    if (el.matches('input,label')) return;
    e.preventDefault();
    const txt = el.textContent.replace(/\s+/g, ' ').trim();
    if (/^arrow_back_ios_new/.test(txt)) return send({ back: true });
    if (/^shopping_bag/.test(txt)) return go('tienda');
    if (/^notifications/.test(txt)) return toast('No tienes notificaciones nuevas');
    if (/^person$/.test(txt)) return go('perfil');
    if (/^favorite$/.test(txt)) {
      const ic = el.querySelector('.material-symbols-outlined');
      if (ic) { const on = ic.style.fontVariationSettings.includes("'FILL' 1"); ic.style.fontVariationSettings = on ? "'FILL' 0" : "'FILL' 1"; ic.style.color = on ? '' : '#c4487a'; toast(on ? 'Quitado de favoritos' : 'Guardado en favoritos'); }
      return;
    }
    for (const [re, fn] of RULES) { if (re.test(txt)) return fn(el); }
    // Chips / filtros: pasa el estado activo al elegido
    const parent = el.parentElement;
    if (parent && txt.length < 28) {
      const sibs = [...parent.children].filter((c) => c.tagName === el.tagName);
      if (sibs.length > 1) {
        const active = sibs.find((c) => /bg-primary(?!-)|bg-secondary-container|bg-on-surface|bg-black/.test(c.className));
        if (active && active !== el) { const a = active.className; active.className = el.className; el.className = a; }
      }
    }
  }, true);

  /* ---------- Clienta: precio de la dueña reflejado en la app ---------- */
  const origText = new WeakMap();
  function applyPrices() {
    const semi = DEMO.state.prices && DEMO.state.prices.semi;
    const delta = semi ? semi - 60000 : 0;
    const money = { 60000: 60000 + delta, 85000: 85000 + delta, 65000: 65000 + delta };
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      if (!origText.has(n)) { if (!/COP\s?[\d.]+|\$[\d.]+\s*USD/.test(n.nodeValue)) { origText.set(n, null); continue; } origText.set(n, n.nodeValue); }
      const o = origText.get(n); if (o === null) continue;
      n.nodeValue = o
        .replace(/COP\s?([\d.]+)/g, (m, v) => { const k = +v.replace(/\./g, ''); return money[k] ? 'COP ' + new Intl.NumberFormat('es-CO').format(money[k]) : m; })
        .replace(/\$([\d.]+)(\s*USD)/g, (m, v, u) => { const k = Math.round(parseFloat(v) * 4000); return money[k] ? '$' + (money[k] / 4000).toFixed(2) + u : m; });
    }
  }

  /* ---------- Mejoras por pantalla ---------- */
  function onReady(fn) { if (document.readyState !== 'loading') fn(); else addEventListener('DOMContentLoaded', fn); }

  onReady(() => {
    // Confirmación: puente hacia la agenda de la dueña
    if (screen === 'confirmacion') {
      const b = [...document.querySelectorAll('button, a')].find((x) => /Ver Mis Citas/.test(x.textContent));
      if (b) {
        const p = document.createElement('button');
        p.textContent = 'Ver cómo le llega a la dueña →';
        p.style.cssText = 'display:block;width:100%;margin-top:10px;padding:13px 16px;border-radius:9999px;background:#fce7ed;color:#5e3e43;font:700 14px "Plus Jakarta Sans",sans-serif;border:1px solid #fff;box-shadow:0 6px 16px rgba(247,202,208,.5)';
        p.onclick = (e) => { e.preventDefault(); e.stopPropagation(); send({ mode: 'duena', go: 'agenda' }); };
        b.insertAdjacentElement('afterend', p);
      }
    }

    // Servicios: la edición cambia el precio en la lista, en la vista previa y en la app de la clienta
    if (screen === 'servicios') {
      let cur = null;
      const oe = window.openEditDrawer;
      if (oe) window.openEditDrawer = function (t) { cur = String(t).replace('&amp;', '&'); return oe.apply(this, arguments); };
      const os = window.saveChanges;
      window.saveChanges = function () {
        const input = document.getElementById('edit-input-cop');
        const val = Math.max(0, +(input && input.value) || 0);
        const h = [...document.querySelectorAll('h2')].find((x) => x.textContent.trim() === cur);
        if (h) {
          let card = h; const isPrice = (s) => /^COP\s[\d.]+$/.test(s.textContent.trim());
          while (card && ![...card.querySelectorAll('span')].some(isPrice)) card = card.parentElement;
          if (card) {
            const ps = [...card.querySelectorAll('span')].find(isPrice);
            const old = ps.textContent.trim();
            const f = (n) => 'COP ' + new Intl.NumberFormat('es-CO').format(n);
            ps.textContent = f(val);
            if (ps.nextElementSibling) ps.nextElementSibling.textContent = '~$' + (val / 4000).toFixed(2) + ' USD';
            const pv = document.getElementById('preview-content');
            if (pv) {
              const w = document.createTreeWalker(pv, NodeFilter.SHOW_TEXT); let t;
              while ((t = w.nextNode())) { if (t.nodeValue.includes(old)) t.nodeValue = t.nodeValue.replace(old, f(val)); else { const oldShort = old.replace('COP ', ''); if (t.nodeValue.includes('$' + oldShort)) t.nodeValue = t.nodeValue.replace('$' + oldShort, '$' + new Intl.NumberFormat('es-CO').format(val)); } }
            }
          }
        }
        if (cur === 'Manicure Semipermanente') DEMO.set({ prices: Object.assign({}, DEMO.state.prices, { semi: val }) });
        os && os();
        toast(cur === 'Manicure Semipermanente' ? '✓ Precio actualizado en la app de tus clientas' : '✓ Cambio guardado');
      };
      window.triggerUploadModal = () => toast('Se abriría la galería para subir una foto (simulado)');
      // Diseños: activar u ocultar
      document.querySelectorAll('#section-disenos span').forEach((s) => {
        if (/^\s*Activo\s*$/.test(s.textContent)) {
          s.style.cursor = 'pointer';
          s.addEventListener('click', () => { const on = /Activo/.test(s.textContent); s.textContent = on ? 'Oculto' : 'Activo'; s.style.opacity = on ? '.55' : '1'; toast(on ? 'Diseño oculto en la app' : 'Diseño visible en la app'); });
        }
      });
    }

    // Finanzas: los periodos cambian las cifras
    if (screen === 'reportes') {
      const SETS = {
        0: [['COP 18.450.000', 'COP 890.000'], ['≈ $4.612 USD tasa liquidada', '≈ $222 USD tasa liquidada'], ['+18.4%', '+6.1%'], ['COP 3.86M', 'COP 0.16M'], ['COP 2.15M', 'COP 90K'], ['meta mensual', 'meta diaria'], ['214', '8', 1], ['/ 221', '/ 9']],
        1: [['COP 18.450.000', 'COP 4.320.000'], ['≈ $4.612 USD tasa liquidada', '≈ $1.080 USD tasa liquidada'], ['+18.4%', '+9.7%'], ['COP 3.86M', 'COP 0.92M'], ['COP 2.15M', 'COP 540K'], ['meta mensual', 'meta semanal'], ['214', '51', 1], ['/ 221', '/ 53']],
      };
      const orig = new WeakMap();
      const apply = (i) => {
        const set = SETS[i] || [];
        const w = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT); let n;
        while ((n = w.nextNode())) {
          if (!orig.has(n)) orig.set(n, n.nodeValue);
          let v = orig.get(n);
          set.forEach(([a, b, exact]) => { if (exact ? v.trim() === a : v.includes(a)) v = exact ? v.replace(a, b) : v.split(a).join(b); });
          n.nodeValue = v;
        }
      };
      document.querySelectorAll('.time-pill').forEach((b, i) => b.addEventListener('click', () => { if (i < 3) apply(i === 2 ? -1 : i); }));
    }

    // Boutique: filtros de pedidos y reposición
    if (screen === 'pedidos') {
      const isId = (s) => /^#BOUT-/.test(s.textContent.trim());
      const spans = [...document.querySelectorAll('span')].filter(isId);
      const cards = spans.map((sp) => { let c = sp; while (c.parentElement && [...c.parentElement.querySelectorAll('span')].filter(isId).length < spans.length) c = c.parentElement; return c; });
      cards.forEach((c) => { c.dataset.kind = /Cabina/i.test(c.textContent) ? 'cabina' : 'envios'; });
      document.querySelectorAll('.filter-tab').forEach((b) => b.addEventListener('click', () => {
        const t = b.dataset.target; cards.forEach((c) => { c.style.display = t === 'all' || c.dataset.kind === t ? '' : 'none'; });
      }));
      document.querySelectorAll('button').forEach((b) => {
        if (/(^|\s)(Reponer|Pedir)\s*$/.test(b.textContent)) b.addEventListener('click', () => { b.textContent = '✓ Pedido enviado'; b.style.opacity = '.7'; toast('Pedido enviado al laboratorio'); });
        if (/Emitir/.test(b.textContent)) b.addEventListener('click', () => toast('Certificado emitido y enviado por WhatsApp'));
      });
    }

    if (mode === 'cliente') applyPrices();
    send({ ready: screen });
  });
})();
