<template>
  <component
    :is="wrapTag"
    v-bind="wrapProps"
    :class="['bubble', variant && `bubble--${variant}`]"
    :role="to || href ? 'listitem' : undefined"
    :aria-label="to || href ? `Open ${alt}` : undefined"
  >
    <div class="bubble-image-wrap">
      <img v-if="src" :src="src" :alt="alt" class="bubble-media" />
      <div v-else class="bubble-empty">
        <span v-for="(word, i) in alt.split(' ')" :key="i" class="bubble-empty-word">{{ word }}</span>
      </div>
    </div>
    <div v-if="caption" class="bubble-label">
      <h3>{{ caption.title }}</h3>
      <p v-if="caption.sub">{{ caption.sub }}</p>
    </div>
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, required: true },
  to: { type: String, default: '' },
  href: { type: String, default: '' },
  caption: { type: Object, default: null },
  variant: { type: String, default: '' }
});

const wrapTag = computed(() => {
  if (props.to) return RouterLink;
  if (props.href) return 'a';
  return 'div';
});

const wrapProps = computed(() => {
  if (props.to) return { to: props.to };
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener noreferrer' };
  return {};
});
</script>
