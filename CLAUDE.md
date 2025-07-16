# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Statamic CMS** project built on **Laravel 10** with **PHP 8.2+**. It's a content management system for what appears to be a personal/portfolio website for author Katinka Ruffieux.

## Key Technologies

- **Backend**: Laravel 10 + Statamic CMS 5.0
- **Frontend**: Vite + TailwindCSS + Alpine.js
- **Templating**: Antlers templates (Statamic's template engine)
- **Content Management**: Flat-file CMS with YAML configuration
- **Package Management**: Composer (PHP) + npm (JavaScript)

## Common Development Commands

### Build & Development
```bash
# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install

# Development server (Vite)
npm run dev

# Build for production
npm run build

# Statamic CLI tool
php please [command]
```

### Testing & Quality
```bash
# Run tests
./vendor/bin/phpunit

# Laravel Pint (code formatting)
./vendor/bin/pint

# Run migrations (if needed)
php artisan migrate
```

### Statamic-specific Commands
```bash
# Clear Statamic cache
php please stache:clear

# Create new content types
php please make:collection [name]
php please make:fieldset [name]

# Generate static cache
php please static:clear
```

## Architecture & Structure

### Content Management
- **Collections**: Content types are defined in `content/collections/` (pages, agenda)
- **Fieldsets**: Reusable field configurations in `resources/fieldsets/`
- **Blueprints**: Content schemas in `resources/blueprints/`
- **Templates**: Antlers templates in `resources/views/`

### Key Directories
- `content/` - All content data (entries, assets, navigation)
- `resources/views/` - Antlers template files
- `resources/fieldsets/` - Field definitions for content types
- `resources/blueprints/` - Content structure definitions
- `public/assets/` - Static assets and animations

### Template Structure
- Main layout: `resources/views/layout/default.antlers.html`
- Components: `resources/views/partials/components/`
- Reusable sections defined in `page_section.yaml` fieldset

### Content Types
- **Pages**: Standard pages with flexible content sections
- **Agenda**: Events/appointments with date/time fields
- **Sections**: Modular content using replicator fields (image_text, quotes, contacts, agenda)

### Animation System
- Lottie animations stored in `public/assets/animationen/`
- Separate autoplay animations in `public/assets/animationen/autoplay/`
- Animation components: `animation_autoplay.antlers.html` and `animation_scroll.antlers.html`

### Custom TailwindCSS Configuration
- Extended spacing system (1-250 with 0.0625rem increments)
- Custom fonts: Inter-Regular, Inter-Italic, RecklessNeue-Light
- Custom breakpoints and colors
- Content paths include `.antlers.html` files

## Development Workflow

### Adding New Content Types
1. Create collection configuration in `content/collections/`
2. Define blueprint in `resources/blueprints/collections/`
3. Create/update fieldsets in `resources/fieldsets/`
4. Add template in `resources/views/`

### Modifying Existing Content
1. Edit fieldsets in `resources/fieldsets/` for field changes
2. Update templates in `resources/views/partials/components/`
3. Clear Statamic cache with `php please stache:clear`

### Frontend Development
- CSS: `resources/css/app.css` (TailwindCSS)
- JavaScript: `resources/js/app.js` (Alpine.js)
- Vite configuration supports local development at `katinkaruffieux.ch.test`

## Important Notes

- **Statamic uses flat-file storage** - content is stored in YAML/Markdown files, not a database
- **Antlers templating** - Use Statamic's template syntax, not Blade
- **Multilingual support** - Configured for German (de) and English (en)
- **Asset optimization** - Statamic handles image resizing and optimization via Glide
- **Custom spacing system** - Uses precise rem-based spacing (not standard Tailwind)

## Files to Avoid Modifying

- `storage/framework/cache/` - Generated cache files
- `vendor/` - Composer dependencies
- `node_modules/` - npm dependencies
- `public/build/` - Compiled assets