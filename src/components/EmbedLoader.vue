<template>
  <div class="embed-loader stack">
    <p v-if="config.note" class="embed-loader-note">{{ config.note }}</p>

    <div
      v-if="config.kind === 'script'"
      :id="mountId"
      class="embed-loader-root"
    ></div>

    <iframe
      v-else-if="config.kind === 'iframe'"
      :src="config.src"
      class="work-embed"
      :title="config.title || 'embedded project preview'"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';

const props = defineProps({
  config: {
    type: Object,
    required: true
  }
});

const mountId = computed(() => props.config.mountId || 'embed-root');

function injectScript(scriptConfig, index) {
  const attr = scriptConfig.attr || `data-embed-script-${index}`;
  const once = scriptConfig.once !== false;
  const existing = document.querySelector(`script[${attr}]`);

  return new Promise((resolve) => {
    if (once && existing) {
      resolve();
      return;
    }

    if (!once && existing) {
      existing.remove();
    }

    const script = document.createElement('script');
    script.src = scriptConfig.src;
    script.setAttribute(attr, 'true');
    script.onload = resolve;
    script.onerror = resolve;
    document.body.appendChild(script);
  });
}

async function loadScripts() {
  if (props.config.kind !== 'script' || !Array.isArray(props.config.scripts)) {
    return;
  }

  for (let i = 0; i < props.config.scripts.length; i += 1) {
    await injectScript(props.config.scripts[i], i);
  }
}

onMounted(() => {
  loadScripts();
});
</script>