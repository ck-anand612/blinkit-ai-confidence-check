---
name: Velocity Commerce System
colors:
  surface: '#f8f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#4d4632'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#7e775f'
  outline-variant: '#d0c6ab'
  surface-tint: '#705d00'
  primary: '#705d00'
  on-primary: '#ffffff'
  primary-container: '#f7d002'
  on-primary-container: '#6b5900'
  inverse-primary: '#e9c400'
  secondary: '#006e16'
  on-secondary: '#ffffff'
  secondary-container: '#8ffb87'
  on-secondary-container: '#007518'
  tertiary: '#5f5e5e'
  on-tertiary: '#ffffff'
  tertiary-container: '#d5d2d2'
  on-tertiary-container: '#5b5a5a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe16e'
  primary-fixed-dim: '#e9c400'
  on-primary-fixed: '#221b00'
  on-primary-fixed-variant: '#544600'
  secondary-fixed: '#8ffb87'
  secondary-fixed-dim: '#74dd6e'
  on-secondary-fixed: '#002203'
  on-secondary-fixed-variant: '#00530e'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 12px
  margin-mobile: 16px
---

## Brand & Style

The design system is engineered for extreme efficiency and high-velocity decision-making. It targets an urban, mobile-first demographic that values time over browsing. The emotional response is one of **urgent reliability** and **polished utility**.

The style is a hybrid of **Corporate Modern** and **High-Contrast Precision**. It leverages the structural clarity of Material 3 (clear hierarchies, predictable navigation) while adopting the aesthetic refinement of Apple (fine lines, subtle gradients, and rhythmic white space). The UI prioritizes high-density information without visual clutter, ensuring that product images and price points are the primary focal points.

## Colors

The palette is functional and semantic. 
- **Primary Yellow (#F7D002):** Used exclusively for high-priority brand moments and core CTA backgrounds to evoke speed and energy.
- **Secondary Green (#0C831F):** Functions as the "Action" color. It signifies success, adds to cart, and confirms availability. It is the color of movement.
- **Surface & Background:** A pure white base is used for the main canvas to maximize product photo pop, while the Light Grey surface is used for grouping related content and section backgrounds.
- **Typography:** Deep Charcoal is used instead of pure black to maintain a premium feel while ensuring maximum AAA contrast for readability under varying outdoor light conditions.

## Typography

This design system utilizes **Inter** for its neutral, systematic, and highly legible characteristics at small sizes. 
- **Headlines:** Use Bold (700) weights with slight negative letter-spacing to create a "tight," professional editorial look.
- **Body:** Use Regular (400) weights. Line heights are kept tight (1.4x - 1.5x) to allow for high-density listing without sacrificing scanning speed.
- **Pricing:** Always use Semi-Bold (600) or Bold (700) to ensure the price is the second thing the user sees after the product image.
- **Labels:** Uppercase is reserved for very small utility labels (e.g., "BESTSELLER" badges) to maintain a clean, modern aesthetic.

## Layout & Spacing

The layout follows a **4px baseline grid** to ensure mathematical harmony across all components.
- **Grid:** A fluid 12-column grid for tablet/desktop, and a 4-column grid for mobile.
- **Density:** High-density is achieved by using 12px gutters between product cards, allowing for 2.5 to 3 cards to be visible horizontally on most mobile screens.
- **Safe Zones:** 16px horizontal margins are standard for the container edge.
- **Touch Targets:** Minimum touch target size is 44x44px, even if the visual element (like a small "Add" button) appears smaller.

## Elevation & Depth

Hierarchy is established through a mix of **Tonal Layering** and **Ambient Shadows**.
- **Level 0 (Background):** #FFFFFF. Used for the primary scroll surface.
- **Level 1 (Cards):** #FFFFFF with a 1px border (#EEEEEE). For most product listings.
- **Level 2 (Active/Floating):** A very soft, diffused shadow (Y: 4, Blur: 12, Opacity: 0.05, Color: #000000). Used for "Add to Cart" sticky bars and floating action buttons.
- **Level 3 (Modals/Sheets):** Higher elevation with a 20% background dim (scrim). Used for product detail bottom sheets.

Avoid heavy drop shadows; the goal is to make elements feel "placed" on the surface rather than "hovering" far above it.

## Shapes

The shape language is **friendly yet structured**.
- **Standard Radius:** 12px (rounded-lg) for product cards and primary buttons to evoke a soft, approachable feel.
- **Small Components:** 8px for input fields and small badges.
- **Full Rounding:** Used for search bars and "Quantity Toggle" buttons to distinguish them as highly interactive, tactile elements.
- **Borders:** Hairline 1px borders are preferred over shadows for defining card boundaries in high-density areas.

## Components

### Buttons
- **Primary:** Full-width, #F7D002 background, 12px radius, Bold text. Used for "Proceed to Checkout."
- **Quantity Add:** White background with a 1px #0C831F border, or solid #0C831F with white text when an item is in the cart.
- **Sticky Footer:** Buttons housed in a #FFFFFF container with a subtle Level 2 shadow, fixed to the bottom of the viewport.

### Cards
- **Product Card:** 1px #EEEEEE border, 12px radius. Image occupies the top 60%. Price and "Add" button occupy the footer.
- **Category Card:** Uses light pastel background tints (derived from the product category) with centered icons.

### Input Fields
- **Search Bar:** Fully rounded (pill-shaped), #F5F7F9 background, no border, with a leading "Search" icon and trailing "Mic" icon.

### Bottom Sheets
- Native Android styling with a 4px wide "grabber" at the top center. 16px top-corner radius. Content within uses 16px standard padding.

### Status & Feedback
- **Badges:** Small, 4px radius badges for "Sale" (Red) or "New" (Blue).
- **Progress:** A thin 2px green bar at the top of the screen to indicate order tracking status.