const NAV_TEMPLATE_PATH = 'templates-parts/main-nav.html';
const FOOTER_TEMPLATE_PATH = 'templates-parts/main-footer.html';

// Shared helper: fetch a template-part file and inject its markup.
async function injectTemplate(selector, templatePath, { mode = 'replace' } = {}) {
  const mounts = document.querySelectorAll(selector);
  if (!mounts.length) return;

  const response = await fetch(templatePath, { cache: 'no-cache' });
  if (!response.ok) {
    console.error(`Failed to load template-part (${templatePath}): ${response.status} ${response.statusText}`);
    return;
  }

  const markup = await response.text();
  if (mode === 'fill') {
    for (const mount of mounts) {
      mount.innerHTML = markup;
    }
    return;
  }

  for (const mount of mounts) {
    mount.outerHTML = markup;
  }
}

function initOverlayMenuToggle() {
  const overlayNavs = document.querySelectorAll('.main-nav.overlay-menu');
  for (const overlayNav of overlayNavs) {
    if (overlayNav.dataset.overlayMenuInit === 'true') continue;
    overlayNav.dataset.overlayMenuInit = 'true';

    const toggleButton = overlayNav.querySelector('button.burger-icon');
    if (!toggleButton) continue;

    const controlsId = toggleButton.getAttribute('aria-controls');
    const menuPanel = controlsId ? overlayNav.querySelector(`#${CSS.escape(controlsId)}`) : null;
    if (!menuPanel) continue;

    const setOpen = (isOpen) => {
      overlayNav.classList.toggle('is-open', isOpen);
      toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuPanel.hidden = !isOpen;
    };

    setOpen(false);

    toggleButton.addEventListener('click', (event) => {
      event.preventDefault();
      setOpen(!overlayNav.classList.contains('is-open'));
    });

    overlayNav.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (!overlayNav.classList.contains('is-open')) return;
      setOpen(false);
      toggleButton.focus();
    });

    menuPanel.addEventListener('click', (event) => {
      if (!event.target.closest('a')) return;
      setOpen(false);
    });

    document.addEventListener(
      'click',
      (event) => {
        if (!overlayNav.classList.contains('is-open')) return;
        if (overlayNav.contains(event.target)) return;
        setOpen(false);
      },
      { capture: true }
    );
  }
}

// Navigation template-part
async function loadNav() {
  await injectTemplate('[template-part-main-nav]', NAV_TEMPLATE_PATH, { mode: 'fill' });
  initOverlayMenuToggle();
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
