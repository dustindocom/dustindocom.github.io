/* ==========================================================================
   DIORAMA SETTINGS PANEL  (optional)
   A set of sliders under the scene for tuning it live, plus a block of
   text you can copy to share or save your changes.

   TO REMOVE IT FOR THE LIVE SITE: delete the <script src="diorama-panel.js">
   line from the page. Nothing else depends on this file.
   ========================================================================== */
(function () {
  'use strict';

  var CSS = [
    '.dio-panel { margin-top: 14px; padding: 12px 14px 14px; border: 1px solid var(--line, #d6d2c8); border-radius: 12px; background: var(--panel, #f6f4ee); color: var(--ink, #3a3a36); font: 12px/1.3 var(--font-body, system-ui, sans-serif); display: grid; gap: 10px; }',
    '.dio-panel h2 { margin: 0; font-size: 14px; font-weight: 650; display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }',
    '.dio-panel h2 span { font-weight: 500; font-size: 12px; font-variant-numeric: tabular-nums; color: var(--gold, #a9781a); }',
    '.dio-panel p { margin: 2px 0 0; color: var(--muted, #77756d); }',
    '.dio-panel-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 2px 18px; }',
    '.dio-panel-row { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 0 8px; padding: 3px 0 4px; border-bottom: 1px dashed var(--line, #d6d2c8); }',
    '.dio-panel-row output { font-variant-numeric: tabular-nums; font-weight: 600; }',
    '.dio-panel-row input[type=range] { grid-column: 1 / -1; width: 100%; margin: 2px 0 0; padding: 0; border: 0; background: none; accent-color: var(--gold, #a9781a); height: 16px; }',
    '.dio-panel-row label { min-width: 0; }',
    '.dio-panel-row.is-changed label { color: var(--gold, #a9781a); font-weight: 600; }',
    '.dio-panel input, .dio-panel textarea, .dio-panel button { font: inherit; color: inherit; }',
    '.dio-panel input { width: 100%; box-sizing: border-box; padding: 5px 7px; border: 1px solid var(--line, #cfcbc0); border-radius: 7px; background: #fff; font-variant-numeric: tabular-nums; text-align: right; }',
    '.dio-panel input:focus-visible, .dio-panel textarea:focus-visible, .dio-panel button:focus-visible { outline: 2px solid var(--gold, #a9781a); outline-offset: 1px; }',
    '.dio-panel-actions { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }',
    '.dio-panel button { padding: 7px 13px; border: 1px solid var(--line, #cfcbc0); border-radius: 8px; background: #fff; cursor: pointer; }',
    '.dio-panel button:hover { border-color: var(--gold, #a9781a); }',
    '.dio-panel button.is-main { background: var(--gold, #a9781a); border-color: var(--gold, #a9781a); color: #fff; font-weight: 600; }',
    '.dio-panel-out { display: grid; gap: 6px; }',
    '.dio-panel-out label { font-weight: 600; }',
    '.dio-panel textarea { width: 100%; box-sizing: border-box; min-height: 150px; padding: 10px 12px; border: 1px solid var(--line, #cfcbc0); border-radius: 8px; background: #fff; font: 12.5px/1.5 ui-monospace, "SF Mono", Menlo, Consolas, monospace; white-space: pre; overflow: auto; resize: vertical; }',
    '.dio-panel-note { min-height: 1.4em; color: var(--muted, #77756d); }'
  ].join('\n');

  function init() {
    var D = window.DIORAMA, root = document.getElementById('diorama') || document.querySelector('.diorama');
    if (!D || !D.params || !root) return;   // no 3D (or no scene on this page): nothing to tune

    var style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);
    var panel = document.createElement('section');
    panel.className = 'dio-panel'; panel.setAttribute('aria-label', 'Scene settings');
    panel.innerHTML = '<div><h2>Scene settings <span id="dp-fps"></span></h2><p>Drag a slider (or focus it and use the arrow keys). The scene updates as you drag. Changed settings turn gold.</p></div>' +
      '<div class="dio-panel-grid"></div>' +
      '<div class="dio-panel-actions"><button type="button" id="dp-shuffle">Shuffle shapes</button><button type="button" id="dp-reset">Reset everything</button></div>' +
      '<div class="dio-panel-out"><label for="dp-export">Your settings, ready to copy</label><textarea id="dp-export" readonly spellcheck="false"></textarea>' +
      '<div class="dio-panel-actions"><button type="button" class="is-main" id="dp-copy">Copy settings</button><span class="dio-panel-note" id="dp-note" role="status"></span></div></div>';
    (root.parentNode || document.body).appendChild(panel);

    var grid = panel.querySelector('.dio-panel-grid'), out = panel.querySelector('#dp-export'), note = panel.querySelector('#dp-note'), rows = {};
    function show(v) { return String(Math.round(v * 1000) / 1000); }

    D.params.forEach(function (p) {
      var id = 'dp-' + p.key.replace(/\W+/g, '-'), row = document.createElement('div');
      row.className = 'dio-panel-row';
      row.innerHTML = '<label for="' + id + '"></label><output for="' + id + '"></output><input id="' + id + '" type="range">';
      row.firstChild.textContent = p.label;
      var input = row.lastChild, read = row.children[1];
      input.min = p.min; input.max = p.max; input.step = p.step; input.value = show(p.get());
      input.title = p.min + ' to ' + p.max;
      input.addEventListener('input', function () { D.set(p.key, input.value); refresh(); });
      grid.appendChild(row); rows[p.key] = { row: row, input: input, read: read };
    });

    // The export: one line per setting, in the same names CONFIG uses, with changes flagged.
    function refresh() {
      var changed = 0, width = 0, lines = [];
      D.params.forEach(function (p) { if (p.key.length > width) width = p.key.length; });
      D.params.forEach(function (p) {
        var v = p.get(), diff = Math.abs(v - p.def) > 1e-9;
        if (diff) changed++;
        rows[p.key].row.classList.toggle('is-changed', diff); rows[p.key].read.textContent = show(v);
        lines.push(p.key + new Array(width - p.key.length + 1).join(' ') + ' = ' + show(v) + (diff ? '    <-- changed from ' + show(p.def) : ''));
      });
      out.value = 'DIORAMA SETTINGS (' + changed + ' of ' + D.params.length + ' changed)\n' + lines.join('\n');
    }
    function writeBack() { D.params.forEach(function (p) { rows[p.key].input.value = show(p.get()); }); refresh(); }

    panel.querySelector('#dp-shuffle').addEventListener('click', function () { D.set('shapes.seed', 1 + Math.floor(Math.random() * 9999)); writeBack(); });
    panel.querySelector('#dp-reset').addEventListener('click', function () { D.params.forEach(function (p) { D.set(p.key, p.def); }); writeBack(); });
    panel.querySelector('#dp-copy').addEventListener('click', function () {
      function done(ok) { note.textContent = ok ? 'Copied.' : 'Select the text above and copy it.'; setTimeout(function () { note.textContent = ''; }, 2600); }
      function byHand() { out.focus(); out.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) {} done(ok); }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(out.value).then(function () { done(true); }, byHand);
        else byHand();
      } catch (e) { byHand(); }
    });
    refresh();
    var fps = panel.querySelector('#dp-fps');
    setInterval(function () { if (D.fps) fps.textContent = Math.round(D.fps()) + ' frames per second' + (D.log && D.log.length ? ' · turned down: ' + D.log.join(', ') : ''); }, 500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
