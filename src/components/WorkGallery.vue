<template>
  <div v-if="items.length" class="media-row detail-gallery">
    <Bubble v-for="src in items" :key="src" :src="src" :alt="title" />
  </div>
</template>

<script setup>
import Bubble from './Bubble.vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  }
});
</script>
