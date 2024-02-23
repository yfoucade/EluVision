import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from './components/HomeView.vue'
import DeputyDetails from './components/DeputyDetails.vue'
import LegalNotice from './components/LegalNotice.vue'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: HomeView },
        { path: '/details/:slug', component: DeputyDetails },
        { path: '/legal-notice', component: LegalNotice },
    ]
})

export default router;
