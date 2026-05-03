import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import AboutView from './views/AboutView.vue';
import WorksView from './views/WorksView.vue';
import WorkDetailView from './views/WorkDetailView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }

    return { top: 0, behavior: 'smooth' };
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/works', name: 'works', component: WorksView },
    { path: '/works/:slug', name: 'work-detail', component: WorkDetailView }
  ]
});

export default router;
