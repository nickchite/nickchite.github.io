import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import stutterTextDirective from './directives/stutterText';
import './styles.css';

const app = createApp(App);
app.directive('stutter-text', stutterTextDirective);
app.use(router).mount('#app');
