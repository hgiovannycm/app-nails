import { initHand, NAIL_COLORS } from './hand.js';

/* ---------- Datos de ejemplo ---------- */
const USD_RATE = 4000;
const DEPOSIT = 20000;
const cop = (n) => 'COP ' + new Intl.NumberFormat('es-CO').format(n);
const usd = (n) => 'USD ' + Math.round(n / USD_RATE);
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const services = [
  { id: 'semi',  name: 'Manicure semipermanente', icon: '💅', price: 60000,  min: 60,  desc: 'Esmaltado en gel con brillo por 3 semanas.' },
  { id: 'acril', name: 'Acrílicas / gel',         icon: '✨', price: 130000, min: 120, desc: 'Extensión y forma a tu gusto, con diseño incluido en el catálogo.' },
  { id: 'pedi',  name: 'Pedicure spa',            icon: '🌸', price: 75000,  min: 75,  desc: 'Exfoliación, masaje e hidratación con esmaltado.' },
  { id: 'combo', name: 'Manicure + pedicure',     icon: '🎀', price: 120000, min: 120, desc: 'El paquete completo, con descuento sobre servicios sueltos.' },
  { id: 'retiro', name: 'Retiro y cuidado',       icon: '🧴', price: 25000,  min: 20,  desc: 'Retiro seguro de gel o acrílico y tratamiento de cutícula.' },
];

const designs = [
  { id: 1,  name: 'French clásico',     style: 'french', shape: 'almendra', extra: 15000, min: 15, c1: '#f6d9d2' },
  { id: 2,  name: 'Rosa pétalo',        style: 'color',  shape: 'ovalada',  extra: 0,     min: 0,  c1: '#f9a8c4' },
  { id: 3,  name: 'Cromo perla',        style: 'cromo',  shape: 'almendra', extra: 30000, min: 20, c1: '#eadbe8' },
  { id: 4,  name: 'Ojo de gato rosé',   style: 'cromo',  shape: 'coffin',   extra: 35000, min: 20, c1: '#8a3b5c' },
  { id: 5,  name: 'Degradado atardecer',style: 'art',    shape: 'stiletto', extra: 25000, min: 25, c1: '#ffb199', c2: '#f27fb3' },
  { id: 6,  name: 'Flores silvestres',  style: 'art',    shape: 'cuadrada', extra: 50000, min: 45, c1: '#fff1f5' },
  { id: 7,  name: 'Glitter champán',    style: 'art',    shape: 'coffin',   extra: 25000, min: 20, c1: '#f2d7b0' },
  { id: 8,  name: 'Mármol blanco',      style: 'art',    shape: 'almendra', extra: 35000, min: 30, c1: '#ffffff' },
  { id: 9,  name: 'Corazones dulces',   style: 'art',    shape: 'ovalada',  extra: 25000, min: 30, c1: '#ffd6e5' },
  { id: 10, name: 'Aurora lila',        style: 'cromo',  shape: 'almendra', extra: 30000, min: 20, c1: '#d9c0ff' },
  { id: 11, name: 'Baby boomer',        style: 'french', shape: 'cuadrada', extra: 15000, min: 15, c1: '#ffe3ea', c2: '#ffffff' },
  { id: 12, name: 'Cereza glossy',      style: 'color',  shape: 'coffin',   extra: 0,     min: 0,  c1: '#c8203f' },
];
const STYLES = { todos: 'Todos', french: 'French', color: 'Color', cromo: 'Cromo', art: 'Nail art' };
const SHAPES = { todas: 'Todas las formas', almendra: 'Almendra', cuadrada: 'Cuadrada', coffin: 'Coffin', stiletto: 'Stiletto', ovalada: 'Ovalada' };

const staff = [
  { id: 'val', name: 'Valeria', role: 'Acrílicas y nail art', bio: '8 años de experiencia. Especialista en diseños a mano alzada.', grad: 'linear-gradient(145deg,#ffb3cf,#e0709a)' },
  { id: 'cam', name: 'Camila',  role: 'French y cromados',    bio: 'Acabados impecables y efectos espejo que duran semanas.',       grad: 'linear-gradient(145deg,#d9c0ff,#a67be0)' },
  { id: 'sof', name: 'Sofía',   role: 'Pedicure spa y gel',   bio: 'Cuidado integral de manos y pies con técnica sin dolor.',        grad: 'linear-gradient(145deg,#ffd0b8,#f09a76)' },
];

const products = [
  { id: 'p1', name: 'Esmalte gel Rosé',     price: 32000, color: '#f7a1be', kind: 'bottle' },
  { id: 'p2', name: 'Aceite de cutícula',   price: 24000, color: '#f6d28a', kind: 'dropper' },
  { id: 'p3', name: 'Crema de manos',       price: 38000, color: '#ffd6e5', kind: 'tube' },
  { id: 'p4', name: 'Top coat brillo',      price: 29000, color: '#e7d6ff', kind: 'bottle' },
  { id: 'p5', name: 'Kit de limas premium', price: 22000, color: '#cfeee6', kind: 'file' },
  { id: 'p6', name: 'Sérum fortalecedor',   price: 45000, color: '#ffd9c7', kind: 'dropper' },
];

