const DEFAULT_OPTIONS = {
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

const STUTTER_STATE = Symbol('stutterTextState');

function mergeOptions(value) {
  if (!value || typeof value !== 'object') {
    return { ...DEFAULT_OPTIONS };
  }

  return {
    ...DEFAULT_OPTIONS,
    ...value,
    pulses: Array.isArray(value.pulses) && value.pulses.length > 0 ? value.pulses : DEFAULT_OPTIONS.pulses
  };
}

function resetTransform(el) {
  el.style.setProperty('--stutter-jx', '0px');
  el.style.setProperty('--stutter-jy', '0px');
  el.style.setProperty('--stutter-jr', '0deg');
  el.style.setProperty('--stutter-js', '1');
}

function sampleExponentialInterval(meanMs, minIntervalMs) {
  const u = Math.max(Number.EPSILON, Math.random());
  return Math.max(minIntervalMs, Math.round(-Math.log(u) * meanMs));
}

function applyRandomStutter(el, options, strength) {
  const x = Math.round((Math.random() * 2 - 1) * options.amplitudeX * strength);
  const y = Math.round((Math.random() * 2 - 1) * options.amplitudeY * strength);
  const r = Math.round((Math.random() * 2 - 1) * options.amplitudeRotate * strength);
  const s = 1 + (Math.random() * 2 - 1) * options.amplitudeScale * strength;

  el.style.setProperty('--stutter-jx', `${x}px`);
  el.style.setProperty('--stutter-jy', `${y}px`);
  el.style.setProperty('--stutter-jr', `${r}deg`);
  el.style.setProperty('--stutter-js', s.toFixed(3));
}

function clearTimers(state) {
  if (!state) return;

  state.timers.forEach((timerId) => {
    window.clearTimeout(timerId);
  });
  state.timers = [];
}

function scheduleNextStutter(el, state) {
  if (state.prefersReducedMotion.matches) {
    resetTransform(el);
    return;
  }

  const waitMs = sampleExponentialInterval(state.options.meanMs, state.options.minIntervalMs);

  const startId = window.setTimeout(() => {
    state.options.pulses.forEach((strength, index) => {
      const pulseId = window.setTimeout(() => {
        applyRandomStutter(el, state.options, strength);
      }, index * state.options.pulseIntervalMs);
      state.timers.push(pulseId);
    });

    const settleDelay = state.options.pulses.length * state.options.pulseIntervalMs + state.options.holdMs;
    const settleId = window.setTimeout(() => {
      resetTransform(el);
      scheduleNextStutter(el, state);
    }, settleDelay);
    state.timers.push(settleId);
  }, waitMs);

  state.timers.push(startId);
}

function watchReducedMotion(el, state) {
  state.motionHandler = () => {
    clearTimers(state);

    if (state.prefersReducedMotion.matches) {
      resetTransform(el);
      return;
    }

    scheduleNextStutter(el, state);
  };

  if (state.prefersReducedMotion.addEventListener) {
    state.prefersReducedMotion.addEventListener('change', state.motionHandler);
    return;
  }

  state.prefersReducedMotion.addListener(state.motionHandler);
}

function unwatchReducedMotion(state) {
  if (!state || !state.motionHandler) return;

  if (state.prefersReducedMotion.removeEventListener) {
    state.prefersReducedMotion.removeEventListener('change', state.motionHandler);
    return;
  }

  state.prefersReducedMotion.removeListener(state.motionHandler);
}

function mountStutter(el, value) {
  const options = mergeOptions(value);
  const state = {
    options,
    timers: [],
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
    motionHandler: null
  };

  el.classList.add('stutter-text');
  resetTransform(el);
  watchReducedMotion(el, state);

  if (!state.prefersReducedMotion.matches) {
    scheduleNextStutter(el, state);
  }

  el[STUTTER_STATE] = state;
}

function unmountStutter(el) {
  const state = el[STUTTER_STATE];
  if (!state) return;

  clearTimers(state);
  unwatchReducedMotion(state);
  resetTransform(el);
  el.classList.remove('stutter-text');
  delete el[STUTTER_STATE];
}

const stutterTextDirective = {
  mounted(el, binding) {
    mountStutter(el, binding.value);
  },
  updated(el, binding) {
    if (binding.value === binding.oldValue) return;
    unmountStutter(el);
    mountStutter(el, binding.value);
  },
  unmounted(el) {
    unmountStutter(el);
  }
};

export default stutterTextDirective;