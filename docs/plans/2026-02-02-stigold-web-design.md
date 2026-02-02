# STIGOLD Web - Design Document

## Overview

Web vitrina para STIGOLD, empresa de TI dedicada a programaci y desarrollo de sistemas. Sitio hibrido (landing principal + paginas de detalle) con soporte multi-idioma y modo claro/oscuro.

## Decisiones Tecnicas

| Aspecto | Decision |
|---|---|
| Framework | Astro (SSR con adapter Node) |
| Tipo de web | Hibrida (landing + paginas detalle) |
| Tema | Modo claro + oscuro |
| Estilos | CSS Modules |
| Animaciones | Framer Motion (islas React) |
| Portafolio | Manual con MDX (Content Collections) |
| Imagenes livianas | En el repo (public/) |
| Imagenes pesadas | Wasabi (S3-compatible) |
| Formulario | Email (Resend) + guardar en PostgreSQL |
| WhatsApp | Boton flotante |
| i18n | Espanol + Ingles (routing nativo de Astro: /es/, /en/) |
| SEO | Meta tags, Open Graph, sitemap, robots.txt, JSON-LD |
| Pagina 404 | Personalizada |
| Deploy | Railway (adapter @astrojs/node) |

## Paleta de Colores (extraida del logo)

### Colores base

| Token | Hex | Uso |
|---|---|---|
| `--color-primary` | #1B4F7C | Azul oscuro - textos destacados, headers, nav |
| `--color-primary-light` | #6B8DB5 | Azul medio - acentos, fondos secundarios, bordes |
| `--color-accent` | #C4A032 | Dorado - CTAs, elementos destacados, badges |
| `--color-accent-light` | #D4B85A | Dorado claro - hover states del dorado |

### Modo claro

| Token | Hex | Uso |
|---|---|---|
| `--bg-primary` | #FFFFFF | Fondo principal |
| `--bg-secondary` | #F5F7FA | Fondo secciones alternas |
| `--text-primary` | #1A1A2E | Texto principal |
| `--text-secondary` | #4A4A6A | Texto secundario |

### Modo oscuro

| Token | Hex | Uso |
|---|---|---|
| `--bg-primary` | #0F1923 | Fondo principal (navy profundo) |
| `--bg-secondary` | #162230 | Fondo secciones alternas |
| `--text-primary` | #E8E8F0 | Texto principal |
| `--text-secondary` | #A0A0B8 | Texto secundario |

## Estructura de Paginas

### Landing principal (/)
- Hero (propuesta de valor + CTA)
- Servicios (resumen con links a detalle)
- Portafolio (proyectos destacados)
- Sobre nosotros
- Contacto (formulario)

### Paginas independientes
- `/proyectos` - listado completo del portafolio
- `/proyectos/[slug]` - detalle de proyecto (generado desde MDX)
- `/servicios/[slug]` - detalle de servicio (opcional)

### Otras
- `/404` - pagina de error personalizada

## Servicios ofrecidos
- Desarrollo web
- Apps moviles
- Sistemas a medida
- Consultoria TI
- Todo tipo de sistemas

## Portafolio
- Contenido manual via archivos MDX
- Content Collections de Astro para tipado y validacion
- Campos: title, client, date, tags, thumbnail, featured, description

## Formulario de contacto
- Campos: nombre, email, mensaje
- Backend: API endpoint de Astro
- Envia email via Resend
- Guarda en PostgreSQL
- Boton flotante de WhatsApp como canal alternativo

## Logo
- Archivo: logoSTIGOLD.png (transparente)
- Variante modo oscuro: pendiente (se usa el mismo inicialmente)
