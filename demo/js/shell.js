(function () {
  const SCREENS = [
    { id: 'inicio',       mode: 'cliente', t: 'Inicio',               s: 'Bienvenida y reserva rápida', tip: 'Así ve su salón la clienta: reserva en menos de un minuto, cupo express, probador de colores y tendencias.' },
    { id: 'disenos',      mode: 'cliente', t: 'Catálogo de diseños',  s: 'Filtros y precios claros',    tip: 'La clienta explora diseños por estilo y silueta, ve precio y duración antes de reservar.' },
    { id: 'reserva',      mode: 'cliente', t: 'Reserva con depósito', s: 'Desglose y pago',             tip: 'Depósito de COP 20.000 que se descuenta del servicio. Quien paga, llega. Toca "Pagar depósito".' },
    { id: 'confirmacion', mode: 'cliente', t: 'Confirmación',         s: 'WhatsApp automático',         tip: 'La cita queda confirmada y llega un mensaje por WhatsApp con recordatorio 24 horas antes.' },
    { id: 'citas',        mode: 'cliente', t: 'Mis citas',            s: 'Reprogramar y repetir',       tip: 'La clienta reprograma, cancela o repite su cita sin llamar al salón.' },
    { id: 'tienda',       mode: 'cliente', t: 'Tienda y regalos',     s: 'Productos y gift cards',      tip: 'Ingresos extra las 24 horas: productos para llevar a casa y tarjetas de regalo.' },
    { id: 'perfil',       mode: 'cliente', t: 'Perfil y membresía',   s: 'Club y recordatorios',        tip: 'Membresía mensual con consumo visible y avisos de retoque cada 2 a 3 semanas.' },
    { id: 'servicios',    mode: 'duena',   t: 'Servicios y precios',  s: 'Cambios en vivo',             tip: 'Cambia un precio o activa un servicio y se actualiza en la app de las clientas. Mira la vista previa a la derecha.' },
    { id: 'reportes',     mode: 'duena',   t: 'Reportes financieros', s: 'Ingresos y ausencias',        tip: 'Ingresos, servicios más rentables, ausencias contra depósitos cobrados y clientas recurrentes.' },
    { id: 'whatsapp',     mode: 'duena',   t: 'Depósito y WhatsApp',  s: 'Políticas y plantillas',      tip: 'Define el depósito, la política de cancelación y los mensajes automáticos de WhatsApp.' },
    { id: 'pedidos',      mode: 'duena',   t: 'Tienda y gift cards',  s: 'Inventario y pedidos',        tip: 'Inventario con alertas de stock bajo, pedidos por recoger en cabina y saldo de tarjetas de regalo.' },
  ];
  const $ = (s) => document.querySelector(s);
  const frame = $('#frame'), device = $('#device'), list = $('#list');
  let mode = 'cliente', cur = null, hist = [];

  function render() {
    list.innerHTML = SCREENS.filter((s) => s.mode === mode).map((s, i) =>
      `<button class="item ${cur === s.id ? 'on' : ''}" data-id="${s.id}"><i>${i + 1}</i><span><b>${s.t}</b><small>${s.s}</small></span></button>`).join('');
    list.querySelectorAll('.item').forEach((b) => (b.onclick = () => go(b.dataset.id)));
    $('#mCliente').classList.toggle('on', mode === 'cliente');
    $('#mDuena').classList.toggle('on', mode === 'duena');
    const s = SCREENS.find((x) => x.id === cur);
    $('#tip').innerHTML = s ? `<b>Qué mostrar</b>${s.tip}` : '';
  }
  function fit() {
    const web = mode === 'duena';
    device.classList.toggle('web', web);
    const st = $('#stage').getBoundingClientRect();
    const w = web ? 1440 : 390 + 22, h = web ? 900 : 844 + 22;
    const k = Math.min(1, (st.width - 24) / w, (st.height - 24) / h);
    device.style.transform = `scale(${k})`;
    device.style.margin = `${-(h * (1 - k)) / 2}px ${-(w * (1 - k)) / 2}px`;
  }
  function go(id, push = true) {
    const s = SCREENS.find((x) => x.id === id); if (!s) return;
    if (push && cur && cur !== id) hist.push(cur);
    cur = id;
    if (s.mode !== mode) { mode = s.mode; }
    frame.src = `screens/${id}.html`;
    try { history.replaceState(null, '', '#' + id); } catch (e) {}
    render(); fit();
  }
  function setMode(m) { if (m !== mode) go(SCREENS.find((s) => s.mode === m).id); }

  addEventListener('message', (e) => {
    if (e.source !== frame.contentWindow || !e.data || !e.data.demo) return;
    const d = e.data;
    if (d.go) go(d.go);
    else if (d.back) { const p = hist.pop(); if (p) go(p, false); }
    else if (d.mode) setMode(d.mode);
  });
  $('#mCliente').onclick = () => setMode('cliente');
  $('#mDuena').onclick = () => setMode('duena');
  addEventListener('resize', fit);
  new ResizeObserver(fit).observe($('#stage'));
  addEventListener('hashchange', () => { const id = location.hash.slice(1); if (id && id !== cur) go(id); });

  go(SCREENS.some((s) => s.id === location.hash.slice(1)) ? location.hash.slice(1) : 'inicio', false);
})();
