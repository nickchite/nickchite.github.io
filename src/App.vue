<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="brand-block">
        <h1 class="brand-name">
          <span v-stutter-text="brandStutterOptions">nick chite</span>
        </h1>
        <p class="brand-role">music technology · software engineering</p>
      </div>
      <nav aria-label="Primary navigation" class="site-nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/works">Works</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <footer class="site-footer">
      <!-- <p>Built with Vue + Vite. Designed minimalist with a light green palette.</p> -->
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';

const brandStutterOptions = {
  meanMs: 1800,
  minIntervalMs: 260,
  pulseIntervalMs: 80,
  holdMs: 90,
  pulses: [1, 0.72, 0.42],
  amplitudeX: 14,
  amplitudeY: 7,
  amplitudeRotate: 9,
  amplitudeScale: 0.08
};
</script>
