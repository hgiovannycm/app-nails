# Pétalo Nail Studio · Demo de app para salones de uñas

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
