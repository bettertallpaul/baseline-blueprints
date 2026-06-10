---
name: Architectural Functionalist
colors:
  surface: '#fdf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f2f2'
  surface-container: '#f1edec'
  surface-container-high: '#ece7e7'
  surface-container-highest: '#e6e1e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#454655'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#757687'
  outline-variant: '#c5c5d8'
  surface-tint: '#384bdf'
  primary: '#001184'
  on-primary: '#ffffff'
  primary-container: '#001ec0'
  on-primary-container: '#96a1ff'
  inverse-primary: '#bcc2ff'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#636262'
  tertiary: '#262826'
  on-tertiary: '#ffffff'
  tertiary-container: '#3c3e3c'
  on-tertiary-container: '#a8a9a6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dfe0ff'
  primary-fixed-dim: '#bcc2ff'
  on-primary-fixed: '#000a63'
  on-primary-fixed-variant: '#172dc8'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e3e0'
  tertiary-fixed-dim: '#c6c7c4'
  on-tertiary-fixed: '#1a1c1a'
  on-tertiary-fixed-variant: '#454745'
  background: '#fdf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e6e1e1'
typography:
  display:
    fontFamily: Jost
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Jost
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Jost
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Jost
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Jost
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Jost
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  button:
    fontFamily: Jost
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Jost
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 128px
  container-max: 1440px
---

## Brand & Style
The brand identity is rooted in **Architectural Minimalism** and **Functionalism**. It evokes a sense of permanence, precision, and structural integrity. The target audience includes architects, interior designers, and curators who value "the blueprint" as much as the final product. 

The visual style is defined by a high-contrast, grid-based aesthetic that mimics technical drawings. It uses heavy structural lines, generous whitespace, and a restricted palette to create an atmosphere of industrial sophistication. The emotional response should be one of clarity, reliability, and modern luxury through restraint.

## Colors
The palette is dominated by a "Paper White" surface (`#fdf8f8`) and "Technical Black" ink (`#1c1b1b`), creating a stark, high-contrast foundation reminiscent of printed blueprints. 

- **Primary:** A deep Navy Blue (`#001184`) is used for interactive elements, primary button backgrounds, active navigation markers, and focus highlights.
- **Primary Container:** A sharp, high-fidelity Electric Blue (`#001ec0`) is used as a digital accent and container highlight color.
- **Secondary/Tertiary:** Subdued greys and charcoals are used for supporting text and metadata, ensuring the hierarchy remains focused on the structural elements.
- **Surface Tiers:** Dominant surfaces use "Paper White" (`#fdf8f8`), but pure white (`#ffffff`) is selectively used for technical diagram areas, specification containers, or image backdrops to maximize contrast and technical clarity.

## Typography
The system utilizes **Jost** as its exclusive typeface across all roles, ensuring total stylistic unity. Jost, a geometric sans-serif inspired by 1920s German design, is used for headlines, body copy, buttons, and labels to maintain a unified, functional architectural aesthetic.

The hierarchy is driven by dramatic scale contrasts (72px display vs 12px labels). Tight letter spacing is applied to large headlines to create a "locked-in" architectural feel, while wide letter spacing and uppercase transforms are used for technical labels and navigation to mimic engineering annotations.

## Layout & Spacing
The layout follows a strict **Architectural Grid**. It uses a 12-column system on desktop and a 4-column system on mobile. 

- **Structural Borders:** Sections utilize 1px solid lines to create interesting visual separations and highlight key content zones rather than forcing strict divider rules on all layout containers.
- **Rhythm:** A base unit of 8px governs all spacing. Large section gaps (128px) provide breathing room for key content areas, but spacing (such as 64px / `mb-8` / `mt-8`) is adjusted contextually depending on visual density and content hierarchy.
- **Containment:** Content is capped at 1440px but utilizes a fluid "gutter" of 24px to maintain consistent internal alignment.

## Elevation & Depth
This system rejects traditional shadows and blurs in favor of **Structural Flatness**. Depth is conveyed through:

1.  **Outlines:** 1px solid borders (`#1c1b1b`) are applied contextually to define boundaries of interactive elements and containers where they enhance visual structure, rather than strictly outlining every layout element.
2.  **Tonal Planes:** Subtle background shifts (e.g., `surface-container-low`) distinguish different functional zones.
3.  **Layered Annotations:** Labels are often placed in small "boxed-in" containers that sit directly on top of images, mimicking call-outs on a technical drawing.
4.  **Interactive Transitions:** Depth is momentarily implied during hover states by filling outlined shapes with solid color (Primary Blue/Navy or On-Surface Black).

## Shapes
The shape language is strictly **Geometric and Sharp**. A `0px` radius (Sharp) is used for all primary containers, buttons, and decorative elements to maintain the "cut-and-assembled" industrial feel. 

The only exceptions are standard iconography and internal UI markers (like radio buttons), which may use circles, but all structural architecture remains rectangular.

## Imagery
Imagery plays a vital role in reinforcing the architectural blueprint aesthetic.
- **Product Photography:** Product images should depict Bauhaus and Scandinavian inspired furniture styled against a flat, neutral background (`#d8d5cf`, `#e5e4df`, `#b1b2b1`, `#c7b9ae`). This highlights material authenticity and keeps the focus entirely on structural form.
- **Technical Diagrams:** Schematic and assembly diagrams should be presented against a clean light grey background (`#e5e7eb`) to evoke technical drawing paper sheets.

## Components
- **Buttons:** Rectangular and can either be outlined with a 1px solid black border or filled with a solid primary color (`#001184`) by default. On hover, they transition cleanly (e.g. outline transitions to solid fill). No rounded corners.
- **Cards:** Product cards utilize standard grid gaps and visual margins for layout spacing. They may be separated by contextual vertical or horizontal borders to align with the visual hierarchy, rather than strictly locking into a rigid continuous grid of lines. Images within cards use `mix-blend-multiply` on neutral backgrounds to look like technical prints.
- **Labels:** Small, uppercase, bold tags. Often enclosed in a 1px bordered box with a white background to act as a "Blueprint Tag."
- **Navigation:** Top-level links use the `label-caps` style. The active state is indicated by a 2px bottom border in Primary Blue/Navy.
- **Inputs:** Clean, 1px bordered fields with no shadows. Focus states maintain a clean, distraction-free aesthetic by disabling standard rings (using `focus:ring-0`) or using minimal borders.
- **Product Badges:** Positioned in the top-left of image containers, utilizing a solid white or paper-white background and a 1px border.