const plans = [
  { name: 'Glow',      price: 120000, items: ['1 manicure semipermanente al mes', '10% en tienda', 'Reserva prioritaria'] },
  { name: 'Signature', price: 260000, pop: true, items: ['2 manicures + 1 pedicure al mes', 'Un diseño de catálogo gratis', '15% en tienda', 'Cambio de cita sin costo'] },
  { name: 'Lux',       price: 420000, items: ['Manicure semanal', '1 pedicure spa al mes', 'Retiro incluido', '20% en tienda y regalo de cumpleaños'] },
];

const reviews = [
  { n: 'Mariana R.', t: 'Reservé desde el celular a medianoche y llegué sabiendo exactamente qué diseño quería. Quedó idéntico.', c: '#ffb3cf' },
  { n: 'Daniela P.',  t: 'Me recordaron el retoque y ya tengo plan Signature. Es la primera vez que no se me olvida la cita.', c: '#d9c0ff' },
  { n: 'Laura G.',    t: 'Regalé una tarjeta a mi mamá en dos minutos. Le llegó por WhatsApp y fue feliz.', c: '#ffd0b8' },
];

/* ---------- Estado ---------- */
const todayKey = () => new Date().toISOString().slice(0, 10);
const state = {
  style: 'todos', shape: 'todas',
  favs: new Set([3, 6]),
  cart: [],
  blocked: new Set(),
  bookings: [
    { id: 1, date: todayKey(), time: '09:00', name: 'Mariana R.', svc: 'Semipermanente · French clásico', staff: 'val', total: 135000, paid: true },
    { id: 2, date: todayKey(), time: '10:00', name: 'Daniela P.', svc: 'Pedicure spa',                       staff: 'sof', total: 75000,  paid: true },
    { id: 3, date: todayKey(), time: '11:00', name: 'Laura G.',   svc: 'Acrílicas · Flores silvestres',     staff: 'val', total: 180000, paid: true },
    { id: 4, date: todayKey(), time: '12:00', name: 'Camila S.',  svc: 'Semipermanente · Cromo perla',      staff: 'cam', total: 90000,  paid: true },
    { id: 5, date: todayKey(), time: '14:00', name: 'Valentina O.', svc: 'Manicure + pedicure',             staff: 'sof', total: 120000, paid: false },
    { id: 6, date: todayKey(), time: '15:00', name: 'Isabela M.', svc: 'Semipermanente · Rosa pétalo',      staff: 'cam', total: 60000,  paid: true },
  ],
};
const unit = { serviceBase: () => services.find((s) => s.id === 'semi').price };
const designTotal = (d) => unit.serviceBase() + d.extra;

