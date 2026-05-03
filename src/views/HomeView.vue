<template>
  <section class="stack">
    <article class="panel stack">
      <h2 class="section-title">Hello, I am Nick.</h2>
      <p>
        I design playful musical systems, interactive software, and experimental media.
      </p>
      <p class="manifesto-copy">
        abstract and glitch-aware, but mathematically precise: i build systems where live coding, statistical thinking,
        and musical expression meet.
      </p>
    </article>

    <article class="panel">
      <h2 class="section-title">Featured Works</h2>
      <div class="featured-flow" role="list">
        <Bubble
          v-for="work in featuredWorks"
          :key="work.slug"
          :src="work.cover"
          :alt="work.title"
          :to="`/works/${work.slug}`"
          :caption="{ title: work.title, sub: work.year }"
          variant="featured"
        />
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import Bubble from '../components/Bubble.vue';
import { works } from '../data/works';

const featuredWorks = computed(() => {
  return works
    .filter((work) => work.featured === true)
    .sort((a, b) => Number(b.year) - Number(a.year));
});
</script>
