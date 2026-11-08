/* Conecta las pantallas de Stitch como prototipo clicable.
   Se inyecta dentro de cada pantalla; se comunica con el marco (index.html) por postMessage. */
(function () {
  const screen = (document.querySelector('meta[name="demo-screen"]') || {}).content;
  const send = (m) => parent.postMessage(Object.assign({ demo: true }, m), '*');
  const go = (to) => send({ go: to });

  // Rutas del menú inferior (clienta) y lateral (dueña)
  const PATHS = {
    inicio: 'inicio', disenos: 'disenos', reservar: 'reserva', tienda: 'tienda', perfil: 'perfil',
    'servicios-y-precios': 'servicios', 'catalogo-de-disenos': 'servicios',
    'tienda-y-pedidos': 'pedidos', 'tarjetas-de-regalo': 'pedidos',
    'reportes-financieros': 'reportes', 'configuracion-del-atelier': 'whatsapp',
  };

  // Reglas por texto del botón (la primera que coincide gana)
  const RULES = [
    [/Cambiar a Clienta/i, () => send({ mode: 'cliente' })],
    [/Guardar Cambios/i, () => toast('✓ Actualizado en la app de tus clientas')],
    [/Guardar Configuraci/i, () => toast('✓ Configuración guardada')],
    [/Marcar Entregado/i, (el) => { el.textContent = '✓ Entregado'; el.style.opacity = '.6'; toast('Pedido marcado como entregado'); }],
    [/Debitar en Caja/i, () => toast('Saldo debitado en caja (simulado)')],
    [/Descartar/i, () => toast('Cambios descartados')],
    [/Restaurar versi/i, () => toast('Plantilla restaurada')],
    [/Solicitar Reposici/i, () => toast('Solicitud enviada al laboratorio')],
    [/Descargar Reporte|Exportar/i, () => toast('Descarga simulada en la demo')],
    [/Cerrar Libros/i, () => toast('Período cerrado (simulado)')],
    [/Pagar dep[oó]sito/i, () => go('confirmacion')],
    [/Ver Mis Citas|Mis Citas/i, () => go('citas')],
    [/Reservar ahora|Reservar dise|Tomar turno|Agendar mi momento|Reprogramar|Elegir/i, () => go('reserva')],
    [/Ver dise|Ver cat[aá]logo/i, () => go('disenos')],
    [/Ver Bolsa/i, () => toast('Tu bolsa: 2 productos')],
    [/Comprar Tarjeta/i, () => toast('Tarjeta de regalo añadida a la bolsa')],
    [/A[ñn]adir|^\s*add\s*$|Bolsa\s*add/i, (el) => { bump(); toast('Añadido a tu bolsa'); }],
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
  function bump() { // aumenta el contador de la bolsa
    document.querySelectorAll('button, a').forEach((b) => {
      if (/shopping_bag/.test(b.textContent)) {
        const n = [...b.querySelectorAll('span')].find((s) => /^\d+$/.test(s.textContent.trim()));
        if (n) n.textContent = +n.textContent + 1;
      }
    });
  }

  document.addEventListener('click', (e) => {
    const el = e.target.closest('a, button');
    if (!el) return;
    if (el.matches('input,label')) return;
    e.preventDefault();
    const txt = el.textContent.replace(/\s+/g, ' ').trim();

    // Navegación principal
    const dp = el.getAttribute('data-path');
    if (dp) {
      if (PATHS[dp]) return go(PATHS[dp]);
      return toast('Disponible en la versión completa de la app');
    }
    // Volver
    if (/^arrow_back_ios_new/.test(txt)) return send({ back: true });
    // Bolsa de la cabecera
    if (/^shopping_bag/.test(txt)) return go('tienda');
    if (/^notifications/.test(txt)) return toast('No tienes notificaciones nuevas');
    // Favoritos: alterna el corazón
    if (/^favorite$/.test(txt)) {
      const ic = el.querySelector('.material-symbols-outlined');
      if (ic) { const on = ic.style.fontVariationSettings.includes("'FILL' 1"); ic.style.fontVariationSettings = on ? "'FILL' 0" : "'FILL' 1"; ic.style.color = on ? '' : '#c4487a'; }
      return toast(ic && ic.style.color ? 'Guardado en favoritos' : 'Quitado de favoritos');
    }
    for (const [re, fn] of RULES) { if (re.test(txt)) return fn(el); }
    // Chips / filtros: marca el elegido dentro de su grupo
    const parent = el.parentElement;
    if (parent && parent.children.length > 1 && txt.length < 28) {
      const sibs = [...parent.children].filter((c) => c.tagName === el.tagName);
      if (sibs.length > 1) {
        const active = sibs.find((c) => /bg-primary(?!-)|bg-secondary-container|bg-on-surface|bg-black/.test(c.className));
        if (active && active !== el) {
          const a = active.className, b = el.className; active.className = b; el.className = a;
        }
      }
    }
  }, true);

  send({ ready: screen });
})();