/* ---------- SVG de uñas ---------- */
const PATHS = {
  almendra: 'M8 88 L8 50 C8 24 22 8 30 3 C38 8 52 24 52 50 L52 88 Q30 100 8 88Z',
  cuadrada: 'M8 88 L8 14 Q8 7 15 7 L45 7 Q52 7 52 14 L52 88 Q30 100 8 88Z',
  coffin:   'M8 88 L8 52 L17 8 Q18 5 21 5 L39 5 Q42 5 43 8 L52 52 L52 88 Q30 100 8 88Z',
  stiletto: 'M8 88 L8 58 C8 38 25 16 30 0 C35 16 52 38 52 58 L52 88 Q30 100 8 88Z',
  ovalada:  'M8 88 L8 42 C8 16 18 6 30 6 C42 6 52 16 52 42 L52 88 Q30 100 8 88Z',
};
function rng(seed) { let a = seed; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const heart = (x, y, s, f) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -1 C-3 -4 -6 0 0 5 C6 0 3 -4 0 -1Z" fill="${f}"/>`;
const flower = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-3.4" rx="2.1" ry="3.2" fill="#fff" stroke="#f3b6cc" stroke-width=".3" transform="rotate(${a})"/>`).join('')}<circle r="1.6" fill="#f6c453"/></g>`;

function nailSVG(d, uid) {
  const p = PATHS[d.shape], id = `n${uid}`;
  let fill = '', deco = '', defs = '';
  const r = rng(d.id * 97 + 3);
  switch (d.style + ':' + d.id) {
    default: break;
  }
  if (d.id === 1) { fill = `<rect width="60" height="104" fill="${d.c1}"/>`; deco = `<path d="M0 0 H60 V30 Q30 46 0 30Z" fill="#fff"/>`; }
  else if (d.id === 11) { defs = `<linearGradient id="g${id}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${d.c1}"/><stop offset=".85" stop-color="#fff"/></linearGradient>`; fill = `<rect width="60" height="104" fill="url(#g${id})"/>`; }
  else if (d.id === 3) { defs = `<linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fdf6fb"/><stop offset=".35" stop-color="#cdb7cf"/><stop offset=".55" stop-color="#fff"/><stop offset="1" stop-color="#b79fc0"/></linearGradient>`; fill = `<rect width="60" height="104" fill="url(#g${id})"/>`; }
  else if (d.id === 4) { defs = `<linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a3b5c" stop-opacity="0"/><stop offset=".5" stop-color="#ffd0e6"/><stop offset="1" stop-color="#8a3b5c" stop-opacity="0"/></linearGradient>`; fill = `<rect width="60" height="104" fill="#6e2441"/>`; deco = `<polygon points="14,0 36,0 24,104 4,104" fill="url(#g${id})" opacity=".95"/>`; }
  else if (d.id === 5) { defs = `<linearGradient id="g${id}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${d.c2}"/><stop offset="1" stop-color="${d.c1}"/></linearGradient>`; fill = `<rect width="60" height="104" fill="url(#g${id})"/>`; }
  else if (d.id === 6) { fill = `<rect width="60" height="104" fill="${d.c1}"/>`; deco = flower(22, 34, 1.2) + flower(40, 56, 1) + flower(24, 74, .8) + `<circle cx="38" cy="30" r="1.1" fill="#f3b6cc"/><circle cx="14" cy="52" r="1" fill="#f3b6cc"/>`; }
  else if (d.id === 7) { fill = `<rect width="60" height="104" fill="${d.c1}"/>`; deco = Array.from({ length: 70 }, () => { const x = r() * 60, y = r() * 100, rad = .5 + r() * 1.4; return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(1)}" fill="${r() > .5 ? '#fff' : '#d4a762'}" opacity="${(.6 + r() * .4).toFixed(2)}"/>`; }).join(''); }
  else if (d.id === 8) { fill = `<rect width="60" height="104" fill="#fff"/>`; deco = `<path d="M-2 20 C14 26 20 44 34 50 S52 70 64 66" stroke="#b9a3b5" stroke-width=".8" fill="none" opacity=".7"/><path d="M10 -2 C18 18 30 24 36 40 S44 78 56 90" stroke="#e9aebf" stroke-width="1.4" fill="none" opacity=".45"/><path d="M-2 62 C12 60 22 76 30 86" stroke="#8d7a8a" stroke-width=".6" fill="none" opacity=".6"/>`; }
  else if (d.id === 9) { fill = `<rect width="60" height="104" fill="${d.c1}"/>`; deco = heart(22, 38, 1.3, '#e5497f') + heart(40, 60, 1.1, '#fff') + heart(24, 78, .8, '#e5497f') + heart(42, 30, .6, '#fff'); }
  else if (d.id === 10) { defs = `<linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c9b0ff"/><stop offset=".45" stop-color="#ffc6de"/><stop offset=".75" stop-color="#bff0e2"/><stop offset="1" stop-color="#d8bcff"/></linearGradient>`; fill = `<rect width="60" height="104" fill="url(#g${id})"/>`; deco = `<ellipse cx="22" cy="30" rx="16" ry="30" fill="#fff" opacity=".28"/>`; }
  else { fill = `<rect width="60" height="104" fill="${d.c1}"/>`; }
  return `<svg viewBox="0 0 60 104" aria-hidden="true"><defs>${defs}<clipPath id="c${id}"><path d="${p}"/></clipPath><linearGradient id="s${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
  <g clip-path="url(#c${id})">${fill}${deco}<rect x="13" y="4" width="9" height="84" rx="4.5" fill="url(#s${id})" opacity=".75"/><ellipse cx="30" cy="94" rx="26" ry="9" fill="#fff" opacity=".35"/></g>
  <path d="${p}" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="1"/></svg>`;
}

function productSVG(p) {
  const c = p.color;
  const base = {
    bottle: `<rect x="26" y="8" width="18" height="30" rx="5" fill="#3b2a35"/><rect x="14" y="36" width="42" height="60" rx="14" fill="${c}"/><rect x="20" y="44" width="8" height="40" rx="4" fill="#fff" opacity=".55"/><rect x="14" y="36" width="42" height="60" rx="14" fill="none" stroke="#fff" stroke-opacity=".7"/>`,
    dropper: `<ellipse cx="35" cy="14" rx="9" ry="12" fill="#3b2a35"/><rect x="28" y="22" width="14" height="12" fill="#e9b9a4"/><rect x="16" y="32" width="38" height="64" rx="12" fill="${c}"/><rect x="22" y="40" width="7" height="44" rx="3.5" fill="#fff" opacity=".55"/>`,
    tube: `<path d="M16 10 H54 L50 90 Q35 98 20 90Z" fill="${c}"/><rect x="18" y="86" width="34" height="10" rx="3" fill="#e9b9a4"/><rect x="22" y="14" width="7" height="64" rx="3.5" fill="#fff" opacity=".55"/><circle cx="35" cy="50" r="9" fill="#fff" opacity=".6"/>`,
    file: `<g transform="rotate(-18 35 52)"><rect x="24" y="4" width="22" height="92" rx="11" fill="${c}"/><rect x="30" y="12" width="4" height="76" rx="2" fill="#fff" opacity=".6"/></g><g transform="rotate(14 35 52)"><rect x="24" y="10" width="22" height="86" rx="11" fill="#ffd6e5" opacity=".95"/></g>`,
  }[p.kind];
  return `<svg viewBox="0 0 70 104" aria-hidden="true">${base}</svg>`;
}

/* ---------- Utilidades UI ---------- */
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('on');
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('on'), 2600);
}
window.__caption = (txt) => { const c = $('#caption'); if (!txt) { c.classList.remove('on'); return; } c.textContent = txt; c.classList.add('on'); };

function tilt(el) {
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--ry', (((e.clientX - r.left) / r.width - .5) * 12).toFixed(1) + 'deg');
    el.style.setProperty('--rx', (-((e.clientY - r.top) / r.height - .5) * 12).toFixed(1) + 'deg');
  });
  el.addEventListener('pointerleave', () => { el.style.setProperty('--ry', '0deg'); el.style.setProperty('--rx', '0deg'); });
}
const priceHTML = (n) => `<span class="price">${cop(n)}</span> <span class="usd">${usd(n)}</span>`;

