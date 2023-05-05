import {createRouter, createWebHistory} from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import EditShortenView from "@/views/EditShortenView.vue";
import ShortenView from "@/views/ShortenView.vue";
import CreateShortenView from "@/views/CreateShortenView.vue";
import SigninView from "@/views/SigninView.vue";
import SignupView from "@/views/SignupView.vue";
import ShortenListView from "@/views/ShortenListView.vue";

const authorized = (to, from, next) => {
    if (!localStorage.hasOwnProperty('session'))
        next({name: 'signin'})
    else
        next()
}

const plug = function (to, from, next) {
    if (!localStorage.hasOwnProperty('session'))
        return next({name: 'signin'})
    else
        next({name: 'shortens'})
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            beforeEnter: plug
        },
        {
            path: '/shortens',
            name: 'shortens',
            beforeEnter: authorized,
            children: [
                {
                    path: 'create',
                    name: 'shorten.create',
                    component: CreateShortenView
                },
                {
                    path: ':id',
                    children: [
                        {
                            path: 'info',
                            name: 'shorten.info',
                            component: ShortenView,
                        },
                        {
                            path: 'edit',
                            name: 'shorten.edit',
                            component: EditShortenView
                        }
                    ]
                }
            ],
            component: ShortenListView
        },
        {
            path: '/signin',
            name: 'signin',
            component: SigninView
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupView
        }
    ]
})

export default router
