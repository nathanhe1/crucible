// Shared header/footer + theme toggle. Pages include <div id="site-header"></div> ... <div id="site-footer"></div>
(function(){
  const here = location.pathname.split('/').pop() || 'index.html';
  const links = [['arena.html','Arena'],['router.html','Router'],['trading.html','Trading Floor'],['poker.html','Poker Room'],['methodology.html','Methodology']];
  const logo = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h14l-2 9a5 5 0 0 1-10 0z"/><path d="M9 20h6M12 18v2"/><path d="M8.5 9h7" stroke="var(--accent)" stroke-width="2"/></svg>';
  const h = document.getElementById('site-header');
  if (h) h.outerHTML = `<header class="site-h"><div class="wrap">
    <a class="logo" href="index.html">${logo}Crucible</a>
    <nav class="nav" id="nav">${links.map(([u,t])=>`<a href="${u}" class="${u===here?'on':''}">${t}</a>`).join('')}</nav>
    <div class="row" style="gap:8px"><button class="theme-btn" id="themeBtn" aria-label="Toggle theme">◐</button>
    <a class="btn sm h-cta" href="index.html#commission">Commission an eval</a>
    <button class="menu-btn" id="menuBtn" aria-label="Menu">☰</button></div></div></header>`;
  const f = document.getElementById('site-footer');
  if (f) f.outerHTML = `<footer class="site-f"><div class="wrap">
    <div class="motto">Scores should survive contact with the world.</div>
    <div class="cols">
      <div><h4>Environments</h4><a href="arena.html">Arena</a><a href="trading.html">Trading Floor</a><a href="poker.html">Poker Room</a></div>
      <div><h4>Product</h4><a href="router.html">Router</a><a href="methodology.html">Methodology</a></div>
      <div><h4>Company</h4><a href="index.html#commission">Contact</a></div>
    </div>
    <p class="muted" style="margin-top:32px;font-size:13px">© ${new Date().getFullYear()} Crucible. Demo environments use simulated data and play money.</p>
  </div></footer>`;
  const root = document.documentElement;
  try { const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch(e){}
  document.getElementById('themeBtn')?.addEventListener('click',()=>{
    const dark = root.dataset.theme ? root.dataset.theme==='dark' : matchMedia('(prefers-color-scheme:dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch(e){}
    window.dispatchEvent(new Event('themechange'));
  });
  document.getElementById('menuBtn')?.addEventListener('click',()=>document.getElementById('nav').classList.toggle('open'));
  // Seeded RNG shared by demos
  window.mulberry32 = function(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
  window.cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
})();
