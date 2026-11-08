# Pétalo Nail Studio · Demo de app para salones de uñas

> **Demo vigente: `demo/index.html`** (prototipo clicable con las pantallas diseñadas en Stitch).
> La carpeta raíz (`index.html`, `css/`, `js/`) es una primera versión propia que se descartó.

### Prototipo `demo/`
- 7 pantallas de la clienta (inicio, catálogo, reserva con depósito, confirmación, mis citas, tienda, perfil) y 4 del panel de la dueña (servicios y precios, reportes, depósito y WhatsApp, tienda y gift cards).
- `demo/screens/` son las pantallas exportadas de Stitch (Tailwind por CDN y fotos alojadas por Stitch, requieren internet).
- `demo/js/wire.js` conecta los botones principales; `demo/js/shell.js` es el marco con selector Clienta / Dueña.
- Se puede abrir una pantalla directa con `demo/index.html#reportes`.
- Sin pantallas todavía: agenda de hoy, calendario, clientas y equipo (el menú muestra un aviso).


Demo comercial (salón ficticio) para vender apps a negocios pequeños de uñas.
Tema claro, estilo cristal líquido, hero 3D (mano con uñas que cambian de color).

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
