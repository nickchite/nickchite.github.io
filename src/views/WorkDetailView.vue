<template>
  <section class="stack">
    <article v-if="work" class="panel stack">
      <div class="work-title-row">
        <h2 class="section-title">{{ work.title }}</h2>
        <span class="work-title-meta">
          <span>{{ work.year }}</span>
          <span v-if="work.collaborators && work.collaborators !== 'solo'"> · {{ work.collaborators }}</span>
        </span>
      </div>
      <p v-if="work.subtitle" class="work-subtitle">{{ work.subtitle }}</p>
      <p v-if="work.duration && work.duration !== '∞'" class="work-duration">{{ work.duration }}</p>
      <p class="work-summary">{{ work.summary }}</p>

      <div v-if="work.externalUrl || work.codeUrl" class="work-links">
        <a v-if="work.externalUrl" :href="work.externalUrl" target="_blank" rel="noopener noreferrer" class="external-link">
          {{ work.externalLabel || 'open project' }} ↗
        </a>
        <a v-if="work.codeUrl" :href="work.codeUrl" target="_blank" rel="noopener noreferrer" class="external-link external-link--source">
          view source ↗
        </a>
      </div>

      <WorkHero
        v-if="heroType === 'video' || heroType === 'audio' || heroType === 'embed'"
        :type="heroType"
        :source="heroSource"
        :title="work.title"
        :initials="initials(work.title)"
      />

      <div v-if="work.images?.length" class="media-row detail-gallery">
        <Bubble v-for="src in work.images" :key="src" :src="src" :alt="work.title" />
      </div>

      <audio v-if="work.audio" controls :src="work.audio">
        Your browser does not support the audio element.
      </audio>

      <div v-if="work.tools && work.tools.length" class="chip-row">
        <span v-for="tool in work.tools" :key="tool" class="code-chip">{{ tool }}</span>
      </div>

      <div class="detail-copy">
        <p v-for="paragraph in work.paragraphs" :key="paragraph" class="detail-paragraph">
          {{ paragraph }}
        </p>
      </div>

      <div v-if="work.embedUrl && heroType !== 'embed'" class="embed-wrap">
        <iframe
          :src="work.embedUrl"
          class="work-embed"
          title="embedded project preview"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>

      <div v-if="work.video && heroType !== 'video'" class="media-row">
        <video controls class="secondary-media">
          <source :src="work.video" type="video/mp4" />
        </video>
      </div>
    </article>

    <article v-else class="panel stack">
      <h2 class="section-title">work not found</h2>
      <p>This project does not exist.</p>
      <RouterLink class="back-link" to="/works">go back to works</RouterLink>
    </article>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Bubble from '../components/Bubble.vue';
import WorkHero from '../components/WorkHero.vue';
import { getWorkBySlug } from '../data/works';

const route = useRoute();

const work = computed(() => getWorkBySlug(route.params.slug));

const heroType = computed(() => {
  if (!work.value) return 'none';
  if (work.value.images?.length) return 'image';
  if (work.value.video) return 'video';
  if (work.value.hasGuitar) return 'guitar';
  if (work.value.embedUrl) return 'embed';
  if (work.value.audio) return 'audio';
  if (work.value.embed?.kind) return 'embed';
  return 'none';
});

const heroSource = computed(() => {
  if (!work.value) return '';
  if (heroType.value === 'image') return work.value.images[0];
  if (heroType.value === 'video') return work.value.video;
  if (heroType.value === 'embed') return work.value.embedUrl;
  if (heroType.value === 'audio') return work.value.audio;
  if (heroType.value === 'embed') return work.value.embed;
  return '';
});

function initials(title) {
  return title
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toLowerCase();
}
</script>
