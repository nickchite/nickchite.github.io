<template>
  <div class="work-hero">
    <img v-if="type === 'image'" :src="source" :alt="title" class="hero-media" />

    <video v-else-if="type === 'video'" controls class="hero-media">
      <source :src="source" type="video/mp4" />
    </video>

    <audio v-else-if="type === 'audio'" controls :src="source" class="hero-audio">
      Your browser does not support the audio element.
    </audio>

    <div v-else-if="type === 'guitar'" class="hero-guitar">
      <WebGuitar />
    </div>

    <div v-else class="hero-placeholder">
      <p>{{ initials }}</p>
    </div>
  </div>
</template>

<script setup>
import WebGuitar from './WebGuitar.vue';

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  source: {
    type: String,
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
