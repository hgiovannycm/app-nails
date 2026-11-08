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

  /* ---------- Datos de ejemplo compartidos por todas las pantallas ---------- */
  const DATA = (DEMO.data = {
    DAY_FULL: ['Viernes', 'Sábado', 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves'],
    DAY_SHORT: ['Vie', 'Sáb', 'Dom', 'Lun', 'Mar', 'Mié', 'Jue'],
    DAY_NUM: [20, 21, 22, 23, 24, 25, 26],
    NOW: 10 * 60 + 30, OPEN: 9 * 60, CLOSE: 19 * 60, DEPOSIT: 20000,
    STAFF: [
      { id: 'val', name: 'Valeria Martínez', short: 'Valeria M.', first: 'Valeria', role: 'Acrílicas y nail art 3D', rating: '4.9', img: '../img/fd5d0c52d98e.jpg' },
      { id: 'cam', name: 'Camila Restrepo',  short: 'Camila R.',  first: 'Camila',  role: 'French, cromo y ojo de gato', rating: '5.0', img: '../img/2c8f83370437.jpg' },
      { id: 'sof', name: 'Sofía Gómez',      short: 'Sofía G.',   first: 'Sofía',   role: 'Pedicure spa y gel', rating: '4.9', img: '../img/fe4166f8bd90.jpg' },
    ],
    SERVICES: [
      { id: 'semi', name: 'Manicure Semipermanente', min: 60, price: 60000, icon: 'brush' },
      { id: 'acril', name: 'Acrílicas / Gel Sculpt', min: 120, price: 130000, icon: 'diamond' },
      { id: 'pedi', name: 'Pedicure Spa Delux', min: 75, price: 75000, icon: 'water_drop' },
      { id: 'combo', name: 'Ritual Manicure + Pedicure', min: 120, price: 120000, icon: 'auto_awesome' },
      { id: 'retiro', name: 'Retiro Cuidadoso & Keratina', min: 20, price: 25000, icon: 'healing' },
    ],
    DESIGNS: [
      { id: 'rosa', name: 'Rosa Pétalo', extra: 25000, min: 35, img: '../img/c2868dd773d7.jpg' },
      { id: 'cromo', name: 'Cromo Perla', extra: 15000, min: 25, img: '../img/13a1436f1c54.jpg' },
      { id: 'french', name: 'French Clásico', extra: 10000, min: 30, img: '../img/f605395d43e2.jpg' },
      { id: 'ojo', name: 'Ojo de Gato Rosé', extra: 35000, min: 40, img: '../img/556f626283cc.jpg' },
      { id: 'glitter', name: 'Glitter Champán', extra: 20000, min: 30, img: '../img/fef39e2139cb.jpg' },
      { id: 'aurora', name: 'Aurora Lila', extra: 45000, min: 45, img: '../img/6cc3241f326c.jpg' },
    ],
    SEED: [
      { id: 'a1', h: 9, m: 0, min: 120, name: 'Carolina Morales', svc: 'Acrílicas / Gel Sculpt', staff: 'val', total: 130000, paid: true },
      { id: 'a2', h: 10, m: 0, min: 75, name: 'Mariana Gómez', svc: 'Pedicure Spa Delux', staff: 'sof', total: 75000, paid: true },
      { id: 'a3', h: 12, m: 30, min: 90, name: 'Camila Torres', svc: 'Manicure Semipermanente + Wine Chrome', staff: 'cam', total: 95000, paid: true },
      { id: 'a4', h: 14, m: 0, min: 120, name: 'Laura Méndez', svc: 'Ritual Manicure + Pedicure', staff: 'sof', total: 120000, paid: false },
      { id: 'a5', h: 15, m: 30, min: 75, name: 'Daniela Ríos', svc: 'Manicure Semipermanente + French Black', staff: 'cam', total: 75000, paid: true },
      { id: 'a6', h: 17, m: 0, min: 20, name: 'Isabela Cruz', svc: 'Retiro Cuidadoso & Keratina', staff: 'val', total: 25000, paid: true },
    ],
  });
  DATA.fmtMin = (t) => { const h = Math.floor(t / 60), m = t % 60, hh = ((h + 11) % 12) + 1; return hh + ':' + String(m).padStart(2, '0') + ' ' + (h >= 12 ? 'PM' : 'AM'); };
  DATA.cop = (n) => 'COP ' + new Intl.NumberFormat('es-CO').format(n);
  DATA.sel = () => Object.assign({ service: 'semi', design: 'rosa', staff: 'val', day: 0, time: null }, DEMO.state.sel || {});
  DATA.price = (id) => (DEMO.state.prices && DEMO.state.prices[id]) || DATA.SERVICES.find((x) => x.id === id).price;
  DATA.summary = (sel) => {
    sel = sel || DATA.sel();
    const svc = DATA.SERVICES.find((x) => x.id === sel.service), des = DATA.DESIGNS.find((x) => x.id === sel.design) || null;
    const price = DATA.price(svc.id), total = price + (des ? des.extra : 0), min = svc.min + (des ? des.min : 0);
    return { svc, des, price, total, min, staff: DATA.STAFF.find((x) => x.id === sel.staff) };
  };
  // Intervalos ocupados de una prestadora en un día: citas, reserva nueva y bloqueos de la dueña
  DATA.busy = (staff, day) => {
    const out = [], st = DEMO.state, idx = DATA.STAFF.findIndex((x) => x.id === staff);
    if (day === 0) {
      DATA.SEED.filter((x) => x.staff === staff).forEach((x) => out.push([x.h * 60 + x.m, x.h * 60 + x.m + x.min]));
      Object.keys(st.blocked || {}).forEach((k) => { if (st.blocked[k] && k.split('|')[0] === staff) { const h = +k.split('|')[1]; out.push([h * 60, h * 60 + 60]); } });
    } else {
      for (let i = 0; i < 9; i++) if ((day * 7 + idx * 3 + i * 5) % 6 === 0) out.push([(9 + i) * 60, (9 + i) * 60 + (i % 2 ? 90 : 60)]);
    }
    const b = st.booking;
    if (b && (b.day || 0) === day && b.staff === staff) { const t = b.time.split(':'); const s0 = +t[0] * 60 + +t[1]; out.push([s0, s0 + (b.min || 60)]); }
    return out;
  };
  DATA.slotState = (staff, day, start, dur) => {
    if (day === 0 && start < DATA.NOW) return 'past';
    if (start + dur > DATA.CLOSE) return 'closed';
    return DATA.busy(staff, day).some(([a, b]) => start < b && start + dur > a) ? 'busy' : 'free';
  };
  DATA.slots = () => { const r = []; for (let t = DATA.OPEN; t < DATA.CLOSE; t += 30) r.push(t); return r; };
  DATA.nextFree = (staff, day, dur) => DATA.slots().find((t) => DATA.slotState(staff, day, t, dur) === 'free');

  addEventListener('message', (e) => {
    if (e.source !== parent || !e.data || !e.data.demoState) return;
    DEMO.state = e.data.demoState;
    if (mode === 'cliente') applyPrices();
    dispatchEvent(new Event('demo-state'));
  });

  /* ---------- Rutas ---------- */
  const PATHS = {
    inicio: 'inicio', disenos: 'disenos', reservar: 'servicio', tienda: 'tienda', perfil: 'perfil',
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
      const sel = DATA.sel(), sm = DATA.summary(sel);
      const time = sel.time != null ? sel.time : 11 * 60 + 30;
      const hh = String(Math.floor(time / 60)).padStart(2, '0') + ':' + String(time % 60).padStart(2, '0');
      DEMO.set({ booking: { name: 'Sofía Restrepo', service: sm.svc.name + (sm.des ? ' + ' + sm.des.name : ''), time: hh, day: sel.day, staff: sel.staff, total: sm.total, min: sm.min }, arrived: {} });
      go('confirmacion');
    }],
    [/Ver Mis Citas|Mis Citas/i, () => go('citas')],
    [/^Modificar$/i, () => go('servicio')],
    [/Reprogramar/i, () => go('horario')],
    [/Reservar ahora|Tomar turno|Agendar mi momento|Elegir|Repetir esta cita/i, () => { DEMO.set({ sel: Object.assign({}, DATA.sel(), { time: null }) }); go('servicio'); }],
    [/Reservar dise/i, (el) => {
      let c = el, d = null;
      for (let i = 0; i < 8 && c && !d; i++, c = c.parentElement) { const t = c.textContent; if ((t.match(/COP/g) || []).length <= 2) d = DATA.DESIGNS.find((x) => t.includes(x.name)); }
      DEMO.set({ sel: Object.assign({}, DATA.sel(), { service: 'semi', design: d ? d.id : 'rosa', time: null }) }); go('servicio');
    }],
    [/Ver dise|Ver cat[aá]logo/i, () => go('disenos')],
    [/Ver Bolsa/i, () => toast('Tu bolsa: 2 productos')],
    [/Comprar Tarjeta/i, () => toast('Tarjeta de regalo añadida a la bolsa')],
    [/A[ñn]adir|^\s*add\s*$|Bolsa\s*add/i, () => { bump(); toast('Añadido a tu bolsa'); }],
    [/Abrir en WhatsApp|^\s*chat\s*WhatsApp/i, () => toast('Se abriría WhatsApp (simulado)')],
    [/Calendar|Al Calendario/i, () => toast('Cita añadida al calendario (simulado)')],
    [/Confirmar Cancelaci/i, () => toast('Cita cancelada (simulado)')],
    [/Conservar mi cita/i, () => toast('Tu cita sigue confirmada')],
    [/Dejar rese/i, () => toast('Gracias por tu reseña (simulado)')],
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

  /* ---------- Clienta: la selección y los precios de la dueña se reflejan en las pantallas ---------- */
  const origText = new WeakMap();
  function applyPrices() {
    if (!['reserva', 'confirmacion', 'citas'].includes(screen)) return;
    const sel = DATA.sel(), sm = DATA.summary(sel), has = !!DEMO.state.sel;
    const day = sel.day, time = sel.time != null ? sel.time : 11 * 60 + 30;
    const money = { 60000: sm.price, 85000: sm.total, 65000: sm.total - DATA.DEPOSIT, 25000: sm.des ? sm.des.extra : 0 };
    const usdOf = (k) => (money[k] / 4000).toFixed(2);
    const pairs = has ? [
      ['Manicure Semipermanente', sm.svc.name], ['Rosa Pétalo Chrome', sm.des ? sm.des.name : 'Sin arte añadido'],
      ['Valeria Martínez', sm.staff.name], ['Valeria M.', sm.staff.short], ['Valeria', sm.staff.first],
      ['11:30 AM', DATA.fmtMin(time)], ['Viernes, 20 de Noviembre', DATA.DAY_FULL[day] + ', ' + DATA.DAY_NUM[day] + ' de Noviembre'],
      ['Viernes 20 Nov', DATA.DAY_FULL[day] + ' ' + DATA.DAY_NUM[day] + ' Nov'], ['Vie 20 Nov', DATA.DAY_SHORT[day] + ' ' + DATA.DAY_NUM[day] + ' Nov'],
      ['+30 min', '+' + (sm.des ? sm.des.min : 0) + ' min'], ['60 min', sm.svc.min + ' min'], ['90 min', sm.min + ' min'],
      ['En 2 días', day === 0 ? 'Hoy' : 'En ' + day + (day === 1 ? ' día' : ' días')],
    ] : [];
    const cut = screen === 'citas' ? [...document.querySelectorAll('h2, h3')].find((h) => /Historial Reciente/i.test(h.textContent)) : null;
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      if (cut && (cut.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING)) continue; // no tocar el historial
      if (!origText.has(n)) {
        const v = n.nodeValue;
        origText.set(n, /COP|USD|min|Manicure Semipermanente|Rosa Pétalo Chrome|Valeria|11:30 AM|20 de Noviembre|20 Nov|En 2 días/.test(v) ? v : null);
      }
      const o = origText.get(n); if (o === null) continue;
      let v = o
        .replace(/COP\s?([\d.]+)/g, (m, x) => { const k = +x.replace(/\./g, ''); return k in money ? 'COP ' + new Intl.NumberFormat('es-CO').format(money[k]) : m; })
        .replace(/\$([\d.]+)(\s*USD)/g, (m, x, u) => { const k = Math.round(parseFloat(x) * 4000); return k in money ? '$' + usdOf(k) + u : m; });
      pairs.forEach(([f, t]) => { if (v.includes(f)) v = v.split(f).join(t); });
      n.nodeValue = v;
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
        const svcRow = DATA.SERVICES.find((x) => x.name === cur);
        if (svcRow) DEMO.set({ prices: Object.assign({}, DEMO.state.prices, { [svcRow.id]: val }) });
        os && os();
        toast(svcRow ? '✓ Precio actualizado en la app de tus clientas' : '✓ Cambio guardado');
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
