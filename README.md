# Web Patterns Playground

Author: Enno Hyttrek, ehy.training@gmail.com

Project URI: https://ehy-classroom.github.io/web-patterns/index.html

## Purpose
This project explores common web and web-app UI patterns with lightweight, framework-free code. The aim is to connect visual design ideas with real markup, styling, and interaction so that designers and students can see how patterns behave in a browser. Everything is kept minimal to stay readable and to work on static hosting without extra tooling.

## Technical Structure

### Architecture
The site runs on plain HTML, CSS, and vanilla JavaScript. Shared elements such as navigation and footer are delivered as template parts and injected at runtime. A dynamic `<base>` element is set on each page so that paths resolve correctly both locally and on GitHub Pages. There are no external frameworks or build steps, which keeps the structure transparent and easy to inspect.

### Content Flow
Content is authored in markdown and rendered client-side. The helper `assets/js/cms.js` fetches language-specific markdown files and uses the first H1 as the page title, while H2 and deeper sections are converted into structured `<section>` blocks under `<main>`. The language toggle switches between English and German sources and updates the `<html lang>` attribute accordingly. Because rendering happens in the browser, the same HTML page can present different language variants without duplicating layouts.

## Content Concept

### Pages and Patterns
The repository includes a small set of example pages. In the current version just tiles and a masonry layout. This is to be expanded towards a solid library of UI patetrns for web sites and web apps.

### Educational Focus
The site is designed as a learning sandbox. By pairing minimal HTML, CSS, and JavaScript with markdown-driven content, it shows how UI patterns can be assembled, themed, and localized with very little code. Students can inspect how template injection works, how dynamic content flows into sections, and how language toggles affect both content and document language. The result is a DIY, static-friendly approach that bridges design intent and working web prototypes.

---

© 2025 Enno Hyttrek
