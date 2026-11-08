# Pétalo Nail Studio · Demo de app para salones de uñas

> **Demo vigente: `demo/index.html`** (prototipo clicable con las pantallas diseñadas en Stitch).
> La carpeta raíz (`index.html`, `css/`, `js/`) es una primera versión propia que se descartó.

### Prototipo `demo/`
- 9 pantallas de la clienta (inicio, catálogo, servicio y diseño, especialista y horario, depósito, confirmación, mis citas, tienda, perfil) y 5 del panel de la dueña en versión celular (agenda de hoy, servicios y diseños, boutique y gift cards, finanzas, ajustes y WhatsApp).
- `demo/screens/` son las pantallas exportadas de Stitch; `agenda.html` se creó aparte con el mismo sistema de diseño. Tailwind y las fuentes se cargan por CDN; las fotos están en `demo/img/`.
- `demo/js/wire.js` conecta los botones y el estado compartido; `demo/js/shell.js` es el marco con selector Clienta / Dueña y botón para reiniciar.
- La reserva tiene 3 pasos como en la barbería: servicio y diseño, especialista con sus horarios libres (según la duración del servicio, las citas ya reservadas y los bloqueos de la dueña), y depósito.
- Funciona de punta a punta: la cita que reserva la clienta aparece en la agenda de la dueña, el precio que cambia la dueña se ve en la app de la clienta, y Finanzas y Boutique tienen filtros.
- Se puede abrir una pantalla directa con `demo/index.html#agenda`.

## Qué incluye
- Catálogo de diseños con filtros por estilo y forma, favoritos y precio con equivalente en USD
- Reserva en 3 pasos (servicio y diseño, manicurista y hora, datos y depósito simulado)
- Panel de la dueña: agenda del día, métricas, edición de precios y bloqueo de horarios
- Tienda, bolsa y tarjetas de regalo; membresías; reseñas

## Cómo verla
Es un sitio estático, sin build. Desde esta carpeta:

```bash
python3 -m http.server 8000
```

Abre http://localhost:8000. Three.js está incluido en `vendor/`.

## Estructura
- `index.html` · estructura de la página
- `css/styles.css` · tema claro y componentes de cristal líquido
- `js/app.js` · datos de ejemplo, catálogo, reserva, panel, tienda
- `js/hand.js` · escena 3D (Three.js)
- `video/` · video de la demo
