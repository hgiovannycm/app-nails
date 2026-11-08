---
name: Haute Polished Luxury Atelier
colors:
  surface: '#fcf8f7'
  surface-dim: '#ddd9d8'
  surface-bright: '#fcf8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e6'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#4d4547'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#7f7477'
  outline-variant: '#d0c3c6'
  surface-tint: '#6a5a5f'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#24181c'
  on-primary-container: '#917f84'
  inverse-primary: '#d6c1c7'
  secondary: '#78555b'
  on-secondary: '#ffffff'
  secondary-container: '#ffd2d8'
  on-secondary-container: '#7a585d'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cca730'
  on-tertiary-container: '#4f3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f3dde3'
  primary-fixed-dim: '#d6c1c7'
  on-primary-fixed: '#24181c'
  on-primary-fixed-variant: '#514348'
  secondary-fixed: '#ffd9de'
  secondary-fixed-dim: '#e7bcc1'
  on-secondary-fixed: '#2d1419'
  on-secondary-fixed-variant: '#5e3e43'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fcf8f7'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
  price-display:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-mobile: 0.5rem
  margin: 1.25rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system is tailored for an ultra-high-end nail atelier and bespoke beauty booking platform targeted at sophisticated modern executive women and beauty connoisseurs. The brand evokes uncompromising tranquility, meticulous craftsmanship, tactile indulgence, and timeless elegance. The interface avoids aggressive commercial retail tropes in favor of an ethereal, calm sanctuary reminiscent of a five-star spa or an haute joaillerie salon.

The visual style marries **Refined iOS Liquid Glass / Frosted Glassmorphism** with **Editorial Quiet Luxury**:
- **Tactile Liquid Glass:** Layered translucent sheets over warm ambient tones, supported by heavy backdrop filters (`backdrop-filter: blur(24px)` to `blur(40px)`).
- **Specular Gleams:** Feathered micro-borders with 0.5px to 1px pure white and champagne semi-translucent linear strokes (`linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.1) 100%)`) simulating polished glass surfaces and glossy topcoats.
- **Warm Luminous Atmosphere:** Soft rose, ballet slipper pink, and champagne tints infused into surfaces and ambient diffuse drop shadows instead of cold synthetic grays.
- **Editorial Contrast:** Crisp, deep espresso-burgundy typography grounds the ephemeral glass elements, ensuring peak legibility and typographic authority.

## Colors

The palette rejects sterile corporate cool tones in favor of an organic, skin-warmed luxury harmony. Every shade is derived from cosmetic finishes: velvet lacquers, dewy balms, and powdered alabaster.

### Palette Architecture
- **Primary (`#1F1418`) — Noir Burgundy:** Deepest velvet espresso infused with black cherry. Anchors typography, icon outlines, active primary action surfaces, and crucial interactive wayfinding. Never use pure black (`#000000`).
- **Secondary (`#F7CAD0`) — Rose Gloss:** Dewy blush reminiscent of freshly applied jelly gel. Serves as the primary active state tint, selected chip fill, interactive toggles, and notification jewel indicators. Paired with soft pink substrate `#FCE7ED`.
- **Tertiary (`#D4AF37`) — Champagne Gilding:** Restrained antique rose-gold and champagne tone used exclusively for rating stars, verification badges, elite membership crests, and subtle linear gradient borders.
- **Neutral Canvas (`#FAF6F5`) — Alabaster Silk:** Warm porcelain foundation providing a soft, non-glare surface that makes translucent glass modules visually pop.

### Functional Tints & Glass Fill Tokens
- **Surface Glass Ultra-Light:** `rgba(255, 255, 255, 0.72)` paired with `backdrop-filter: blur(28px)`.
- **Surface Glass Warm Pink:** `rgba(252, 231, 237, 0.55)` paired with `backdrop-filter: blur(20px)`.
- **Glass Border Specular Highlight:** Linear gradient of `rgba(255, 255, 255, 0.85)` at the top edge fading to `rgba(247, 202, 208, 0.25)` at the bottom edge.
- **Muted Body Text:** `#6E5A63` (softened mauve-taupe for secondary metadata, durations, and disclaimers).
- **Subtle Surface Container:** `#F2EAE7` for inactive chips, input wells, and slider tracks.