/* ---------- Render: marquee, filtros, catálogo ---------- */
function renderMarquee() {
  const w = ['FRENCH', 'CROMO', 'NAIL ART', 'SEMIPERMANENTE', 'ACRÍLICAS', 'PEDICURE SPA', 'GEL', 'DISEÑOS A MANO'];
  const row = w.map((x) => `<span>${x}</span><span>✦</span>`).join('');
  $('#marquee').innerHTML = row + row;
}
function renderFilters() {
  const mk = (obj, key) => Object.entries(obj).map(([k, v]) => `<button class="fchip ${state[key] === k ? 'on' : ''}" data-k="${k}">${v}</button>`).join('');
  $('#fStyle').innerHTML = mk(STYLES, 'style');
  $('#fShape').innerHTML = mk(SHAPES, 'shape');
  $$('#fStyle .fchip').forEach((b) => b.onclick = () => { state.style = b.dataset.k; renderFilters(); renderDesigns(); });
  $$('#fShape .fchip').forEach((b) => b.onclick = () => { state.shape = b.dataset.k; renderFilters(); renderDesigns(); });
}
function renderDesigns() {
  const list = designs.filter((d) => (state.style === 'todos' || d.style === state.style) && (state.shape === 'todas' || d.shape === state.shape));
  $('#designGrid').innerHTML = list.length ? list.map((d) => `
    <article class="dcard glass" data-id="${d.id}">
      <div class="nail-stage">
        <button class="fav ${state.favs.has(d.id) ? 'on' : ''}" data-fav="${d.id}" aria-label="Guardar favorito">${state.favs.has(d.id) ? '♥' : '♡'}</button>
        ${nailSVG(d, d.id + 'a')}${nailSVG(d, d.id + 'b')}${nailSVG(d, d.id + 'c')}
      </div>
      <div class="dmeta">
        <span class="tag">${STYLES[d.style]} · ${SHAPES[d.shape]}</span>
        <h3>${d.name}</h3>
        <div class="row">${priceHTML(designTotal(d))}</div>
        <div class="row"><span class="mono">${services[0].min + d.min} min</span><span>semipermanente + diseño</span></div>
      </div>
      <button class="btn btn-primary sm" data-pick="${d.id}">Reservar este diseño</button>
    </article>`).join('') : `<p class="sub">No hay diseños con ese filtro. Prueba otra forma o estilo.</p>`;
  $$('.dcard').forEach(tilt);
  $$('[data-fav]').forEach((b) => b.onclick = () => { const id = +b.dataset.fav; state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id); renderDesigns(); toast(state.favs.has(id) ? 'Guardado en tus favoritos' : 'Quitado de favoritos'); });
  $$('[data-pick]').forEach((b) => b.onclick = () => openBooking({ design: +b.dataset.pick }));
}
function renderServices() {
  $('#serviceGrid').innerHTML = services.map((s) => `
    <article class="scard glass"><div class="sicon">${s.icon}</div><h3>${s.name}</h3><p>${s.desc}</p>
    <div>${priceHTML(s.price)}</div><span class="mono" style="align-self:flex-start">${s.min} min</span>
    <button class="btn btn-glass sm" data-svc="${s.id}">Reservar</button></article>`).join('');
  $$('[data-svc]').forEach((b) => b.onclick = () => openBooking({ service: b.dataset.svc }));
}
function renderTeam() {
  $('#teamGrid').innerHTML = staff.map((s) => `
    <article class="tcard glass"><div class="avatar" style="background:${s.grad}">${s.name[0]}</div>
    <div><h3>${s.name}</h3><p><b>${s.role}</b><br>${s.bio}</p><button class="btn btn-glass sm" data-staff="${s.id}">Reservar con ${s.name}</button></div></article>`).join('');
  $$('[data-staff]').forEach((b) => b.onclick = () => openBooking({ staff: b.dataset.staff }));
}
function renderProducts() {
  $('#productGrid').innerHTML = products.map((p) => `
    <article class="pcard glass"><div class="pimg">${productSVG(p)}</div><h4>${p.name}</h4>
    <div class="row">${priceHTML(p.price)}<button class="add" data-add="${p.id}">Añadir</button></div></article>`).join('');
  $$('[data-add]').forEach((b) => b.onclick = () => { state.cart.push({ type: 'product', id: b.dataset.add }); updateCart(); toast('Añadido a tu bolsa'); });
}
function renderGift() {
  const g = (state.gift ||= { amt: 100000, to: '', msg: '' });
  $('#giftCard').innerHTML = `
    <span class="eyebrow">Tarjeta de regalo</span>
    <div class="gift-card"><small>Pétalo Nail Studio</small><div class="amt">${cop(g.amt)}</div><span class="usd" style="color:#fff;opacity:.9">${usd(g.amt)}</span><p>${g.to ? 'Para ' + g.to + (g.msg ? ' · ' + g.msg : '') : 'Para alguien especial'}</p></div>
    <div class="amounts">${[50000, 100000, 200000].map((a) => `<button class="fchip ${g.amt === a ? 'on' : ''}" data-amt="${a}" style="background:${g.amt === a ? '' : 'rgba(255,255,255,.7)'}">${cop(a)}</button>`).join('')}</div>
    <label class="field">Para<input id="gTo" placeholder="Nombre" value="${g.to}"></label>
    <label class="field">Mensaje<input id="gMsg" placeholder="Feliz cumpleaños" value="${g.msg}"></label>
    <button class="btn btn-primary" id="gBuy">Comprar tarjeta</button>`;
  $$('[data-amt]').forEach((b) => b.onclick = () => { g.amt = +b.dataset.amt; renderGift(); });
  $('#gTo').oninput = (e) => { g.to = e.target.value; $('.gift-card p').textContent = g.to ? 'Para ' + g.to + (g.msg ? ' · ' + g.msg : '') : 'Para alguien especial'; };
  $('#gMsg').oninput = (e) => { g.msg = e.target.value; $('.gift-card p').textContent = g.to ? 'Para ' + g.to + (g.msg ? ' · ' + g.msg : '') : 'Para alguien especial'; };
  $('#gBuy').onclick = () => { state.cart.push({ type: 'gift', amt: g.amt, to: g.to }); updateCart(); toast('Tarjeta añadida a tu bolsa'); };
}
function renderPlans() {
  $('#planGrid').innerHTML = plans.map((p) => `
    <article class="plan glass ${p.pop ? 'pop' : ''}">${p.pop ? '<span class="badge">Más elegido</span>' : ''}<h3>${p.name}</h3>
    <div class="big">${cop(p.price)}<small> / mes</small></div><span class="usd">${usd(p.price)} al mes</span>
    <ul>${p.items.map((i) => `<li>${i}</li>`).join('')}</ul>
    <button class="btn ${p.pop ? 'btn-primary' : 'btn-glass'}" data-plan="${p.name}">Unirme a ${p.name}</button></article>`).join('');
  $$('[data-plan]').forEach((b) => b.onclick = () => toast('Plan ' + b.dataset.plan + ' activado (simulado)'));
}
function renderReviews() {
  $('#reviewGrid').innerHTML = reviews.map((r) => `
    <article class="rcard glass"><div class="stars">★★★★★</div><p>“${r.t}”</p>
    <footer><div class="avatar" style="background:${r.c}">${r.n[0]}</div>${r.n} · clienta verificada</footer></article>`).join('');
}

