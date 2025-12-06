const NAV_TEMPLATE_PATH = 'templates/main-nav.html';
const FOOTER_TEMPLATE_PATH = 'templates/main-footer.html';

// Shared helper: fetch a template file and replace the mount with its markup.
async function injectTemplate(selector, templatePath) {
  const mount = document.querySelector(selector);
  if (!mount) return;

  const response = await fetch(templatePath, { cache: 'no-cache' });
  if (!response.ok) {
    console.error(`Failed to load template (${templatePath}): ${response.status} ${response.statusText}`);
    return;
  }

  const markup = await response.text();
  mount.outerHTML = markup;
}

// Navigation template
async function loadNav() {
  await injectTemplate('[template-main-nav]', NAV_TEMPLATE_PATH);
}

// Footer template
async function loadFooter() {
  await injectTemplate('[template-main-footer]', FOOTER_TEMPLATE_PATH);
}

loadNav().catch((err) => console.error('Error loading nav template', err));
loadFooter().catch((err) => console.error('Error loading footer template', err));
