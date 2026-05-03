<template>
  <section class="stack">
    <article class="panel stack">
      <h2 class="section-title" v-stutter-text="sectionTitleStutterOptions">Hello, I am Nick.</h2>
      <p>
        I design playful musical systems, interactive software, and experimental media.
      </p>
      <p class="manifesto-copy">
        abstract and glitch-aware, but mathematically precise: i build systems where live coding, statistical thinking,
        and musical expression meet.
      </p>
    </article>

    <article class="panel">
      <h2 class="section-title" v-stutter-text="sectionTitleStutterOptions">Featured Works</h2>
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

const sectionTitleStutterOptions = {
  meanMs: 2100,
  minIntervalMs: 360,
  pulseIntervalMs: 76,
  holdMs: 70,
  pulses: [0.52, 0.34],
  amplitudeX: 6,
  amplitudeY: 3,
  amplitudeRotate: 4,
  amplitudeScale: 0.03
};

const featuredWorks = computed(() => {
  return works
    .filter((work) => work.featured === true && work.hidden !== true)
    .sort((a, b) => Number(b.year) - Number(a.year));
});
</script>