/* ---------- Bolsa ---------- */
function updateCart() { $('#cartCount').textContent = state.cart.length; }
function cartRows() {
  return state.cart.map((c, i) => {
    if (c.type === 'gift') return { i, label: 'Tarjeta de regalo' + (c.to ? ' · ' + c.to : ''), price: c.amt };
    const p = products.find((x) => x.id === c.id); return { i, label: p.name, price: p.price };
  });
}
function openCart() {
  const rows = cartRows(), total = rows.reduce((a, r) => a + r.price, 0);
  openDrawer('Tu bolsa', rows.length ? `
    <span class="step-label">Resumen</span><h3>Tu bolsa</h3>
    <div class="summary">${rows.map((r) => `<div class="line"><span>${r.label}</span><span>${cop(r.price)} <button class="mini" data-rm="${r.i}">Quitar</button></span></div>`).join('')}
    <div class="line total"><span>Total</span><span>${cop(total)} · ${usd(total)}</span></div></div>
    <div class="drawer-foot"><button class="btn btn-primary" id="payCart">Pagar (simulado)</button></div>` : `<h3>Tu bolsa está vacía</h3><p class="sub">Añade esmaltes, cuidado de manos o una tarjeta de regalo.</p>`);
  $$('[data-rm]').forEach((b) => b.onclick = () => { state.cart.splice(+b.dataset.rm, 1); updateCart(); openCart(); });
  const pay = $('#payCart'); if (pay) pay.onclick = () => { state.cart = []; updateCart(); closeDrawer(); toast('Pago simulado aprobado. ¡Gracias!'); };
}

/* ---------- Drawer ---------- */
function openDrawer(title, html) { $('#drawerTitle').textContent = title; $('#drawerBody').innerHTML = html; $('#drawer').classList.add('on'); $('#scrim').classList.add('on'); $('#drawer').setAttribute('aria-hidden', 'false'); }
function closeDrawer() { $('#drawer').classList.remove('on'); $('#scrim').classList.remove('on'); $('#drawer').setAttribute('aria-hidden', 'true'); }

