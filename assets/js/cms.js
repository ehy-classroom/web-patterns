(() => {
  // Simple in-memory cache for markdown fetches
  const mdCache = new Map();

  async function getMarkdown(src) {
    if (mdCache.has(src)) return mdCache.get(src);
    const promise = (async () => {
      const res = await fetch(src, { cache: "no-cache" });
      if (!res.ok) throw new Error(`Failed to load ${src}: ${res.status}`);
      return res.text();
    })();
    mdCache.set(src, promise);
    return promise;
  }

  const escapeHtml = (str) =>
    str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const wrapLists = (html) =>
    html.replace(/(<li>.*?<\/li>\s*)+/gs, (m) => `<ul>${m}</ul>`);

  function mdToHtml(md) {
    let html = md;

    // Code fences
    html = html.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${escapeHtml(code)}</code></pre>`);
    // Headings
    html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");
    // Inline
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    // Lists
    html = html.replace(/^\s*-\s+(.*)$/gm, "<li>$1</li>");
    html = wrapLists(html);
    // Paragraphs for remaining lines
    html = html.replace(/^(?!<h[1-6]|<ul|<pre|<code|<li|<p)(.+)$/gm, "<p>$1</p>");

    return html;
  }

  // Render sections from H2 headings (after stripping the leading H1)
  function renderSections(md) {
    // Remove the leading H1 section if present
    const stripped = md.replace(/^#\s+.*(?:\n|$)/, "").trim();
    const parts = stripped.split(/^##\s+/m).filter(Boolean);
    const frag = document.createDocumentFragment();
    parts.forEach((chunk) => {
      const [titleLine, ...bodyLines] = chunk.split("\n");
      const body = bodyLines.join("\n").trim();
      const section = document.createElement("section");
      const container = document.createElement("div");
      container.className = "container";
      const header = document.createElement("header");
      header.className = "section-header";
      const h2 = document.createElement("h2");
      h2.textContent = titleLine.trim();
      header.appendChild(h2);
      const bodyWrapper = document.createElement("div");
      bodyWrapper.className = "markdown";
      bodyWrapper.innerHTML = mdToHtml(body);
      container.appendChild(header);
      container.appendChild(bodyWrapper);
      section.appendChild(container);
      frag.appendChild(section);
    });
    return frag;
  }

  // Render markdown content into the target element; replace the mount with rendered nodes
  async function renderMarkdown(el, srcOverride) {
    const src = srcOverride || el.dataset.mdSrc;
    if (!src) return;
    try {
      const md = await getMarkdown(src);
      const normalized = md.trim();
      const hasSections = /^##\s+/m.test(normalized.replace(/^#\s+.*(?:\n|$)/, ""));
      if (hasSections) {
        const frag = renderSections(normalized);
        el.innerHTML = "";
        el.appendChild(frag);
      } else {
        const contentOnly = normalized.replace(/^#\s+.*(?:\n|$)/, "").trim();
        const wrapper = document.createElement("div");
        wrapper.innerHTML = mdToHtml(contentOnly);
        const frag = document.createDocumentFragment();
        while (wrapper.firstChild) frag.appendChild(wrapper.firstChild);
        el.innerHTML = "";
        el.appendChild(frag);
      }
    } catch (err) {
      console.error("Failed to load markdown:", src, err);
    }
  }

  // Update page title from the first H1 in the source markdown
  async function renderTitle(el, srcOverride) {
    const src = srcOverride || el.dataset.mdTitleSrc;
    if (!src) return;
    try {
      const md = await getMarkdown(src);
      const h1Match = md.match(/^#\s+(.*)$/m);
      if (h1Match) {
        el.textContent = h1Match[1].trim();
      }
    } catch (err) {
      console.error("Failed to load title markdown:", src, err);
    }
  }

  // Init: fetch title and content separately where specified
  function init() {
    const setLanguage = (lang) => {
      const keySuffix = lang ? lang.trim().toLowerCase() : "";
      if (!keySuffix) return;
      document.documentElement.lang = keySuffix;
      const titleKey = `mdTitleSrc${keySuffix[0].toUpperCase()}${keySuffix.slice(1)}`;
      const contentKey = `mdSrc${keySuffix[0].toUpperCase()}${keySuffix.slice(1)}`;

    document.querySelectorAll("[data-md-title-src],[data-md-title-src-en],[data-md-title-src-de]").forEach((el) => {
      const src = el.dataset[titleKey];
      if (src) renderTitle(el, src);
    });

    document.querySelectorAll("[data-md-src],[data-md-src-en],[data-md-src-de]").forEach((el) => {
      const src = el.dataset[contentKey];
      if (src) renderMarkdown(el, src);
    });
  };

    const toggleLabels = (activeLang) => {
      const links = document.querySelectorAll("[data-lang-switch]");
      links.forEach((link) => {
        const lang = link.dataset.langSwitch;
        link.style.display = lang === activeLang ? "none" : "inline";
      });
    };

    document.querySelectorAll("[data-lang-switch]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const lang = link.dataset.langSwitch;
        setLanguage(lang);
        toggleLabels(lang);
      });
    });

    // Initialize visibility and set default language based on current html lang or first switch
    const currentLang =
      document.documentElement.lang ||
      "de";
    setLanguage(currentLang);
    toggleLabels(currentLang);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
