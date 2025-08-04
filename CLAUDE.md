# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frito Paws is a professional dog walking and pet sitting service website built with Next.js 15 and React 19. The site is a single-page application showcasing services, customer reviews, and contact information for a dog walking business in Chiswick, London.

## Key Commands

- `npm run dev --turbopack` - Start development server with Turbo
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Architecture & Structure

### Tech Stack
- **Framework**: Next.js 15.3.1 with App Router
- **React**: Version 19 (latest)
- **Styling**: Tailwind CSS v4 with custom CSS animations
- **TypeScript**: Full type safety enabled with strict mode
- **Images**: Next.js Image component with optimization
- **Animations**: Custom CSS animations with Framer Motion library (`motion`)
- **3D Graphics**: Three.js for interactive elements
- **Analytics**: Vercel Analytics integration

### Key Application Structure

**Main Page**: `app/page.tsx` - Single-page application with multiple sections:
- Header with responsive navigation and scroll effects
- Hero section with animated dog background
- Services section with expandable circular cards
- About Us section with company information
- Dog carousel showcasing client pets
- Customer reviews carousel
- Contact form with Web3Forms integration

**Component Architecture**:
- `components/` - Reusable UI components
  - `CircularServiceCard.tsx` - Interactive service cards with expand/collapse
  - `DogCarousel.tsx` - Image carousel with auto-play and manual navigation
  - `CommentsCarousel.tsx` - Customer testimonials slider
  - `DogAnimation.tsx` - Hero section background animation
  - `ExpandableCard.tsx` - Generic expandable card component
  - `ImagePopup.tsx` - Modal for image viewing

**Styling Approach**:
- Tailwind classes for responsive design
- Custom color palette: `#143F3F` (dark teal), `#5BA69E` (light teal), `#FEF2E4` (cream)
- CSS-in-JS for dynamic styles
- Custom animations in `page-styles.css`

**State Management**:
- React hooks for local component state
- Form handling with controlled components
- Auto-playing carousels with pause on hover

### Key Features

1. **Responsive Design**: Mobile-first approach with desktop enhancements
2. **Interactive Elements**: Expandable service cards, image carousels, smooth scrolling
3. **Contact Integration**: WhatsApp links, Web3Forms for contact submissions
4. **SEO Optimized**: Next.js Image optimization, proper alt texts, structured data
5. **Analytics**: Google Analytics event tracking for user interactions

### Development Patterns

- **TypeScript Interfaces**: Well-defined props for all components
- **Image Optimization**: Next.js Image component with proper sizing and lazy loading
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Performance**: Code splitting, optimized images, efficient re-renders

## Important Notes

- The site uses Next.js 15 with the new App Router structure
- All images are stored in `/public/` directory with organized subdirectories
- Contact form submits to Web3Forms service (API key included in form)
- WhatsApp integration uses direct wa.me links
- The application is client-side rendered (`'use client'` directive used)
- Custom fonts loaded via `@next/font` package (Alfa Slab One for headings)