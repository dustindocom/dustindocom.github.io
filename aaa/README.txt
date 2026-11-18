DUSTIN DO DIORAMA  (version 8.04)
=================================

A tile-framed 3D scene with editable gold balloon letters. Plain static files,
no build step, no internet needed. Double-click index.html to run it.

FILES
  index.html            Demo page. Shows the minimum markup you need.
  diorama.css           Styles for the frame container and the text box.
  diorama.js            The scene. All settings are in the CONFIG block at the top.
  diorama-panel.js      Optional settings panel shown under the scene (38 live sliders).
  poster.jpg            Still image shown if a browser cannot run 3D.
  lib/three-bundle.js   Three.js r187 (MIT license), bundled so nothing loads from the web.
  lib/font-garamond.js  EB Garamond Regular letter outlines for the plaque (SIL Open Font License 1.1).
  lib/marble-texture.js The marble picture for the plaque block, packed the same way.
  lib/grass-textures.js The three grass pictures, packed so they load from disk (see GRASS below).
  lib/font-fredoka.js   Fredoka Bold letter outlines (SIL Open Font License 1.1).

PUTTING IT ON YOUR OWN PAGE
  1. Upload the whole folder, keeping lib/ next to diorama.js.
  2. In the <head>:
         <link rel="stylesheet" href="diorama.css">
  3. Where the scene should appear:
         <div class="diorama" id="diorama"></div>
  4. Just before </body>:
         <script src="lib/three-bundle.js"></script>
         <script src="lib/font-fredoka.js"></script>
         <script src="diorama.js"></script>
         <script src="diorama-panel.js"></script>     (optional, see below)
  The scene fills the width of whatever contains it and keeps its 16:11 shape.
  If the files live in a subfolder, adjust the paths, and set posterImage in
  CONFIG to the poster's path as seen from the page.

CHANGING THINGS
  Open diorama.js. Everything meant to be edited is in CONFIG at the top, with a
  comment on every line: text, tile frame, viewing angle, colors, hills, sun,
  clouds, letters, shapes, motion, and performance. Save and refresh.
  The starting words are CONFIG.text; \n starts a new line (up to 3 lines of 24).

THE SETTINGS PANEL
  The panel under the scene changes 38 settings while the scene runs. Lines marked
  [panel] in CONFIG are the ones it controls, under the same names.
  - "Shuffle shapes" picks a new layout number. The same number always gives the
    same layout, so visitors see exactly what you settled on.
  - "Copy settings" copies every value as text, with changed ones flagged. Paste
    that back to whoever is editing the scene, or type the values into CONFIG to
    make them permanent. The panel itself does not save anything.
  - To remove the panel for the live site, delete the one line
        <script src="diorama-panel.js"></script>
    from your page. You can delete the file too; nothing else uses it.

PHONE TILT
  Motion sensors only work on a live https page, not from a file on disk.
  iPhones show a system prompt on the first tap; Android usually does not.
  If tilt feels backwards, flip invertTiltX / invertTiltY in CONFIG.
  Without tilt, dragging a finger across the scene changes the viewing angle.

QUICK EXPERIMENTS (browser console)
  DIORAMA.setGrassBlades(false)     turn individual grass blades off / on
  DIORAMA.setBloom(false)           turn the glow off / on
  DIORAMA.setPixelRatio(1)          sharpness: 1 fastest, 2 crispest
  DIORAMA.setText('Hi\nthere')      change the words (\n = new line)
  DIORAMA.set('sun.rays', 8)        change any panel setting by name
  DIORAMA.gust(1)                   send a gust of wind (1 = to the right, -1 = left)
  DIORAMA.log                       what the automatic quality control has turned down

GRASS PICTURES
  The ground uses three grass pictures (color, bump and drift), packed into
  lib/grass-textures.js so the scene works when opened straight from disk. To swap
  a picture, send the new one to whoever is editing the scene to repack it.
  Leave the grass-textures line out of the page (or set grassTexture: false in
  CONFIG) to get the plain shaded ground.

THE MARBLE PLAQUE
  The text box is a white marble block on the frame's bottom edge with a bronze
  plate and raised gold letters. Its settings are in CONFIG.plaque. Set
  ui.plaque to false (or use the panel switch) to go back to the clear text box.

TYPING STRAIGHT IN (desktop)
  After clicking anywhere on the scene, just start typing: the plaque opens and
  your words go after the current ones, with a space in between.
