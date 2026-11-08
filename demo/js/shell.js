(function () {
  const SCREENS = [
    { id: 'inicio',       mode: 'cliente', t: 'Inicio',               s: 'Bienvenida y reserva rápida', tip: 'Así ve su salón la clienta: reserva en menos de un minuto, cupo express, probador de colores y tendencias.' },
    { id: 'disenos',      mode: 'cliente', t: 'Catálogo de diseños',  s: 'Filtros y precios claros',    tip: 'La clienta explora diseños por estilo y silueta, ve precio y duración antes de reservar.' },
    { id: 'servicio',     mode: 'cliente', t: 'Servicio y diseño',    s: 'Paso 1 de la reserva',        tip: 'La clienta elige el servicio y suma un diseño de autor. El total y la duración se actualizan al instante.' },
    { id: 'horario',      mode: 'cliente', t: 'Especialista y horario', s: 'Paso 2 · horarios libres',  tip: 'Elige la especialista y el día. Solo se ven horarios libres según la duración del servicio; lo ocupado o bloqueado por la dueña no aparece.' },
    { id: 'reserva',      mode: 'cliente', t: 'Depósito y pago',      s: 'Paso 3 de la reserva',             tip: 'Depósito de COP 20.000 que se descuenta del servicio. Quien paga, llega. Toca "Pagar depósito".' },
    { id: 'confirmacion', mode: 'cliente', t: 'Confirmación',         s: 'WhatsApp automático',         tip: 'La cita queda confirmada y llega un mensaje por WhatsApp. Toca "Ver cómo le llega a la dueña".' },
    { id: 'citas',        mode: 'cliente', t: 'Mis citas',            s: 'Reprogramar y repetir',       tip: 'La clienta reprograma, cancela o repite su cita sin llamar al salón.' },
    { id: 'tienda',       mode: 'cliente', t: 'Tienda y regalos',     s: 'Productos y gift cards',      tip: 'Ingresos extra las 24 horas: productos para llevar a casa y tarjetas de regalo.' },
    { id: 'perfil',       mode: 'cliente', t: 'Perfil y membresía',   s: 'Club y recordatorios',        tip: 'Membresía mensual con consumo visible y avisos de retoque cada 2 a 3 semanas.' },
    { id: 'agenda',       mode: 'duena',   t: 'Agenda de hoy',        s: 'La cita llega sola',          tip: 'Aquí aparece la reserva de la clienta al instante. Marca llegadas, filtra por manicurista y bloquea horarios.' },
    { id: 'servicios',    mode: 'duena',   t: 'Servicios y diseños',  s: 'Cambia un precio en vivo',    tip: 'Toca "Editar" en el Manicure Semipermanente, cambia el precio y guarda. La app de la clienta lo refleja al instante.' },
    { id: 'pedidos',      mode: 'duena',   t: 'Boutique y gift cards',s: 'Inventario y pedidos',        tip: 'Inventario con alertas de stock bajo, pedidos por recoger en cabina y saldo de tarjetas de regalo.' },
    { id: 'reportes',     mode: 'duena',   t: 'Finanzas',             s: 'Ingresos y ausencias',        tip: 'Cambia entre Hoy, Semana y Mes. Ve ingresos, servicios más rentables y ausencias contra depósitos cobrados.' },
    { id: 'whatsapp',     mode: 'duena',   t: 'Ajustes y WhatsApp',   s: 'Depósito y mensajes',         tip: 'Define el depósito, la política de cancelación y los mensajes automáticos de WhatsApp.' },
  ];
  const $ = (s) => document.querySelector(s);
  const frame = $('#frame'), device = $('#device'), list = $('#list');
  let mode = 'cliente', cur = null, hist = [];
  let state = { prices: {}, arrived: {}, blocked: {}, booking: null, sel: null };
  try { Object.assign(state, JSON.parse(sessionStorage.getItem('petalo-demo') || '{}')); } catch (e) {}
  const pushState = () => { try { frame.contentWindow.postMessage({ demoState: state }, '*'); } catch (e) {} };
  const saveState = () => { try { sessionStorage.setItem('petalo-demo', JSON.stringify(state)); } catch (e) {} };

  function render() {
    list.innerHTML = SCREENS.filter((s) => s.mode === mode).map((s, i) =>
      `<button class="item ${cur === s.id ? 'on' : ''}" data-id="${s.id}"><i>${i + 1}</i><span><b>${s.t}</b><small>${s.s}</small></span></button>`).join('');
    list.querySelectorAll('.item').forEach((b) => (b.onclick = () => go(b.dataset.id)));
    $('#mCliente').classList.toggle('on', mode === 'cliente');
    $('#mDuena').classList.toggle('on', mode === 'duena');
    const s = SCREENS.find((x) => x.id === cur);
    $('#tip').innerHTML = s ? `<b>Qué mostrar</b>${s.tip}` : '';
    $('#reset').style.display = state.booking || state.sel || Object.keys(state.prices).length || Object.keys(state.blocked).length ? '' : 'none';
  }
  function fit() {
    const st = $('#stage').getBoundingClientRect();
    const w = 390 + 22, h = 844 + 22;
    const k = Math.min(1, (st.width - 24) / w, (st.height - 24) / h);
    device.style.transform = `scale(${k})`;
    device.style.margin = `${-(h * (1 - k)) / 2}px ${-(w * (1 - k)) / 2}px`;
  }
  function go(id, push = true) {
    const s = SCREENS.find((x) => x.id === id); if (!s) return;
    if (push && cur && cur !== id) hist.push(cur);
    cur = id; mode = s.mode;
    frame.src = `screens/${id}.html`;
    try { history.replaceState(null, '', '#' + id); } catch (e) {}
    render(); fit();
  }
  function setMode(m) { if (m !== mode) go(SCREENS.find((s) => s.mode === m).id); }

  addEventListener('message', (e) => {
    if (e.source !== frame.contentWindow || !e.data || !e.data.demo) return;
    const d = e.data;
    if (d.set) { state = Object.assign({}, state, d.set); saveState(); pushState(); render(); }
    if (d.mode) { mode = d.mode; }
    if (d.go) go(d.go);
    else if (d.back) { const p = hist.pop(); if (p) go(p, false); }
    else if (d.mode) setMode(d.mode);
    if (d.ready) pushState();
  });
  $('#mCliente').onclick = () => setMode('cliente');
  $('#mDuena').onclick = () => setMode('duena');
  $('#reset').onclick = () => { state = { prices: {}, arrived: {}, blocked: {}, booking: null, sel: null }; saveState(); hist = []; go('inicio', false); };
  addEventListener('resize', fit);
  new ResizeObserver(fit).observe($('#stage'));
  addEventListener('hashchange', () => { const id = location.hash.slice(1); if (id && id !== cur) go(id); });

  go(SCREENS.some((s) => s.id === location.hash.slice(1)) ? location.hash.slice(1) : 'inicio', false);
})();
