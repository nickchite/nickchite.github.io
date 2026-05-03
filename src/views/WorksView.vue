<template>
  <section class="stack">
    <article class="panel stack">
      <h2 class="section-title" v-stutter-text="sectionTitleStutterOptions">Works</h2>

      <div class="works-flow" role="list">
        <Bubble
          v-for="work in sortedWorks"
          :key="work.slug"
          :src="work.cover"
          :alt="work.title"
          :to="`/works/${work.slug}`"
          :caption="{ title: work.title, sub: work.year }"
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

const sortedWorks = computed(() => {
  return works
    .filter((work) => work.hidden !== true)
    .sort((a, b) => {
    const yearA = parseYear(a.year);
    const yearB = parseYear(b.year);

    if (yearA !== yearB) {
      return yearB - yearA;
    }

    return a.title.localeCompare(b.title);
  });
});

function parseYear(year) {
  const normalized = String(year ?? '').trim();
  return /^\d{4}$/.test(normalized) ? Number(normalized) : -Infinity;
}
</script>
