// Global UI helpers

window.updateCopyright = function updateCopyright() {
  const currentYear = new Date().getFullYear();
  document.querySelectorAll('.copyright[data-start-year]').forEach((el) => {
    const startYear = parseInt(el.dataset.startYear, 10);
    if (!Number.isFinite(startYear)) return;
    const owner = el.dataset.owner || '';
    const range = currentYear > startYear ? `${startYear} - ${currentYear}` : `${startYear}`;
    const text = owner ? `© ${range} ${owner}` : `© ${range}`;
    el.textContent = text;
  });
};

window.updateVersion = async function updateVersion() {
  try {
    const versionEl = document.querySelector('.version[data-version-src]');
    if (!versionEl) return;
    const path = versionEl.dataset.versionSrc || 'VERSION';
    const res = await fetch(path, { cache: 'no-cache' });
    if (!res.ok) return;
    const text = (await res.text()).trim();
    versionEl.textContent = `${text}`;
  } catch (err) {
    console.error('Failed to load version', err);
  }
};
