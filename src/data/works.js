export const workTemplate = {
  slug: 'new-work-slug',
  title: 'new work title',
  featured: false,
  year: '20XX',
  subtitle: '',
  summary: 'one-line summary of the work.',
  role: 'your role',
  collaborators: 'solo',
  duration: '20XX',
  tools: ['tool-1', 'tool-2'],
  cover: '',
  images: [],
  video: '',
  audio: '',
  hasGuitar: false,
  externalUrl: '',
  externalLabel: 'open project',
  embedUrl: '',
  paragraphs: ['longer description paragraph']
};

export const works = [
  {
    slug: 'resonant-life',
    title: 'Resonant Life',
    featured: true,
    year: '2026',
    subtitle: 'procedurally generative browser voices',
    summary: 'A self-evolving generative soundscape where synthesized voices are spawn, evolve, and die in real time.',
    role: 'creative technologist',
    collaborators: 'solo',
    duration: '∞',
    tools: ['Web Audio API', 'Tone.JS', 'Vue 3', 'Vue Flow'],
    cover: '/resources/resonant-life/live.png',
    images: ['/resources/resonant-life/start.png', '/resources/resonant-life/live.png'],
    video: '/resources/resonant-life/demo.mp4',
    audio: '',
    hasGuitar: false,
    externalUrl: 'https://nickchite.github.io/WebAudio.ResonantLife/',
    externalLabel: 'open live site',
    codeUrl: 'https://github.com/nickchite/WebAudio.ResonantLife',
    embedUrl: '',
    paragraphs: [
      "Resonant Life is a generative soundscape that evolves autonomously in the browser. Two families of voices — pure sine tones and vowel-like formant timbres — are continuously spawn, evolve, and die, with each new voice inheriting a subtly mutated version of its predecessor's pitch, envelope, and tone color. The result is a self-renewing texture that never repeats: sometimes sparse and crystalline, sometimes dense and choir-like, always drifting.",
      "Four virtual spaces are positioned around the listener in 3D space, giving the piece a sense of depth and room that shifts as the population changes. A user clicks once to start the system, then shapes its character in real time using two XY pads — dragging between more harmonic or chaotic pitch choices and slower or faster event rates.",
      "Beyond that, the piece plays itself.",
    ]
  },
  {
    slug: 'language-is-music',
    title: 'Language Is Music',
    featured: false,
    year: '2023',
    subtitle: '',
    summary: 'instruction score transforming spoken language into pure musical texture.',
    role: 'composer + performer',
    collaborators: 'solo',
    duration: '20XX',
    tools: ['instruction score', 'voice', 'deep listening'],
    cover: '',
    images: [],
    video: '',
    audio: '',
    externalUrl: '',
    externalLabel: 'open project',
    embedUrl: '',
    paragraphs: [
      'Read aloud a piece of text at a slow natural pace, enunciating each consonant and vowel while tracking transient detail, pitch, and rhythm.',
      'Repeat the text with variation: either emphasize consonants until the voice behaves like percussion, or elongate vowels until they resolve as melody.',
      'Continue iterating until the semantic layer dissolves and only the musical behavior of speech remains.',
      'An instruction score inspired by Alvin Lucier and deep listening practices, designed to recast language as a system of sound.'
    ]
  },
  {
    slug: 'winter-rose',
    title: 'Winter Rose',
    featured: false,
    year: '2020',
    subtitle: '',
    summary: 'holiday composition balancing major/minor systems and irregular time structures.',
    role: 'composer',
    collaborators: 'solo',
    duration: '20XX',
    tools: ['musescore', 'arrangement', 'audio production'],
    cover: '/resources/winter-rose/winter-rose.png',
    images: ['/resources/winter-rose/winter-rose.png'],
    video: '',
    audio: '/resources/winter-rose/winter-rose.mp3',
    externalUrl: '',
    externalLabel: 'open project',
    embedUrl: '',
    paragraphs: [
      'A holiday composition balancing contrasts: major and minor, regular and irregular time, loud and soft.'
    ]
  },
  {
    slug: 'web-guitar',
    title: 'Web Guitar',
    featured: false,
    year: '2021',
    subtitle: '',
    summary: 'browser instrument blending data visualization, MIDI logic, and alternate tuning workflows.',
    role: 'creative technologist',
    collaborators: 'solo',
    tools: ['tone.js', 'd3.js'],
    cover: '',
    images: [],
    video: '',
    audio: '',
    hasGuitar: true,
    externalUrl: '',
    externalLabel: 'open project',
    embedUrl: '',
    paragraphs: [
      'A browser guitar that combines data visualization, MIDI logic, and alternate tunings.'
    ]
  },
  {
    slug: 'walk-along',
    title: 'Walk Along',
    featured: false,
    year: '2022',
    subtitle: '',
    summary: 'auditory game where path and footsteps shape harmony and melody.',
    role: 'composer + game audio design',
    collaborators: 'solo',
    tools: ['puredata', 'interactive audio', 'game prototyping'],
    cover: '',
    images: [],
    video: '/resources/walk/video.mp4',
    audio: '',
    externalUrl: '',
    externalLabel: 'open project',
    embedUrl: '',
    paragraphs: [
      'An auditory game where footsteps shape harmony and movement shapes melody, procedurally shifted in PureData.'
    ]
  },
  {
    slug: 'train-to-the-underworld',
    title: 'Train to the Underworld',
    featured: false,
    year: '2023',
    subtitle: '',
    summary: 'ghostly composition shaped from transformed field recordings.',
    role: 'composer + sound design',
    collaborators: 'solo',
    duration: '1min',
    tools: ['audacity', 'field recording', 'spectral editing'],
    cover: '',
    images: [],
    video: '',
    audio: '/resources/train/train-to-the-underworld.wav',
    externalUrl: '',
    externalLabel: 'open project',
    embedUrl: '',
    paragraphs: [
      'A ghostly composition arranged in Audacity from transformed field recordings, exploring horror atmosphere and dramatic tension.'
    ]
  },
  {
    slug: 'signal-experiment',
    title: 'The Signal Experiment',
    featured: true,
    year: '2023',
    subtitle: '',
    summary: 'networked drawing + machine learning composition with glitch textures.',
    role: 'system designer + performer',
    collaborators: 'networked ensemble',
    duration: '20XX',
    tools: ['mlp', 'networking', 'max/msp', 'live interaction'],
    cover: '/resources/signal/client.png',
    images: [
      '/resources/signal/client.png',
      '/resources/signal/host.png',
      '/resources/signal/host2.png'
    ],
    video: '',
    audio: '',
    externalUrl: '',
    externalLabel: 'open project',
    embedUrl: '',
    paragraphs: [
      'A glitchy, multi-channel composition built around machine learning a signal identity per performer.',
      'Performers draw waveforms that train an MLP, and the system interpolates between identities over time to generate spectral movement and noisy transitions.'
    ]
  },
  {
    slug: 'gong-controller',
    title: 'Gong Controller',
    featured: true,
    year: '2024',
    summary: 'touch-based hardware interface for expressive control and scene switching.',
    role: 'hardware + interaction design',
    collaborators: 'Matthew Goodheart',
    tools: ['Arduino', 'I2C', 'OpenSoundControl', 'Max/MSP'],
    cover: '/resources/gong/front.jpg',
    images: [
      '/resources/gong/front.jpg',
      '/resources/gong/side.jpg',
      '/resources/gong/cad.png'
    ],
    video: '',
    audio: '',
    externalUrl: '',
    externalLabel: 'open project',
    embedUrl: '',
    paragraphs: [
      'An experimental design for a controller interface for controlling almost anything. The prototype includes 10 touch potentiometers via I2C to an Arduino Nano, transmitting OSC messages over USB serial.',
      'The potentiometers provide visual feedback and can be programmatically repositioned, enabling hands-free scene transitions between different sonic scenes.'
    ]
  }
];

export function getWorkBySlug(slug) {
  return works.find((work) => work.slug === slug);
}
