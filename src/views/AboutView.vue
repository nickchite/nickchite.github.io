<template>
  <section class="stack">
    <article class="panel stack">
      <h2 class="section-title" v-stutter-text="sectionTitleStutterOptions">About Me</h2>
      <p>
        I am a passionate, creative individual with a diverse, interdisciplinary skill set. I am interested in topics varying from
        researching artificial intelligence and generative algorithms in music technology, video games, and human-computer interaction.
        My artistic style is interactive and improvisational, with a complexity that pushes at the boundary of possibility.
      </p>
    </article>
  </section>
</template>

<script setup>
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
</script>