## Typography

The typographic hierarchy balances couture editorial warmth with modern mobile interaction design.

### Font Pairings & Application
- **Headline Font (`Playfair Display`):** Reserved for hero statement displays, section headers, artisan service names, price representations, and salon editorial cards. High optical contrast between hairline serifs and confident stems delivers an opulent, bespoke character.
- **Body & Label Font (`Plus Jakarta Sans`):** Soft humanist grotesque with rounded, comfortable terminals and an open x-height that naturally mirrors modern iOS conventions. Handles body copy, calendar dates, micro-tags, interactive pill buttons, and transactional checkout steps.

### Typographic Polish Rules
- **Eyebrow Headers:** Always use `label-sm` in all-caps with `+0.08em` tracking in `#6E5A63` or `#9B868F` to establish clear section categories (e.g., `CHOOSE NAIL SHAPE`, `SELECT DATE`).
- **Numerics & Currencies:** Service prices combine `Playfair Display` for the integer value with `Plus Jakarta Sans` medium for the currency symbol and duration badge (`body-sm`).
- **Hero Title Line Height:** Titles must have tight line-heights (1.1x–1.2x) to maintain editorial compactness over frosted overlays.

## Layout & Spacing

The layout is built around mobile-first touch ergonomics designed specifically for Apple dynamic screen enclosures (incorporating Dynamic Island safe areas and home indicator zones).

### Layout Geometry
- **Outer Canvas Margins:** Fluid `16px` (`margin-mobile`) to `20px` (`margin`) gutters keep content comfortably spaced from device bezels while maximizing glass card real estate.
- **Horizontal Carousels:** Service portfolios, nail shape pickers, and artisan profiles break outer margin bounds via negative bleed, letting cards glide edge-to-edge with `16px` internal leading padding.
- **Sticky Floating Action Dock:** Primary flows (e.g., "Confirm Booking") float pinned at the bottom, suspended in a translucent frosted navigation glass tray `16px` above the home indicator.
- **Card Spacing Rhythm:** Component stacks adhere strictly to an 8-point system. Micro element groupings (icons with adjacent sub-labels) use `4px` or `8px` gaps; form groups and calendar matrices use `12px` to `16px`; top-level section transitions step down by `24px` to `32px`.

## Elevation & Depth

Elevation does not rely on harsh grey cast shadows; instead, it uses a multi-layered light simulation comprising chromatic soft ambient blooms, frosted backdrops, and inner rim lighting.

### Elevation Hierarchy

1. **Level 0 (Base Canvas):**
   - Solid porcelain cream foundation (`#FAF6F5`). Receives photography, subtle organic grain, and ambient background aura glows.

2. **Level 1 (Substrate Cards & Tiles):**
   - For carousel panels, inactive booking slots, and service containers.
   - Background: `rgba(255, 255, 255, 0.65)`.
   - Filter: `backdrop-filter: blur(20px) saturate(160%)`.
   - Shadow: `0 8px 24px -4px rgba(247, 202, 208, 0.3), 0 2px 6px rgba(31, 20, 24, 0.03)`.
   - Border: `1px solid rgba(255, 255, 255, 0.75)`.

3. **Level 2 (Selected States & Interactive Modals):**
   - For active shape chips, date toggles, and detail sheets.
   - Background: `rgba(252, 231, 237, 0.85)` or pure layered frosted white.
   - Filter: `backdrop-filter: blur(32px)`.
   - Shadow: `0 14px 34px -6px rgba(224, 159, 175, 0.38), 0 3px 10px rgba(31, 20, 24, 0.05)`.
   - Border: `1px solid rgba(255, 255, 255, 0.95)` with top highlight `box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.8)`.

4. **Level 3 (Floating Command Elements):**
   - For bottom booking bars and floating quick-action pills.
   - Background: `#1F1418` (Primary Noir) or `rgba(255, 255, 255, 0.92)`.
   - Shadow: `0 20px 40px -8px rgba(31, 20, 24, 0.25), 0 8px 16px -4px rgba(247, 202, 208, 0.4)`.
   - Border: `0.5px solid rgba(255, 255, 255, 0.2)` on dark pills; `1px solid rgba(255, 255, 255, 1)` on light docks.

