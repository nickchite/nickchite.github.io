<template>
  <div class="stack">
    <p style="font-size: 0.85rem">Zoom in/out if the content is too small or too large.</p>
    <div id="guitar"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const GUITAR_SCRIPT_ATTR = 'data-guitar-script';

function injectScript(src, attr) {
  return new Promise((resolve) => {
    if (document.querySelector(`script[${attr}]`)) { resolve(); return; }
    const script = document.createElement('script');
    script.src = src;
    script.setAttribute(attr, 'true');
    script.onload = resolve;
    script.onerror = resolve;
    document.body.appendChild(script);
  });
}

async function loadGuitarScript() {
  await injectScript('https://d3js.org/d3.v6.min.js', 'data-d3-script');
  await injectScript('https://cdn.jsdelivr.net/npm/tone@14.8.26', 'data-tone-script');
  await injectScript('/resources/guitar/src/script.js', GUITAR_SCRIPT_ATTR);
}

onMounted(() => {
  loadGuitarScript();
});
</script>