/* ---------- Disponibilidad ---------- */
const HOURS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const fmtHour = (h) => { const n = +h.slice(0, 2); return `${((n + 11) % 12) + 1}:${h.slice(3)} ${n >= 12 ? 'pm' : 'am'}`; };
function dayKey(offset) { const d = new Date(); d.setDate(d.getDate() + offset); return d.toISOString().slice(0, 10); }
function slotTaken(date, staffId, time) {
  if (state.bookings.some((b) => b.date === date && b.staff === staffId && b.time === time)) return 'booked';
  if (state.blocked.has(`${date}|${staffId}|${time}`)) return 'blocked';
  const h = [...(date + staffId + time)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  return h % 7 === 0 ? 'booked' : '';
}

/* ---------- Reserva en 3 pasos ---------- */
const bk = { step: 1, service: 'semi', design: null, staff: 'val', day: 0, time: null, name: '', phone: '' };
function bookingTotal() {
  const s = services.find((x) => x.id === bk.service), d = designs.find((x) => x.id === bk.design);
  return { s, d, total: s.price + (d && ['semi', 'acril', 'combo'].includes(s.id) ? d.extra : 0), min: s.min + (d && ['semi', 'acril', 'combo'].includes(s.id) ? d.min : 0) };
}
function openBooking(pre = {}) {
  Object.assign(bk, { step: 1, time: null, name: '', phone: '' });
  if (pre.design) { bk.design = pre.design; bk.service = 'semi'; }
  if (pre.service) { bk.service = pre.service; bk.design = null; }
  if (pre.staff) bk.staff = pre.staff;
  renderBooking();
}
function stepHeader(n, title) { return `<span class="step-label">Paso ${n} de 3</span><h3>${title}</h3>`; }
function dayChips() {
  const names = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return `<button class="day ${bk.day === i ? 'on' : ''}" data-day="${i}">${i === 0 ? 'Hoy' : names[d.getDay()]}<b>${d.getDate()}</b></button>`; }).join('');
}
function renderBooking() {
  const { s, d, total, min } = bookingTotal();
  let html = '', foot = '';
  if (bk.step === 1) {
    html = stepHeader(1, 'Servicio y diseño') + `
      <div style="display:flex;flex-direction:column;gap:10px">${services.map((x) => `<button class="opt ${bk.service === x.id ? 'on' : ''}" data-s="${x.id}"><span class="sicon" style="width:42px;height:42px;font-size:20px;border-radius:14px">${x.icon}</span><span class="grow"><b>${x.name}</b><small>${x.min} min</small></span><b>${cop(x.price)}</b></button>`).join('')}</div>
      <div><span class="step-label">Diseño (opcional)</span><div class="thumbs" style="margin-top:8px">
      <button class="thumb ${!bk.design ? 'on' : ''}" data-d="0"><span style="font-size:26px;height:58px;display:grid;place-items:center">∅</span>Sin diseño</button>
      ${designs.map((x) => `<button class="thumb ${bk.design === x.id ? 'on' : ''}" data-d="${x.id}">${nailSVG(x, 't' + x.id)}${x.name.split(' ')[0]}</button>`).join('')}</div></div>
      <div class="summary"><div class="line total"><span>Total</span><span>${cop(total)} · ${min} min</span></div></div>`;
    foot = `<button class="btn btn-primary" data-next>Continuar</button>`;
  } else if (bk.step === 2) {
    const dk = dayKey(bk.day);
    html = stepHeader(2, 'Manicurista y hora') + `
      <div style="display:flex;flex-direction:column;gap:10px">${staff.map((x) => `<button class="opt ${bk.staff === x.id ? 'on' : ''}" data-st="${x.id}"><span class="avatar" style="background:${x.grad}">${x.name[0]}</span><span class="grow"><b>${x.name}</b><small>${x.role}</small></span></button>`).join('')}</div>
      <div class="days">${dayChips()}</div>
      <div class="slots">${HOURS.map((h) => `<button class="slot ${bk.time === h ? 'on' : ''}" data-t="${h}" ${slotTaken(dk, bk.staff, h) ? 'disabled' : ''}>${fmtHour(h)}</button>`).join('')}</div>`;
    foot = `<button class="btn btn-glass" data-back>Atrás</button><button class="btn btn-primary" data-next ${bk.time ? '' : 'disabled'}>Continuar</button>`;
  } else if (bk.step === 3) {
    const st = staff.find((x) => x.id === bk.staff);
    html = stepHeader(3, 'Tus datos y depósito') + `
      <label class="field">Nombre<input id="bName" placeholder="Tu nombre" value="${bk.name}"></label>
      <label class="field">WhatsApp<input id="bPhone" placeholder="+57 300 000 0000" value="${bk.phone}" inputmode="tel"></label>
      <div class="summary">
        <div class="line"><span>Servicio</span><span>${s.name}</span></div>
        ${d ? `<div class="line"><span>Diseño</span><span>${d.name}</span></div>` : ''}
        <div class="line"><span>Con</span><span>${st.name}</span></div>
        <div class="line"><span>Cuándo</span><span>${bk.day === 0 ? 'Hoy' : dayKey(bk.day)}, ${fmtHour(bk.time)}</span></div>
        <div class="line"><span>Total del servicio</span><span>${cop(total)}</span></div>
        <div class="line total"><span>Depósito para reservar</span><span>${cop(DEPOSIT)} <small class="usd">${usd(DEPOSIT)}</small></span></div>
      </div>
      <p class="sub" style="font-size:13px">El depósito se descuenta del servicio. Quien paga, llega. Pago simulado en esta demo.</p>`;
    foot = `<button class="btn btn-glass" data-back>Atrás</button><button class="btn btn-primary" data-pay>Pagar ${cop(DEPOSIT)}</button>`;
  } else {
    const st = staff.find((x) => x.id === bk.staff);
    html = `<div class="ok"><div class="check">✓</div><h3>¡Cita confirmada!</h3>
      <p class="sub">${bk.name || 'Tu cita'}, te esperamos ${bk.day === 0 ? 'hoy' : 'el ' + dayKey(bk.day)} a las ${fmtHour(bk.time)} con ${st.name}.</p>
      <div class="wa">💬 <b>WhatsApp (simulado)</b><br>Hola ${bk.name || ''}, tu cita en Pétalo Nail Studio quedó confirmada. Recibimos tu depósito de ${cop(DEPOSIT)}. Te recordaremos un día antes. 💖</div></div>
      <div class="drawer-foot"><button class="btn btn-glass" id="seeAdmin">Ver en el panel de la dueña</button><button class="btn btn-primary" data-close>Listo</button></div>`;
  }
  openDrawer(bk.step === 4 ? 'Reserva confirmada' : 'Reserva', html + (foot ? `<div class="drawer-foot">${foot}</div>` : ''));
  const rb = () => renderBooking();
  $$('[data-s]').forEach((b) => b.onclick = () => { bk.service = b.dataset.s; rb(); });
  $$('[data-d]').forEach((b) => b.onclick = () => { bk.design = +b.dataset.d || null; rb(); });
  $$('[data-st]').forEach((b) => b.onclick = () => { bk.staff = b.dataset.st; bk.time = null; rb(); });
  $$('[data-day]').forEach((b) => b.onclick = () => { bk.day = +b.dataset.day; bk.time = null; rb(); });
  $$('[data-t]').forEach((b) => b.onclick = () => { bk.time = b.dataset.t; rb(); });
  const nx = $('[data-next]'); if (nx) nx.onclick = () => { bk.step++; rb(); };
  const bkb = $('[data-back]'); if (bkb) bkb.onclick = () => { bk.step--; rb(); };
  const nm = $('#bName'); if (nm) { nm.oninput = (e) => bk.name = e.target.value; $('#bPhone').oninput = (e) => bk.phone = e.target.value; }
  const pay = $('[data-pay]'); if (pay) pay.onclick = () => {
    state.bookings.push({ id: Date.now(), isNew: true, date: dayKey(bk.day), time: bk.time, name: bk.name || 'Nueva clienta', svc: s.name + (d ? ' · ' + d.name : ''), staff: bk.staff, total, paid: true });
    bk.step = 4; rb();
  };
  const cl = $('[data-close]'); if (cl) cl.onclick = closeDrawer;
  const sa = $('#seeAdmin'); if (sa) sa.onclick = () => { closeDrawer(); openAdmin(); };
}