## Shapes

The design system adopts a **Level 3 (Pill-shaped / Organic Curvature)** philosophy. Curves mimic the smooth, continuous curvature of almond, squoval, and oval manicures, eliminating harsh industrial corners in favor of tactile organic radii.

### Radius Token Assignments
- **Capsules & Full Pills (`rounded-full` / `9999px`):** Floating CTA action bars, circular thumbnail badges, day-of-week active tabs, and category chips.
- **Primary Cards & Containers (`rounded-xl` / `24px` to `28px`):** Main service showcases, treatment summary cards, visual lookbook tiles, and bottom sheets.
- **Interactive Tiles & Form Inputs (`rounded-lg` / `16px` to `20px`):** Nail shape selector tiles, date and time slots, practitioner avatars, and imagery frames.
- **Micro UI (`rounded-md` / `8px` to `12px`):** Inner thumbnail previews, rating tags, and badge counters.

## Components

### Buttons
- **Primary Action Capsule (e.g., "Confirm Booking"):** Full-width or floating pill (`height: 56px`). High-contrast `#1F1418` background paired with crisp white `label-lg` typography. The trailing right icon is cradled inside a subtle contrasting circular sub-pill (e.g., soft rose background with deep burgundy arrow glyph).
- **Secondary Glass Capsule (e.g., "Book Appointment"):** Full-width frosted glass pill (`background: rgba(252, 231, 237, 0.85)`), `#1F1418` typography, accompanied by an enclosed dark circle action arrow for visual guidance.
- **Tertiary / Ghost Actions:** Borderless or faint hairline border (`rgba(31, 20, 24, 0.1)`), deep burgundy text, with subtle pressed scale animation (`transform: scale(0.97)`).

### Service & Nail Shape Selector Chips
- **Geometry & Layout:** Vertical stack cards (`width: 64px`, `height: 84px`, `border-radius: 18px`).
- **Inactive State:** Translucent frosted white background (`rgba(255, 255, 255, 0.6)`), 1px subtle white border, minimalistic line-art shape icon in `#6E5A63`, with small `11px` label below.
- **Active / Selected State:** Luscious blush fill (`#FCE7ED` or `#F7CAD0`), encased in an ultra-crisp white border with a rose drop shadow bloom (`0 8px 18px rgba(247, 202, 208, 0.5)`). Nail icon and label shift to `#1F1418` in bold weight.

### Date & Time Selection Matrix
- **Date Carousel Pill:** Compact rounded rectangles (`width: 52px`, `height: 68px`). Displays weekday abbreviation (`body-sm`) over prominent numeric date (`label-lg`). Inactive days rest on faint translucent beige (`#F2EAE7`); active selected date turns soft glossy blush (`#F7CAD0`) with `#1F1418` text and an elevated micro-shadow.
- **Time Slots:** Horizontal rounded pills (`height: 40px`, `padding: 0 16px`). Light frosted glass base with subtle hairline border. Active slot switches to blush pink with bold deep burgundy text.

### Cards & Media Lookbook
- **Editorial Lookbook Tile:** Full-bleed photograph featuring nail art styles, coated with an inner top-down edge glow and a frosted bottom overlay card. Features a circular frosted glass heart (wishlist) button (`32px` diameter) anchored with a white translucent border.
- **Glass Detail Card:** Holds title, price, description, and review score. Background: `rgba(255, 255, 255, 0.75)` with `backdrop-filter: blur(24px)`. Elevated by a soft ambient shadow (`rgba(247, 202, 208, 0.25)`).

### Lists & Service Grouping
- Non-bordered rows separated by `12px` vertical spacing. Each row uses an independent floating glass module featuring service name (`Playfair Display`, `16px`), duration indicator (`12px` muted taupe), price (`16px` bold), and a chevron glyph.

### Form Inputs & Date Pickers
- Glass input wells (`height: 52px`, `border-radius: 16px`, `background: rgba(255, 255, 255, 0.5)`). Focus states introduce a champagne micro-ring (`#D4AF37` at 40% opacity) accompanied by an inner light reflection.