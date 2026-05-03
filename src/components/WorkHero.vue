<template>
  <div class="work-hero" :class="`work-hero--${type}`">
    <img v-if="type === 'image'" :src="source" :alt="title" class="hero-media" />

    <iframe
      v-else-if="type === 'embed'"
      :src="source"
      :title="`${title} embedded media`"
      class="hero-embed"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>

    <video v-else-if="type === 'video'" controls class="hero-media">
      <source :src="source" type="video/mp4" />
    </video>

    <audio v-else-if="type === 'audio'" controls :src="source" class="hero-audio">
      Your browser does not support the audio element.
    </audio>

    <div v-else-if="type === 'embed'" class="hero-embed">
      <EmbedLoader :config="source" />
    </div>

    <div v-else class="hero-placeholder">
      <p>{{ initials }}</p>
    </div>
  </div>
</template>

<script setup>
import EmbedLoader from './EmbedLoader.vue';

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  source: {
    type: [String, Object],
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  initials: {
    type: String,
    required: true
  }
});
</script>