/* ---------- Panel de la dueña ---------- */
const adm = { tab: 'agenda', staff: 'val' };
function openAdmin() { renderAdmin(); $('#admin').classList.add('on'); $('#admin').setAttribute('aria-hidden', 'false'); }
function closeAdmin() { $('#admin').classList.remove('on'); $('#admin').setAttribute('aria-hidden', 'true'); }
function renderAdmin() {
  const today = todayKey();
  const list = state.bookings.filter((b) => b.date === today).sort((a, b) => a.time.localeCompare(b.time));
  const income = list.reduce((a, b) => a + b.total, 0), deps = list.filter((b) => b.paid).length * DEPOSIT;
  const dateStr = new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
  let body = '';
  if (adm.tab === 'agenda') {
    body = `<div class="metrics">
      <div class="metric"><small>Citas hoy</small><b>${list.length}</b><span>${list.filter((b) => b.arrived).length} ya llegaron</span></div>
      <div class="metric"><small>Ingresos esperados</small><b>${cop(income)}</b><span>${usd(income)}</span></div>
      <div class="metric"><small>Depósitos cobrados</small><b>${cop(deps)}</b><span>${usd(deps)}</span></div>
      <div class="metric"><small>Clientas del club</small><b>214</b><span>+12 este mes</span></div></div>
      <div class="agenda">${list.map((b) => { const st = staff.find((x) => x.id === b.staff); return `
        <div class="arow ${b.isNew ? 'new' : ''}"><span class="time">${fmtHour(b.time)}</span><div><b>${b.name}</b><small>con ${st.name}</small></div><div>${b.svc}<small>${cop(b.total)}</small></div>
        <span class="status ${b.arrived ? 'here' : b.paid ? 'paid' : 'pending'}">${b.arrived ? 'Llegó' : b.paid ? 'Depósito pagado' : 'Pendiente'}</span>
        <button class="mini" data-arr="${b.id}">${b.arrived ? 'Deshacer' : 'Marcar llegada'}</button></div>`; }).join('') || '<p style="padding:20px">Sin citas hoy.</p>'}</div>`;
    list.forEach((b) => delete b.isNew);
  } else if (adm.tab === 'precios') {
    body = `<p class="sub">Cambia un precio y se actualiza al instante en el sitio.</p><div class="price-list">
      ${services.map((s) => `<label class="price-item"><span>${s.icon} ${s.name}</span><input type="number" step="1000" data-ps="${s.id}" value="${s.price}"></label>`).join('')}
      ${designs.slice(0, 7).map((d) => `<label class="price-item"><span>Diseño · ${d.name}</span><input type="number" step="1000" data-pd="${d.id}" value="${d.extra}"></label>`).join('')}</div>`;
  } else {
    const dk = today;
    body = `<p class="sub">Toca un horario para bloquearlo (descanso, cita personal, capacitación).</p>
      <div class="tabs">${staff.map((s) => `<button class="fchip ${adm.staff === s.id ? 'on' : ''}" data-as="${s.id}">${s.name}</button>`).join('')}</div>
      <div class="legend"><span><i style="background:#fff;border:1px solid #eadfe5"></i>Libre</span><span><i style="background:#ffd6e5"></i>Reservado</span><span><i style="background:#eadfe5"></i>Bloqueado</span></div>
      <div class="bgrid">${HOURS.map((h) => { const t = slotTaken(dk, adm.staff, h); return `<button class="bslot ${t}" data-bs="${h}">${fmtHour(h)}<small>${t === 'booked' ? 'Reservado' : t === 'blocked' ? 'Bloqueado' : 'Libre'}</small></button>`; }).join('')}</div>`;
  }
  $('#adminBody').innerHTML = `<div class="admin-top"><div><h3>Buenos días, jefa.</h3><p style="text-transform:capitalize">${dateStr}</p></div>
    <div class="tabs">${[['agenda', 'Agenda de hoy'], ['precios', 'Precios'], ['bloqueo', 'Bloquear horarios']].map(([k, v]) => `<button class="fchip ${adm.tab === k ? 'on' : ''}" data-tab="${k}">${v}</button>`).join('')}</div></div>${body}`;
  $$('[data-tab]').forEach((b) => b.onclick = () => { adm.tab = b.dataset.tab; renderAdmin(); });
  $$('[data-arr]').forEach((b) => b.onclick = () => { const x = state.bookings.find((y) => y.id === +b.dataset.arr); x.arrived = !x.arrived; renderAdmin(); });
  $$('[data-as]').forEach((b) => b.onclick = () => { adm.staff = b.dataset.as; renderAdmin(); });
  $$('[data-bs]').forEach((b) => b.onclick = () => { const k = `${today}|${adm.staff}|${b.dataset.bs}`; state.blocked.has(k) ? state.blocked.delete(k) : state.blocked.add(k); renderAdmin(); toast('Horario actualizado: ya se refleja en la reserva'); });
  $$('[data-ps]').forEach((i) => i.onchange = () => { services.find((s) => s.id === i.dataset.ps).price = +i.value || 0; refreshPublic(); toast('Precio actualizado en el sitio'); });
  $$('[data-pd]').forEach((i) => i.onchange = () => { designs.find((d) => d.id === +i.dataset.pd).extra = +i.value || 0; refreshPublic(); toast('Precio actualizado en el sitio'); });
}
function refreshPublic() { renderDesigns(); renderServices(); }

