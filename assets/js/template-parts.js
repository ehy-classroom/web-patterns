const NAV_TEMPLATE_PATH = 'templates-parts/main-nav.html';
const FOOTER_TEMPLATE_PATH = 'templates-parts/main-footer.html';

// Shared helper: fetch a template-part file and replace the mount with its markup.
async function injectTemplate(selector, templatePath) {
  const mount = document.querySelector(selector);
  if (!mount) return;

  const response = await fetch(templatePath, { cache: 'no-cache' });
  if (!response.ok) {
    console.error(`Failed to load template-part (${templatePath}): ${response.status} ${response.statusText}`);
    return;
  }

  const markup = await response.text();
  mount.outerHTML = markup;
}

// Navigation template-part
async function loadNav() {
  await injectTemplate('[template-part-main-nav]', NAV_TEMPLATE_PATH);
}

// Footer template-part
async function loadFooter() {
  await injectTemplate('[template-part-main-footer]', FOOTER_TEMPLATE_PATH);
  if (window.updateCopyright) {
    window.updateCopyright();
  }
  if (window.updateVersion) {
    window.updateVersion();
  }
}

loadNav().catch((err) => console.error('Error loading nav template-part', err));
loadFooter().catch((err) => console.error('Error loading footer template-part', err));
