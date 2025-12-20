# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.0.8] - 2025-12-20
### Added
- Mobile overlay navigation container with burger toggle, alongside the existing desktop nav bar.
- Footer social links row (LinkedIn/Instagram/Behance) using the local Font Awesome bundle.
### Updated
- `templates-parts/main-nav.html` now exports the `<ul>` as the root element; pages provide the `<nav>` wrapper(s).
- Template injection supports multiple mounts and fills the mount contents for nav (so wrappers like the overlay burger button remain intact).
- Language switch can render as `EN | DE` with the active language shown as plain text (bold via `[aria-current="true"]`).

## [v1.0.7] - 2025-12-06
### Added
- Lightweight CMS-style rendering: `assets/js/cms.js` fetches markdown, renders H1 into the page title, and converts H2+ content into section blocks under `<main>`.
- Bilingual content loading with language-specific markdown (`content/tiles-en.md`, `content/tiles-de.md`) and a toggle (EN/DE) that switches sources and updates `<html lang>`.
- Default language set to German; language toggle labeled “English Version” / “Deutsche Version”.
### Updated
- Markdown renderer now preserves mounts and rerenders on language switch; minor fixes to ensure template parts and markdown sources resolve correctly.

## [v1.0.6] - 2025-12-06
### Added
- Dynamic `<base>` setup in page heads for correct paths locally and on GitHub Pages.
- Dynamic footer version display and copyright year range.
### Updated
- Template loader now uses the renamed `template-parts.js`; nav/footer links and mounts updated to work with the new base handling.

## [v1.0.5] - 2025-12-06
### Added
- New template-part directory (`templates-parts/`) with nav/footer partials, plus a copy/paste page scaffold (`templates/page-100.html`).
- Initial pattern tile snippets (`patterns/tile-100.html`, `patterns/tile-200.html`) and sample image assets under `assets/img/`.
- Base-path helper (`~/` prefix) for local vs GitHub Pages paths, plus dynamic version display in the footer.
### Updated
- Template loader now targets `template-part-*` mounts and the renamed template-part paths; nav/footer mounts in pages adjusted accordingly. Minor heading class tweak in `masonry.html` (site title).

## [v1.0.4] - 2025-12-06
### Added
- Client-side “AJAX-style” template system: `assets/js/template-parts.js` fetches and injects shared HTML partials (`templates-parts/main-nav.html`, `templates-parts/main-footer.html`) into pages at runtime.
- Pattern code block styling for inline code samples in sections (monospace, bordered, scrollable).
- Clarified Masonry 100 documentation with descriptive text and code examples (markup + CSS) in `masonry.html`.
- Expanded color system with sub-white/black tokens, accents, and code-specific colors.
### Updated
- `index.html` and `masonry.html` now mount nav/footer via runtime template injection (data attributes) instead of hardcoded markup.
- Navigation styling expanded (sticky main nav, pull-down menus, semantic nav color tokens); tile styling now prevents column breaks globally.
- Layout tokens enriched (breakpoints, gaps, radii); responsive media queries now scale masonry columns via layout column tokens at 45rem/62rem/75rem.

## [v1.0.3] - 2025-12-06
### Added
- Semantic page scaffold (header/main/footer) and navigation on `index.html` for the pattern library home.
- Dedicated `masonry.html` carrying the Masonry 100 example, linked from the shared navigation.
- Grey scale token set expanded to 7 steps (100–700) around the 400 baseline using Fibonacci-derived saturation/brightness values.
### Updated
- Semantic structure and layout markup refreshed across pages; navigation and link styling added to support the shared shell.

## [v1.0.2] - 2025-12-06
### Added
- Masonry 100 demo section in `index.html` showing a multicolumn layout with varied tile lengths (no column breaks inside tiles).
- `emmet-cheatsheet.md` for common Emmet abbreviations and VS Code wrap-with-abbreviation note (ignored from git).

## [v1.0.1] - 2025-12-06
### Added
- Bilingual `README.md` outlining the educational, code-first UI pattern focus.
- Standard `.gitignore` for common web/node artifacts.
- `CHANGELOG.md` scaffold following Keep a Changelog and SemVer.
### Updated
- `git-helper.sh`: added commit body note (“Refer to CHANGELOG.md for commit details”), upstream auto-detection, and auth checks to improve first-time and follow-up pushes.

## [v1.0.0] - 2025-12-06
### Added
- Interactive `git-helper.sh` with staging/commit/push flow.
- Version tracking via `VERSION` file (current release: `v1.0.0`).
- Starter `index.html` placeholder page.

[v1.0.8]: https://github.com/ehy-classroom/web-patterns/compare/v1.0.7...v1.0.8
[v1.0.7]: https://github.com/ehy-classroom/web-patterns/compare/v1.0.6...v1.0.7
[v1.0.5]: https://github.com/ehy-classroom/web-patterns/compare/v1.0.4...v1.0.5
[v1.0.4]: https://github.com/ehy-classroom/web-patterns/compare/v1.0.3...v1.0.4
[v1.0.3]: https://github.com/ehy-classroom/web-patterns/compare/v1.0.2...v1.0.3
[v1.0.2]: https://github.com/ehy-classroom/web-patterns/compare/v1.0.1...v1.0.2
[v1.0.1]: https://github.com/ehy-classroom/web-patterns/compare/v1.0.0...v1.0.1
[v1.0.0]: https://github.com/ehy-classroom/web-patterns/releases/tag/v1.0.0