/* ---------- Arranque ---------- */
function init() {
  renderMarquee(); renderFilters(); renderDesigns(); renderServices(); renderTeam(); renderProducts(); renderGift(); renderPlans(); renderReviews(); updateCart();
  $$('[data-book]').forEach((b) => b.onclick = () => openBooking());
  $('#openAdmin').onclick = openAdmin; $('#adminClose').onclick = closeAdmin;
  $('#openCart').onclick = openCart; $('#drawerClose').onclick = closeDrawer; $('#scrim').onclick = closeDrawer;
  $('#admin').addEventListener('click', (e) => { if (e.target.id === 'admin') closeAdmin(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeDrawer(); closeAdmin(); } });

  // Revelado al hacer scroll
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08 });
  $$('.section-head, .designs, .services, .team, .shop-layout, .plans, .reviews, .cta').forEach((el) => { el.classList.add('reveal'); io.observe(el); });

  // Mano 3D
  const sw = $('#swatches');
  sw.innerHTML = NAIL_COLORS.map((c, i) => `<button class="sw" data-i="${i}" title="${c.name}" style="background:${c.chrome ? 'linear-gradient(135deg,#fff,#b9a3c0,#fff)' : c.hex}"></button>`).join('');
  try {
    const hand = initHand($('#hand3d'));
    $$('.sw').forEach((b) => b.onclick = () => hand.setColor(+b.dataset.i));
    $('#hand3d').addEventListener('nailcolor', (e) => $$('.sw').forEach((b) => b.classList.toggle('on', +b.dataset.i === e.detail)));
    window.__hand = hand;
  } catch (err) { console.warn('WebGL no disponible', err); $('.hero-3d').style.display = 'none'; }
}
init();
window.__app = { openBooking, openAdmin, closeAdmin, closeDrawer, openCart, state };
